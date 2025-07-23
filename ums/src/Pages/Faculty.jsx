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

import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Form,
	InputGroup,
} from "react-bootstrap";
import {
	FaSearch,
	FaEnvelope,
	FaPhone,
	FaGraduationCap,
	FaBook,
	FaAward,
	FaLinkedin,
} from "react-icons/fa";
import "./Pages.css";

const Faculty = () => {
	// Sample faculty data - in real app, this would come from an API
	const [faculty] = useState([
		{
			id: 1,
			name: "Dr. Sarah Johnson",
			title: "Professor of Computer Science",
			department: "Computer Science",
			education: "Ph.D. Computer Science, MIT",
			specialization: "Artificial Intelligence, Machine Learning",
			experience: "15 years",
			email: "sarah.johnson@eduverse.edu",
			phone: "+1-555-0101",
			office: "CS Building, Room 301",
			image:
				"https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
			bio: "Dr. Johnson is a leading researcher in artificial intelligence with over 50 published papers and 3 patents in machine learning algorithms.",
			achievements: [
				"IEEE Fellow",
				"Best Paper Award 2023",
				"NSF Career Award",
			],
			courses: [
				"Introduction to AI",
				"Machine Learning",
				"Advanced Algorithms",
			],
			featured: true,
		},
		{
			id: 2,
			name: "Dr. Michael Chen",
			title: "Associate Professor of Business",
			department: "Business Administration",
			education: "Ph.D. Business Administration, Harvard",
			specialization: "Strategic Management, Entrepreneurship",
			experience: "12 years",
			email: "michael.chen@eduverse.edu",
			phone: "+1-555-0102",
			office: "Business Building, Room 205",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Dr. Chen specializes in strategic management and has consulted for Fortune 500 companies on digital transformation strategies.",
			achievements: [
				"McKinsey Research Award",
				"Top 40 Under 40",
				"Published Author",
			],
			courses: [
				"Strategic Management",
				"Entrepreneurship",
				"Business Innovation",
			],
			featured: false,
		},
		{
			id: 3,
			name: "Dr. Emily Rodriguez",
			title: "Professor of Biology",
			department: "Biology",
			education: "Ph.D. Molecular Biology, Stanford",
			specialization: "Genetics, Biotechnology",
			experience: "18 years",
			email: "emily.rodriguez@eduverse.edu",
			phone: "+1-555-0103",
			office: "Science Building, Room 415",
			image:
				"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Dr. Rodriguez leads groundbreaking research in genetic engineering and has contributed to major breakthroughs in biotechnology.",
			achievements: [
				"Nobel Prize Nominee",
				"NIH Grant Recipient",
				"Science Magazine Cover",
			],
			courses: ["Molecular Biology", "Genetics", "Biotechnology Lab"],
			featured: true,
		},
		{
			id: 4,
			name: "Dr. James Wilson",
			title: "Assistant Professor of Engineering",
			department: "Engineering",
			education: "Ph.D. Mechanical Engineering, Caltech",
			specialization: "Robotics, Automation",
			experience: "8 years",
			email: "james.wilson@eduverse.edu",
			phone: "+1-555-0104",
			office: "Engineering Building, Room 120",
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
			bio: "Dr. Wilson is an expert in robotics and automation, with extensive industry experience at leading tech companies.",
			achievements: [
				"IEEE Young Engineer Award",
				"Patent Holder",
				"Industry Partnership",
			],
			courses: ["Robotics Engineering", "Control Systems", "Automation Design"],
			featured: false,
		},
		{
			id: 5,
			name: "Dr. Lisa Zhang",
			title: "Professor of International Relations",
			department: "Political Science",
			education: "Ph.D. Political Science, Oxford",
			specialization: "International Diplomacy, Global Politics",
			experience: "20 years",
			email: "lisa.zhang@eduverse.edu",
			phone: "+1-555-0105",
			office: "Liberal Arts Building, Room 308",
			image:
				"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
			bio: "Dr. Zhang is a renowned expert in international relations with diplomatic experience and policy advisory roles.",
			achievements: ["UN Advisor", "Fulbright Scholar", "Diplomatic Medal"],
			courses: [
				"International Relations",
				"Diplomatic Studies",
				"Global Politics",
			],
			featured: true,
		},
		{
			id: 6,
			name: "Dr. Robert Taylor",
			title: "Associate Professor of Mathematics",
			department: "Mathematics",
			education: "Ph.D. Mathematics, Princeton",
			specialization: "Applied Mathematics, Statistics",
			experience: "14 years",
			email: "robert.taylor@eduverse.edu",
			phone: "+1-555-0106",
			office: "Math Building, Room 201",
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
			bio: "Dr. Taylor specializes in applied mathematics and has made significant contributions to statistical modeling and analysis.",
			achievements: [
				"Mathematical Society Fellow",
				"Research Excellence Award",
				"Published Textbook",
			],
			courses: ["Calculus", "Statistics", "Applied Mathematics"],
			featured: false,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("All");

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

									<Card.Body className="d-flex flex-column">
										<div className="faculty-header mb-3">
											<h5 className="faculty-name">{member.name}</h5>
											<p className="faculty-title text-primary mb-1">
												{member.title}
											</p>
											<Badge bg="secondary" className="department-badge">
												{member.department}
											</Badge>
										</div>

										<div className="faculty-education mb-2">
											<small className="text-muted">
												<FaGraduationCap className="me-1" />
												{member.education}
											</small>
										</div>

										<div className="faculty-specialization mb-3">
											<strong>Specialization:</strong>
											<p className="text-muted mb-0">{member.specialization}</p>
										</div>

										<p className="faculty-bio">{member.bio}</p>

										<div className="faculty-achievements mb-3">
											<h6 className="mb-2">Achievements:</h6>
											<div className="d-flex flex-wrap gap-1">
												{member.achievements.map((achievement, index) => (
													<Badge
														key={index}
														bg="success"
														className="achievement-badge"
													>
														{achievement}
													</Badge>
												))}
											</div>
										</div>

										<div className="faculty-courses mb-3">
											<h6 className="mb-2">Courses:</h6>
											<div className="d-flex flex-wrap gap-1">
												{member.courses.map((course, index) => (
													<Badge
														key={index}
														bg="light"
														text="dark"
														className="course-badge"
													>
														<FaBook className="me-1" />
														{course}
													</Badge>
												))}
											</div>
										</div>

										<div className="mt-auto">
											<div className="faculty-contact">
												<div className="contact-item">
													<FaEnvelope className="contact-icon" />
													<small>{member.email}</small>
												</div>
												<div className="contact-item">
													<FaPhone className="contact-icon" />
													<small>{member.phone}</small>
												</div>
												<div className="contact-item mb-3">
													<FaGraduationCap className="contact-icon" />
													<small>{member.office}</small>
												</div>
											</div>
											<Button variant="outline-primary" className="w-100">
												<FaLinkedin className="me-2" />
												View Profile
											</Button>
										</div>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>

					{filteredFaculty.length === 0 && (
						<Row>
							<Col className="text-center py-5">
								<h4>No faculty members found</h4>
								<p className="text-muted">Try adjusting your search criteria</p>
							</Col>
						</Row>
					)}
				</Container>
			</section>
		</div>
	);
};

export default Faculty;
