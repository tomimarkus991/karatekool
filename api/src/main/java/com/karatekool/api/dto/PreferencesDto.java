package com.karatekool.api.dto;

import com.karatekool.api.model.CalendarView;
import jakarta.validation.constraints.Pattern;

/** A field left out (null) keeps its saved value. */
public record PreferencesDto(
        Long groupId,
        CalendarView calendarView,
        // One of the avatar files the site ships, e.g. avatar3.svg
        @Pattern(regexp = "[a-z0-9-]+\\.svg") String avatar
) {}
