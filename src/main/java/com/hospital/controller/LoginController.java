package com.hospital.controller;

import com.hospital.entity.Admin;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.service.AdminService;
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
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        // Check in Admin table first
        Admin admin = adminService.findByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("token", "admin-token-" + admin.getId());
            response.put("user", admin);
            response.put("role", "ADMIN");
            return ResponseEntity.ok(response);
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

    @PostMapping("/register/patient")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        try {
            // Encode password before saving
            patient.setPassword(passwordEncoder.encode(patient.getPassword()));
            Patient savedPatient = patientService.addPatient(patient);
            return ResponseEntity.ok(savedPatient);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/register/doctor")
    public ResponseEntity<?> registerDoctor(@RequestBody Doctor doctor) {
        try {
            // Encode password before saving
            doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
            Doctor savedDoctor = doctorService.addDoctor(doctor);
            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            Admin savedAdmin = adminService.registerAdmin(admin);
            return ResponseEntity.ok(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid token"));
    }
}
