package com.elearning.elearning.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ElementCollection
    private List<String> options;

    private int correctAnswerIndex;

    @ManyToOne
    @JsonIgnore
    private Quiz quiz;

    // Getters and Setters
}