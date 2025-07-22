/* 
====================================
STEP 7: WHY CHOOSE US COMPONENT
====================================
This component highlights:
- Key benefits and advantages of the university
- Statistics and achievements
- Student testimonials quotes
- Visual icons and engaging animations
*/

import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import {
	FaGraduationCap,
	FaUsers,
	FaGlobe,
	FaAward,
	FaBook,
	FaLaptop,
	FaHandshake,
	FaStar,
} from "react-icons/fa";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
	// Key features and benefits data
	const features = [
		{
			id: 1,
			icon: FaGraduationCap,
			title: "Academic Excellence",
			description:
				"Top-ranked programs with world-class faculty and cutting-edge curriculum designed for success.",
			color: "primary",
		},
		{
			id: 2,
			icon: FaUsers,
			title: "Diverse Community",
			description:
				"Learn alongside students from over 80 countries in an inclusive, multicultural environment.",
			color: "success",
		},
		{
			id: 3,
			icon: FaGlobe,
			title: "Global Opportunities",
			description:
				"Study abroad programs, international internships, and global partnership opportunities.",
			color: "info",
		},
		{
			id: 4,
			icon: FaAward,
			title: "Industry Recognition",
			description:
				"Degrees recognized worldwide with strong industry connections and job placement rates.",
			color: "warning",
		},
		{
			id: 5,
			icon: FaBook,
			title: "Research Excellence",
			description:
				"Leading research facilities and opportunities to work on groundbreaking projects.",
			color: "danger",
		},
		{
			id: 6,
			icon: FaLaptop,
			title: "Modern Technology",
			description:
				"State-of-the-art labs, digital learning platforms, and innovative teaching methods.",
			color: "secondary",
		},
	];

	// Statistics data
	const statistics = [
		{
			id: 1,
			icon: FaUsers,
			value: "50,000+",
			label: "Students Worldwide",
			percentage: 95,
		},
		{
			id: 2,
			icon: FaGraduationCap,
			value: "98%",
			label: "Graduate Employment Rate",
			percentage: 98,
		},
		{
			id: 3,
			icon: FaHandshake,
			value: "500+",
			label: "Industry Partners",
			percentage: 87,
		},
		{
			id: 4,
			icon: FaStar,
			value: "4.8/5",
			label: "Student Satisfaction",
			percentage: 96,
		},
	];

	// Student testimonial quotes
	const testimonials = [
		{
			id: 1,
			quote:
				"The diverse learning environment and exceptional faculty prepared me for a successful career in technology.",
			author: "Sarah Johnson",
			program: "Computer Science '24",
		},
		{
			id: 2,
			quote:
				"Research opportunities here opened doors I never imagined. I published 3 papers before graduation!",
			author: "Michael Chen",
			program: "Biology '23",
		},
		{
			id: 3,
			quote:
				"The global perspective and international programs gave me invaluable experience for my business career.",
			author: "Emma Rodriguez",
			program: "Business Administration '24",
		},
	];

	return (
		<section id="why-choose-us" className="why-choose-section py-5">
			<Container>
				{/* Section Header */}
				<Row className="text-center mb-5">
					<Col>
						<h2 className="section-title">Why Choose EduVerse University?</h2>
						<p className="section-subtitle">
							Discover what makes us the preferred choice for students worldwide
						</p>
					</Col>
				</Row>

				{/* Features Grid */}
				<Row className="mb-5">
					{features.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<Col lg={4} md={6} key={feature.id} className="mb-4">
								<Card className="feature-card h-100">
									<Card.Body className="text-center">
										<div className={`feature-icon bg-${feature.color}`}>
											<IconComponent size={35} />
										</div>
										<h4 className="feature-title">{feature.title}</h4>
										<p className="feature-description">{feature.description}</p>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>

				{/* Statistics Section */}
				<Row className="statistics-section mb-5">
					<Col>
						<div className="statistics-container">
							<Row>
								<Col lg={6} className="mb-4">
									<h3 className="statistics-title">Our Impact in Numbers</h3>
									<p className="statistics-subtitle">
										These numbers reflect our commitment to excellence and
										student success
									</p>
								</Col>
								<Col lg={6}>
									<Row>
										{statistics.map((stat) => {
											const IconComponent = stat.icon;
											return (
												<Col sm={6} key={stat.id} className="mb-4">
													<div className="stat-item">
														<div className="stat-icon">
															<IconComponent size={25} />
														</div>
														<div className="stat-content">
															<div className="stat-value">{stat.value}</div>
															<div className="stat-label">{stat.label}</div>
															<ProgressBar
																now={stat.percentage}
																className="stat-progress"
																variant="primary"
															/>
														</div>
													</div>
												</Col>
											);
										})}
									</Row>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>

				{/* Testimonials Section */}
				<Row>
					<Col>
						<h3 className="testimonials-title text-center mb-4">
							What Our Students Say
						</h3>
						<Row>
							{testimonials.map((testimonial) => (
								<Col lg={4} md={6} key={testimonial.id} className="mb-4">
									<Card className="testimonial-card h-100">
										<Card.Body>
											<div className="quote-icon">
												<FaStar />
											</div>
											<blockquote className="testimonial-quote">
												"{testimonial.quote}"
											</blockquote>
											<div className="testimonial-author">
												<strong>{testimonial.author}</strong>
												<div className="testimonial-program">
													{testimonial.program}
												</div>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					</Col>
				</Row>

				{/* Call to Action */}
				<Row className="text-center mt-5">
					<Col>
						<div className="cta-section">
							<h3 className="cta-title">Ready to Join Our Community?</h3>
							<p className="cta-subtitle">
								Take the first step towards your bright future with EduVerse
								University
							</p>
							<div className="cta-buttons">
								<button
									className="btn btn-primary btn-lg me-3"
									onClick={() => alert("Apply Now - Coming soon!")}
								>
									Apply Now
								</button>
								<button
									className="btn btn-outline-primary btn-lg"
									onClick={() =>
										document
											.getElementById("contact")
											.scrollIntoView({ behavior: "smooth" })
									}
								>
									Contact Us
								</button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default WhyChooseUs;
