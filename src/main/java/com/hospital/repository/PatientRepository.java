package com.hospital.repository;

import com.hospital.entity.Patient;
import com.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByAssignedDoctor(Doctor doctor);

    List<Patient> findByIsActive(boolean isActive);

    Optional<Patient> findByEmail(String email);
}
