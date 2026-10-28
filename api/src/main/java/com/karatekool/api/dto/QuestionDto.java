package com.karatekool.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record QuestionDto(
        @NotBlank @Size(min = 3) String name,
        @NotBlank @Email String email,
        @NotBlank String question
) {}
