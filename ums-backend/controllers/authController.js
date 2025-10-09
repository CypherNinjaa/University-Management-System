/* 
====================================
AUTHENTICATION CONTROLLER
====================================
Handles admin login with simple text-based authentication
Stores admin data that frontend will save to localStorage
*/

const { promisePool } = require("../config/database");

// Admin Login
const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		// Validate input
		if (!username || !password) {
			return res.status(400).json({
				success: false,
				message: "Please provide username and password",
			});
		}

		// Query database for admin with matching username and password (plain text)
		const [admins] = await promisePool.query(
			"SELECT id, username, full_name, email, role FROM admins WHERE username = ? AND password = ?",
			[username, password]
		);

		// Check if admin exists
		if (admins.length === 0) {
			return res.status(401).json({
				success: false,
				message: "Invalid username or password",
			});
		}

		const admin = admins[0];

		// Return admin data (frontend will store this in localStorage)
		res.status(200).json({
			success: true,
			message: "Login successful",
			data: {
				id: admin.id,
				username: admin.username,
				fullName: admin.full_name,
				email: admin.email,
				role: admin.role,
				isLoggedIn: true,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			success: false,
			message: "Server error during login",
			error: error.message,
		});
	}
};

// Logout (mainly for frontend, just returns success)
const logout = (req, res) => {
	res.status(200).json({
		success: true,
		message: "Logout successful",
	});
};

// Get current admin info (if stored in localStorage)
const getCurrentAdmin = async (req, res) => {
	try {
		const { adminId } = req.params;

		const [admins] = await promisePool.query(
			"SELECT id, username, full_name, email, role FROM admins WHERE id = ?",
			[adminId]
		);

		if (admins.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Admin not found",
			});
		}

		res.status(200).json({
			success: true,
			data: admins[0],
		});
	} catch (error) {
		console.error("Get admin error:", error);
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

module.exports = {
	login,
	logout,
	getCurrentAdmin,
};
