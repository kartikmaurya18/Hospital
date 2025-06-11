package com.hospital.controller;

import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        // Check in Doctor table
        Doctor doctor = doctorService.findByEmail(email);
        if (doctor != null && passwordEncoder.matches(password, doctor.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "doctor-token-" + doctor.getId());
            response.put("user", doctor);
            response.put("role", "DOCTOR");
            return ResponseEntity.ok(response);
        }

        // Check in Patient table
        Patient patient = patientService.findByEmail(email);
        if (patient != null && passwordEncoder.matches(password, patient.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "patient-token-" + patient.getId());
            response.put("user", patient);
            response.put("role", "PATIENT");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid token"));
    }
}
