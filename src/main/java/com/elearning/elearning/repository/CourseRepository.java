package com.elearning.elearning.repository;

import com.elearning.elearning.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
    List<Course> findByInstructorId(Long instructor_id);
}
