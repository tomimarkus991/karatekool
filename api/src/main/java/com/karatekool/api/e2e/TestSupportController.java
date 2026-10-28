package com.karatekool.api.e2e;

import com.karatekool.api.config.Whitelist;
import com.karatekool.api.model.AppUser;
import com.karatekool.api.model.CalendarView;
import com.karatekool.api.repository.AppUserRepository;
import com.karatekool.api.repository.ClubGroupRepository;
import com.karatekool.api.service.TokenService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

/**
 * Setup for the Playwright E2E suite (e2e/support/backend/spring.ts). Exists only under the
 * 'e2e' profile: it wipes the database and signs anyone in without Google.
 */
@Slf4j
@Profile("e2e")
@RestController
@RequestMapping("/test-support")
@RequiredArgsConstructor
public class TestSupportController {

    private final JdbcTemplate jdbc;
    private final Whitelist whitelist;
    private final AppUserRepository userRepository;
    private final ClubGroupRepository groupRepository;
    private final TokenService tokenService;

    public record NewPerson(@NotBlank @Email String email, boolean admin, String groupLetter, CalendarView calendarView) {}

    public record ExistingPerson(@NotBlank @Email String email) {}

    /** Everything scenarios create goes; reference data (Groups, trailers) stays */
    @PostMapping("/reset")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void reset() {
        jdbc.update("delete from event_group");
        jdbc.update("delete from event");
        jdbc.update("delete from preset");
        jdbc.update("delete from mail_sent");
        jdbc.update("delete from app_user");
        whitelist.clearAdded();
    }

    /** Puts a person on the Whitelist and signs them in */
    @PostMapping("/people")
    @Transactional
    public Map<String, String> addPerson(@Valid @RequestBody NewPerson person) {
        whitelist.add(person.email(), person.admin());
        AppUser user = AppUser.builder()
                .googleSub("e2e:" + person.email())
                .email(person.email())
                .name(person.email().split("@")[0])
                .calendarView(person.calendarView())
                .group(person.groupLetter() == null ? null : groupRepository.findAll().stream()
                        .filter(group -> group.getLetter().equals(person.groupLetter()))
                        .findFirst()
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown Group")))
                .build();
        user = userRepository.save(user);
        return Map.of("token", tokenService.generateToken(user.getId(), user.getEmail()));
    }

    /** Signs an existing person in again, keeping what they saved */
    @PostMapping("/sign-in")
    public Map<String, String> signIn(@Valid @RequestBody ExistingPerson person) {
        AppUser user = userRepository.findByGoogleSub("e2e:" + person.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown person"));
        return Map.of("token", tokenService.generateToken(user.getId(), user.getEmail()));
    }
}
