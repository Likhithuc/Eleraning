package com.elearning.elearning.controller;

import com.elearning.elearning.model.Quiz;
import com.elearning.elearning.model.QuizSubmission;
import com.elearning.elearning.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    @Autowired private QuizService quizService;


    @PostMapping("/create")
public Quiz createQuiz(@RequestBody Quiz quiz, @RequestParam Long courseId){
        return quizService.createQuiz(quiz, courseId);
}

@PostMapping("/submit")
public int submitQuiz(@RequestParam Long quizId, @RequestParam Long userId,
                      @RequestBody List<Integer> answers) {
    return quizService.submitQuiz(quizId, userId, answers);
}

@GetMapping("/course/{courseId}")
public List<Quiz> getQuizzesForCourse(@PathVariable Long courseId) {
    return quizService.getQuizzesForCourse(courseId);
}

@GetMapping("/submissions/quiz/{quizId}")
public List<QuizSubmission> getSubmissionsForQuiz(@PathVariable Long quizId) {
    return quizService.getSubmissionsForQuiz(quizId);
}

@GetMapping("/submissions/user/{userId}")
public List<QuizSubmission> getSubmissionsForUser(@PathVariable Long userId) {
    return quizService.getSubmissionsForUser(userId);
}
}
