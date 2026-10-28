package com.karatekool.api.service;

import com.karatekool.api.service.GoogleTokenVerifier.GoogleIdentity;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** What Google's tokeninfo says about an access token decides whether it may sign someone in */
class GoogleAccessTokenVerifierTest {

    private static final List<String> OUR_CLIENTS = List.of("our-client-id");

    @Test
    void acceptsATokenIssuedToUsWithAVerifiedEmail() {
        GoogleIdentity identity = GoogleAccessTokenVerifier.identity(tokenInfo(Map.of()), OUR_CLIENTS, "Kati");

        assertThat(identity).isEqualTo(new GoogleIdentity("1234", "kati@example.com", "Kati"));
    }

    @Test
    void rejectsATokenIssuedToAnotherApp() {
        // Any site the person signed in to with Google holds such a token; it mustn't sign them in here
        assertThatThrownBy(() -> GoogleAccessTokenVerifier.identity(
                tokenInfo(Map.of("aud", "someone-elses-client-id")), OUR_CLIENTS, "Kati"))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Invalid Google token");
    }

    @Test
    void rejectsAnUnverifiedEmail() {
        assertThatThrownBy(() -> GoogleAccessTokenVerifier.identity(
                tokenInfo(Map.of("email_verified", "false")), OUR_CLIENTS, "Kati"))
                .isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void rejectsATokenWithoutEmail() {
        Map<String, Object> info = tokenInfo(Map.of());
        info.remove("email");

        assertThatThrownBy(() -> GoogleAccessTokenVerifier.identity(info, OUR_CLIENTS, "Kati"))
                .isInstanceOf(ResponseStatusException.class);
    }

    private static Map<String, Object> tokenInfo(Map<String, Object> overrides) {
        Map<String, Object> info = new HashMap<>(Map.of(
                "aud", "our-client-id",
                "azp", "our-client-id",
                "sub", "1234",
                "email", "kati@example.com",
                "email_verified", "true",
                "expires_in", "3599"));
        info.putAll(overrides);
        return info;
    }
}
