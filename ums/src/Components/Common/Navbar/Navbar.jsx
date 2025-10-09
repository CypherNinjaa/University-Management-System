import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap"; // Importing  components from react-bootstrap
import { Link, useNavigate, useLocation } from "react-router-dom"; // React Router for navigation
import { FaUniversity, FaBars } from "react-icons/fa"; //this is for icons
import "./Navbar.css"; //custom css for styling

//mobile toogle
const NavigationBar = () => {
	const [expanded, setExpanded] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// navigation handler when a nav item is clicked
	// This will close the mobile menu when an item is clicked
	const handleNavClick = () => {
		setExpanded(false);
	};

	// Handle navigation to success stories section
	const handleSuccessStoriesClick = (e) => {
		e.preventDefault();
		handleNavClick();

		// If already on home page, just scroll to section
		if (location.pathname === "/") {
			const element = document.getElementById("success-stories");
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		} else {
			// Navigate to home page first, then scroll
			navigate("/");
			setTimeout(() => {
				const element = document.getElementById("success-stories");
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}, 100);
		}
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
				{/* logo  */}
				<Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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
						{/* link to be added of each pages */}
						<Nav.Link
							as={Link}
							to="/"
							onClick={handleNavClick}
							className="nav-item"
						>
							Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/programs"
							onClick={handleNavClick}
							className="nav-item"
						>
							Programs
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/faculty"
							onClick={handleNavClick}
							className="nav-item"
						>
							Faculty
						</Nav.Link>
						<Nav.Link
							href="#success-stories"
							onClick={handleSuccessStoriesClick}
							className="nav-item"
						>
							Student Success Stories
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/about"
							onClick={handleNavClick}
							className="nav-item"
						>
							About
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/contact"
							onClick={handleNavClick}
							className="nav-item"
						>
							Contact
						</Nav.Link>
					</Nav>

					{/* LOGIN BUTTON  on the right side */}
					<Nav>
						<Button
							variant="outline-light"
							className="login-btn"
							as={Link}
							to="/admin/login"
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
