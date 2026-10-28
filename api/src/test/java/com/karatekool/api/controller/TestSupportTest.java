package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** The E2E suite's setup endpoints: anyone it adds can use the API as a Member or Admin, until a reset. */
@ActiveProfiles("e2e")
class TestSupportTest extends IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void anAddedPerson_isSignedInWithTheirPreferences() throws Exception {
        String token = addPerson("""
                {"email": "kati@example.com", "admin": false, "groupLetter": "V", "calendarView": "DAY"}
                """);

        mockMvc.perform(get("/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("kati@example.com"))
                .andExpect(jsonPath("$.admin").value(false))
                .andExpect(jsonPath("$.group.letter").value("V"))
                .andExpect(jsonPath("$.calendarView").value("DAY"));
    }

    @Test
    void anAddedAdmin_canManageTheCalendar() throws Exception {
        String token = addPerson("""
                {"email": "coach@example.com", "admin": true}
                """);

        mockMvc.perform(post("/presets").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Laager\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    void afterAReset_addedPeopleAreNoLongerWhitelisted() throws Exception {
        String token = addPerson("""
                {"email": "gone@example.com", "admin": false}
                """);

        mockMvc.perform(post("/test-support/reset")).andExpect(status().isNoContent());

        mockMvc.perform(get("/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    @Test
    void signingInAgain_keepsWhatThePersonSaved() throws Exception {
        addPerson("""
                {"email": "again@example.com", "admin": false, "calendarView": "DAY"}
                """);

        String json = mockMvc.perform(post("/test-support/sign-in")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\": \"again@example.com\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(json).get("token").asString();

        mockMvc.perform(get("/me").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.calendarView").value("DAY"));
    }

    private String addPerson(String json) throws Exception {
        String response = mockMvc.perform(post("/test-support/people")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(response).get("token").asString();
    }
}
