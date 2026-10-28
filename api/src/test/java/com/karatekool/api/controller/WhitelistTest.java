package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import com.karatekool.api.service.GoogleTokenVerifier;
import com.karatekool.api.service.GoogleTokenVerifier.GoogleIdentity;
import com.karatekool.api.service.TokenService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** IntegrationTest lists admin@example.com as an Admin and user@example.com as a Member. */
class WhitelistTest extends IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TokenService tokenService;

    @MockitoBean
    private GoogleTokenVerifier googleTokenVerifier;

    @Test
    void anEmailNotOnTheWhitelist_cannotSignIn() throws Exception {
        signInAs("stranger@example.com")
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error").value("Email is not on the Whitelist"));
    }

    @Test
    void theWhitelistIgnoresLetterCase() throws Exception {
        signInAs("User@Example.com").andExpect(status().isOk());
    }

    @Test
    void aMember_isNotAnAdmin() throws Exception {
        signInAs("user@example.com")
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.admin").value(false));
    }

    @Test
    void anAdmin_isMarkedAsAnAdmin() throws Exception {
        String token = token(signInAs("admin@example.com").andExpect(jsonPath("$.user.admin").value(true)));

        mockMvc.perform(get("/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.admin").value(true));
    }

    @Test
    void someoneRemovedFromTheWhitelist_isRefusedWithTheirOldToken() throws Exception {
        String token = tokenService.generateToken(1L, "removed@example.com");

        mockMvc.perform(get("/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error").value("Forbidden"));
    }

    private ResultActions signInAs(String email) throws Exception {
        String idToken = UUID.randomUUID().toString();
        when(googleTokenVerifier.verify(idToken)).thenReturn(new GoogleIdentity(UUID.randomUUID().toString(), email, "Name"));
        return mockMvc.perform(post("/auth/google")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"idToken\":\"" + idToken + "\"}"));
    }

    private String token(ResultActions login) throws Exception {
        return login.andReturn().getResponse().getContentAsString().replaceAll(".*\"token\":\"([^\"]+)\".*", "$1");
    }

    @Test
    void outsideTheE2eProfile_nobodyCanWipeTheDatabaseOrAddPeople() throws Exception {
        mockMvc.perform(post("/test-support/reset")).andExpect(status().isNotFound());
        mockMvc.perform(post("/test-support/people")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\": \"intruder@example.com\", \"admin\": true}"))
                .andExpect(status().isNotFound());
    }
}
