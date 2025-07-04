package com.elearning.elearning.controller;


import com.elearning.elearning.model.User;
import com.elearning.elearning.repository.UserRepository;
import com.elearning.elearning.service.UserService;
import org.aspectj.apache.bcel.classfile.Module;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {

    @Autowired
   private final UserService userService;

public UserController(UserService userService) {
    this.userService = userService;
}

@PostMapping("/register")
    public User register(@RequestBody User user){
      return userService.registerUser(user);
}

@GetMapping
    public List<User> getAllusers(){
    return userService.getAllUsers();
}

@GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id){
    return userService.getUserById(id);
}

@GetMapping("/email/{email}")
    public Optional<User> getUserByEmail(@PathVariable String email){
    return userService.getUserByEmail(email);
}

@DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
    userService.deleteUser(id);
}










}