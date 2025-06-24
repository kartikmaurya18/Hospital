package com.hospital.repository;

import com.hospital.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findByDepartment(String department);

    List<Staff> findByRole(String role);

    List<Staff> findByNameContainingIgnoreCase(String name);

    List<Staff> findByDepartmentAndRole(String department, String role);
}
