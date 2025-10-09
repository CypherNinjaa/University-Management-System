/* 
====================================
COURSE CONTROLLER
====================================
CRUD operations for course management
*/

const { promisePool } = require("../config/database");

// Get all courses
const getAllCourses = async (req, res) => {
	try {
		// Join with teachers table to get teacher name
		const [courses] = await promisePool.query(
			`SELECT c.*, 
             CONCAT(t.first_name, ' ', t.last_name) as teacher_name
             FROM courses c
             LEFT JOIN teachers t ON c.teacher_id = t.id
             ORDER BY c.created_at DESC`
		);

		res.status(200).json({
			success: true,
			count: courses.length,
			data: courses,
		});
	} catch (error) {
		console.error("Get courses error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching courses",
			error: error.message,
		});
	}
};

// Get single course by ID
const getCourseById = async (req, res) => {
	try {
		const { id } = req.params;

		const [courses] = await promisePool.query(
			`SELECT c.*, 
             CONCAT(t.first_name, ' ', t.last_name) as teacher_name
             FROM courses c
             LEFT JOIN teachers t ON c.teacher_id = t.id
             WHERE c.id = ?`,
			[id]
		);

		if (courses.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		res.status(200).json({
			success: true,
			data: courses[0],
		});
	} catch (error) {
		console.error("Get course error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching course",
			error: error.message,
		});
	}
};

// Create new course
const createCourse = async (req, res) => {
	try {
		const {
			course_code,
			course_name,
			description,
			credits,
			duration,
			teacher_id,
			department,
			semester,
			max_students,
			status,
		} = req.body;

		// Validate required fields
		if (!course_code || !course_name || !credits) {
			return res.status(400).json({
				success: false,
				message: "Please provide course code, name, and credits",
			});
		}

		const [result] = await promisePool.query(
			`INSERT INTO courses 
            (course_code, course_name, description, credits, duration, teacher_id, 
            department, semester, max_students, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				course_code,
				course_name,
				description,
				credits,
				duration,
				teacher_id || null,
				department,
				semester,
				max_students || 50,
				status || "Active",
			]
		);

		res.status(201).json({
			success: true,
			message: "Course created successfully",
			data: {
				id: result.insertId,
				course_code,
				course_name,
				credits,
			},
		});
	} catch (error) {
		console.error("Create course error:", error);

		if (error.code === "ER_DUP_ENTRY") {
			return res.status(400).json({
				success: false,
				message: "Course code already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Error creating course",
			error: error.message,
		});
	}
};

// Update course
const updateCourse = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			course_code,
			course_name,
			description,
			credits,
			duration,
			teacher_id,
			department,
			semester,
			max_students,
			status,
		} = req.body;

		// Check if course exists
		const [existingCourse] = await promisePool.query(
			"SELECT * FROM courses WHERE id = ?",
			[id]
		);

		if (existingCourse.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		await promisePool.query(
			`UPDATE courses SET 
            course_code = ?, course_name = ?, description = ?, credits = ?, 
            duration = ?, teacher_id = ?, department = ?, semester = ?, 
            max_students = ?, status = ?
            WHERE id = ?`,
			[
				course_code,
				course_name,
				description,
				credits,
				duration,
				teacher_id || null,
				department,
				semester,
				max_students,
				status,
				id,
			]
		);

		res.status(200).json({
			success: true,
			message: "Course updated successfully",
			data: { id, ...req.body },
		});
	} catch (error) {
		console.error("Update course error:", error);

		if (error.code === "ER_DUP_ENTRY") {
			return res.status(400).json({
				success: false,
				message: "Course code already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Error updating course",
			error: error.message,
		});
	}
};

// Delete course
const deleteCourse = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if course exists
		const [existingCourse] = await promisePool.query(
			"SELECT * FROM courses WHERE id = ?",
			[id]
		);

		if (existingCourse.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		await promisePool.query("DELETE FROM courses WHERE id = ?", [id]);

		res.status(200).json({
			success: true,
			message: "Course deleted successfully",
		});
	} catch (error) {
		console.error("Delete course error:", error);
		res.status(500).json({
			success: false,
			message: "Error deleting course",
			error: error.message,
		});
	}
};

module.exports = {
	getAllCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
};
