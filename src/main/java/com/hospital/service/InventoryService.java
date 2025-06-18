package com.hospital.service;

import com.hospital.entity.InventoryItem;
import java.util.List;
import java.util.Optional;

public interface InventoryService {
    List<InventoryItem> getAllItems();

    Optional<InventoryItem> getItemById(Long id);

    InventoryItem addItem(InventoryItem item);

    InventoryItem updateItem(Long id, InventoryItem item);

    void deleteItem(Long id);
}