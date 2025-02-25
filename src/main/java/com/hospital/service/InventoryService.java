package com.hospital.service;

import com.hospital.entity.InventoryItem;
import com.hospital.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // Get all inventory items
    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    // Get a single inventory item by ID
    public InventoryItem getItemById(Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    // Add a new inventory item
    public InventoryItem addItem(InventoryItem item) {
        return inventoryRepository.save(item);
    }

    // Update an inventory item
    public InventoryItem updateItem(Long id, InventoryItem updatedItem) {
        Optional<InventoryItem> existingItem = inventoryRepository.findById(id);
        if (existingItem.isPresent()) {
            InventoryItem item = existingItem.get();
            item.setName(updatedItem.getName());
            item.setQuantity(updatedItem.getQuantity());
            item.setSupplier(updatedItem.getSupplier());
            return inventoryRepository.save(item);
        }
        return null;
    }

    // Delete an inventory item
    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }
}
