package com.karatekool.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record NewAllDayEventDto(
        @NotNull OffsetDateTime start,
        @NotBlank String title,
        @NotBlank String subtitle
) {}
