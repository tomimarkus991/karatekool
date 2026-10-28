package com.karatekool.api.service;

import com.karatekool.api.config.Whitelist;
import com.karatekool.api.dto.PreferencesDto;
import com.karatekool.api.dto.UserDto;
import com.karatekool.api.model.AppUser;
import com.karatekool.api.repository.AppUserRepository;
import com.karatekool.api.repository.ClubGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository userRepository;
    private final ClubGroupRepository groupRepository;
    private final Whitelist whitelist;

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(Long userId) {
        return toDto(getUser(userId));
    }

    @Transactional
    public UserDto changePreferences(Long userId, PreferencesDto preferences) {
        AppUser user = getUser(userId);
        if (preferences.groupId() != null) {
            user.setGroup(groupRepository.findById(preferences.groupId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown Group")));
        }
        if (preferences.calendarView() != null) {
            user.setCalendarView(preferences.calendarView());
        }
        if (preferences.avatar() != null) {
            user.setAvatar(preferences.avatar());
        }
        return toDto(user);
    }

    public AppUser getUser(Long userId) {
        // The token outlived its account, so the client should sign in again
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    private UserDto toDto(AppUser user) {
        return UserDto.from(user, whitelist.isAdmin(user.getEmail()));
    }
}
