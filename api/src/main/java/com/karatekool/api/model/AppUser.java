package com.karatekool.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "app_user")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Google's stable account id. The dev user's is "dev".
    @Column(name = "google_sub", unique = true, nullable = false)
    private String googleSub;

    @Column(nullable = false)
    private String email;

    private String name;

    // Preferences: the Group and view the calendar opens with
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private ClubGroup group;

    @Enumerated(EnumType.STRING)
    @Column(name = "calendar_view")
    private CalendarView calendarView;

    @Builder.Default
    @Column(nullable = false)
    private String avatar = "avatar.svg";

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
