/* Course Management - Full CRUD */

import React, { useState, useEffect } from "react";
import {
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
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBook } from "react-icons/fa";
import { courseAPI, teacherAPI } from "../../services/api";
import "./Admin.css";

const CourseManagement = () => {
	const [courses, setCourses] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [currentCourse, setCurrentCourse] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [formData, setFormData] = useState({
		course_code: "",
		course_name: "",
		description: "",
		credits: "",
		duration: "",
		teacher_id: "",
		department: "",
		semester: "",
		max_students: "50",
		status: "Active",
	});

	useEffect(() => {
		fetchCourses();
		fetchTeachers();
	}, []);

	const fetchCourses = async () => {
		try {
			setLoading(true);
			const response = await courseAPI.getAll();
			if (response.data.success) setCourses(response.data.data);
		} catch (err) {
			console.error("Error fetching courses:", err);
			setError("Failed to load courses");
		} finally {
			setLoading(false);
		}
	};

	const fetchTeachers = async () => {
		try {
			const response = await teacherAPI.getAll();
			if (response.data.success) setTeachers(response.data.data);
		} catch (err) {
			console.error("Error fetching teachers:", err);
		}
	};

	const filteredCourses = courses.filter(
		(course) =>
			course.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.department?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddClick = () => {
		setModalMode("add");
		setFormData({
			course_code: "",
			course_name: "",
			description: "",
			credits: "",
			duration: "16 weeks",
			teacher_id: "",
			department: "",
			semester: "",
			max_students: "50",
			status: "Active",
		});
		setShowModal(true);
	};

	const handleEditClick = (course) => {
		setModalMode("edit");
		setFormData({
			course_code: course.course_code,
			course_name: course.course_name,
			description: course.description || "",
			credits: course.credits,
			duration: course.duration || "",
			teacher_id: course.teacher_id || "",
			department: course.department || "",
			semester: course.semester || "",
			max_students: course.max_students,
			status: course.status,
		});
		setCurrentCourse(course);
		setShowModal(true);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (modalMode === "add") {
				await courseAPI.create(formData);
				setSuccess("Course added successfully!");
			} else {
				await courseAPI.update(currentCourse.id, formData);
				setSuccess("Course updated successfully!");
			}
			fetchCourses();
			setShowModal(false);
		} catch (err) {
			console.error("Error saving course:", err);
			setError(err.response?.data?.message || "Failed to save course");
		}
	};

	const handleDelete = async (course) => {
		if (window.confirm(`Delete ${course.course_name}?`)) {
			try {
				await courseAPI.delete(course.id);
				setSuccess("Course deleted successfully!");
				fetchCourses();
			} catch (err) {
				console.error("Error deleting course:", err);
				setError("Failed to delete course");
			}
		}
	};

	return (
		<div className="course-management">
			<Row className="mb-4">
				<Col>
					<h2 className="fw-bold">
						<FaBook className="me-2" />
						Course Management
					</h2>
					<p className="text-muted">Manage all courses and curriculum</p>
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
									placeholder="Search by course code, name, or department..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={4} className="text-end">
							<Button variant="primary" onClick={handleAddClick}>
								<FaPlus className="me-2" />
								Add New Course
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
									<th>Course Code</th>
									<th>Course Name</th>
									<th>Credits</th>
									<th>Duration</th>
									<th>Teacher</th>
									<th>Department</th>
									<th>Max Students</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredCourses.map((course) => (
									<tr key={course.id}>
										<td>
											<strong>{course.course_code}</strong>
										</td>
										<td>{course.course_name}</td>
										<td>{course.credits}</td>
										<td>{course.duration}</td>
										<td>{course.teacher_name || "Not Assigned"}</td>
										<td>{course.department}</td>
										<td>{course.max_students}</td>
										<td>
											<Badge
												bg={
													course.status === "Active" ? "success" : "secondary"
												}
											>
												{course.status}
											</Badge>
										</td>
										<td>
											<Button
												variant="outline-primary"
												size="sm"
												className="me-2"
												onClick={() => handleEditClick(course)}
											>
												<FaEdit />
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDelete(course)}
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
						Total Courses: <strong>{filteredCourses.length}</strong>
					</div>
				</Card.Body>
			</Card>

			<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>
						{modalMode === "add" ? "Add New Course" : "Edit Course"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Course Code *</Form.Label>
									<Form.Control
										name="course_code"
										value={formData.course_code}
										onChange={handleInputChange}
										required
										placeholder="e.g., CS101"
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Credits *</Form.Label>
									<Form.Control
										type="number"
										name="credits"
										value={formData.credits}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group className="mb-3">
							<Form.Label>Course Name *</Form.Label>
							<Form.Control
								name="course_name"
								value={formData.course_name}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="description"
								value={formData.description}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Duration</Form.Label>
									<Form.Control
										name="duration"
										value={formData.duration}
										onChange={handleInputChange}
										placeholder="e.g., 16 weeks"
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Teacher</Form.Label>
									<Form.Select
										name="teacher_id"
										value={formData.teacher_id}
										onChange={handleInputChange}
									>
										<option value="">Not Assigned</option>
										{teachers.map((teacher) => (
											<option key={teacher.id} value={teacher.id}>
												{teacher.first_name} {teacher.last_name}
											</option>
										))}
									</Form.Select>
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
									<Form.Label>Semester</Form.Label>
									<Form.Control
										name="semester"
										value={formData.semester}
										onChange={handleInputChange}
										placeholder="e.g., Fall 2024"
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Max Students</Form.Label>
									<Form.Control
										type="number"
										name="max_students"
										value={formData.max_students}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Status</Form.Label>
									<Form.Select
										name="status"
										value={formData.status}
										onChange={handleInputChange}
									>
										<option value="Active">Active</option>
										<option value="Inactive">Inactive</option>
									</Form.Select>
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
								{modalMode === "add" ? "Add Course" : "Update Course"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CourseManagement;
