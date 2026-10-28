package com.karatekool.api.dto;

import com.karatekool.api.model.AppUser;
import com.karatekool.api.model.CalendarView;

public record UserDto(
        Long id,
        String email,
        String name,
        boolean admin,
        GroupDto group,
        CalendarView calendarView,
        String avatar
) {
    public static UserDto from(AppUser user, boolean admin) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                admin,
                user.getGroup() == null ? null : new GroupDto(user.getGroup().getId(), user.getGroup().getLetter()),
                user.getCalendarView(),
                user.getAvatar()
        );
    }
}
