/* 
====================================
API SERVICE
====================================
Centralized API calls to backend server
All endpoints communicate with Express backend
*/

import axios from "axios";

// Base URL for API
const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// ====================================
// AUTHENTICATION API
// ====================================

export const authAPI = {
	// Login with username and password
	login: (credentials) => api.post("/auth/login", credentials),

	// Logout
	logout: () => api.post("/auth/logout"),

	// Get admin info
	getAdmin: (adminId) => api.get(`/auth/admin/${adminId}`),
};

// ====================================
// STUDENTS API
// ====================================

export const studentAPI = {
	// Get all students
	getAll: () => api.get("/students"),

	// Get single student
	getById: (id) => api.get(`/students/${id}`),

	// Create new student
	create: (studentData) => api.post("/students", studentData),

	// Update student
	update: (id, studentData) => api.put(`/students/${id}`, studentData),

	// Delete student
	delete: (id) => api.delete(`/students/${id}`),
};

// ====================================
// TEACHERS API
// ====================================

export const teacherAPI = {
	// Get all teachers
	getAll: () => api.get("/teachers"),

	// Get single teacher
	getById: (id) => api.get(`/teachers/${id}`),

	// Create new teacher
	create: (teacherData) => api.post("/teachers", teacherData),

	// Update teacher
	update: (id, teacherData) => api.put(`/teachers/${id}`, teacherData),

	// Delete teacher
	delete: (id) => api.delete(`/teachers/${id}`),
};

// ====================================
// COURSES API
// ====================================

export const courseAPI = {
	// Get all courses
	getAll: () => api.get("/courses"),

	// Get single course
	getById: (id) => api.get(`/courses/${id}`),

	// Create new course
	create: (courseData) => api.post("/courses", courseData),

	// Update course
	update: (id, courseData) => api.put(`/courses/${id}`, courseData),

	// Delete course
	delete: (id) => api.delete(`/courses/${id}`),
};

// ====================================
// EVENTS API
// ====================================

export const eventAPI = {
	// Get all events
	getAll: () => api.get("/events"),

	// Get upcoming events
	getUpcoming: () => api.get("/events/upcoming"),

	// Get single event
	getById: (id) => api.get(`/events/${id}`),

	// Get events by category
	getByCategory: (category) => api.get(`/events/category/${category}`),

	// Get events by status
	getByStatus: (status) => api.get(`/events/status/${status}`),

	// Create new event
	create: (eventData) => api.post("/events", eventData),

	// Update event
	update: (id, eventData) => api.put(`/events/${id}`, eventData),

	// Delete event
	delete: (id) => api.delete(`/events/${id}`),
};

// ====================================
// HELPER FUNCTIONS
// ====================================

// Get admin data from localStorage
export const getAdminData = () => {
	const adminData = localStorage.getItem("adminData");
	return adminData ? JSON.parse(adminData) : null;
};

// Check if admin is logged in
export const isAdminLoggedIn = () => {
	const adminData = getAdminData();
	return adminData && adminData.isLoggedIn;
};

// Save admin data to localStorage
export const saveAdminData = (data) => {
	localStorage.setItem("adminData", JSON.stringify(data));
};

// Clear admin data (logout)
export const clearAdminData = () => {
	localStorage.removeItem("adminData");
};

export default api;
