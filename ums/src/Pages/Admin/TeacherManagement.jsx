/* Teacher Management - Full CRUD */

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
import {
	FaPlus,
	FaEdit,
	FaTrash,
	FaSearch,
	FaChalkboardTeacher,
} from "react-icons/fa";
import { teacherAPI } from "../../services/api";
import "./Admin.css";

const TeacherManagement = () => {
	const [teachers, setTeachers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [currentTeacher, setCurrentTeacher] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [formData, setFormData] = useState({
		teacher_id: "",
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		date_of_birth: "",
		gender: "Male",
		department: "",
		qualification: "",
		specialization: "",
		joining_date: "",
		salary: "",
		status: "Active",
	});

	useEffect(() => {
		fetchTeachers();
	}, []);

	const fetchTeachers = async () => {
		try {
			setLoading(true);
			const response = await teacherAPI.getAll();
			if (response.data.success) setTeachers(response.data.data);
		} catch (error) {
			console.error("Error fetching teachers:", error);
			setError("Failed to load teachers");
		} finally {
			setLoading(false);
		}
	};

	const filteredTeachers = teachers.filter(
		(teacher) =>
			teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			teacher.teacher_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			teacher.department?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddClick = () => {
		setModalMode("add");
		setFormData({
			teacher_id: "",
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			date_of_birth: "",
			gender: "Male",
			department: "",
			qualification: "",
			specialization: "",
			joining_date: new Date().toISOString().split("T")[0],
			salary: "",
			status: "Active",
		});
		setShowModal(true);
	};

	const handleEditClick = (teacher) => {
		setModalMode("edit");
		setFormData({
			teacher_id: teacher.teacher_id,
			first_name: teacher.first_name,
			last_name: teacher.last_name,
			email: teacher.email,
			phone: teacher.phone || "",
			date_of_birth: teacher.date_of_birth
				? teacher.date_of_birth.split("T")[0]
				: "",
			gender: teacher.gender || "Male",
			department: teacher.department || "",
			qualification: teacher.qualification || "",
			specialization: teacher.specialization || "",
			joining_date: teacher.joining_date
				? teacher.joining_date.split("T")[0]
				: "",
			salary: teacher.salary || "",
			status: teacher.status,
		});
		setCurrentTeacher(teacher);
		setShowModal(true);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (modalMode === "add") {
				await teacherAPI.create(formData);
				setSuccess("Teacher added successfully!");
			} else {
				await teacherAPI.update(currentTeacher.id, formData);
				setSuccess("Teacher updated successfully!");
			}
			fetchTeachers();
			setShowModal(false);
		} catch (err) {
			console.error("Error saving teacher:", err);
			setError(err.response?.data?.message || "Failed to save teacher");
		}
	};

	const handleDelete = async (teacher) => {
		if (window.confirm(`Delete ${teacher.first_name} ${teacher.last_name}?`)) {
			try {
				await teacherAPI.delete(teacher.id);
				setSuccess("Teacher deleted successfully!");
				fetchTeachers();
			} catch (err) {
				console.error("Error deleting teacher:", err);
				setError("Failed to delete teacher");
			}
		}
	};

	const getStatusColor = (status) => {
		return (
			{ Active: "success", Inactive: "secondary", "On Leave": "warning" }[
				status
			] || "secondary"
		);
	};

	return (
		<div className="teacher-management">
			<Row className="mb-4">
				<Col>
					<h2 className="fw-bold">
						<FaChalkboardTeacher className="me-2" />
						Teacher Management
					</h2>
					<p className="text-muted">Manage all faculty members</p>
				</Col>
			</Row>

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

			<Card className="mb-4">
				<Card.Body>
					<Row className="align-items-center">
						<Col md={8}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									placeholder="Search by name, ID, or department..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={4} className="text-end">
							<Button variant="primary" onClick={handleAddClick}>
								<FaPlus className="me-2" />
								Add New Teacher
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					{loading ? (
						<div className="text-center py-5">
							<Spinner animation="border" variant="primary" />
						</div>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>Teacher ID</th>
									<th>Name</th>
									<th>Email</th>
									<th>Department</th>
									<th>Qualification</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredTeachers.map((teacher) => (
									<tr key={teacher.id}>
										<td>
											<strong>{teacher.teacher_id}</strong>
										</td>
										<td>
											{teacher.first_name} {teacher.last_name}
										</td>
										<td>{teacher.email}</td>
										<td>{teacher.department}</td>
										<td>{teacher.qualification}</td>
										<td>
											<Badge bg={getStatusColor(teacher.status)}>
												{teacher.status}
											</Badge>
										</td>
										<td>
											<Button
												variant="outline-primary"
												size="sm"
												className="me-2"
												onClick={() => handleEditClick(teacher)}
											>
												<FaEdit />
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDelete(teacher)}
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
						Total Teachers: <strong>{filteredTeachers.length}</strong>
					</div>
				</Card.Body>
			</Card>

			<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>
						{modalMode === "add" ? "Add New Teacher" : "Edit Teacher"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Teacher ID *</Form.Label>
									<Form.Control
										name="teacher_id"
										value={formData.teacher_id}
										onChange={handleInputChange}
										required
										placeholder="e.g., TCH001"
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
									>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
										<option value="On Leave">On Leave</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>First Name *</Form.Label>
									<Form.Control
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
									<Form.Label>Joining Date *</Form.Label>
									<Form.Control
										type="date"
										name="joining_date"
										value={formData.joining_date}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Department</Form.Label>
									<Form.Control
										name="department"
										value={formData.department}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Qualification</Form.Label>
									<Form.Control
										name="qualification"
										value={formData.qualification}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Specialization</Form.Label>
									<Form.Control
										name="specialization"
										value={formData.specialization}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Salary</Form.Label>
									<Form.Control
										type="number"
										name="salary"
										value={formData.salary}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
						</Row>
						<div className="text-end">
							<Button
								variant="secondary"
								onClick={() => setShowModal(false)}
								className="me-2"
							>
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								{modalMode === "add" ? "Add Teacher" : "Update Teacher"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default TeacherManagement;
