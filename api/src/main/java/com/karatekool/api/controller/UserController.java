package com.karatekool.api.controller;

import com.karatekool.api.dto.PreferencesDto;
import com.karatekool.api.dto.UserDto;
import com.karatekool.api.service.UserService;
import com.karatekool.api.util.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(userService.getCurrentUser(JwtUtils.extractUserId(jwt)));
    }

    @PatchMapping
    public ResponseEntity<UserDto> changePreferences(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody PreferencesDto preferences) {
        return ResponseEntity.ok(userService.changePreferences(JwtUtils.extractUserId(jwt), preferences));
    }
}
