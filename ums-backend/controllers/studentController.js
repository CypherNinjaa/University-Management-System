/* 
====================================
STUDENT CONTROLLER
====================================
CRUD operations for student management
*/

const { promisePool } = require("../config/database");

// Get all students
const getAllStudents = async (req, res) => {
	try {
		const [students] = await promisePool.query(
			"SELECT * FROM students ORDER BY created_at DESC"
		);

		res.status(200).json({
			success: true,
			count: students.length,
			data: students,
		});
	} catch (error) {
		console.error("Get students error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching students",
			error: error.message,
		});
	}
};

// Get single student by ID
const getStudentById = async (req, res) => {
	try {
		const { id } = req.params;

		const [students] = await promisePool.query(
			"SELECT * FROM students WHERE id = ?",
			[id]
		);

		if (students.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Student not found",
			});
		}

		res.status(200).json({
			success: true,
			data: students[0],
		});
	} catch (error) {
		console.error("Get student error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching student",
			error: error.message,
		});
	}
};

// Create new student
const createStudent = async (req, res) => {
	try {
		const {
			student_id,
			first_name,
			last_name,
			email,
			phone,
			date_of_birth,
			gender,
			address,
			enrollment_date,
			status,
		} = req.body;

		// Validate required fields
		if (
			!student_id ||
			!first_name ||
			!last_name ||
			!email ||
			!enrollment_date
		) {
			return res.status(400).json({
				success: false,
				message: "Please provide all required fields",
			});
		}

		const [result] = await promisePool.query(
			`INSERT INTO students 
            (student_id, first_name, last_name, email, phone, date_of_birth, gender, address, enrollment_date, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				student_id,
				first_name,
				last_name,
				email,
				phone,
				date_of_birth,
				gender,
				address,
				enrollment_date,
				status || "Active",
			]
		);

		res.status(201).json({
			success: true,
			message: "Student created successfully",
			data: {
				id: result.insertId,
				student_id,
				first_name,
				last_name,
				email,
			},
		});
	} catch (error) {
		console.error("Create student error:", error);

		// Handle duplicate entry error
		if (error.code === "ER_DUP_ENTRY") {
			return res.status(400).json({
				success: false,
				message: "Student ID or email already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Error creating student",
			error: error.message,
		});
	}
};

// Update student
const updateStudent = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			student_id,
			first_name,
			last_name,
			email,
			phone,
			date_of_birth,
			gender,
			address,
			enrollment_date,
			status,
		} = req.body;

		// Check if student exists
		const [existingStudent] = await promisePool.query(
			"SELECT * FROM students WHERE id = ?",
			[id]
		);

		if (existingStudent.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Student not found",
			});
		}

		const [result] = await promisePool.query(
			`UPDATE students SET 
            student_id = ?, first_name = ?, last_name = ?, email = ?, 
            phone = ?, date_of_birth = ?, gender = ?, address = ?, 
            enrollment_date = ?, status = ?
            WHERE id = ?`,
			[
				student_id,
				first_name,
				last_name,
				email,
				phone,
				date_of_birth,
				gender,
				address,
				enrollment_date,
				status,
				id,
			]
		);

		res.status(200).json({
			success: true,
			message: "Student updated successfully",
			data: { id, ...req.body },
		});
	} catch (error) {
		console.error("Update student error:", error);

		if (error.code === "ER_DUP_ENTRY") {
			return res.status(400).json({
				success: false,
				message: "Student ID or email already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Error updating student",
			error: error.message,
		});
	}
};

// Delete student
const deleteStudent = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if student exists
		const [existingStudent] = await promisePool.query(
			"SELECT * FROM students WHERE id = ?",
			[id]
		);

		if (existingStudent.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Student not found",
			});
		}

		await promisePool.query("DELETE FROM students WHERE id = ?", [id]);

		res.status(200).json({
			success: true,
			message: "Student deleted successfully",
		});
	} catch (error) {
		console.error("Delete student error:", error);
		res.status(500).json({
			success: false,
			message: "Error deleting student",
			error: error.message,
		});
	}
};

module.exports = {
	getAllStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent,
};
