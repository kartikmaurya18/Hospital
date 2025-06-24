package com.hospital.repository;

import com.hospital.entity.Billing;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    List<Billing> findByPatient(Patient patient);

    List<Billing> findByDoctor(Doctor doctor);

    List<Billing> findByStatus(PaymentStatus status);

    List<Billing> findByBillingDateBetween(LocalDateTime start, LocalDateTime end);

    List<Billing> findByPatientAndBillingDateBetween(Patient patient, LocalDateTime start, LocalDateTime end);

    List<Billing> findByDoctorAndBillingDateBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);
}
