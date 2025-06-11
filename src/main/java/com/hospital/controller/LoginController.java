package com.hospital.controller;

import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        // Check in Doctor table
        Doctor doctor = doctorService.findByEmail(email);
        if (doctor != null && doctor.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "doctor-token-" + doctor.getId()); // In production, use proper JWT token
            response.put("user", doctor);
            return ResponseEntity.ok(response);
        }

        // Check in Patient table
        Patient patient = patientService.findByEmail(email);
        if (patient != null && patient.getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "patient-token-" + patient.getId()); // In production, use proper JWT token
            response.put("user", patient);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        // In production, implement proper token verification
        if (token != null && token.startsWith("Bearer ")) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }
}
