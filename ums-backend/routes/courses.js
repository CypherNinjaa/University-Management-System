/* 
====================================
COURSE ROUTES
====================================
All CRUD routes for course management
*/

const express = require("express");
const router = express.Router();
const {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
} = require("../controllers/courseController");

// GET /api/courses - Get all courses
router.get("/", getAllCourses);

// GET /api/courses/:id - Get single course
router.get("/:id", getCourseById);

// POST /api/courses - Create new course
router.post("/", createCourse);

// PUT /api/courses/:id - Update course
router.put("/:id", updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete("/:id", deleteCourse);

module.exports = router;
