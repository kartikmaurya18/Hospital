package com.hospital.config;

import com.hospital.entity.Admin;
import com.hospital.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminService adminService;

    @Override
    public void run(String... args) throws Exception {
        // Create initial admin user if not exists
        try {
            Admin admin = new Admin();
            admin.setName("System Admin");
            admin.setEmail("badalaalu@gmail.com");
            admin.setPassword("admin123"); // This will be encoded by the service
            adminService.registerAdmin(admin);
            System.out.println("Initial admin user created successfully");
        } catch (Exception e) {
            System.out.println("Initial admin user already exists or could not be created: " + e.getMessage());
        }
    }
}