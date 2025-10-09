/* 
========import { FaPlus, FaEdit, FaTrash, FaSearch, FaUserGraduate } from 'react-icons/fa';
import { studentAPI } from '../../services/api';
import './Admin.css';==========================
STUDENT MANAGEMENT
====================================
Full CRUD operations for students
Matches database schema from backend
*/

import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Table,
	Button,
	Modal,
	Form,
	InputGroup,
	Badge,
	Spinner,
	Alert,
} from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaUser } from "react-icons/fa";
import { studentAPI } from "../../services/api";
import "./StudentManagement.css";

const StudentManagement = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
	const [currentStudent, setCurrentStudent] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Form data state
	const [formData, setFormData] = useState({
		student_id: "",
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		date_of_birth: "",
		gender: "Male",
		address: "",
		enrollment_date: "",
		status: "Active",
	});

	// Fetch all students on component mount
	useEffect(() => {
		fetchStudents();
	}, []);

	// Fetch students from API
	const fetchStudents = async () => {
		try {
			setLoading(true);
			const response = await studentAPI.getAll();
			if (response.data.success) {
				setStudents(response.data.data);
			}
		} catch (err) {
			console.error("Error fetching students:", err);
			setError("Failed to load students");
		} finally {
			setLoading(false);
		}
	};

	// Handle search
	const filteredStudents = students.filter(
		(student) =>
			student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Open modal for adding new student
	const handleAddClick = () => {
		setModalMode("add");
		setFormData({
			student_id: "",
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			date_of_birth: "",
			gender: "Male",
			address: "",
			enrollment_date: new Date().toISOString().split("T")[0],
			status: "Active",
		});
		setCurrentStudent(null);
		setShowModal(true);
	};

	// Open modal for editing student
	const handleEditClick = (student) => {
		setModalMode("edit");
		setFormData({
			student_id: student.student_id,
			first_name: student.first_name,
			last_name: student.last_name,
			email: student.email,
			phone: student.phone || "",
			date_of_birth: student.date_of_birth
				? student.date_of_birth.split("T")[0]
				: "",
			gender: student.gender || "Male",
			address: student.address || "",
			enrollment_date: student.enrollment_date
				? student.enrollment_date.split("T")[0]
				: "",
			status: student.status,
		});
		setCurrentStudent(student);
		setShowModal(true);
	};

	// Handle form input changes
	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			if (modalMode === "add") {
				const response = await studentAPI.create(formData);
				if (response.data.success) {
					setSuccess("Student added successfully!");
					fetchStudents();
					setShowModal(false);
				}
			} else {
				const response = await studentAPI.update(currentStudent.id, formData);
				if (response.data.success) {
					setSuccess("Student updated successfully!");
					fetchStudents();
					setShowModal(false);
				}
			}
		} catch (err) {
			console.error("Error saving student:", err);
			setError(err.response?.data?.message || "Failed to save student");
		}
	};

	// Handle delete student
	const handleDelete = async (student) => {
		if (
			window.confirm(
				`Are you sure you want to delete ${student.first_name} ${student.last_name}?`
			)
		) {
			try {
				const response = await studentAPI.delete(student.id);
				if (response.data.success) {
					setSuccess("Student deleted successfully!");
					fetchStudents();
				}
			} catch (err) {
				console.error("Error deleting student:", err);
				setError("Failed to delete student");
			}
		}
	};

	// Get status badge color
	const getStatusColor = (status) => {
		switch (status) {
			case "Active":
				return "success";
			case "Inactive":
				return "secondary";
			case "Graduated":
				return "primary";
			case "Suspended":
				return "danger";
			default:
				return "secondary";
		}
	};

	return (
		<div className="student-management">
			<Row className="mb-4">
				<Col>
					<h2 className="fw-bold">
						<FaUser className="me-2" />
						Student Management
					</h2>
					<p className="text-muted">
						Manage all student records and information
					</p>
				</Col>
			</Row>

			{/* Success/Error Alerts */}
			{success && (
				<Alert variant="success" dismissible onClose={() => setSuccess("")}>
					{success}
				</Alert>
			)}
			{error && (
				<Alert variant="danger" dismissible onClose={() => setError("")}>
					{error}
				</Alert>
			)}

			{/* Search and Add Button */}
			<Card className="mb-4">
				<Card.Body>
					<Row className="align-items-center">
						<Col md={8}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Search by name, student ID, or email..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={4} className="text-end">
							<Button variant="primary" onClick={handleAddClick}>
								<FaPlus className="me-2" />
								Add New Student
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			{/* Students Table */}
			<Card>
				<Card.Body>
					{loading ? (
						<div className="text-center py-5">
							<Spinner animation="border" variant="primary" />
							<p className="mt-3">Loading students...</p>
						</div>
					) : filteredStudents.length === 0 ? (
						<div className="text-center py-5 text-muted">
							<FaUser size={50} className="mb-3 opacity-25" />
							<p>No students found</p>
						</div>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>Student ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Gender</th>
									<th>Enrollment Date</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredStudents.map((student) => (
									<tr key={student.id}>
										<td>
											<strong>{student.student_id}</strong>
										</td>
										<td>
											{student.first_name} {student.last_name}
										</td>
										<td>{student.email}</td>
										<td>{student.phone || "N/A"}</td>
										<td>{student.gender}</td>
										<td>
											{new Date(student.enrollment_date).toLocaleDateString()}
										</td>
										<td>
											<Badge bg={getStatusColor(student.status)}>
												{student.status}
											</Badge>
										</td>
										<td>
											<Button
												variant="outline-primary"
												size="sm"
												className="me-2"
												onClick={() => handleEditClick(student)}
											>
												<FaEdit />
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDelete(student)}
											>
												<FaTrash />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}

					<div className="text-muted mt-3">
						Total Students: <strong>{filteredStudents.length}</strong>
					</div>
				</Card.Body>
			</Card>

			{/* Add/Edit Modal */}
			<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>
						{modalMode === "add" ? "Add New Student" : "Edit Student"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Student ID *</Form.Label>
									<Form.Control
										type="text"
										name="student_id"
										value={formData.student_id}
										onChange={handleInputChange}
										required
										placeholder="e.g., STU001"
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Status *</Form.Label>
									<Form.Select
										name="status"
										value={formData.status}
										onChange={handleInputChange}
										required
									>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
										<option value="Graduated">Graduated</option>
										<option value="Suspended">Suspended</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>First Name *</Form.Label>
									<Form.Control
										type="text"
										name="first_name"
										value={formData.first_name}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Last Name *</Form.Label>
									<Form.Control
										type="text"
										name="last_name"
										value={formData.last_name}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Email *</Form.Label>
									<Form.Control
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Phone</Form.Label>
									<Form.Control
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col md={4}>
								<Form.Group className="mb-3">
									<Form.Label>Date of Birth</Form.Label>
									<Form.Control
										type="date"
										name="date_of_birth"
										value={formData.date_of_birth}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group className="mb-3">
									<Form.Label>Gender</Form.Label>
									<Form.Select
										name="gender"
										value={formData.gender}
										onChange={handleInputChange}
									>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group className="mb-3">
									<Form.Label>Enrollment Date *</Form.Label>
									<Form.Control
										type="date"
										name="enrollment_date"
										value={formData.enrollment_date}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
						</Row>

						<Form.Group className="mb-3">
							<Form.Label>Address</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="address"
								value={formData.address}
								onChange={handleInputChange}
							/>
						</Form.Group>

						<div className="text-end">
							<Button
								variant="secondary"
								onClick={() => setShowModal(false)}
								className="me-2"
							>
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								{modalMode === "add" ? "Add Student" : "Update Student"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default StudentManagement;
