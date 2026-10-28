package com.karatekool.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "club_group")
@Getter @Setter
@NoArgsConstructor
public class ClubGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String letter;
}
