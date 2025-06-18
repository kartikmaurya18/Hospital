package com.hospital.service.impl;

import com.hospital.entity.InventoryItem;
import com.hospital.repository.InventoryRepository;
import com.hospital.service.InventoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    @Override
    public InventoryItem addItem(InventoryItem item) {
        if (item.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        if (item.getUnitPrice() <= 0) {
            throw new IllegalArgumentException("Unit price must be positive");
        }
        return inventoryRepository.save(item);
    }

    @Override
    public InventoryItem updateItem(Long id, InventoryItem item) {
        if (!inventoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Inventory item not found with id: " + id);
        }
        if (item.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        if (item.getUnitPrice() <= 0) {
            throw new IllegalArgumentException("Unit price must be positive");
        }
        item.setId(id);
        return inventoryRepository.save(item);
    }

    @Override
    public void deleteItem(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Inventory item not found with id: " + id);
        }
        inventoryRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryItem> getLowStockItems() {
        return inventoryRepository.findByQuantityLessThanEqual(10);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryItem> getItemsByCategory(String category) {
        return inventoryRepository.findByCategory(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InventoryItem> getItemsBySupplier(String supplier) {
        return inventoryRepository.findBySupplierName(supplier);
    }
}