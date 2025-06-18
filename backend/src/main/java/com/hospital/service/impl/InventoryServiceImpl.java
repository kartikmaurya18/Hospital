package com.hospital.service.impl;

import com.hospital.model.InventoryItem;
import com.hospital.repository.InventoryRepository;
import com.hospital.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    @Override
    public InventoryItem getItemById(Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    @Override
    public InventoryItem addItem(InventoryItem item) {
        updateItemStatus(item);
        return inventoryRepository.save(item);
    }

    @Override
    public InventoryItem updateItem(Long id, InventoryItem item) {
        InventoryItem existingItem = inventoryRepository.findById(id).orElse(null);
        if (existingItem != null) {
            existingItem.setName(item.getName());
            existingItem.setCategory(item.getCategory());
            existingItem.setQuantity(item.getQuantity());
            existingItem.setUnitPrice(item.getUnitPrice());
            existingItem.setDescription(item.getDescription());
            updateItemStatus(existingItem);
            return inventoryRepository.save(existingItem);
        }
        return null;
    }

    @Override
    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }

    private void updateItemStatus(InventoryItem item) {
        if (item.getQuantity() <= 0) {
            item.setStatus("OUT_OF_STOCK");
        } else if (item.getQuantity() < 10) {
            item.setStatus("LOW_STOCK");
        } else {
            item.setStatus("AVAILABLE");
        }
    }
}