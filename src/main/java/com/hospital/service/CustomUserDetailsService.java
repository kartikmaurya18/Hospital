package com.hospital.service;

import com.hospital.entity.Admin;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.repository.AdminRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CustomUserDetailsService(
            AdminRepository adminRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try to find user in each repository
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            String password = admin.getPassword();
            // If password is not BCrypt hashed, encode it
            if (!password.startsWith("$2a$")) {
                password = passwordEncoder.encode(password);
                admin.setPassword(password);
                adminRepository.save(admin);
            }
            return new User(
                    admin.getEmail(),
                    password,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
        }

        Optional<Doctor> doctorOpt = doctorRepository.findByEmail(email);
        if (doctorOpt.isPresent()) {
            Doctor doctor = doctorOpt.get();
            String password = doctor.getPassword();
            // If password is not BCrypt hashed, encode it
            if (!password.startsWith("$2a$")) {
                password = passwordEncoder.encode(password);
                doctor.setPassword(password);
                doctorRepository.save(doctor);
            }
            return new User(
                    doctor.getEmail(),
                    password,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_DOCTOR")));
        }

        Optional<Patient> patientOpt = patientRepository.findByEmail(email);
        if (patientOpt.isPresent()) {
            Patient patient = patientOpt.get();
            String password = patient.getPassword();
            // If password is not BCrypt hashed, encode it
            if (!password.startsWith("$2a$")) {
                password = passwordEncoder.encode(password);
                patient.setPassword(password);
                patientRepository.save(patient);
            }
            return new User(
                    patient.getEmail(),
                    password,
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_PATIENT")));
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}