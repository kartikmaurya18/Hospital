package com.hospital.controller;

import com.hospital.model.MedicalRecord;
import com.hospital.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllMedicalRecords() {
        try {
            List<MedicalRecord> records = medicalRecordService.getAllMedicalRecords();
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getMedicalRecordById(@PathVariable Long id) {
        try {
            return medicalRecordService.getMedicalRecordById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>> getMedicalRecordsByPatient(@PathVariable Long patientId) {
        try {
            List<MedicalRecord> records = medicalRecordService.getMedicalRecordsByPatient(patientId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalRecord>> getMedicalRecordsByDoctor(@PathVariable Long doctorId) {
        try {
            List<MedicalRecord> records = medicalRecordService.getMedicalRecordsByDoctor(doctorId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> createMedicalRecord(
            @RequestParam Long patientId,
            @RequestParam Long doctorId,
            @RequestParam(required = false) Long appointmentId,
            @RequestBody MedicalRecord medicalRecord) {
        try {
            MedicalRecord newRecord = medicalRecordService.createMedicalRecord(
                    patientId, doctorId, appointmentId, medicalRecord);
            return ResponseEntity.ok(newRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord medicalRecordDetails) {
        try {
            MedicalRecord updatedRecord = medicalRecordService.updateMedicalRecord(id, medicalRecordDetails);
            return ResponseEntity.ok(updatedRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable Long id) {
        try {
            medicalRecordService.deleteMedicalRecord(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}