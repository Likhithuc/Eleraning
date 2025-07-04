package com.elearning.elearning.service;

import com.elearning.elearning.model.CourseModule;
import com.elearning.elearning.model.Video;
import com.elearning.elearning.repository.ModuleRepository;
import com.elearning.elearning.repository.VideoRepository;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    public Video createVideo(Video video){

        Long moduleId=video.getModule().getId();
       CourseModule vs=moduleRepository.findById(moduleId)
                .orElseThrow(()-> new RuntimeException("Error Ocurred that Module Id Doesnt Excist" +moduleId));
       video.setModule(vs);
       return videoRepository.save(video);
    }

    public List<Video> getAllVideos(){
        return videoRepository.findAll();
    }

    public Optional<Video> getVideoById(Long id){
        return videoRepository.findById(id);
    }

    public List<Video> getVideoByModuleId(Long module_id){
        return videoRepository.findByModule_Id(module_id);
    }

    public void deleteVideoById(Long id){
       videoRepository.deleteById(id);
    }




}
