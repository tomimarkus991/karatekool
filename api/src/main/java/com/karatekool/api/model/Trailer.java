package com.karatekool.api.model;

import jakarta.persistence.*;
import lombok.*;

/** A standard extra line of information an Admin can attach to a Training */
@Entity
@Table(name = "trailer")
@Getter @Setter
@NoArgsConstructor
public class Trailer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;
}
