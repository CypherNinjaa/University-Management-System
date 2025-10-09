/* 
====================================
TEACHER ROUTES
====================================
All CRUD routes for teacher management
*/

const express = require("express");
const router = express.Router();
const {
	getAllTeachers,
	getTeacherById,
	createTeacher,
	updateTeacher,
	deleteTeacher,
} = require("../controllers/teacherController");

// GET /api/teachers - Get all teachers
router.get("/", getAllTeachers);

// GET /api/teachers/:id - Get single teacher
router.get("/:id", getTeacherById);

// POST /api/teachers - Create new teacher
router.post("/", createTeacher);

// PUT /api/teachers/:id - Update teacher
router.put("/:id", updateTeacher);

// DELETE /api/teachers/:id - Delete teacher
router.delete("/:id", deleteTeacher);

module.exports = router;
