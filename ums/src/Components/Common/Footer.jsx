import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	FaUniversity,
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaYoutube,
	FaPaperPlane,
	FaHeart,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Handle newsletter subscription
	const handleNewsletterSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			alert("Thank you for subscribing to our newsletter!");
			setEmail("");
			setIsSubmitting(false);
		}, 1000);
	};

	// Quick links data
	const quickLinks = [
		{ name: "Admissions", href: "/programs" },
		{ name: "Academic Programs", href: "/programs" },
		{ name: "Student Life", href: "/#student-life" },
		{ name: "Research", href: "/#research" },
		{ name: "Faculty", href: "/faculty" },
		{ name: "Alumni", href: "/#alumni" },
	];

	const studentResources = [
		{ name: "Student Portal", href: "#portal" },
		{ name: "Library", href: "#library" },
		{ name: "Career Services", href: "#careers" },
		{ name: "Financial Aid", href: "#financial-aid" },
		{ name: "Campus Safety", href: "#safety" },
		{ name: "IT Support", href: "#support" },
	];

	const aboutLinks = [
		{ name: "About Us", href: "/about" },
		{ name: "Mission & Vision", href: "/about#mission" },
		{ name: "Leadership", href: "/about#leadership" },
		{ name: "News & Events", href: "/#news" },
		{ name: "Campus Map", href: "/about#campus" },
		{ name: "Contact Us", href: "/contact" },
	];

	return (
		<footer id="footer" className="footer-section">
			{/* Main Footer Content */}
			<div className="footer-main">
				<Container>
					<Row>
						{/* University Info Column */}
						<Col lg={4} md={6} className="mb-4">
							<div className="footer-brand">
								<h3 className="brand-name">
									<FaUniversity className="me-2" />
									EduVerse University
								</h3>
								<p className="brand-tagline">
									Empowering minds, shaping futures since 1925
								</p>
								<p className="brand-description">
									EduVerse University is committed to providing world-class
									education, fostering innovation, and preparing students for
									success in a rapidly changing global landscape.
								</p>
							</div>

							{/* Contact Information */}
							<div className="contact-info">
								<h5 className="contact-title">Get in Touch</h5>
								<div className="contact-item">
									<FaMapMarkerAlt className="contact-icon" />
									<span>123 University Avenue, Education City, EC 12345</span>
								</div>
								<div className="contact-item">
									<FaPhone className="contact-icon" />
									<span>(555) 123-4567</span>
								</div>
								<div className="contact-item">
									<FaEnvelope className="contact-icon" />
									<span>info@eduverse.edu</span>
								</div>
							</div>
						</Col>

						{/* Quick Links Column */}
						<Col lg={2} md={6} className="mb-4">
							<h5 className="footer-heading">Quick Links</h5>
							<ul className="footer-links">
								{quickLinks.map((link, index) => (
									<li key={index}>
										{link.href.startsWith("/") ? (
											<Link to={link.href} className="footer-link">
												{link.name}
											</Link>
										) : (
											<a href={link.href} className="footer-link">
												{link.name}
											</a>
										)}
									</li>
								))}
							</ul>
						</Col>

						{/* Student Resources Column */}
						<Col lg={2} md={6} className="mb-4">
							<h5 className="footer-heading">Student Resources</h5>
							<ul className="footer-links">
								{studentResources.map((link, index) => (
									<li key={index}>
										<a href={link.href} className="footer-link">
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</Col>

						{/* About & Info Column */}
						<Col lg={2} md={6} className="mb-4">
							<h5 className="footer-heading">About & Info</h5>
							<ul className="footer-links">
								{aboutLinks.map((link, index) => (
									<li key={index}>
										<a href={link.href} className="footer-link">
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</Col>

						{/* Newsletter & Social Column */}
						<Col lg={2} md={12} className="mb-4">
							<h5 className="footer-heading">Stay Connected</h5>

							{/* Newsletter Signup */}
							<div className="newsletter-section mb-4">
								<p className="newsletter-text">
									Subscribe to our newsletter for updates and news
								</p>
								<Form onSubmit={handleNewsletterSubmit}>
									<InputGroup>
										<Form.Control
											type="email"
											placeholder="Your email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											className="newsletter-input"
										/>
										<Button
											type="submit"
											variant="primary"
											disabled={isSubmitting}
											className="newsletter-btn"
										>
											{isSubmitting ? "..." : <FaPaperPlane />}
										</Button>
									</InputGroup>
								</Form>
							</div>

							{/* Social Media Links */}
							<div className="social-media">
								<h6 className="social-title">Follow Us</h6>
								<div className="social-links">
									<a
										href="#"
										className="social-link facebook"
										aria-label="Facebook"
									>
										<FaFacebookF />
									</a>
									<a
										href="#"
										className="social-link twitter"
										aria-label="Twitter"
									>
										<FaTwitter />
									</a>
									<a
										href="#"
										className="social-link instagram"
										aria-label="Instagram"
									>
										<FaInstagram />
									</a>
									<a
										href="#"
										className="social-link linkedin"
										aria-label="LinkedIn"
									>
										<FaLinkedinIn />
									</a>
									<a
										href="#"
										className="social-link youtube"
										aria-label="YouTube"
									>
										<FaYoutube />
									</a>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Footer Bottom */}
			<div className="footer-bottom">
				<Container>
					<Row className="align-items-center">
						<Col md={8} className="text-center text-md-start">
							<p className="copyright">
								© 2025 EduVerse University. All rights reserved. |
								<a href="#privacy" className="legal-link">
									{" "}
									Privacy Policy
								</a>{" "}
								|
								<a href="#terms" className="legal-link">
									{" "}
									Terms of Service
								</a>{" "}
								|
								<a href="#accessibility" className="legal-link">
									{" "}
									Accessibility
								</a>
							</p>
						</Col>
						<Col md={4} className="text-center text-md-end">
							<p className="made-with">
								Made with <FaHeart className="heart-icon" /> for education
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
