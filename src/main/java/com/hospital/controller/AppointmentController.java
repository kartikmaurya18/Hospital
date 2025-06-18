package com.hospital.controller;

import com.hospital.entity.Appointment;
import com.hospital.service.AppointmentService;

import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // 1️⃣ Create Appointment
    @PostMapping("/{doctorId}/{patientId}")

    public ResponseEntity<?> createAppointment(
            @PathVariable Long doctorId,
            @PathVariable Long patientId,
            @RequestBody Appointment appointment) {

        try {
            Appointment savedAppointment = appointmentService.createAppointment(doctorId, patientId, appointment);
            return ResponseEntity.ok(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating appointment: " + e.getMessage());
        }
    }

    // 2️⃣ Get All Appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            List<Appointment> appointments = appointmentService.getAllAppointments();
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 3️⃣ Get Appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id) {
        try {
            Optional<Appointment> appointment = appointmentService.getAppointmentById(id);

            if (appointment.isPresent()) {
                return ResponseEntity.ok(appointment.get());
            } else {
                return ResponseEntity.status(404).body("Appointment not found with ID: " + id);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving appointment: " + e.getMessage());
        }
    }

    // 4️⃣ Delete Appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok("Appointment deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting appointment: " + e.getMessage());
        }
    }
}
