package com.karatekool.api.service;

import com.karatekool.api.dto.EventDto;
import com.karatekool.api.dto.NewAllDayEventDto;
import com.karatekool.api.dto.NewMultiDayEventDto;
import com.karatekool.api.dto.NewPresetDto;
import com.karatekool.api.dto.NewTrainingDto;
import com.karatekool.api.dto.PresetDto;
import com.karatekool.api.dto.TrainingChangeDto;
import com.karatekool.api.model.ClubGroup;
import com.karatekool.api.model.Event;
import com.karatekool.api.model.EventKind;
import com.karatekool.api.model.Preset;
import com.karatekool.api.model.Trailer;
import com.karatekool.api.repository.ClubGroupRepository;
import com.karatekool.api.repository.EventRepository;
import com.karatekool.api.repository.PresetRepository;
import com.karatekool.api.repository.TrailerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/** Changes to the calendar. Only Admins get here (see SecurityConfig). */
@Service
@RequiredArgsConstructor
@Transactional
public class CalendarAdminService {

    private final EventRepository eventRepository;
    private final ClubGroupRepository groupRepository;
    private final TrailerRepository trailerRepository;
    private final PresetRepository presetRepository;

    public List<EventDto> createTrainings(NewTrainingDto request) {
        Set<ClubGroup> groups = groups(request.groupIds());
        String title = blankToNull(request.title());
        requireGroupsOrName(groups, title);
        Trailer trailer = trailer(request.trailerId());

        return request.starts().stream().map(start -> {
            Event training = new Event();
            training.setKind(EventKind.TRAINING);
            applyTraining(training, start, groups, Boolean.TRUE.equals(request.highlighted()), request.description(), trailer, title);
            return CalendarService.toDto(eventRepository.save(training));
        }).toList();
    }

    public EventDto changeTraining(Long id, TrainingChangeDto request) {
        Event training = eventRepository.findById(id)
                .filter(event -> event.getKind() == EventKind.TRAINING)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Training not found"));
        Set<ClubGroup> groups = groups(request.groupIds());
        String title = blankToNull(request.title());
        requireGroupsOrName(groups, title);

        applyTraining(training, request.start(), groups, Boolean.TRUE.equals(request.highlighted()), request.description(), trailer(request.trailerId()), title);
        return CalendarService.toDto(eventRepository.save(training));
    }

    public EventDto createAllDayEvent(NewAllDayEventDto request) {
        Event event = new Event();
        event.setKind(EventKind.ALL_DAY);
        event.setStartsAt(request.start().toInstant());
        event.setTitle(request.title());
        event.setSubtitle(request.subtitle());
        return CalendarService.toDto(eventRepository.save(event));
    }

    public EventDto createMultiDayEvent(NewMultiDayEventDto request) {
        if (request.end().isBefore(request.start())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A Multi-day event cannot end before it starts");
        }
        Preset preset = presetRepository.findById(request.presetId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown Preset"));

        Event event = new Event();
        event.setKind(EventKind.MULTI_DAY);
        event.setStartsAt(request.start().toInstant());
        event.setEndsAt(request.end().toInstant());
        event.setPreset(preset);
        return CalendarService.toDto(eventRepository.save(event));
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        eventRepository.delete(event);
    }

    public PresetDto createPreset(NewPresetDto request) {
        Preset preset = new Preset();
        preset.setTitle(request.title().trim());
        preset = presetRepository.save(preset);
        return new PresetDto(preset.getId(), preset.getTitle());
    }

    public void deletePreset(Long id) {
        Preset preset = presetRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Preset not found"));
        if (eventRepository.existsByPresetId(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The Preset is used by a Multi-day event");
        }
        presetRepository.delete(preset);
    }

    private void applyTraining(Event training, OffsetDateTime start, Set<ClubGroup> groups, boolean highlighted,
                               String description, Trailer trailer, String title) {
        training.setStartsAt(start.toInstant());
        training.setGroups(new HashSet<>(groups));
        training.setHighlighted(highlighted);
        training.setDescription(blankToNull(description));
        training.setTrailer(trailer);
        training.setTitle(title);
    }

    private Set<ClubGroup> groups(List<Long> ids) {
        if (ids == null || ids.isEmpty()) return Set.of();
        List<ClubGroup> groups = groupRepository.findAllById(ids);
        if (groups.size() != new HashSet<>(ids).size()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown Group");
        }
        return new HashSet<>(groups);
    }

    private Trailer trailer(Long id) {
        if (id == null) return null;
        return trailerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown trailer"));
    }

    private static void requireGroupsOrName(Set<ClubGroup> groups, String title) {
        if (groups.isEmpty() && title == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A Training needs Groups or a name");
        }
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
