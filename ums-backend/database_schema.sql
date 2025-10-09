-- =====================================================
-- UNIVERSITY MANAGEMENT SYSTEM DATABASE SCHEMA
-- =====================================================
-- This SQL script creates the database and all necessary tables
-- for the University Management System

-- Create database
CREATE DATABASE IF NOT EXISTS university_management_system;
USE university_management_system;

-- =====================================================
-- ADMINS TABLE
-- =====================================================
-- Stores admin credentials in plain text (learning purpose only)
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- STUDENTS TABLE
-- =====================================================
-- Stores student information
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    enrollment_date DATE NOT NULL,
    status ENUM('Active', 'Inactive', 'Graduated', 'Suspended') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TEACHERS TABLE
-- =====================================================
-- Stores teacher/faculty information
CREATE TABLE IF NOT EXISTS teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    teacher_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    department VARCHAR(100),
    qualification VARCHAR(100),
    specialization VARCHAR(100),
    joining_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    status ENUM('Active', 'Inactive', 'On Leave') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- COURSES TABLE
-- =====================================================
-- Stores course information
CREATE TABLE IF NOT EXISTS courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT NOT NULL,
    duration VARCHAR(50),
    teacher_id INT,
    department VARCHAR(100),
    semester VARCHAR(20),
    max_students INT DEFAULT 50,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
);

-- =====================================================
-- ENROLLMENTS TABLE (Optional - for student-course relationship)
-- =====================================================
-- Stores which students are enrolled in which courses
CREATE TABLE IF NOT EXISTS enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    grade VARCHAR(5),
    status ENUM('Enrolled', 'Completed', 'Dropped') DEFAULT 'Enrolled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- =====================================================
-- EVENTS TABLE
-- =====================================================
-- Stores university events information
CREATE TABLE IF NOT EXISTS events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(200),
    category VARCHAR(50),
    max_attendees INT DEFAULT 100,
    expected_attendees INT DEFAULT 0,
    organizer VARCHAR(100),
    status ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') DEFAULT 'Upcoming',
    registration_required BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- INSERT DEFAULT ADMIN USER
-- =====================================================
-- Default admin credentials for testing
-- Username: admin
-- Password: admin123
INSERT INTO admins (username, password, full_name, email, role) 
VALUES ('admin', 'admin123', 'System Administrator', 'admin@eduverse.edu', 'admin');

-- =====================================================
-- INSERT SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Sample Students
INSERT INTO students (student_id, first_name, last_name, email, phone, date_of_birth, gender, address, enrollment_date, status) VALUES
('STU001', 'John', 'Doe', 'john.doe@student.edu', '1234567890', '2002-05-15', 'Male', '123 Main St, City', '2023-09-01', 'Active'),
('STU002', 'Jane', 'Smith', 'jane.smith@student.edu', '1234567891', '2003-08-20', 'Female', '456 Oak Ave, City', '2023-09-01', 'Active'),
('STU003', 'Michael', 'Johnson', 'michael.j@student.edu', '1234567892', '2002-12-10', 'Male', '789 Pine Rd, City', '2023-09-01', 'Active');

-- Sample Teachers
INSERT INTO teachers (teacher_id, first_name, last_name, email, phone, date_of_birth, gender, department, qualification, specialization, joining_date, salary, status) VALUES
('TCH001', 'Dr. Robert', 'Brown', 'robert.brown@eduverse.edu', '9876543210', '1980-03-25', 'Male', 'Computer Science', 'PhD', 'Artificial Intelligence', '2020-08-01', 75000.00, 'Active'),
('TCH002', 'Dr. Sarah', 'Wilson', 'sarah.wilson@eduverse.edu', '9876543211', '1985-07-15', 'Female', 'Mathematics', 'PhD', 'Applied Mathematics', '2019-09-01', 70000.00, 'Active'),
('TCH003', 'Prof. James', 'Taylor', 'james.taylor@eduverse.edu', '9876543212', '1978-11-30', 'Male', 'Business', 'MBA, PhD', 'Management', '2018-07-01', 80000.00, 'Active');

-- Sample Courses
INSERT INTO courses (course_code, course_name, description, credits, duration, teacher_id, department, semester, max_students, status) VALUES
('CS101', 'Introduction to Programming', 'Basic programming concepts using Python', 4, '16 weeks', 1, 'Computer Science', 'Fall 2024', 50, 'Active'),
('MATH201', 'Calculus II', 'Advanced calculus and differential equations', 4, '16 weeks', 2, 'Mathematics', 'Fall 2024', 40, 'Active'),
('BUS301', 'Business Management', 'Principles of business management and strategy', 3, '16 weeks', 3, 'Business', 'Fall 2024', 45, 'Active'),
('CS202', 'Data Structures', 'Advanced data structures and algorithms', 4, '16 weeks', 1, 'Computer Science', 'Spring 2025', 40, 'Active');

-- Sample Enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date, status) VALUES
(1, 1, '2023-09-01', 'Enrolled'),
(1, 2, '2023-09-01', 'Enrolled'),
(2, 1, '2023-09-01', 'Enrolled'),
(2, 3, '2023-09-01', 'Enrolled'),
(3, 2, '2023-09-01', 'Enrolled'),
(3, 4, '2023-09-01', 'Enrolled');

-- Sample Events
INSERT INTO events (event_name, description, event_date, event_time, location, category, max_attendees, expected_attendees, organizer, status, registration_required) VALUES
('Orientation Day 2025', 'Welcome new students and introduce them to university life', '2025-08-15', '09:00:00', 'Main Auditorium', 'Academic', 500, 500, 'Student Affairs Office', 'Upcoming', true),
('Research Symposium', 'Annual research presentation by faculty and students', '2025-08-20', '14:00:00', 'Science Building', 'Research', 200, 200, 'Research Department', 'Upcoming', true),
('Career Fair 2025', 'Meet with top employers and explore career opportunities', '2025-08-25', '10:00:00', 'Exhibition Hall', 'Career', 1000, 1000, 'Career Services', 'Upcoming', true),
('Tech Innovation Workshop', 'Learn about latest technologies and innovations', '2025-09-05', '13:00:00', 'Computer Lab', 'Workshop', 80, 75, 'IT Department', 'Upcoming', true),
('Sports Day', 'Annual sports competition and activities', '2025-09-15', '08:00:00', 'Sports Complex', 'Sports', 300, 250, 'Sports Committee', 'Upcoming', false),
('Alumni Meetup', 'Connect with alumni and network', '2025-10-01', '18:00:00', 'Conference Hall', 'Networking', 150, 120, 'Alumni Relations', 'Upcoming', true);

-- =====================================================
-- DISPLAY CONFIRMATION MESSAGE
-- =====================================================
SELECT 'Database created successfully!' AS message;
SELECT 'Default admin credentials - Username: admin, Password: admin123' AS info;
