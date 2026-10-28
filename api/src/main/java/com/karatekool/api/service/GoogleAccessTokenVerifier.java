package com.karatekool.api.service;

import com.karatekool.api.service.GoogleTokenVerifier.GoogleIdentity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Checks a Google access token from the site's own sign-in button (Google's popup token flow).
 * Unlike an ID token it isn't signed for us, so Google's tokeninfo confirms it was issued to one of
 * our client IDs: otherwise a token any other site got for the person would sign them in here.
 */
@Slf4j
@Component
public class GoogleAccessTokenVerifier {

    private static final String TOKEN_INFO_URI = "https://oauth2.googleapis.com/tokeninfo";
    private static final String USER_INFO_URI = "https://www.googleapis.com/oauth2/v3/userinfo";
    private static final ParameterizedTypeReference<Map<String, Object>> JSON = new ParameterizedTypeReference<>() {};

    private final RestClient google = RestClient.create();
    private final List<String> clientIds;

    public GoogleAccessTokenVerifier(@Value("${app.auth.google-client-ids:}") List<String> clientIds) {
        this.clientIds = clientIds.stream().map(String::trim).filter(id -> !id.isEmpty()).toList();
    }

    public GoogleIdentity verify(String accessToken) {
        try {
            LinkedMultiValueMap<String, String> form = new LinkedMultiValueMap<>();
            form.add("access_token", accessToken);
            Map<String, Object> tokenInfo = google.post().uri(TOKEN_INFO_URI)
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(form)
                    .retrieve().body(JSON);
            // tokeninfo has no name; the token itself can read it
            Map<String, Object> userInfo = google.get().uri(USER_INFO_URI)
                    .header("Authorization", "Bearer " + accessToken)
                    .retrieve().body(JSON);
            return identity(tokenInfo, clientIds, userInfo == null ? null : (String) userInfo.get("name"));
        } catch (HttpClientErrorException e) {
            // Google answers 400 for an expired or made-up token
            throw invalid();
        } catch (RestClientException e) {
            log.warn("Could not verify Google access token: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Could not verify Google token");
        }
    }

    /** Audience (one of our client IDs) and a verified email, from tokeninfo's answer */
    static GoogleIdentity identity(Map<String, Object> tokenInfo, Collection<String> clientIds, String name) {
        if (tokenInfo == null
                || !clientIds.contains(String.valueOf(tokenInfo.get("aud")))
                || !"true".equals(String.valueOf(tokenInfo.get("email_verified")))
                || tokenInfo.get("email") == null
                || tokenInfo.get("sub") == null) {
            throw invalid();
        }
        return new GoogleIdentity((String) tokenInfo.get("sub"), (String) tokenInfo.get("email"), name);
    }

    private static ResponseStatusException invalid() {
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Google token");
    }
}
