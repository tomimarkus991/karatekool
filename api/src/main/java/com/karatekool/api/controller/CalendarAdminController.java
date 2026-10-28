package com.karatekool.api.controller;

import com.karatekool.api.dto.EventDto;
import com.karatekool.api.dto.NewAllDayEventDto;
import com.karatekool.api.dto.NewMultiDayEventDto;
import com.karatekool.api.dto.NewPresetDto;
import com.karatekool.api.dto.NewTrainingDto;
import com.karatekool.api.dto.PresetDto;
import com.karatekool.api.dto.TrainingChangeDto;
import com.karatekool.api.service.CalendarAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** Admin-only changes to the calendar (see SecurityConfig). */
@RestController
@RequiredArgsConstructor
public class CalendarAdminController {
    private final CalendarAdminService calendarAdminService;

    @PostMapping("/trainings")
    @ResponseStatus(HttpStatus.CREATED)
    public List<EventDto> createTrainings(@Valid @RequestBody NewTrainingDto request) {
        return calendarAdminService.createTrainings(request);
    }

    @PutMapping("/trainings/{id}")
    public EventDto changeTraining(@PathVariable Long id, @Valid @RequestBody TrainingChangeDto request) {
        return calendarAdminService.changeTraining(id, request);
    }

    @PostMapping("/all-day-events")
    @ResponseStatus(HttpStatus.CREATED)
    public EventDto createAllDayEvent(@Valid @RequestBody NewAllDayEventDto request) {
        return calendarAdminService.createAllDayEvent(request);
    }

    @PostMapping("/multi-day-events")
    @ResponseStatus(HttpStatus.CREATED)
    public EventDto createMultiDayEvent(@Valid @RequestBody NewMultiDayEventDto request) {
        return calendarAdminService.createMultiDayEvent(request);
    }

    @DeleteMapping("/events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvent(@PathVariable Long id) {
        calendarAdminService.deleteEvent(id);
    }

    @PostMapping("/presets")
    @ResponseStatus(HttpStatus.CREATED)
    public PresetDto createPreset(@Valid @RequestBody NewPresetDto request) {
        return calendarAdminService.createPreset(request);
    }

    @DeleteMapping("/presets/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePreset(@PathVariable Long id) {
        calendarAdminService.deletePreset(id);
    }
}
