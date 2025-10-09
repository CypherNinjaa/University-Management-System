/* 
====================================
TEACHER CONTROLLER
====================================
CRUD operations for teacher management
*/

const { promisePool } = require("../config/database");

// Get all teachers
const getAllTeachers = async (req, res) => {
	try {
		const [teachers] = await promisePool.query(
			"SELECT * FROM teachers ORDER BY created_at DESC"
		);

		res.status(200).json({
			success: true,
			count: teachers.length,
			data: teachers,
		});
	} catch (error) {
		console.error("Get teachers error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching teachers",
			error: error.message,
		});
	}
};

// Get single teacher by ID
const getTeacherById = async (req, res) => {
	try {
		const { id } = req.params;

		const [teachers] = await promisePool.query(
			"SELECT * FROM teachers WHERE id = ?",
			[id]
		);

		if (teachers.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Teacher not found",
			});
		}

		res.status(200).json({
			success: true,
			data: teachers[0],
		});
	} catch (error) {
		console.error("Get teacher error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching teacher",
			error: error.message,
		});
	}
};

// Create new teacher
const createTeacher = async (req, res) => {
	try {
		const {
			teacher_id,
			first_name,
			last_name,
			email,
			phone,
			date_of_birth,
			gender,
			department,
			qualification,
			specialization,
			joining_date,
			salary,
			status,
		} = req.body;

		// Validate required fields
		if (!teacher_id || !first_name || !last_name || !email || !joining_date) {
			return res.status(400).json({
				success: false,
				message: "Please provide all required fields",
			});
		}

		const [result] = await promisePool.query(
			`INSERT INTO teachers 
            (teacher_id, first_name, last_name, email, phone, date_of_birth, gender, 
            department, qualification, specialization, joining_date, salary, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				teacher_id,
				first_name,
				last_name,
				email,
				phone,
				date_of_birth,
				gender,
				department,
				qualification,
				specialization,
				joining_date,
				salary,
				status || "Active",
			]
		);

		res.status(201).json({
			success: true,
			message: "Teacher created successfully",
			data: {
				id: result.insertId,
				teacher_id,
				first_name,
				last_name,
				email,
			},
		});
	} catch (error) {
		console.error("Create teacher error:", error);

		if (error.code === "ER_DUP_ENTRY") {
			return res.status(400).json({
				success: false,
				message: "Teacher ID or email already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Error creating teacher",
			error: error.message,
		});
	}
};

// Update teacher
const updateTeacher = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			teacher_id,
			first_name,
			last_name,
			email,
			phone,
			date_of_birth,
			gender,
			department,
			qualification,
			specialization,
			joining_date,
			salary,
			status,
		} = req.body;

		// Check if teacher exists
		const [existingTeacher] = await promisePool.query(
			"SELECT * FROM teachers WHERE id = ?",
			[id]
		);

		if (existingTeacher.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Teacher not found",
			});
		}

		await promisePool.query(
			`UPDATE teachers SET 
            teacher_id = ?, first_name = ?, last_name = ?, email = ?, phone = ?, 
            date_of_birth = ?, gender = ?, department = ?, qualification = ?, 
            specialization = ?, joining_date = ?, salary = ?, status = ?
            WHERE id = ?`,
			[
				teacher_id,
				first_name,
				last_name,
				email,
				phone,
				date_of_birth,
				gender,
				department,
				qualification,
				specialization,
				joining_date,
				salary,
				status,
				id,
			]
		);

		res.status(200).json({
			success: true,
			message: "Teacher updated successfully",
			data: { id, ...req.body },
		});
	} catch (error) {
		console.error("Update teacher error:", error);

		if (error.code === "ER_DUP_ENTRY") {
			return res.status(400).json({
				success: false,
				message: "Teacher ID or email already exists",
			});
		}

		res.status(500).json({
			success: false,
			message: "Error updating teacher",
			error: error.message,
		});
	}
};

// Delete teacher
const deleteTeacher = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if teacher exists
		const [existingTeacher] = await promisePool.query(
			"SELECT * FROM teachers WHERE id = ?",
			[id]
		);

		if (existingTeacher.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Teacher not found",
			});
		}

		await promisePool.query("DELETE FROM teachers WHERE id = ?", [id]);

		res.status(200).json({
			success: true,
			message: "Teacher deleted successfully",
		});
	} catch (error) {
		console.error("Delete teacher error:", error);
		res.status(500).json({
			success: false,
			message: "Error deleting teacher",
			error: error.message,
		});
	}
};

module.exports = {
	getAllTeachers,
	getTeacherById,
	createTeacher,
	updateTeacher,
	deleteTeacher,
};
