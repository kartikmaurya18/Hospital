package com.hospital.repository;

import com.hospital.entity.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByCategory(String category);

    List<InventoryItem> findByQuantityLessThanEqual(Integer minimumQuantity);

    List<InventoryItem> findByExpiryDateBefore(LocalDateTime date);

    List<InventoryItem> findBySupplierName(String supplierName);
}
