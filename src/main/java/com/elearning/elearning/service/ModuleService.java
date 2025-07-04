package com.elearning.elearning.service;

import com.elearning.elearning.model.Course;
import com.elearning.elearning.model.CourseModule;
import com.elearning.elearning.repository.CourseRepository;
import com.elearning.elearning.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;
    public ModuleService(ModuleRepository moduleRepository){
        this.moduleRepository=moduleRepository;
    }

    @Autowired
    private CourseRepository courseRepository;

    public CourseModule createModule(CourseModule module){


        if (module.getCourse() == null || module.getCourse().getId() == null) {
            throw new IllegalArgumentException("Course ID is missing");
        }

        Long courseId = module.getCourse().getId();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        module.setCourse(course);
        return moduleRepository.save(module);
    }

    public List<CourseModule> getAllModules(){
        return moduleRepository.findAll();
    }

    public List<CourseModule> getCourseById(Long courseId){
        return moduleRepository.findByCourseId(courseId);
    }

    public Optional<CourseModule> getModuleById(Long id){
        return moduleRepository.findById(id);
    }

    public void deleteByModuleId(Long id){
        moduleRepository.deleteById(id);
    }

}
