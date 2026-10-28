package com.karatekool.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;
import java.util.List;

/** One Training per start. A Named Training has a title instead of Groups. */
public record NewTrainingDto(
        @NotEmpty List<@NotNull OffsetDateTime> starts,
        List<Long> groupIds,
        Boolean highlighted,
        String description,
        Long trailerId,
        String title
) {}
