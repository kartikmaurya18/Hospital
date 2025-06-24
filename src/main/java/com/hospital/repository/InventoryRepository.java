package com.hospital.repository;

import com.hospital.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByQuantityLessThanEqual(Integer quantity);

    List<InventoryItem> findBySupplier(String supplier);

    List<InventoryItem> findByLastRestockedBefore(LocalDateTime date);

    List<InventoryItem> findByNameContainingIgnoreCase(String name);
}
