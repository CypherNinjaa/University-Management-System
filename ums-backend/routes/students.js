/* 
====================================
STUDENT ROUTES
====================================
All CRUD routes for student management
*/

const express = require("express");
const router = express.Router();
const {
	getAllStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent,
} = require("../controllers/studentController");

// GET /api/students - Get all students
router.get("/", getAllStudents);

// GET /api/students/:id - Get single student
router.get("/:id", getStudentById);

// POST /api/students - Create new student
router.post("/", createStudent);

// PUT /api/students/:id - Update student
router.put("/:id", updateStudent);

// DELETE /api/students/:id - Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
