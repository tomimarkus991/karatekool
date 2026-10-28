package com.karatekool.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final String MEMBER = "MEMBER";
    public static final String ADMIN = "ADMIN";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, Whitelist whitelist) throws Exception {
        http
                .cors(cors -> {}) // Uses corsConfigurationSource below
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/google").permitAll() // The login endpoint is public so users can actually log in
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll() // OpenAPI and Swagger UI
                        .requestMatchers("/actuator/health", "/error").permitAll()
                        .requestMatchers(HttpMethod.GET, "/events", "/groups", "/trailers", "/presets").permitAll() // The calendar is public
                        .requestMatchers(HttpMethod.POST, "/questions", "/applications/adult", "/applications/child").permitAll() // So are the forms
                        .requestMatchers("/test-support/**").permitAll() // Only exists under the 'e2e' profile
                        .requestMatchers("/events/**", "/trainings/**", "/all-day-events/**", "/multi-day-events/**", "/presets/**").hasRole(ADMIN) // Only Admins change it
                        .anyRequest().hasRole(MEMBER) // Everything else needs someone who is still on the Whitelist
                )
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(jsonUnauthorized())
                        .accessDeniedHandler(jsonForbidden())
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtAuthenticationConverter(whitelistRoles(whitelist)))
                        .authenticationEntryPoint(jsonUnauthorized())
                        .accessDeniedHandler(jsonForbidden())
                );
        return http.build();
    }

    // The site is on another origin. Tokens travel in the Authorization header, not cookies.
    @Bean
    public CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.allowed-origins}") List<String> allowedOrigins) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(allowedOrigins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Roles come from the Whitelist on every request, not from the token, so removing someone
    // from the Whitelist takes effect without waiting for their token to expire
    private JwtAuthenticationConverter whitelistRoles(Whitelist whitelist) {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter((Jwt jwt) -> {
            String email = jwt.getClaimAsString("email");
            List<GrantedAuthority> roles = new ArrayList<>();
            if (whitelist.allows(email)) roles.add(new SimpleGrantedAuthority("ROLE_" + MEMBER));
            if (whitelist.isAdmin(email)) roles.add(new SimpleGrantedAuthority("ROLE_" + ADMIN));
            return roles;
        });
        return converter;
    }

    private AccessDeniedHandler jsonForbidden() {
        return (request, response, exception) -> {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("{\"error\":\"Forbidden\"}");
        };
    }

    // Missing, invalid and expired tokens all answer in the same { "error": ... } shape as the rest of the API
    private AuthenticationEntryPoint jsonUnauthorized() {
        return (request, response, exception) -> {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("{\"error\":\"Unauthorized\"}");
        };
    }
}
