/* 
====================================
UNIVERSITY MANAGEMENT SYSTEM - SERVER
====================================
Main server file for the backend API
Simple Express server with MySQL database
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { testConnection } = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const courseRoutes = require("./routes/courses");
const eventRoutes = require("./routes/events");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ====================================
// MIDDLEWARE
// ====================================

// CORS configuration - Allow frontend to access the API
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	})
);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware (for development)
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
	next();
});

// ====================================
// ROUTES
// ====================================

// Health check route
app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "University Management System API is running",
		version: "1.0.0",
		endpoints: {
			auth: "/api/auth",
			students: "/api/students",
			teachers: "/api/teachers",
			courses: "/api/courses",
			events: "/api/events",
		},
	});
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/events", eventRoutes);

// 404 handler - Route not found
app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Route not found",
	});
});

// Global error handler
app.use((err, req, res, next) => {
	console.error("Server Error:", err);
	res.status(500).json({
		success: false,
		message: "Internal server error",
		error: process.env.NODE_ENV === "development" ? err.message : undefined,
	});
});

// ====================================
// START SERVER
// ====================================

const startServer = async () => {
	try {
		// Test database connection
		const dbConnected = await testConnection();

		if (!dbConnected) {
			console.error(
				"❌ Failed to connect to database. Please check your MySQL configuration."
			);
			console.error(
				"Make sure MySQL is running and credentials in .env are correct."
			);
			process.exit(1);
		}

		// Start the server
		app.listen(PORT, () => {
			console.log("\n" + "=".repeat(50));
			console.log(" UNIVERSITY MANAGEMENT SYSTEM - BACKEND API");
			console.log("=".repeat(50));
			console.log(` Server running on: http://localhost:${PORT}`);
			console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
			console.log(` Database: ${process.env.DB_NAME}`);
			console.log("=".repeat(50));
			console.log("\n Available Endpoints:");
			console.log(`   - GET  /api/auth/login          (Admin Login)`);
			console.log(`   - GET  /api/students            (Get All Students)`);
			console.log(`   - POST /api/students            (Create Student)`);
			console.log(`   - GET  /api/students/:id        (Get Student)`);
			console.log(`   - PUT  /api/students/:id        (Update Student)`);
			console.log(`   - DEL  /api/students/:id        (Delete Student)`);
			console.log(`   - GET  /api/teachers            (Get All Teachers)`);
			console.log(`   - POST /api/teachers            (Create Teacher)`);
			console.log(`   - GET  /api/teachers/:id        (Get Teacher)`);
			console.log(`   - PUT  /api/teachers/:id        (Update Teacher)`);
			console.log(`   - DEL  /api/teachers/:id        (Delete Teacher)`);
			console.log(`   - GET  /api/courses             (Get All Courses)`);
			console.log(`   - POST /api/courses             (Create Course)`);
			console.log(`   - GET  /api/courses/:id         (Get Course)`);
			console.log(`   - PUT  /api/courses/:id         (Update Course)`);
			console.log(`   - DEL  /api/courses/:id         (Delete Course)`);
			console.log(`   - GET  /api/events              (Get All Events)`);
			console.log(`   - POST /api/events              (Create Event)`);
			console.log(`   - GET  /api/events/:id          (Get Event)`);
			console.log(`   - PUT  /api/events/:id          (Update Event)`);
			console.log(`   - DEL  /api/events/:id          (Delete Event)`);
			console.log("\n" + "=".repeat(50));
			console.log(" Default Admin Credentials:");
			console.log("   Username: admin");
			console.log("   Password: admin123");
			console.log("=".repeat(50) + "\n");
		});
	} catch (error) {
		console.error(" Failed to start server:", error);
		process.exit(1);
	}
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
	console.error("Unhandled Promise Rejection:", err);
	process.exit(1);
});
