package com.karatekool.api.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/** A Training, All-day event or Multi-day event on the club's calendar */
@Entity
@Table(name = "event")
@Getter @Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventKind kind;

    @Column(name = "starts_at", nullable = false)
    private Instant startsAt;

    // Multi-day events only: their last day
    @Column(name = "ends_at")
    private Instant endsAt;

    @Column(nullable = false)
    private boolean highlighted;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trailer_id")
    private Trailer trailer;

    // All-day events only
    private String title;
    private String subtitle;

    // Multi-day events only
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "preset_id")
    private Preset preset;

    @ManyToMany
    @JoinTable(name = "event_group",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"))
    private Set<ClubGroup> groups = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
