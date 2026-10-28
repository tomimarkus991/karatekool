package com.karatekool.api.controller;

import com.karatekool.api.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** The calendar is public: everything here is read without signing in. */
class CalendarReadTest extends IntegrationTest {

    private static final String MARCH = "/events?from=2026-03-01T00:00:00+02:00&to=2026-04-01T00:00:00+03:00";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbc;

    @BeforeEach
    void emptyCalendar() {
        jdbc.update("delete from event_group");
        jdbc.update("delete from event");
        jdbc.update("delete from preset");
    }

    @Test
    void groups_areListedByLetter() throws Exception {
        mockMvc.perform(get("/groups"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].letter").value(contains("A", "C", "E", "K", "L", "M", "N", "S", "S1", "T", "V")));
    }

    @Test
    void trailers_areListed() throws Exception {
        mockMvc.perform(get("/trailers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].text").value(contains("- EKSAM", "!!!")));
    }

    @Test
    void presets_areListedByTitle() throws Exception {
        jdbc.update("insert into preset (title) values ('Suvelaager'), ('Talvelaager')");

        mockMvc.perform(get("/presets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].title").value(contains("Suvelaager", "Talvelaager")));
    }

    @Test
    void aTraining_isShownWithItsGroupsTrailerAndHighlight() throws Exception {
        long id = training("2026-03-10T18:00:00+02:00");
        jdbc.update("update event set highlighted = true, description = 'Kimono kaasa', trailer_id = 2 where id = ?", id);
        jdbc.update("insert into event_group (event_id, group_id) select ?, id from club_group where letter in ('S', 'A')", id);

        mockMvc.perform(get(MARCH))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].kind").value("TRAINING"))
                .andExpect(jsonPath("$[0].start").value("2026-03-10T16:00:00Z"))
                .andExpect(jsonPath("$[0].highlighted").value(true))
                .andExpect(jsonPath("$[0].description").value("Kimono kaasa"))
                .andExpect(jsonPath("$[0].trailer.text").value("- EKSAM"))
                .andExpect(jsonPath("$[0].groups[*].letter").value(contains("A", "S")));
    }

    @Test
    void anAllDayEvent_isShownWithItsTitleAndSubtitle() throws Exception {
        jdbc.update("insert into event (kind, starts_at, title, subtitle) values ('ALL_DAY', '2026-03-14T00:00:00+02:00', 'Võistlus', 'Tallinn')");

        mockMvc.perform(get(MARCH))
                .andExpect(jsonPath("$[0].kind").value("ALL_DAY"))
                .andExpect(jsonPath("$[0].title").value("Võistlus"))
                .andExpect(jsonPath("$[0].subtitle").value("Tallinn"));
    }

    @Test
    void aMultiDayEvent_isShownWithItsPresetTitleAndLastDay() throws Exception {
        Long presetId = jdbc.queryForObject("insert into preset (title) values ('Laager') returning id", Long.class);
        jdbc.update("insert into event (kind, starts_at, ends_at, preset_id) values ('MULTI_DAY', '2026-03-12T00:00:00+02:00', '2026-03-15T00:00:00+02:00', ?)", presetId);

        mockMvc.perform(get(MARCH))
                .andExpect(jsonPath("$[0].kind").value("MULTI_DAY"))
                .andExpect(jsonPath("$[0].end").value("2026-03-14T22:00:00Z"))
                .andExpect(jsonPath("$[0].preset.id").value(presetId))
                .andExpect(jsonPath("$[0].preset.title").value("Laager"));
    }

    @Test
    void onlyEventsInTheRange_areShown_inStartOrder() throws Exception {
        training("2026-02-27T18:00:00+02:00");
        long later = training("2026-03-20T18:00:00+02:00");
        long earlier = training("2026-03-03T18:00:00+02:00");
        training("2026-04-02T18:00:00+03:00");

        mockMvc.perform(get(MARCH))
                .andExpect(jsonPath("$[*].id").value(contains((int) earlier, (int) later)));
    }

    @Test
    void aMultiDayEventReachingIntoTheRange_isShown() throws Exception {
        Long presetId = jdbc.queryForObject("insert into preset (title) values ('Laager') returning id", Long.class);
        jdbc.update("insert into event (kind, starts_at, ends_at, preset_id) values ('MULTI_DAY', '2026-02-26T00:00:00+02:00', '2026-03-02T00:00:00+02:00', ?)", presetId);

        mockMvc.perform(get(MARCH)).andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    void events_needARange() throws Exception {
        mockMvc.perform(get("/events"))
                .andExpect(status().isBadRequest());
    }

    private long training(String start) {
        return jdbc.queryForObject("insert into event (kind, starts_at) values ('TRAINING', ?::timestamptz) returning id", Long.class, start);
    }
}
