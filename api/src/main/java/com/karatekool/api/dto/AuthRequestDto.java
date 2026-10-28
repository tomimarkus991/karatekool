package com.karatekool.api.dto;

/** A Google ID token (Google's own button) or access token (the site's own button); one is needed */
public record AuthRequestDto(
        String idToken,
        String accessToken
) {}
