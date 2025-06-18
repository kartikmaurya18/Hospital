package com.hospital.service.impl;

import com.hospital.entity.InventoryItem;
import com.hospital.repository.InventoryRepository;
import com.hospital.service.InventoryService;
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
    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    @Override
    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    @Override
    public InventoryItem addItem(InventoryItem item) {
        return inventoryRepository.save(item);
    }

    @Override
    public InventoryItem updateItem(Long id, InventoryItem item) {
        if (inventoryRepository.existsById(id)) {
            item.setId(id);
            return inventoryRepository.save(item);
        }
        return null;
    }

    @Override
    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }

    @Override
    public List<InventoryItem> getLowStockItems() {
        return inventoryRepository.findByQuantityLessThanEqual(10); // Assuming 10 is the minimum threshold
    }

    @Override
    public List<InventoryItem> getItemsByCategory(String category) {
        return inventoryRepository.findByCategory(category);
    }

    @Override
    public List<InventoryItem> getItemsBySupplier(String supplier) {
        return inventoryRepository.findBySupplierName(supplier);
    }
}