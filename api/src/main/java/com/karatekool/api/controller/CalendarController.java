package com.karatekool.api.controller;

import com.karatekool.api.dto.EventDto;
import com.karatekool.api.dto.GroupDto;
import com.karatekool.api.dto.PresetDto;
import com.karatekool.api.dto.TrailerDto;
import com.karatekool.api.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.List;

/** The public calendar: read without signing in. */
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    /** Events on the calendar between from (inclusive) and to (exclusive), in start order */
    @GetMapping("/events")
    public List<EventDto> getEvents(@RequestParam OffsetDateTime from, @RequestParam OffsetDateTime to) {
        return calendarService.getEvents(from.toInstant(), to.toInstant());
    }

    @GetMapping("/groups")
    public List<GroupDto> getGroups() {
        return calendarService.getGroups();
    }

    @GetMapping("/trailers")
    public List<TrailerDto> getTrailers() {
        return calendarService.getTrailers();
    }

    @GetMapping("/presets")
    public List<PresetDto> getPresets() {
        return calendarService.getPresets();
    }
}
