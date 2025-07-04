package com.elearning.elearning.controller;

import com.elearning.elearning.model.User;
import com.elearning.elearning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        if(userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body("Email Already Excist");
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String,String> loginData){
        String email=loginData.get("email");
        String password=loginData.get("password");
        Optional<User> user=userRepository.findByEmailAndPassword(email,password);
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credential");
        }
    }
}
