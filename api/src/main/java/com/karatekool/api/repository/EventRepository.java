package com.karatekool.api.repository;

import com.karatekool.api.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // A Multi-day event that started before the range but reaches into it counts too
    @Query("""
            select distinct e from Event e
            left join fetch e.groups
            left join fetch e.trailer
            left join fetch e.preset
            where e.startsAt < :to and coalesce(e.endsAt, e.startsAt) >= :from
            order by e.startsAt
            """)
    List<Event> findInRange(Instant from, Instant to);

    boolean existsByPresetId(Long presetId);
}
