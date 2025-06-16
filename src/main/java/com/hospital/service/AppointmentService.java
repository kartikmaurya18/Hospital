package com.hospital.service;

import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.enums.Role;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.context.UserContext;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AppointmentService(AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    public List<Appointment> getAllAppointments() {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        if (userRole == Role.ADMIN) {
            // Admin can see all appointments
            return appointmentRepository.findAll();
        } else if (userRole == Role.DOCTOR) {
            // Doctor can see their own appointments
            return appointmentRepository.findByDoctorId(userId);
        } else if (userRole == Role.PATIENT) {
            // Patient can see their own appointments
            return appointmentRepository.findByPatientId(userId);
        }

        return List.of(); // Return empty list for unknown roles
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        Optional<Appointment> appointment = appointmentRepository.findById(id);

        if (appointment.isEmpty()) {
            return Optional.empty();
        }

        Appointment app = appointment.get();

        // Check if user has permission to view this appointment
        if (userRole == Role.ADMIN) {
            return appointment;
        } else if (userRole == Role.DOCTOR && app.getDoctor().getId().equals(userId)) {
            return appointment;
        } else if (userRole == Role.PATIENT && app.getPatient().getId().equals(userId)) {
            return appointment;
        }

        return Optional.empty();
    }

    public Appointment createAppointment(Long doctorId, Long patientId, Appointment appointment) {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        // Only admin can create appointments for any doctor/patient
        // Doctors can only create appointments for themselves
        // Patients can only create appointments for themselves
        if (userRole == Role.ADMIN ||
                (userRole == Role.DOCTOR && doctorId.equals(userId)) ||
                (userRole == Role.PATIENT && patientId.equals(userId))) {

            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            appointment.setDoctor(doctor);
            appointment.setPatient(patient);

            return appointmentRepository.save(appointment);
        }

        throw new RuntimeException("Unauthorized to create this appointment");
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
