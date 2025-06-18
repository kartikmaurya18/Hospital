package com.hospital.repository;

import com.hospital.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    List<Staff> findByDepartment(String department);

    List<Staff> findByJobTitle(String jobTitle);

    List<Staff> findByIsActive(boolean isActive);

    Staff findByEmployeeId(String employeeId);
}
