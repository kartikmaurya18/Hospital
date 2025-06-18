package com.hospital.service;

import com.hospital.entity.MenuItem;
import com.hospital.entity.*;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SidebarService {

    private final MenuItem[] allMenuItems;

    public SidebarService() {
        this.allMenuItems = initializeMenuItems();
    }

    public List<MenuItem> getMenuItemsForRole(UserRole role) {
        return Arrays.stream(allMenuItems)
                .filter(item -> isItemAllowedForRole(item, role))
                .collect(Collectors.toList());
    }

    private boolean isItemAllowedForRole(MenuItem item, UserRole role) {
        return Arrays.asList(item.getAllowedRoles()).contains(role);
    }

    private MenuItem[] initializeMenuItems() {
        return new MenuItem[] {
                // Dashboard - Available to all roles
                new MenuItem("Dashboard", "/dashboard", "dashboard",
                        UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),

                // Admin-only items
                new MenuItem("Patients", "/patients", "people", UserRole.ADMIN),
                new MenuItem("Doctors", "/doctors", "medical_services", UserRole.ADMIN),
                new MenuItem("Appointments", "/appointments", "event", UserRole.ADMIN),
                new MenuItem("Medical Records", "/medical-records", "folder", UserRole.ADMIN),
                new MenuItem("Prescriptions", "/prescriptions", "medication", UserRole.ADMIN),
                new MenuItem("Billing & Revenue", "/billing", "payments", UserRole.ADMIN),
                new MenuItem("Staff", "/staff", "groups", UserRole.ADMIN),
                new MenuItem("Inventory", "/inventory", "inventory_2", UserRole.ADMIN),
                new MenuItem("Chat Monitor", "/chat-monitor", "chat", UserRole.ADMIN),
                new MenuItem("Reports & Analytics", "/reports", "analytics", UserRole.ADMIN),
                new MenuItem("Notifications", "/notifications", "notifications", UserRole.ADMIN),
                new MenuItem("Settings", "/settings", "settings", UserRole.ADMIN),

                // Doctor items
                new MenuItem("All Patients", "/patients", "people", UserRole.DOCTOR),
                new MenuItem("My Appointments", "/my-appointments", "event", UserRole.DOCTOR),
                new MenuItem("Medical Records", "/medical-records", "folder", UserRole.DOCTOR),
                new MenuItem("Prescriptions", "/prescriptions", "medication", UserRole.DOCTOR),
                new MenuItem("Staff", "/staff", "groups", UserRole.DOCTOR),
                new MenuItem("Inventory", "/inventory", "inventory_2", UserRole.DOCTOR),
                new MenuItem("Chat", "/chat", "chat", UserRole.DOCTOR),
                new MenuItem("Notifications", "/notifications", "notifications", UserRole.DOCTOR),

                // Patient items
                new MenuItem("Book Appointment", "/book-appointment", "event_available", UserRole.PATIENT),
                new MenuItem("My Appointments", "/my-appointments", "event", UserRole.PATIENT),
                new MenuItem("My Medical Records", "/my-medical-records", "folder", UserRole.PATIENT),
                new MenuItem("My Prescriptions", "/my-prescriptions", "medication", UserRole.PATIENT),
                new MenuItem("My Billing", "/my-billing", "payments", UserRole.PATIENT),
                new MenuItem("Chat with Doctor", "/chat", "chat", UserRole.PATIENT),
                new MenuItem("Notifications", "/notifications", "notifications", UserRole.PATIENT),

                // Common items
                new MenuItem("Logout", "/logout", "logout",
                        UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT)
        };
    }
}