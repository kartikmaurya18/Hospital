package com.hospital.config;

import com.hospital.entity.Admin;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.service.AdminService;
import com.hospital.service.DoctorService;
import com.hospital.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

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

        // Create a sample doctor
        try {
            Doctor doctor = new Doctor();
            doctor.setName("Dr. John Smith");
            doctor.setEmail("doctor@hospital.com");
            doctor.setPassword("doctor123");
            doctor.setSpecialty("General Medicine");
            doctor.setPhoneNumber("1234567890");
            doctorService.addDoctor(doctor);
            System.out.println("Sample doctor created successfully");
        } catch (Exception e) {
            System.out.println("Sample doctor already exists or could not be created: " + e.getMessage());
        }

        // Create a sample patient
        try {
            Patient patient = new Patient();
            patient.setName("Kartik");
            patient.setEmail("kartikjavaaaaa@gmail.com");
            patient.setPassword("patient123");
            patient.setPhoneNumber("9876543210");
            patientService.addPatient(patient);
            System.out.println("Sample patient created successfully");
        } catch (Exception e) {
            System.out.println("Sample patient already exists or could not be created: " + e.getMessage());
        }
    }
}