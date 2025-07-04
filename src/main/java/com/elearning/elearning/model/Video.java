package com.elearning.elearning.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;

    @ManyToOne

    @JoinColumn(name="module_id")
    @JsonBackReference
    private CourseModule module;


}
