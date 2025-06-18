package com.hospital.controller;

import com.hospital.entity.MenuItem;
import com.hospital.entity.User;
import com.hospital.service.SidebarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sidebar")
@CrossOrigin(origins = "*")
public class SidebarController {

    private final SidebarService sidebarService;

    @Autowired
    public SidebarController(SidebarService sidebarService) {
        this.sidebarService = sidebarService;
    }

    @GetMapping("/menu-items")
    public ResponseEntity<List<MenuItem>> getMenuItems(@RequestParam User role) {
        List<MenuItem> menuItems = sidebarService.getMenuItemsForRole(user.getRole);
        return ResponseEntity.ok(menuItems);
    }
}