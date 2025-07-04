package com.elearning.elearning.repository;

import com.elearning.elearning.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByModule_Id(Long moduleId);
}
