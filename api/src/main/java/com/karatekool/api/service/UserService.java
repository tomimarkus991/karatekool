package com.karatekool.api.service;

import com.karatekool.api.config.Whitelist;
import com.karatekool.api.dto.UserDto;
import com.karatekool.api.model.AppUser;
import com.karatekool.api.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AppUserRepository userRepository;
    private final Whitelist whitelist;

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(Long userId) {
        AppUser user = getUser(userId);
        return new UserDto(user.getId(), user.getEmail(), user.getName(), whitelist.isAdmin(user.getEmail()));
    }

    public AppUser getUser(Long userId) {
        // The token outlived its account, so the client should sign in again
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }
}
