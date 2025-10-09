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
	FaGraduationCap,
	FaSearch,
	FaClock,
	FaUsers,
	FaStar,
	FaBookOpen,
	FaChalkboardTeacher,
} from "react-icons/fa";
import { courseAPI } from "../services/api";
import "./Pages.css";

const Programs = () => {
	const [programs, setPrograms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedLevel, setSelectedLevel] = useState("All");

	// Fetch courses from API
	useEffect(() => {
		const fetchPrograms = async () => {
			try {
				setLoading(true);
				const response = await courseAPI.getAll();
				if (response.data.success) {
					// Transform course data to match program format
					const transformedPrograms = response.data.data
						.filter((course) => course.status === "Active") // Only show active courses
						.map((course) => ({
							id: course.id,
							title: course.course_name,
							level: course.semester || "Undergraduate", // Use semester or default
							duration: course.duration || "Variable",
							category: course.department || "General",
							description: course.description || "No description available",
							features: course.description
								? course.description
										.split(".")
										.filter((s) => s.trim().length > 0)
										.slice(0, 4)
								: ["Course content available upon enrollment"],
							tuition: "Contact admissions",
							rating: 4.5, // Default rating (could be calculated from reviews in future)
							students: course.max_students || 0,
							credits: course.credits,
							teacher_name: course.teacher_name || "TBA",
							course_code: course.course_code,
							featured: course.credits >= 4, // Featured if 4+ credits
						}));
					setPrograms(transformedPrograms);
				}
			} catch (err) {
				console.error("Error fetching programs:", err);
				setError("Failed to load programs. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchPrograms();
	}, []);

	// Get unique categories and levels for filters
	const categories = [
		"All",
		...new Set(programs.map((program) => program.category)),
	];
	const levels = ["All", ...new Set(programs.map((program) => program.level))];

	// Filter programs based on search and filters
	const filteredPrograms = programs.filter((program) => {
		const matchesSearch =
			program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			program.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || program.category === selectedCategory;
		const matchesLevel =
			selectedLevel === "All" || program.level === selectedLevel;

		return matchesSearch && matchesCategory && matchesLevel;
	});

	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Technology: "primary",
			Business: "success",
			Engineering: "warning",
			"Liberal Arts": "info",
			Science: "secondary",
		};
		return colors[category] || "secondary";
	};

	return (
		<div className="programs-page">
			{/* Page Header */}
			<section className="page-header bg-primary text-white py-5">
				<Container>
					<Row className="text-center">
						<Col>
							<h1 className="display-4 fw-bold my-5">
								<FaGraduationCap className="me-3" />
								Academic Programs
							</h1>
							<p className="lead">
								Discover world-class education opportunities designed to shape
								your future
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Search and Filters */}
			<section className="py-4 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col md={6}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Search programs..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={3}>
							<Form.Select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={3}>
							<Form.Select
								value={selectedLevel}
								onChange={(e) => setSelectedLevel(e.target.value)}
							>
								{levels.map((level) => (
									<option key={level} value={level}>
										{level}
									</option>
								))}
							</Form.Select>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Programs Grid */}
			<section className="py-5">
				<Container>
					{/* Loading State */}
					{loading && (
						<div className="text-center py-5">
							<Spinner animation="border" variant="primary" size="lg" />
							<p className="mt-3 text-muted">Loading programs...</p>
						</div>
					)}

					{/* Error State */}
					{error && (
						<Alert variant="danger" className="text-center">
							<h5>Oops! Something went wrong</h5>
							<p className="mb-0">{error}</p>
						</Alert>
					)}

					{/* No Programs State */}
					{!loading && !error && programs.length === 0 && (
						<Alert variant="info" className="text-center">
							<FaGraduationCap size={50} className="mb-3" />
							<h5>No programs available</h5>
							<p className="mb-0">
								Please check back later or contact admissions for more
								information.
							</p>
						</Alert>
					)}

					{/* Programs Display */}
					{!loading && !error && programs.length > 0 && (
						<Row>
							{filteredPrograms.map((program) => (
								<Col lg={4} md={6} className="mb-4" key={program.id}>
									<Card className="program-card h-100">
										{program.featured && (
											<div className="featured-badge">
												<Badge bg="warning" className="featured-text">
													<FaStar className="me-1" />
													Featured
												</Badge>
											</div>
										)}

										<Card.Body className="d-flex flex-column">
											<div className="program-header mb-3">
												<div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
													<h5 className="program-title mb-0">
														{program.title}
													</h5>
													<Badge
														bg={getCategoryColor(program.category)}
														className="flex-shrink-0"
													>
														{program.category}
													</Badge>
												</div>
												<div className="d-flex align-items-center text-muted mb-2">
													<FaGraduationCap className="me-2" />
													<span>{program.level}</span>
													<FaClock className="ms-3 me-2" />
													<span>{program.duration}</span>
												</div>
												{program.course_code && (
													<div className="text-muted small">
														<strong>Course Code:</strong> {program.course_code}
													</div>
												)}
												{program.teacher_name &&
													program.teacher_name !== "TBA" && (
														<div className="text-muted small">
															<FaChalkboardTeacher className="me-1" />
															{program.teacher_name}
														</div>
													)}
											</div>

											<p className="program-description">
												{program.description}
											</p>

											<div className="program-features mb-3">
												<h6 className="mb-2">Key Areas:</h6>
												<div className="d-flex flex-wrap gap-1">
													{program.features.map((feature, index) => (
														<Badge
															key={index}
															bg="light"
															text="dark"
															className="feature-badge"
														>
															{feature}
														</Badge>
													))}
												</div>
											</div>

											<div className="program-stats mb-3">
												<Row className="text-center">
													<Col>
														<div className="stat">
															<FaUsers className="text-primary" />
															<div className="stat-value">
																{program.students}
															</div>
															<div className="stat-label">Max Students</div>
														</div>
													</Col>
													<Col>
														<div className="stat">
															<FaBookOpen className="text-success" />
															<div className="stat-value">
																{program.credits}
															</div>
															<div className="stat-label">Credits</div>
														</div>
													</Col>
												</Row>
											</div>

											<div className="mt-auto">
												<div className="d-flex justify-content-between align-items-center mb-3">
													<span className="tuition-cost fw-bold text-primary">
														{program.tuition}
													</span>
												</div>
												<Button variant="primary" className="w-100">
													<FaBookOpen className="me-2" />
													Learn More
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
						programs.length > 0 &&
						filteredPrograms.length === 0 && (
							<Row>
								<Col className="text-center py-5">
									<h4>No programs found</h4>
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

export default Programs;
