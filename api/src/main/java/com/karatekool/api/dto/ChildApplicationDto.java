package com.karatekool.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/** A Guardian's Application for their child. Replies go to infoEmail. */
public record ChildApplicationDto(
        @NotBlank String firstName,
        @NotBlank String lastName,
        // Estonian personal identification code
        @NotBlank @Pattern(regexp = "[1-6]\\d{10}") String personalCode,
        @NotBlank String phone,
        @NotBlank @Email String email,
        @NotBlank String school,
        @NotBlank String grade,
        @NotBlank String address,
        @NotBlank @Email String infoEmail,
        // Whether karate is the child's main or secondary sport
        @NotBlank @Pattern(regexp = "main|secondary") String sportType,
        @Valid GuardianDto mother,
        @Valid GuardianDto father,
        String familyMembers
) {}
