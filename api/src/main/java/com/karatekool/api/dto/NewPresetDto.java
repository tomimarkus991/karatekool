package com.karatekool.api.dto;

import jakarta.validation.constraints.NotBlank;

public record NewPresetDto(@NotBlank String title) {}
