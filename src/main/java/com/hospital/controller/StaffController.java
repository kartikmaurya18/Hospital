package com.hospital.controller;

import com.hospital.entity.Staff;
import com.hospital.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    // Add new staff member
    @PostMapping
    public Staff addStaff(@RequestBody Staff staff) {
        return staffService.addStaff(staff);
    }

    // Get all staff members
    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    // Get staff member by ID
    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    // Update staff member
    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id, @RequestBody Staff updatedStaff) {
        return staffService.updateStaff(id, updatedStaff);
    }

    // Delete staff member
    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable Long id) {
        boolean deleted = staffService.deleteStaff(id);
        return deleted ? "Staff member deleted successfully" : "Staff member not found";
    }
}
