package com.elearning.elearning.model;

import jakarta.persistence.*;
import lombok.Data;



import jakarta.persistence.*;

@Entity
@Data
public class QuizSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private int score;

    @ManyToOne
    private Quiz quiz;

    // Getters and Setters
}