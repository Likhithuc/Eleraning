package com.elearning.elearning.service;


import com.elearning.elearning.model.Course;
import com.elearning.elearning.model.Enrollment;
import com.elearning.elearning.model.User;
import com.elearning.elearning.repository.CourseRepository;
import com.elearning.elearning.repository.EnrollmentRepository;
import com.elearning.elearning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enrollUser(Long userId,Long courseId){
        User user=userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("The User Regarding To this Id Is Not Found"));
        Course course=courseRepository.findById(courseId)
                .orElseThrow(()->new RuntimeException("Ivalid Course ID"));

        return enrollmentRepository.findByUserAndCourse(user,course)
                .orElseGet(()->{
                    Enrollment enrollment=new Enrollment();
                    enrollment.setCourse(course);
                    enrollment.setUser(user);
                    enrollment.setProgress(0.0);
                    return enrollmentRepository.save(enrollment);


                });


    }


    public List<Enrollment> getEnrollmentByUser(Long userId){
        User user=userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("UserId not found"));
        return enrollmentRepository.findByUser(user);
    }

    public Enrollment updateProgress(Long enrollmentId,double progerss_bar){
        Enrollment enrollment=enrollmentRepository.findById(enrollmentId)
                .orElseThrow(()->new RuntimeException("EnrollmentId not found"));
        enrollment.setProgress(progerss_bar);
        return enrollmentRepository.save(enrollment);
    }


}
