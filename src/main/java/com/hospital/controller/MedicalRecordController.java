package com.hospital.controller;

import com.hospital.dto.MedicalRecordDTO;
import com.hospital.entity.MedicalRecord;
import com.hospital.service.MedicalRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public ResponseEntity<?> createMedicalRecord(@RequestBody MedicalRecordDTO dto) {
        try {
            MedicalRecord record = medicalRecordService.createMedicalRecord(dto);
            return ResponseEntity.ok(record);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordService.getAllMedicalRecords();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMedicalRecordById(@PathVariable Long id) {
        try {
            MedicalRecord record = medicalRecordService.getMedicalRecordById(id)
                    .orElseThrow(() -> new RuntimeException("Medical Record not found"));
            return ResponseEntity.ok(record);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    

    @DeleteMapping("/{id}")
    public String deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return "Medical record deleted successfully!";
    }
}
