package com.elearning.elearning.controller;


import com.elearning.elearning.model.Video;
import com.elearning.elearning.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/videos")
@CrossOrigin(origins = "http://localhost:3000")

public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping
    public Video createVideo(@RequestBody Video video){

        return videoService.createVideo(video);
    }


    @GetMapping
    public List<Video> getAllVideos(){
        return videoService.getAllVideos();
    }

    @GetMapping("/module/{id}")
    public List<Video> getVideoByModuleId(@PathVariable Long id){
        return videoService.getVideoByModuleId(id);
    }

    @GetMapping("/{id}")
    public Optional<Video> getVideoById(@PathVariable Long id){
        return videoService.getVideoById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        videoService.deleteVideoById(id);
    }



}
