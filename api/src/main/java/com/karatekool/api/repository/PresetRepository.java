package com.karatekool.api.repository;

import com.karatekool.api.model.Preset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PresetRepository extends JpaRepository<Preset, Long> {
}
