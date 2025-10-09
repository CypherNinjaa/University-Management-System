/* 
====================================
FACULTY PAGE COMPONENT
====================================
This component displays faculty members and departments:
- Faculty directory with photos and bios
- Department information
- Research areas and publications
- Contact information
*/

import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Form,
	InputGroup,
	Spinner,
	Alert,
} from "react-bootstrap";
import {
	FaSearch,
	FaEnvelope,
	FaPhone,
	FaGraduationCap,
	FaBook,
	FaAward,
	FaLinkedin,
	FaUserTie,
} from "react-icons/fa";
import { teacherAPI } from "../services/api";
import "./Pages.css";

const Faculty = () => {
	const [faculty, setFaculty] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("All");

	// Fetch teachers from API
	useEffect(() => {
		const fetchFaculty = async () => {
			try {
				setLoading(true);
				const response = await teacherAPI.getAll();
				if (response.data.success) {
					// Transform teacher data to faculty format
					const transformedFaculty = response.data.data
						.filter((teacher) => teacher.status === "Active") // Only show active faculty
						.map((teacher) => ({
							id: teacher.id,
							name: `${teacher.first_name} ${teacher.last_name}`,
							title: teacher.qualification || "Faculty Member",
							department: teacher.department || "General",
							education: teacher.qualification || "N/A",
							specialization: teacher.specialization || "Various subjects",
							experience: teacher.joining_date
								? `${
										new Date().getFullYear() -
										new Date(teacher.joining_date).getFullYear()
								  } years`
								: "N/A",
							email: teacher.email,
							phone: teacher.phone || "N/A",
							office: teacher.department
								? `${teacher.department} Department`
								: "TBA",
							teacher_id: teacher.teacher_id,
							// Use a professional placeholder image or first letter avatar
							image: `https://ui-avatars.com/api/?name=${teacher.first_name}+${teacher.last_name}&size=400&background=random&bold=true`,
							bio: teacher.specialization
								? `Specializes in ${teacher.specialization} with extensive experience in the field.`
								: "Dedicated educator committed to student success.",
							// Default values for fields not in database
							achievements: teacher.qualification
								? [teacher.qualification]
								: ["Experienced Educator"],
							courses: teacher.specialization
								? teacher.specialization
										.split(",")
										.map((s) => s.trim())
										.slice(0, 3)
								: ["Various Courses"],
							featured:
								teacher.qualification &&
								(teacher.qualification.includes("Ph.D") ||
									teacher.qualification.includes("Professor")),
							salary: teacher.salary,
							date_of_birth: teacher.date_of_birth,
						}));
					setFaculty(transformedFaculty);
				}
			} catch (err) {
				console.error("Error fetching faculty:", err);
				setError("Failed to load faculty members. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchFaculty();
	}, []);

	// Get unique departments for filter
	const departments = [
		"All",
		...new Set(faculty.map((member) => member.department)),
	];

	// Filter faculty based on search and department
	const filteredFaculty = faculty.filter((member) => {
		const matchesSearch =
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.department.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDepartment =
			selectedDepartment === "All" || member.department === selectedDepartment;

		return matchesSearch && matchesDepartment;
	});

	return (
		<div className="faculty-page">
			{/* Page Header */}
			<section className="page-header bg-primary text-white py-5">
				<Container>
					<Row className="text-center">
						<Col>
							<h1 className="display-4 fw-bold">
								<FaGraduationCap className="me-3" />
								Our Faculty
							</h1>
							<p className="lead">
								Meet our world-class educators and researchers who are shaping
								the future
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Search and Filters */}
			<section className="py-4 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col md={8}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Search faculty by name, department, or specialization..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={4}>
							<Form.Select
								value={selectedDepartment}
								onChange={(e) => setSelectedDepartment(e.target.value)}
							>
								{departments.map((department) => (
									<option key={department} value={department}>
										{department === "All" ? "All Departments" : department}
									</option>
								))}
							</Form.Select>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Faculty Grid */}
			<section className="py-5">
				<Container>
					{/* Loading State */}
					{loading && (
						<div className="text-center py-5">
							<Spinner animation="border" variant="primary" size="lg" />
							<p className="mt-3 text-muted">Loading faculty members...</p>
						</div>
					)}

					{/* Error State */}
					{error && (
						<Alert variant="danger" className="text-center">
							<h5>Oops! Something went wrong</h5>
							<p className="mb-0">{error}</p>
						</Alert>
					)}

					{/* No Faculty State */}
					{!loading && !error && faculty.length === 0 && (
						<Alert variant="info" className="text-center">
							<FaUserTie size={50} className="mb-3" />
							<h5>No faculty members available</h5>
							<p className="mb-0">
								Please check back later or contact administration for more
								information.
							</p>
						</Alert>
					)}

					{/* Faculty Display */}
					{!loading && !error && faculty.length > 0 && (
						<Row>
							{filteredFaculty.map((member) => (
								<Col lg={4} md={6} className="mb-4" key={member.id}>
									<Card className="faculty-card h-100">
										{member.featured && (
											<div className="featured-badge">
												<Badge bg="warning" className="featured-text">
													<FaAward className="me-1" />
													Distinguished
												</Badge>
											</div>
										)}

										<div className="faculty-image-container">
											<img
												src={member.image}
												alt={member.name}
												className="faculty-image"
											/>
										</div>

										<Card.Body className="d-flex flex-column p-3">
											{/* Header Section - Compact */}
											<div className="faculty-header mb-2">
												<h5 className="faculty-name mb-1">{member.name}</h5>
												<p className="faculty-title text-primary mb-1 small">
													{member.title}
												</p>
												<div className="d-flex align-items-center gap-2 flex-wrap">
													<Badge bg="secondary" className="department-badge">
														{member.department}
													</Badge>
													{member.experience && member.experience !== "N/A" && (
														<small className="text-muted">
															{member.experience}
														</small>
													)}
												</div>
											</div>

											{/* Specialization - Compact */}
											<div className="faculty-specialization mb-2">
												<small className="text-muted d-block">
													<strong>Specialization:</strong>{" "}
													{member.specialization.length > 60
														? member.specialization.substring(0, 60) + "..."
														: member.specialization}
												</small>
											</div>

											{/* Areas of Expertise - Limit to 3 */}
											{member.courses && member.courses.length > 0 && (
												<div className="faculty-courses mb-2">
													<small className="text-muted d-block mb-1">
														<strong>Expertise:</strong>
													</small>
													<div className="d-flex flex-wrap gap-1">
														{member.courses.slice(0, 3).map((course, index) => (
															<Badge
																key={index}
																bg="light"
																text="dark"
																className="course-badge"
															>
																{course}
															</Badge>
														))}
														{member.courses.length > 3 && (
															<Badge bg="light" text="dark">
																+{member.courses.length - 3}
															</Badge>
														)}
													</div>
												</div>
											)}

											{/* Qualification Badge - Single Line */}
											{member.achievements &&
												member.achievements.length > 0 && (
													<div className="mb-2">
														<Badge bg="success" className="achievement-badge">
															<FaAward className="me-1" />
															{member.achievements[0]}
														</Badge>
													</div>
												)}

											{/* Contact Section - Compact */}
											<div className="mt-auto pt-2 border-top">
												<div className="faculty-contact-compact mb-2">
													<div className="d-flex align-items-center mb-1">
														<FaEnvelope
															className="text-primary me-2"
															size={12}
														/>
														<small className="text-truncate">
															{member.email}
														</small>
													</div>
													{member.phone && member.phone !== "N/A" && (
														<div className="d-flex align-items-center mb-1">
															<FaPhone
																className="text-primary me-2"
																size={12}
															/>
															<small>{member.phone}</small>
														</div>
													)}
													<div className="d-flex align-items-center">
														<FaGraduationCap
															className="text-primary me-2"
															size={12}
														/>
														<small>{member.office}</small>
													</div>
												</div>
												<Button
													variant="outline-primary"
													size="sm"
													className="w-100"
												>
													<FaLinkedin className="me-1" />
													View Full Profile
												</Button>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					)}

					{!loading &&
						!error &&
						faculty.length > 0 &&
						filteredFaculty.length === 0 && (
							<Row>
								<Col className="text-center py-5">
									<h4>No faculty members found</h4>
									<p className="text-muted">
										Try adjusting your search criteria
									</p>
								</Col>
							</Row>
						)}
				</Container>
			</section>
		</div>
	);
};

export default Faculty;
