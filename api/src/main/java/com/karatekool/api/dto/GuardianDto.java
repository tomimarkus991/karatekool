package com.karatekool.api.dto;

import jakarta.validation.constraints.Email;

/** Any field may be empty, but at least one Guardian on a child Application must be complete */
public record GuardianDto(
        String name,
        String phone,
        @Email String email
) {
    public boolean isComplete() {
        return isFilled(name) && isFilled(phone) && isFilled(email);
    }

    private static boolean isFilled(String value) {
        return value != null && !value.isBlank();
    }
}
