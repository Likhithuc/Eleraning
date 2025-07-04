package com.elearning.elearning.repository;

import com.elearning.elearning.model.Course;
import com.elearning.elearning.model.Enrollment;
import com.elearning.elearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {

    Optional<Enrollment> findByUserAndCourse(User user, Course course);
    List<Enrollment> findByUser(User user);
    Long countByCourseId(@Param("courseId") Long courseId);
}
