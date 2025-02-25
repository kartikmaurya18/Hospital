package com.hospital.service;

import com.hospital.entity.Billing;
import com.hospital.repository.BillingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingService {

    private final BillingRepository billingRepository;

    public BillingService(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    public Billing createBilling(Billing billing) {
        return billingRepository.save(billing);
    }

    public List<Billing> getAllBillingRecords() {
        return billingRepository.findAll();
    }

    public Billing getBillingById(Long id) {
        return billingRepository.findById(id).orElse(null);
    }
}
