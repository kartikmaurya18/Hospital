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

    List<Billing> findByPaymentStatus(PaymentStatus status);

    List<Billing> findByPaymentDateBetween(LocalDateTime start, LocalDateTime end);

    List<Billing> findByPatientAndPaymentDateBetween(Patient patient, LocalDateTime start, LocalDateTime end);

    List<Billing> findByDoctorAndPaymentDateBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);
}
