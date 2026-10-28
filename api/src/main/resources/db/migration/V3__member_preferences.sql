-- A Member's preferences: the Group and view the calendar opens with, and their avatar
alter table app_user
    add column group_id      bigint references club_group (id),
    add column calendar_view text check (calendar_view in ('MONTH', 'DAY')),
    add column avatar        text not null default 'avatar.svg';
