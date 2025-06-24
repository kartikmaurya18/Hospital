package com.hospital.repository;

import com.hospital.entity.Prescription;
import com.hospital.entity.Patient;
import com.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatient(Patient patient);

    List<Prescription> findByDoctor(Doctor doctor);

    List<Prescription> findByDateIssuedBetween(LocalDate startDate, LocalDate endDate);

    List<Prescription> findByPatientAndDateIssuedBetween(Patient patient, LocalDate startDate, LocalDate endDate);

    List<Prescription> findByDoctorAndDateIssuedBetween(Doctor doctor, LocalDate startDate, LocalDate endDate);
}
