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

   @PostMapping
public ResponseEntity<Billing> createBilling(@RequestBody Billing billing) {
    Billing savedBilling = billingService.createBilling(billing);
    return new ResponseEntity<>(savedBilling, HttpStatus.CREATED);
}


    @GetMapping
    public ResponseEntity<List<Billing>> getAllBilling() {
        return ResponseEntity.ok(billingService.getAllBillingRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillingById(@PathVariable Long id) {
        Billing billing = billingService.getBillingById(id);
        return billing != null ? ResponseEntity.ok(billing) : ResponseEntity.notFound().build();
    }
}
