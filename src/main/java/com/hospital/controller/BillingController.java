package com.hospital.controller;

import com.hospital.entity.Billing;
import com.hospital.service.BillingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    // ✅ Create a new billing record
    @PostMapping
    public ResponseEntity<?> createBilling(@RequestBody Billing billing) {
        try {
            Billing savedBilling = billingService.createBilling(billing);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedBilling);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating billing record: " + e.getMessage());
        }
    }

    // ✅ Get all billing records
    @GetMapping
    public ResponseEntity<List<Billing>> getAllBilling() {
        List<Billing> billingList = billingService.getAllBillingRecords();
        if (billingList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(billingList);
    }

    // ✅ Get a billing record by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBillingById(@PathVariable Long id) {
        Billing billing = billingService.getBillingById(id);
        return billing != null ? ResponseEntity.ok(billing)
                               : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Billing record not found");
    }

    // ✅ Delete a billing record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBilling(@PathVariable Long id) {
        boolean deleted = billingService.deleteBilling(id);
        if (deleted) {
            return ResponseEntity.ok("Billing record deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Billing record not found.");
        }
    }
}
