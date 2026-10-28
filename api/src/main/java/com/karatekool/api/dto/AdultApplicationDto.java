package com.karatekool.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/** An adult's Application for themselves */
public record AdultApplicationDto(
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank String birthDate,
        @NotBlank String phone,
        @NotBlank @Email String email,
        String familyMembers
) {}
