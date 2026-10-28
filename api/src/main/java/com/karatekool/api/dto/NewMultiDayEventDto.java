package com.karatekool.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

/** end is the event's last day */
public record NewMultiDayEventDto(
        @NotNull OffsetDateTime start,
        @NotNull OffsetDateTime end,
        @NotNull Long presetId
) {}
