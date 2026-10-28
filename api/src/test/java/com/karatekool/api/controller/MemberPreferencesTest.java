package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import com.karatekool.api.model.AppUser;
import com.karatekool.api.repository.AppUserRepository;
import com.karatekool.api.service.TokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MemberPreferencesTest extends IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AppUserRepository userRepository;

    private String member;

    @BeforeEach
    void aMember() {
        AppUser user = userRepository.save(AppUser.builder()
                .googleSub(UUID.randomUUID().toString()).email("user@example.com").name("Mari").build());
        member = "Bearer " + tokenService.generateToken(user.getId(), user.getEmail());
    }

    @Test
    void aNewMember_hasNoPreferencesAndTheDefaultAvatar() throws Exception {
        mockMvc.perform(get("/me").header("Authorization", member))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.group").doesNotExist())
                .andExpect(jsonPath("$.calendarView").doesNotExist())
                .andExpect(jsonPath("$.avatar").value("avatar.svg"));
    }

    @Test
    void aMember_savesTheirGroupAndCalendarView() throws Exception {
        change("""
                {"groupId": 19, "calendarView": "DAY"}
                """)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.group.letter").value("A"));

        mockMvc.perform(get("/me").header("Authorization", member))
                .andExpect(jsonPath("$.group.id").value(19))
                .andExpect(jsonPath("$.group.letter").value("A"))
                .andExpect(jsonPath("$.calendarView").value("DAY"));
    }

    @Test
    void fieldsLeftOut_keepTheirSavedValue() throws Exception {
        change("""
                {"groupId": 19, "calendarView": "DAY", "avatar": "avatar3.svg"}
                """);

        change("""
                {"calendarView": "MONTH"}
                """)
                .andExpect(jsonPath("$.group.letter").value("A"))
                .andExpect(jsonPath("$.calendarView").value("MONTH"))
                .andExpect(jsonPath("$.avatar").value("avatar3.svg"));
    }

    @Test
    void anUnknownGroup_isRefused() throws Exception {
        change("""
                {"groupId": 999}
                """)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Unknown Group"));
    }

    @Test
    void anUnknownCalendarView_isRefused() throws Exception {
        change("""
                {"calendarView": "WEEK"}
                """)
                .andExpect(status().isBadRequest());
    }

    @Test
    void aVisitor_hasNoPreferences() throws Exception {
        mockMvc.perform(patch("/me").contentType(MediaType.APPLICATION_JSON).content("{\"calendarView\":\"DAY\"}"))
                .andExpect(status().isUnauthorized());
    }

    private ResultActions change(String json) throws Exception {
        return mockMvc.perform(patch("/me").header("Authorization", member)
                .contentType(MediaType.APPLICATION_JSON).content(json));
    }
}
