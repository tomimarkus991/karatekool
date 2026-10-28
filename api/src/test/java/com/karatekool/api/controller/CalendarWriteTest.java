package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import com.karatekool.api.service.TokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Only Admins change the calendar. IntegrationTest lists admin@example.com as an Admin and user@example.com as a Member. */
class CalendarWriteTest extends IntegrationTest {

    private static final String MARCH = "/events?from=2026-03-01T00:00:00+02:00&to=2026-04-01T00:00:00+03:00";
    private static final String TRAINING = """
            {"starts": ["2026-03-10T18:00:00+02:00", "2026-03-17T18:00:00+02:00"],
             "groupIds": [17, 19], "highlighted": true, "description": "Kimono kaasa", "trailerId": 2}
            """;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private TokenService tokenService;

    @BeforeEach
    void emptyCalendar() {
        jdbc.update("delete from event_group");
        jdbc.update("delete from event");
        jdbc.update("delete from preset");
    }

    @Test
    void anAdmin_createsATrainingOnEveryChosenDay() throws Exception {
        asAdmin(post("/trainings"), TRAINING)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$", hasSize(2)));

        mockMvc.perform(get(MARCH))
                .andExpect(jsonPath("$[*].start").value(contains("2026-03-10T16:00:00Z", "2026-03-17T16:00:00Z")))
                .andExpect(jsonPath("$[0].kind").value("TRAINING"))
                .andExpect(jsonPath("$[0].groups[*].letter").value(contains("A", "S")))
                .andExpect(jsonPath("$[0].highlighted").value(true))
                .andExpect(jsonPath("$[0].description").value("Kimono kaasa"))
                .andExpect(jsonPath("$[0].trailer.text").value("- EKSAM"));
    }

    @Test
    void aNamedTraining_needsNoGroups() throws Exception {
        asAdmin(post("/trainings"), """
                {"starts": ["2026-03-10T18:00:00+02:00"], "title": "Falco Cup"}
                """)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$[0].title").value("Falco Cup"))
                .andExpect(jsonPath("$[0].groups").value(empty()));
    }

    @Test
    void aTraining_needsGroupsOrAName() throws Exception {
        asAdmin(post("/trainings"), """
                {"starts": ["2026-03-10T18:00:00+02:00"], "groupIds": [], "title": " "}
                """)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("A Training needs Groups or a name"));
    }

    @Test
    void aTraining_needsAStart() throws Exception {
        asAdmin(post("/trainings"), """
                {"starts": [], "groupIds": [17]}
                """)
                .andExpect(status().isBadRequest());
    }

    @Test
    void anUnknownGroup_isRefused() throws Exception {
        asAdmin(post("/trainings"), """
                {"starts": ["2026-03-10T18:00:00+02:00"], "groupIds": [999]}
                """)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Unknown Group"));
    }

    @Test
    void anAdmin_editsATraining_includingRemovingItsTrailer() throws Exception {
        long id = createdTrainingId();

        asAdmin(put("/trainings/" + id), """
                {"start": "2026-03-11T19:00:00+02:00", "groupIds": [18], "description": "Uus aeg"}
                """)
                .andExpect(status().isOk());

        mockMvc.perform(get(MARCH))
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].start").value("2026-03-11T17:00:00Z"))
                .andExpect(jsonPath("$[0].groups[*].letter").value(contains("V")))
                .andExpect(jsonPath("$[0].highlighted").value(false))
                .andExpect(jsonPath("$[0].description").value("Uus aeg"))
                .andExpect(jsonPath("$[0].trailer").doesNotExist());
    }

    @Test
    void editingAnEventThatIsNotATraining_isNotFound() throws Exception {
        long id = asAdminId(post("/all-day-events"), """
                {"start": "2026-03-14T00:00:00+02:00", "title": "Võistlus", "subtitle": "Tallinn"}
                """);

        asAdmin(put("/trainings/" + id), """
                {"start": "2026-03-11T19:00:00+02:00", "groupIds": [18]}
                """)
                .andExpect(status().isNotFound());
    }

    @Test
    void anAdmin_createsAnAllDayEvent() throws Exception {
        asAdmin(post("/all-day-events"), """
                {"start": "2026-03-14T00:00:00+02:00", "title": "Võistlus", "subtitle": "Tallinn"}
                """)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.kind").value("ALL_DAY"))
                .andExpect(jsonPath("$.title").value("Võistlus"))
                .andExpect(jsonPath("$.subtitle").value("Tallinn"));
    }

    @Test
    void anAllDayEvent_needsATitleAndSubtitle() throws Exception {
        asAdmin(post("/all-day-events"), """
                {"start": "2026-03-14T00:00:00+02:00", "title": "Võistlus"}
                """)
                .andExpect(status().isBadRequest());
    }

    @Test
    void anAdmin_createsAMultiDayEventFromAPreset() throws Exception {
        long presetId = asAdminId(post("/presets"), """
                {"title": "Laager"}
                """);

        asAdmin(post("/multi-day-events"), """
                {"start": "2026-03-12T00:00:00+02:00", "end": "2026-03-15T00:00:00+02:00", "presetId": %d}
                """.formatted(presetId))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.kind").value("MULTI_DAY"))
                .andExpect(jsonPath("$.preset.title").value("Laager"));
    }

    @Test
    void aMultiDayEvent_cannotEndBeforeItStarts() throws Exception {
        long presetId = asAdminId(post("/presets"), """
                {"title": "Laager"}
                """);

        asAdmin(post("/multi-day-events"), """
                {"start": "2026-03-15T00:00:00+02:00", "end": "2026-03-12T00:00:00+02:00", "presetId": %d}
                """.formatted(presetId))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("A Multi-day event cannot end before it starts"));
    }

    @Test
    void anAdmin_deletesOnlyTheChosenEvent() throws Exception {
        long id = createdTrainingId();

        asAdmin(delete("/events/" + id), null).andExpect(status().isNoContent());

        mockMvc.perform(get(MARCH)).andExpect(jsonPath("$", hasSize(1)));
        asAdmin(delete("/events/" + id), null).andExpect(status().isNotFound());
    }

    @Test
    void anAdmin_deletesAnUnusedPreset() throws Exception {
        long presetId = asAdminId(post("/presets"), """
                {"title": "Laager"}
                """);

        asAdmin(delete("/presets/" + presetId), null).andExpect(status().isNoContent());

        mockMvc.perform(get("/presets")).andExpect(jsonPath("$").value(empty()));
    }

    @Test
    void aPresetInUse_cannotBeDeleted() throws Exception {
        long presetId = asAdminId(post("/presets"), """
                {"title": "Laager"}
                """);
        asAdmin(post("/multi-day-events"), """
                {"start": "2026-03-12T00:00:00+02:00", "end": "2026-03-15T00:00:00+02:00", "presetId": %d}
                """.formatted(presetId));

        asAdmin(delete("/presets/" + presetId), null)
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.error").value("The Preset is used by a Multi-day event"));
    }

    @Test
    void aMember_cannotChangeTheCalendar() throws Exception {
        long id = createdTrainingId();
        String member = "Bearer " + tokenService.generateToken(2L, "user@example.com");

        mockMvc.perform(withJson(post("/trainings"), TRAINING).header("Authorization", member)).andExpect(status().isForbidden());
        mockMvc.perform(withJson(put("/trainings/" + id), TRAINING).header("Authorization", member)).andExpect(status().isForbidden());
        mockMvc.perform(delete("/events/" + id).header("Authorization", member)).andExpect(status().isForbidden());
        mockMvc.perform(withJson(post("/presets"), "{\"title\":\"Laager\"}").header("Authorization", member)).andExpect(status().isForbidden());
    }

    @Test
    void aVisitor_cannotChangeTheCalendar() throws Exception {
        long id = createdTrainingId();

        mockMvc.perform(withJson(post("/trainings"), TRAINING)).andExpect(status().isUnauthorized());
        mockMvc.perform(withJson(put("/trainings/" + id), TRAINING)).andExpect(status().isUnauthorized());
        mockMvc.perform(delete("/events/" + id)).andExpect(status().isUnauthorized());
        mockMvc.perform(withJson(post("/presets"), "{\"title\":\"Laager\"}")).andExpect(status().isUnauthorized());
    }

    private long createdTrainingId() throws Exception {
        String body = asAdmin(post("/trainings"), TRAINING).andReturn().getResponse().getContentAsString();
        return Long.parseLong(body.replaceAll("^\\[\\{\"id\":(\\d+).*", "$1").trim());
    }

    private long asAdminId(MockHttpServletRequestBuilder request, String json) throws Exception {
        String body = asAdmin(request, json).andReturn().getResponse().getContentAsString();
        return Long.parseLong(body.replaceAll("^\\{\"id\":(\\d+).*", "$1").trim());
    }

    private ResultActions asAdmin(MockHttpServletRequestBuilder request, String json) throws Exception {
        String admin = "Bearer " + tokenService.generateToken(1L, "admin@example.com");
        return mockMvc.perform(withJson(request, json).header("Authorization", admin));
    }

    private MockHttpServletRequestBuilder withJson(MockHttpServletRequestBuilder request, String json) {
        return json == null ? request : request.contentType(MediaType.APPLICATION_JSON).content(json);
    }
}
