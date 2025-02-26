package com.hospital.service;

import com.hospital.entity.Staff;
import com.hospital.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    // Add a new staff member
    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    // Get all staff members
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    // Get staff member by ID
    public Staff getStaffById(Long id) {
        Optional<Staff> staff = staffRepository.findById(id);
        return staff.orElse(null);
    }

    // Update staff member
    public Staff updateStaff(Long id, Staff updatedStaff) {
        if (staffRepository.existsById(id)) {
            updatedStaff.setId(id);
            return staffRepository.save(updatedStaff);
        }
        return null;
    }

    // Delete staff member
    public boolean deleteStaff(Long id) {
        if (staffRepository.existsById(id)) {
            staffRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
