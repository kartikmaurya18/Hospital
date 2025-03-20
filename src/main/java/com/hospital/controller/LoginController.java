package com.hospital.controller;

import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        // Check in Doctor table
        Doctor doctor = doctorService.findByUsername(username);
        if (doctor != null && doctor.getPassword().equals(password)) {
            return "Doctor login successful!";
        }

        // Check in Patient table
        Patient patient = patientService.findByUsername(username);
        if (patient != null && patient.getPassword().equals(password)) {
            return "Patient login successful!";
        }

        return "Invalid credentials!";
    }
}
