package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor ,Long> {
    
}
