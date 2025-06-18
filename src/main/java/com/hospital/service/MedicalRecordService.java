package com.hospital.service;

import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.MedicalRecord;
import com.hospital.entity.Patient;
import com.hospital.enums.Role;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.MedicalRecordRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.context.UserContext;
import com.hospital.dto.MedicalRecordDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Create Medical Record
    public MedicalRecord createMedicalRecord(MedicalRecordDTO dto) throws Exception {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        // Only doctors and admin can create medical records
        if (userRole != Role.DOCTOR && userRole != Role.ADMIN) {
            throw new Exception("Only doctors and admin can create medical records");
        }

        // If doctor, they can only create records for their patients
        if (userRole == Role.DOCTOR) {
            Doctor doctor = doctorRepository.findById(userId)
                    .orElseThrow(() -> new Exception("Doctor not found"));

            // Verify the doctor is associated with the patient
            if (!doctor.getPatients().stream().anyMatch(p -> p.getId().equals(dto.getPatientId()))) {
                throw new Exception("Doctor is not authorized to create records for this patient");
            }
        }

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new Exception("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new Exception("Doctor not found"));

        Appointment appointment = dto.getAppointmentId() != null
                ? appointmentRepository.findById(dto.getAppointmentId()).orElse(null)
                : null;

        MedicalRecord medicalRecord = new MedicalRecord();
        medicalRecord.setPatient(patient);
        medicalRecord.setDoctor(doctor);
        medicalRecord.setAppointment(appointment);
        medicalRecord.setDiagnosis(dto.getDiagnosis());
        medicalRecord.setTreatment(dto.getTreatment());
        medicalRecord.setPrescription(dto.getPrescription());
        medicalRecord.setRecordDate(dto.getRecordDate());

        return medicalRecordRepository.save(medicalRecord);
    }

    // Get All Medical Records
    public List<MedicalRecord> getAllMedicalRecords() {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        if (userRole == Role.ADMIN) {
            // Admin can see all medical records
            return medicalRecordRepository.findAll();
        } else if (userRole == Role.DOCTOR) {
            // Doctor can see records they created
            return medicalRecordRepository.findByDoctorId(userId);
        } else if (userRole == Role.PATIENT) {
            // Patient can see their own records
            return medicalRecordRepository.findByPatientId(userId);
        }

        return List.of();
    }

    // Get Medical Record by ID
    public Optional<MedicalRecord> getMedicalRecordById(Long id) {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        Optional<MedicalRecord> record = medicalRecordRepository.findById(id);

        if (record.isEmpty()) {
            return Optional.empty();
        }

        MedicalRecord medicalRecord = record.get();

        // Check if user has permission to view this record
        if (userRole == Role.ADMIN) {
            return record;
        } else if (userRole == Role.DOCTOR && medicalRecord.getDoctor().getId().equals(userId)) {
            return record;
        } else if (userRole == Role.PATIENT && medicalRecord.getPatient().getId().equals(userId)) {
            return record;
        }

        return Optional.empty();
    }

    // Get Medical Records by Patient
    public List<MedicalRecord> getMedicalRecordsByPatient(Long patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }

    // Get Medical Records by Doctor
    public List<MedicalRecord> getMedicalRecordsByDoctor(Long doctorId) {
        return medicalRecordRepository.findByDoctorId(doctorId);
    }

    // Update Medical Record
    public MedicalRecord updateMedicalRecord(Long id, MedicalRecordDTO dto) throws Exception {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        MedicalRecord medicalRecord = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new Exception("Medical record not found"));

        // Check if user has permission to update this record
        if (userRole != Role.ADMIN &&
                (userRole != Role.DOCTOR || !medicalRecord.getDoctor().getId().equals(userId))) {
            throw new Exception("Not authorized to update this medical record");
        }

        // Update only the fields that should be updatable
        medicalRecord.setDiagnosis(dto.getDiagnosis());
        medicalRecord.setTreatment(dto.getTreatment());
        medicalRecord.setPrescription(dto.getPrescription());

        return medicalRecordRepository.save(medicalRecord);
    }

    // Delete Medical Record
    public void deleteMedicalRecord(Long id) throws Exception {
        Role userRole = UserContext.getCurrentUserRole();
        Long userId = UserContext.getCurrentUserId();

        MedicalRecord medicalRecord = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new Exception("Medical record not found"));

        // Only admin and the doctor who created the record can delete it
        if (userRole != Role.ADMIN &&
                (userRole != Role.DOCTOR || !medicalRecord.getDoctor().getId().equals(userId))) {
            throw new Exception("Not authorized to delete this medical record");
        }

        medicalRecordRepository.deleteById(id);
    }
}
