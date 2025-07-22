/* 
====================================
STEP 3: HERO SECTION COMPONENT
====================================
This creates the main landing section with:
- Welcome message and university introduction
- Call-to-action buttons
- Background imagery
- Responsive design
*/

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGraduationCap, FaArrowRight, FaPlay } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
	return (
		<section id="home" className="hero-section">
			{/* Background overlay for better text readability */}
			<div className="hero-overlay"></div>

			<Container className="hero-content">
				<Row className="align-items-center min-vh-100">
					<Col lg={6} className="hero-text">
						{/* Main heading with university welcome message */}
						<h1 className="hero-title">
							Welcome to{" "}
							<span className="text-primary">EduVerse University</span>
						</h1>

						{/* Subtitle describing the university's mission */}
						<p className="hero-subtitle">
							Empowering minds, shaping futures. Join thousands of students in
							their journey to academic excellence and personal growth at one of
							the world's leading universities.
						</p>

						{/* Key highlights of the university */}
						<div className="hero-highlights">
							<div className="highlight-item">
								<FaGraduationCap className="highlight-icon" />
								<span>50,000+ Graduates</span>
							</div>
							<div className="highlight-item">
								<FaGraduationCap className="highlight-icon" />
								<span>100+ Programs</span>
							</div>
							<div className="highlight-item">
								<FaGraduationCap className="highlight-icon" />
								<span>World-Class Faculty</span>
							</div>
						</div>

						{/* Call-to-action buttons */}
						<div className="hero-buttons">
							<Button
								variant="primary"
								size="lg"
								className="cta-button me-3"
								onClick={() =>
									document
										.getElementById("programs")
										.scrollIntoView({ behavior: "smooth" })
								}
							>
								Explore Programs
								<FaArrowRight className="ms-2" />
							</Button>

							<Button
								variant="outline-light"
								size="lg"
								className="cta-button-outline"
								onClick={() => alert("Virtual tour feature coming soon!")}
							>
								<FaPlay className="me-2" />
								Virtual Tour
							</Button>
						</div>
					</Col>

					{/* Right side - Could contain an image or additional content */}
					<Col lg={6} className="hero-image">
						<div className="hero-image-placeholder">
							{/* Placeholder for university image - can be replaced with actual image */}
							<div className="university-visual">
								<FaGraduationCap size={150} className="main-icon" />
								<p className="visual-text">Your Future Starts Here</p>
							</div>
						</div>
					</Col>
				</Row>
			</Container>

			{/* Scroll indicator */}
			<div className="scroll-indicator">
				<div className="scroll-arrow"></div>
			</div>
		</section>
	);
};

export default HeroSection;
