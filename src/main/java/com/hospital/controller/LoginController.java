package com.hospital.controller;

import com.hospital.entity.User;
import com.hospital.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
public class LoginController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // For backward compatibility, check if password is plain text
            if (user.getPassword().equals(password) || passwordEncoder.matches(password, user.getPassword())) {
                if (!user.isActive()) {
                    return ResponseEntity.badRequest()
                            .body(Map.of("message", "Account is deactivated. Please contact administrator."));
                }

                // If password was plain text, update it to hashed version
                if (user.getPassword().equals(password)) {
                    user.setPassword(passwordEncoder.encode(password));
                    userService.updateUser(user);
                }

                Map<String, Object> response = new HashMap<>();
                response.put("userId", user.getId());
                response.put("email", user.getEmail());
                response.put("name", user.getName());
                response.put("role", user.getRole());
                response.put("active", user.isActive());

                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.badRequest()
                .body(Map.of("message", "Invalid email or password"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("password");

        if (email == null || newPassword == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(user);
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        }

        return ResponseEntity.badRequest()
                .body(Map.of("message", "User not found"));
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(@RequestParam String email) {
        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("user", Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "name", user.getName(),
                    "role", user.getRole(),
                    "active", user.isActive()));
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.ok(Map.of("authenticated", false));
    }
}
