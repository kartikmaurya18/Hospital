package com.hospital.controller;

import com.hospital.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        User user = userService.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return "Login successful!";
        } else {
            return "Invalid credentials!";
        }
    }
}
