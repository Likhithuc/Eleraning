package com.elearning.elearning.service;

import com.elearning.elearning.model.*;
import com.elearning.elearning.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired private QuizRepository quizRepo;
    @Autowired private QuestionRepository questionRepo;
    @Autowired private QuizSubmissionRepository submissionRepo;
    @Autowired private CourseRepository courseRepo;

    public Quiz createQuiz(Quiz quiz, Long courseId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        quiz.setCourse(course);
        quiz.getQuestions().forEach(q -> q.setQuiz(quiz));
        return quizRepo.save(quiz);
    }

    public int submitQuiz(Long quizId, Long userId, List<Integer> submittedAnswers) {
        Quiz quiz = quizRepo.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
   System.out.println(quiz.getId());
        int score = 0;
        List<Question> questions = quiz.getQuestions();
        for (int i = 0; i < questions.size(); i++) {
            if (i < submittedAnswers.size() &&
                    submittedAnswers.get(i) == questions.get(i).getCorrectAnswerIndex()) {
                score++;
            }
        }

        QuizSubmission submission = new QuizSubmission();
        submission.setQuiz(quiz);
        submission.setUserId(userId);
        submission.setScore(score);

        submissionRepo.save(submission);
        return score;
    }

    public List<Quiz> getQuizzesForCourse(Long courseId) {
        return quizRepo.findByCourseId(courseId);
    }

    public List<QuizSubmission> getSubmissionsForQuiz(Long quizId) {
        return submissionRepo.findByQuizId(quizId);
    }

    public List<QuizSubmission> getSubmissionsForUser(Long userId) {
        return submissionRepo.findByUserId(userId);
    }
}
