CREATE DATABASE faculty_verification;

USE faculty_verification;

-- Users table (login & roles)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','FACULTY') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

-- Faculty Profile
CREATE TABLE faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    department_id INT,
    designation VARCHAR(100),
    phone VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Credentials uploaded by faculty
CREATE TABLE credentials (
    credential_id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_id INT,
    credential_title VARCHAR(200),
    credential_type VARCHAR(100),
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);

-- Verification by admin
CREATE TABLE verification (
    verification_id INT AUTO_INCREMENT PRIMARY KEY,
    credential_id INT,
    admin_id INT,
    verification_status ENUM('APPROVED','REJECTED','PENDING') DEFAULT 'PENDING',
    remarks TEXT,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (credential_id) REFERENCES credentials(credential_id),
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
);
drop database faculty_verification;
select *from users;
select *from faculty;
DESCRIBE faculty;
select *from verification;
