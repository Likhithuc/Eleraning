package com.elearning.elearning.controller;

import com.elearning.elearning.model.Course;
import com.elearning.elearning.repository.CourseRepository;
import com.elearning.elearning.service.CourseService;
import org.apache.catalina.LifecycleState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private final CourseService courseService;
    public CourseController(CourseService courseService){
        this.courseService=courseService;
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course){
        return courseService.createCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id){
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    @GetMapping("instructor/{instructorId}")

    public List<Course> getByInstructor(@PathVariable Long instructorId){
        return courseService.getCourseByInstructorId(instructorId);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        Course course = courseService.updateCourse(id, updatedCourse);
        return ResponseEntity.ok(course);
    }


    @DeleteMapping("/{id}")

    public void deleteCourseById(@PathVariable Long id){
        courseService.deleteCourse(id);
    }

}
