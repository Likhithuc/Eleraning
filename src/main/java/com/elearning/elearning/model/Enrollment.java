package com.elearning.elearning.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Course course;

    @ManyToOne
    private User user;

    private Double progress;
}
