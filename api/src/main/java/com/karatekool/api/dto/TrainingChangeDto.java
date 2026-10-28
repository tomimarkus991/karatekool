package com.karatekool.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

/** Replaces everything about a Training: a field left out is cleared. */
public record TrainingChangeDto(
        @NotNull OffsetDateTime start,
        List<Long> groupIds,
        Boolean highlighted,
        String description,
        Long trailerId,
        String title
) {}
