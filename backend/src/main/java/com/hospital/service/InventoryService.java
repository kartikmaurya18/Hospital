package com.hospital.service;

import com.hospital.model.InventoryItem;
import java.util.List;

public interface InventoryService {
    List<InventoryItem> getAllItems();

    InventoryItem getItemById(Long id);

    InventoryItem addItem(InventoryItem item);

    InventoryItem updateItem(Long id, InventoryItem item);

    void deleteItem(Long id);
}