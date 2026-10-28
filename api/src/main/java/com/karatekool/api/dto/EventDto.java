package com.karatekool.api.dto;

import com.karatekool.api.model.EventKind;

import java.time.Instant;
import java.util.List;

/**
 * One Event on the calendar. Fields that don't apply to its kind are null: title and subtitle are
 * for All-day events, end and preset for Multi-day events.
 */
public record EventDto(
        Long id,
        EventKind kind,
        Instant start,
        Instant end,
        boolean highlighted,
        String description,
        TrailerDto trailer,
        String title,
        String subtitle,
        PresetDto preset,
        List<GroupDto> groups
) {}
