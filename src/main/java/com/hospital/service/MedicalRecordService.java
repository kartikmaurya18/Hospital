package com.hospital.service;

import com.hospital.dto.MedicalRecordDTO;
import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.MedicalRecord;
import com.hospital.entity.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.MedicalRecordRepository;
import com.hospital.repository.PatientRepository;
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
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new Exception("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new Exception("Doctor not found"));

        Appointment appointment = dto.getAppointmentId() != null ?
                appointmentRepository.findById(dto.getAppointmentId()).orElse(null) : null;

        MedicalRecord medicalRecord = new MedicalRecord(patient, doctor, appointment, dto.getDiagnosis(),
                dto.getTreatment(), dto.getPrescription(), dto.getRecordDate());

        return medicalRecordRepository.save(medicalRecord);
    }

    // Get All Medical Records
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }

    // Get Medical Record by ID
    public Optional<MedicalRecord> getMedicalRecordById(Long id) {
        return medicalRecordRepository.findById(id);
    }

    // Delete Medical Record
    public void deleteMedicalRecord(Long id) {
        medicalRecordRepository.deleteById(id);
    }
}
