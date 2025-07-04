package com.elearning.elearning.repository;

import com.elearning.elearning.model.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<CourseModule,Long> {
    List<CourseModule> findByCourseId(Long courseId);
}
