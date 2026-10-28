package com.karatekool.api.service;

import com.karatekool.api.dto.EventDto;
import com.karatekool.api.dto.GroupDto;
import com.karatekool.api.dto.PresetDto;
import com.karatekool.api.dto.TrailerDto;
import com.karatekool.api.model.ClubGroup;
import com.karatekool.api.model.Event;
import com.karatekool.api.repository.ClubGroupRepository;
import com.karatekool.api.repository.EventRepository;
import com.karatekool.api.repository.PresetRepository;
import com.karatekool.api.repository.TrailerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarService {

    private final EventRepository eventRepository;
    private final ClubGroupRepository groupRepository;
    private final TrailerRepository trailerRepository;
    private final PresetRepository presetRepository;

    public List<EventDto> getEvents(Instant from, Instant to) {
        return eventRepository.findInRange(from, to).stream().map(CalendarService::toDto).toList();
    }

    public List<GroupDto> getGroups() {
        return groupRepository.findAll(Sort.by("letter")).stream().map(CalendarService::toDto).toList();
    }

    public List<TrailerDto> getTrailers() {
        return trailerRepository.findAll(Sort.by("id")).stream()
                .map(trailer -> new TrailerDto(trailer.getId(), trailer.getText()))
                .toList();
    }

    public List<PresetDto> getPresets() {
        return presetRepository.findAll(Sort.by("title")).stream()
                .map(preset -> new PresetDto(preset.getId(), preset.getTitle()))
                .toList();
    }

    static EventDto toDto(Event event) {
        return new EventDto(
                event.getId(),
                event.getKind(),
                event.getStartsAt(),
                event.getEndsAt(),
                event.isHighlighted(),
                event.getDescription(),
                event.getTrailer() == null ? null : new TrailerDto(event.getTrailer().getId(), event.getTrailer().getText()),
                event.getTitle(),
                event.getSubtitle(),
                event.getPreset() == null ? null : new PresetDto(event.getPreset().getId(), event.getPreset().getTitle()),
                event.getGroups().stream()
                        .sorted(Comparator.comparing(ClubGroup::getLetter))
                        .map(CalendarService::toDto)
                        .toList()
        );
    }

    private static GroupDto toDto(ClubGroup group) {
        return new GroupDto(group.getId(), group.getLetter());
    }
}
