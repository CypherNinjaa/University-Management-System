/* 
====================================
STEP 1: NAVIGATION BAR COMPONENT
====================================
This component creates the main navigation header with:
- University logo
- Navigation menu items (Home, Programs, Faculty, etc.)
- Responsive design for mobile and desktop
- Login button
*/

import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaUniversity, FaBars } from "react-icons/fa";
import "./Navbar.css";

const NavigationBar = () => {
	// State for mobile menu toggle
	const [expanded, setExpanded] = useState(false);

	// Handle navigation link clicks
	const handleNavClick = () => {
		setExpanded(false); // Close mobile menu when item is clicked
	};

	return (
		<Navbar
			bg="primary"
			variant="dark"
			expand="lg"
			fixed="top"
			className="custom-navbar"
			expanded={expanded}
		>
			<Container>
				{/* LOGO SECTION - University branding */}
				<Navbar.Brand href="#home" className="d-flex align-items-center">
					<FaUniversity className="me-2" size={30} />
					<span className="fw-bold">EduVerse University</span>
				</Navbar.Brand>

				{/* MOBILE MENU TOGGLE BUTTON */}
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					onClick={() => setExpanded(!expanded)}
				>
					<FaBars />
				</Navbar.Toggle>

				{/* NAVIGATION MENU ITEMS */}
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						{/* Each Nav.Link represents a main section of the website */}
						<Nav.Link
							href="#home"
							onClick={handleNavClick}
							className="nav-item"
						>
							Home
						</Nav.Link>
						<Nav.Link
							href="#programs"
							onClick={handleNavClick}
							className="nav-item"
						>
							Programs
						</Nav.Link>
						<Nav.Link
							href="#faculty"
							onClick={handleNavClick}
							className="nav-item"
						>
							Faculty
						</Nav.Link>
						<Nav.Link
							href="#success-stories"
							onClick={handleNavClick}
							className="nav-item"
						>
							Student Success Stories
						</Nav.Link>
						<Nav.Link
							href="#about"
							onClick={handleNavClick}
							className="nav-item"
						>
							About
						</Nav.Link>
						<Nav.Link
							href="#contact"
							onClick={handleNavClick}
							className="nav-item"
						>
							Contact
						</Nav.Link>
					</Nav>

					{/* LOGIN BUTTON - Positioned on the right */}
					<Nav>
						<Button
							variant="outline-light"
							className="login-btn"
							onClick={() => alert("Login functionality to be implemented")}
						>
							Login
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
