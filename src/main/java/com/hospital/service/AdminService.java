package com.hospital.service;

import com.hospital.entity.Admin;
import com.hospital.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Admin registerAdmin(Admin admin) {
        // Check if admin with this email already exists
        if (adminRepository.findByEmail(admin.getEmail()) != null) {
            throw new RuntimeException("Admin with this email already exists");
        }

        // Encode password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}