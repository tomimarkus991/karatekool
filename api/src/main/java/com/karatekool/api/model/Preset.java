package com.karatekool.api.model;

import jakarta.persistence.*;
import lombok.*;

/** A saved Multi-day event title */
@Entity
@Table(name = "preset")
@Getter @Setter
@NoArgsConstructor
public class Preset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
}
