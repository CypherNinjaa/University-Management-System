/* 
====================================
STEP 9: FAQ (FREQUENTLY ASKED QUESTIONS) COMPONENT
====================================
This component displays:
- Collapsible accordion for frequently asked questions
- Organized by categories (Admissions, Academics, Campus Life, etc.)
- Search functionality for finding specific questions
- Contact information for additional help
*/

import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Accordion,
	Card,
	Form,
	InputGroup,
	Button,
} from "react-bootstrap";
import {
	FaQuestionCircle,
	FaSearch,
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
} from "react-icons/fa";
import "./FAQ.css";

const FAQ = () => {
	// FAQ data organized by categories
	const [faqData] = useState([
		{
			category: "Admissions",
			questions: [
				{
					id: 1,
					question:
						"What are the admission requirements for undergraduate programs?",
					answer:
						"Our undergraduate admission requirements include: High school diploma or equivalent, minimum GPA of 3.0, SAT/ACT scores, two letters of recommendation, personal essay, and proof of English proficiency for international students.",
				},
				{
					id: 2,
					question: "When is the application deadline?",
					answer:
						"Application deadlines vary by program: Fall semester - April 1st, Spring semester - November 1st, Summer semester - March 1st. We recommend applying early as some popular programs may reach capacity before the deadline.",
				},
				{
					id: 3,
					question: "Do you accept transfer students?",
					answer:
						"Yes, we welcome transfer students from accredited institutions. Transfer applications are reviewed on a case-by-case basis. We typically accept up to 60 credit hours from previous institutions.",
				},
			],
		},
		{
			category: "Academics",
			questions: [
				{
					id: 4,
					question: "How many programs do you offer?",
					answer:
						"We offer over 100 undergraduate and graduate programs across 12 colleges and schools, including Business, Engineering, Liberal Arts, Sciences, Medicine, Law, and more.",
				},
				{
					id: 5,
					question: "What is the student-to-faculty ratio?",
					answer:
						"Our student-to-faculty ratio is 12:1, ensuring personalized attention and mentorship opportunities. Most classes have fewer than 25 students, promoting interactive learning and discussion.",
				},
				{
					id: 6,
					question: "Are online courses available?",
					answer:
						"Yes, we offer both fully online degree programs and hybrid courses that combine online and in-person instruction. Our online platform provides the same quality education as our on-campus programs.",
				},
			],
		},
		{
			category: "Campus Life",
			questions: [
				{
					id: 7,
					question: "What housing options are available?",
					answer:
						"We offer various housing options including traditional residence halls, suite-style living, apartments for upperclassmen, and graduate housing. All first-year students are guaranteed on-campus housing.",
				},
				{
					id: 8,
					question: "What dining plans are available?",
					answer:
						"We offer flexible meal plans ranging from 10 to 21 meals per week, plus dining dollars that can be used at various campus restaurants, cafes, and convenience stores.",
				},
				{
					id: 9,
					question: "What extracurricular activities are available?",
					answer:
						"We have over 200 student organizations, including academic clubs, sports teams, cultural groups, volunteer organizations, and Greek life. There's something for every interest!",
				},
			],
		},
		{
			category: "Financial Aid",
			questions: [
				{
					id: 10,
					question: "What financial aid options are available?",
					answer:
						"We offer need-based grants, merit scholarships, work-study programs, and federal/state aid. Over 85% of our students receive some form of financial assistance.",
				},
				{
					id: 11,
					question: "How do I apply for scholarships?",
					answer:
						"Most scholarships are awarded automatically based on your admission application. Some require separate applications, which can be found on our financial aid website. Priority deadline is February 1st.",
				},
				{
					id: 12,
					question: "What is the average cost of attendance?",
					answer:
						"For the 2024-2025 academic year, tuition and fees are $45,000 for in-state students and $55,000 for out-of-state students. Room and board average $15,000 per year.",
				},
			],
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");

	// Filter FAQs based on search term and category
	const getFilteredFAQs = () => {
		let filteredData = faqData;

		// Filter by category
		if (activeCategory !== "All") {
			filteredData = faqData.filter(
				(category) => category.category === activeCategory
			);
		}

		// Filter by search term
		if (searchTerm) {
			filteredData = filteredData
				.map((category) => ({
					...category,
					questions: category.questions.filter(
						(faq) =>
							faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
							faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
					),
				}))
				.filter((category) => category.questions.length > 0);
		}

		return filteredData;
	};

	const filteredFAQs = getFilteredFAQs();

	return (
		<section id="faq" className="faq-section py-5">
			<Container>
				{/* Section Header */}
				<Row className="text-center mb-5">
					<Col>
						<h2 className="section-title">
							<FaQuestionCircle className="me-3" />
							Frequently Asked Questions
						</h2>
						<p className="section-subtitle">
							Find answers to common questions about admissions, academics,
							campus life, and more
						</p>
					</Col>
				</Row>

				{/* Search and Filter */}
				<Row className="mb-4">
					<Col lg={8} className="mx-auto">
						<Card className="search-card">
							<Card.Body>
								<Row>
									<Col md={8} className="mb-3 mb-md-0">
										<InputGroup>
											<InputGroup.Text>
												<FaSearch />
											</InputGroup.Text>
											<Form.Control
												type="text"
												placeholder="Search for questions..."
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												className="search-input"
											/>
										</InputGroup>
									</Col>
									<Col md={4}>
										<Form.Select
											value={activeCategory}
											onChange={(e) => setActiveCategory(e.target.value)}
											className="category-select"
										>
											<option value="All">All Categories</option>
											{faqData.map((category) => (
												<option
													key={category.category}
													value={category.category}
												>
													{category.category}
												</option>
											))}
										</Form.Select>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				{/* FAQ Accordions */}
				<Row>
					<Col lg={8} className="mx-auto">
						{filteredFAQs.length > 0 ? (
							filteredFAQs.map((category, categoryIndex) => (
								<div key={category.category} className="faq-category mb-4">
									<h3 className="category-title">{category.category}</h3>
									<Accordion flush>
										{category.questions.map((faq, index) => (
											<Accordion.Item
												key={faq.id}
												eventKey={`${categoryIndex}-${index}`}
											>
												<Accordion.Header className="faq-question">
													{faq.question}
												</Accordion.Header>
												<Accordion.Body className="faq-answer">
													{faq.answer}
												</Accordion.Body>
											</Accordion.Item>
										))}
									</Accordion>
								</div>
							))
						) : (
							<div className="no-results">
								<FaQuestionCircle size={50} className="no-results-icon" />
								<h4 className="no-results-title">
									No matching questions found
								</h4>
								<p className="no-results-text">
									Try adjusting your search terms or browse all categories
								</p>
								<Button
									variant="primary"
									onClick={() => {
										setSearchTerm("");
										setActiveCategory("All");
									}}
								>
									Clear Filters
								</Button>
							</div>
						)}
					</Col>
				</Row>

				{/* Contact Information */}
				<Row className="mt-5">
					<Col>
						<Card className="contact-help-card">
							<Card.Body>
								<Row>
									<Col lg={6} className="mb-4 mb-lg-0">
										<h4 className="help-title">Still have questions?</h4>
										<p className="help-text">
											Our admissions and student services teams are here to help
											you with any questions not covered above.
										</p>
									</Col>
									<Col lg={6}>
										<Row>
											<Col md={4} className="text-center mb-3">
												<div className="contact-method">
													<FaPhone className="contact-icon" />
													<div className="contact-info">
														<strong>Call Us</strong>
														<p>(555) 123-4567</p>
													</div>
												</div>
											</Col>
											<Col md={4} className="text-center mb-3">
												<div className="contact-method">
													<FaEnvelope className="contact-icon" />
													<div className="contact-info">
														<strong>Email Us</strong>
														<p>info@eduverse.edu</p>
													</div>
												</div>
											</Col>
											<Col md={4} className="text-center mb-3">
												<div className="contact-method">
													<FaMapMarkerAlt className="contact-icon" />
													<div className="contact-info">
														<strong>Visit Us</strong>
														<p>Campus Tours Daily</p>
													</div>
												</div>
											</Col>
										</Row>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default FAQ;
