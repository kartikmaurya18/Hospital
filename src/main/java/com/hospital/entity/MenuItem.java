package com.hospital.entity;

import jakarta.persistence.*;
import com.hospital.enums.UserRole;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String path;

    @Column(nullable = false)
    private String icon;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Transient
    private UserRole[] allowedRoles;

    public MenuItem() {
    }

    public MenuItem(String name, String path, String icon, UserRole... allowedRoles) {
        this.name = name;
        this.path = path;
        this.icon = icon;
        this.allowedRoles = allowedRoles;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public UserRole[] getAllowedRoles() {
        return allowedRoles;
    }

    public void setAllowedRoles(UserRole[] allowedRoles) {
        this.allowedRoles = allowedRoles;
    }
}