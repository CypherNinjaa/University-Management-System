/* 
====================================
AUTHENTICATION ROUTES
====================================
Routes for admin login/logout
*/

const express = require("express");
const router = express.Router();
const {
	login,
	logout,
	getCurrentAdmin,
} = require("../controllers/authController");

// POST /api/auth/login - Admin login
router.post("/login", login);

// POST /api/auth/logout - Admin logout
router.post("/logout", logout);

// GET /api/auth/admin/:adminId - Get current admin info
router.get("/admin/:adminId", getCurrentAdmin);

module.exports = router;
