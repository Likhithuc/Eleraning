package com.elearning.elearning.controller;

import com.elearning.elearning.model.CourseModule;
import com.elearning.elearning.model.Video;
import com.elearning.elearning.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "http://localhost:3000")

public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @PostMapping
    public CourseModule createModule(@RequestBody CourseModule module){

        return moduleService.createModule(module);
    }

    @GetMapping
    public List<CourseModule> getAllData(){

        return moduleService.getAllModules();
    }

    @GetMapping("/course/{id}")
    public List<CourseModule> getCourseById(@PathVariable Long id){

        return moduleService.getCourseById(id);
    }

    @GetMapping("/{id}")
    public Optional<CourseModule> getModuleById(@PathVariable Long id){

        return moduleService.getModuleById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteModuleById(@PathVariable Long id){
        moduleService.deleteByModuleId(id);
    }


}
