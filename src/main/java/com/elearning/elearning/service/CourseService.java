package com.elearning.elearning.service;


import com.elearning.elearning.model.Course;
import com.elearning.elearning.model.CourseModule;
import com.elearning.elearning.model.User;
import com.elearning.elearning.repository.CourseRepository;
import com.elearning.elearning.repository.UserRepository;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository){
        this.courseRepository=courseRepository;
    }
    @Autowired
    private UserRepository userRepository;


    public Course createCourse(Course course){
        for (CourseModule module : course.getCourseModuleList()) {
            module.setCourse(course); // this is the fix
        }
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());

        if (updatedCourse.getInstructor() != null) {
            existingCourse.setInstructor(updatedCourse.getInstructor());
        }

        // Clear old modules if needed
        if (updatedCourse.getCourseModuleList() != null) {
            for (CourseModule mod : updatedCourse.getCourseModuleList()) {
                mod.setCourse(existingCourse);
            }
            existingCourse.setCourseModuleList(updatedCourse.getCourseModuleList());
        }

        return courseRepository.save(existingCourse);
    }


    public List<Course> getCourseByInstructorId(Long instructorid){
        return courseRepository.findByInstructorId(instructorid);
    }

    public void deleteCourse(Long id){
        courseRepository.deleteById(id);
    }

}
