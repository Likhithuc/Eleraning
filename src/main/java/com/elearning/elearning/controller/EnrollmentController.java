package com.elearning.elearning.controller;


import com.elearning.elearning.model.Enrollment;
import com.elearning.elearning.repository.EnrollmentRepository;
import com.elearning.elearning.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @PostMapping("/enrolls")
    public Enrollment enroll(@RequestParam Long courseId,@RequestParam Long userId){
        return enrollmentService.enrollUser(userId,courseId);
    }
    @GetMapping("/count/course/{courseId}")
    public Long countEnrollmentsByCourse(@PathVariable Long courseId) {
        return enrollmentRepository.countByCourseId(courseId);
    }

    @GetMapping("/user/{userId}")
    public List<Enrollment> getEnrollmentBuUserId(@PathVariable Long userId){
        return enrollmentService.getEnrollmentByUser(userId);
    }

    @PutMapping("/{id}/progress")
    public Enrollment updateProgress(@PathVariable Long id,@RequestParam double progress){
        return enrollmentService.updateProgress(id,progress);
    }



}
