package com.hospital.service;

import com.hospital.entity.Doctor;
import java.util.List;
import java.util.Optional;

public interface DoctorService {
    Doctor createDoctor(Doctor doctor);

    Doctor updateDoctor(Doctor doctor);

    void deleteDoctor(Long id);

    Optional<Doctor> getDoctorById(Long id);

    List<Doctor> getAllDoctors();

    List<Doctor> getDoctorsBySpecialty(String specialty);

    List<Doctor> getAvailableDoctors();

    List<Doctor> getActiveDoctors();

    boolean updateDoctorAvailability(Long id, boolean isAvailable);
}
