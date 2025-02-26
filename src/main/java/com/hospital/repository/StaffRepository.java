package com.hospital.repository;

import com.hospital.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    // Custom query methods (if needed) can be added here
}

