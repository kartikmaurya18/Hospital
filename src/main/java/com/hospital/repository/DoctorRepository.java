package com.hospital.repository;

import com.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialty(String specialty);

    List<Doctor> findByIsAvailable(boolean isAvailable);

    List<Doctor> findByIsActive(boolean isActive);

    Optional<Doctor> findByEmail(String email);
}
