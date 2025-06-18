package com.hospital.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "doctors")
public class Doctor extends User {

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @ManyToMany
    @JoinTable(name = "doctor_patient", joinColumns = @JoinColumn(name = "doctor_id"), inverseJoinColumns = @JoinColumn(name = "patient_id"))
    private Set<Patient> patients;

    @OneToMany(mappedBy = "doctor")
    private Set<Appointment> appointments;

    @OneToMany(mappedBy = "doctor")
    private Set<MedicalRecord> medicalRecords;
}