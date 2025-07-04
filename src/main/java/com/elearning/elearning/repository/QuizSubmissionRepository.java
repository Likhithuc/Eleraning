package com.elearning.elearning.repository;

import com.elearning.elearning.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
    List<QuizSubmission> findByQuizId(Long quizId);
    List<QuizSubmission> findByUserId(Long userId);
}
