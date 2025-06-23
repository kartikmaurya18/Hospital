-- Sample Doctors
INSERT INTO doctors (name, specialty, email, phone_number, password, role, is_available, is_active) VALUES
('Dr. Sarah Johnson', 'Cardiology', 'sarah.johnson2@hospital.com', '555-0101', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'DOCTOR', true, true),
('Dr. Michael Chen', 'Neurology', 'michael.chen@hospital.com', '555-0102', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'DOCTOR', true, true),
('Dr. Emily Brown', 'Pediatrics', 'emily.brown@hospital.com', '555-0103', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'DOCTOR', true, true),
('Dr. James Wilson', 'Orthopedics', 'james.wilson@hospital.com', '555-0104', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'DOCTOR', true, true);

-- Sample Patients
INSERT INTO patients (name, email, password, phone_number, date_of_birth, medical_history) VALUES
('John Smith', 'john.smith@email.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '555-0201', '1980-05-15', 'Hypertension, Type 2 Diabetes'),
('Maria Garcia', 'maria.garcia@email.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '555-0202', '1992-08-23', 'Asthma'),
('Robert Johnson', 'robert.johnson@email.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '555-0203', '1975-11-30', 'Arthritis'),
('Lisa Chen', 'lisa.chen@email.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', '555-0204', '1988-03-12', 'None');

-- Sample Admins
INSERT INTO admins (name, email, password, role) VALUES
('Admin User', 'admin@hospital.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ADMIN'),
('System Admin', 'system.admin@hospital.com', '$2a$10$xn3LI/AjqicFYZFruSwve.681477XaVNaUQbr1gioaWPn4t1KsnmG', 'ADMIN'); 