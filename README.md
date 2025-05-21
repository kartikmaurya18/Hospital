# 🏥 Hospital Management System (Spring Boot Backend)

This project is a complete Hospital Management System backend developed in **Spring Boot**. It supports multiple user roles including **Admin**, **Doctor**, and **Patient**. The system enables management of appointments, prescriptions, billing, inventory, medical records, and integrates with **OpenAI** to provide an AI-powered hospital assistant chatbot.

---

## ✨ Features Overview

### 🔐 Authentication and Authorization

* Role-based access control for **Admin**, **Doctor**, and **Patient**
* Secure login/logout
* JWT (JSON Web Tokens) support for stateless authentication (planned)

### 📅 Appointment Management

* Book, update, and cancel appointments
* Appointment scheduling by doctors and patients
* Availability tracking

### 📈 Patient and Doctor Management

* CRUD operations for both patients and doctors
* Profile management
* Relationship linking with user credentials

### 🎒 Prescription & Medical Records

* Manage medical prescriptions
* View and update patient history
* Store digital medical reports

### 🏪 Inventory Management

* Medicine and equipment stock
* Notifications for low stock

### 💸 Billing System

* Generate invoices for patient services
* Track payment status
* Calculate costs for treatments, prescriptions, etc.

### 🤖 AI-Powered Hospital Assistant

* Integrated with OpenAI GPT-3.5 Turbo
* Accepts natural language queries from users
* Provides general medical advice, hospital-related FAQs, etc.

### 🛌 Staff Management

* Add/edit/delete staff members
* Role and department assignment

---

## 🚀 Technology Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Language   | Java 17                     |
| Framework  | Spring Boot                 |
| ORM        | Spring Data JPA (Hibernate) |
| Database   | MySQL / H2 (Dev)            |
| Security   | Spring Security, JWT        |
| AI         | OpenAI GPT-3.5 API          |
| Build Tool | Maven                       |
| API Client | WebClient (Spring Reactive) |

---

## 📊 Project Structure

```
src/main/java/com/hospital/
├── config/              # Security and configuration files
├── controller/          # API controllers
├── dto/                 # Data Transfer Objects (requests/responses)
├── entity/              # JPA entities (tables)
├── repository/          # Data access layer
├── service/             # Business logic
├── util/                # Utility classes
└── HospitalApplication.java

src/main/resources/
├── application.properties
└── static/              # Static resources (if any)
```

---

## 🔍 API Endpoints (Sample)

| Module      | Endpoint               | Method   | Description                  |
| ----------- | ---------------------- | -------- | ---------------------------- |
| Auth        | `/api/auth/register`   | POST     | Register a new user          |
| Auth        | `/api/auth/login`      | POST     | Login and get token          |
| Doctor      | `/api/doctors`         | GET/POST | Manage doctor data           |
| Patient     | `/api/patients`        | GET/POST | Manage patient data          |
| Appointment | `/api/appointments`    | GET/POST | Manage appointments          |
| Billing     | `/api/billing`         | GET/POST | Manage billing and invoices  |
| Inventory   | `/api/inventory`       | CRUD     | Manage inventory stock       |
| Medical     | `/api/medical-records` | CRUD     | Medical records for patients |
| Chat        | `/api/chat/ask`        | POST     | Ask the AI chatbot           |

---

## 🛌 Setup Instructions

### ✈ Prerequisites

* Java 17
* Maven
* MySQL (or use H2 for development)
* OpenAI API Key

### ⚙ Configuration

1. Create a file named `.env` in the project root (optional but recommended) or edit `application.properties` directly:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=root
spring.datasource.password=yourpassword

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# OpenAI
openai.api.key=sk-xxxxxxxxxxxxxxxxxxxx
```

2. Run the application:

```bash
./mvnw spring-boot:run
```

3. Access API on: `http://localhost:8080`

---

## 🌐 Environment Variables

For externalized configuration, you may use `.env` or pass variables at runtime:

| Variable         | Description            |
| ---------------- | ---------------------- |
| `OPENAI_API_KEY` | Your OpenAI secret key |
| `DB_URL`         | JDBC connection string |
| `DB_USERNAME`    | MySQL username         |
| `DB_PASSWORD`    | MySQL password         |

---

## 📅 Database Schema (Entities)

* `User`: common login table for all roles
* `Doctor`: specialization, availability, linked to User
* `Patient`: personal details, linked to User
* `Appointment`: references Doctor and Patient
* `Prescription`: diagnosis, medicines
* `MedicalRecord`: lab reports, historical data
* `Inventory`: item name, stock quantity
* `Billing`: amount, payment method
* `Staff`: hospital employees excluding doctors

---

## 💡 AI Chatbot Integration

* Endpoint: `POST /api/chat/ask`
* Payload:

```json
{
  "message": "What are the visiting hours?"
}
```

* Response:

```json
{
  "reply": "The hospital visiting hours are from 9 AM to 7 PM."
}
```

---

## 🚨 Error Handling

* Centralized exception handler using `@ControllerAdvice`
* Custom exceptions: `ResourceNotFoundException`, `UnauthorizedException`, etc.

---

## 📊 Future Enhancements

* JWT Authentication (in progress)
* Admin Analytics Dashboard
* Flutter-based mobile app
* Email notifications & reminders
* Integration with health devices

---

