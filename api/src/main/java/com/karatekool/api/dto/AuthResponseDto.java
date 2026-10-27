package com.karatekool.api.dto;

public record AuthResponseDto(
        String token,
        UserDto user
) {}
