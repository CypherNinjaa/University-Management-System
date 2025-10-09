/* 
====================================
ADMIN DASHBOARD
====================================
Main dashboard for admin panel
Shows navigation to Students, Teachers, Courses management
*/

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
	FaUser,
	FaChalkboardTeacher,
	FaBook,
	FaCalendar,
	FaSignOutAlt,
	FaHome,
	FaTachometerAlt,
} from "react-icons/fa";
import {
	getAdminData,
	isAdminLoggedIn,
	clearAdminData,
} from "../../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [adminData, setAdminData] = useState(null);

	// Check if admin is logged in
	useEffect(() => {
		if (!isAdminLoggedIn()) {
			navigate("/admin/login");
		} else {
			setAdminData(getAdminData());
		}
	}, [navigate]);

	// Handle logout
	const handleLogout = () => {
		if (window.confirm("Are you sure you want to logout?")) {
			clearAdminData();
			navigate("/");
		}
	};

	// Check if route is active
	const isActive = (path) => {
		return (
			location.pathname === path || location.pathname.startsWith(path + "/")
		);
	};

	return (
		<div className="admin-dashboard">
			{/* Top Navigation Bar */}
			<div className="admin-navbar bg-primary text-white">
				<Container fluid>
					<Row className="align-items-center py-3">
						<Col md={6}>
							<h4 className="mb-0">
								<FaTachometerAlt className="me-2" />
								Admin Dashboard
							</h4>
						</Col>
						<Col md={6} className="text-md-end">
							<span className="me-3">
								Welcome, <strong>{adminData?.fullName || "Admin"}</strong>
							</span>
							<Button variant="outline-light" size="sm" onClick={handleLogout}>
								<FaSignOutAlt className="me-1" />
								Logout
							</Button>
						</Col>
					</Row>
				</Container>
			</div>

			<Container fluid className="admin-content">
				<Row>
					{/* Sidebar Navigation */}
					<Col md={3} lg={2} className="admin-sidebar p-0">
						<Nav className="flex-column">
							<Nav.Link
								onClick={() => navigate("/admin/dashboard")}
								className={
									isActive("/admin/dashboard") && !isActive("/admin/dashboard/")
										? "active"
										: ""
								}
							>
								<FaHome className="me-2" />
								Dashboard Home
							</Nav.Link>

							<Nav.Link
								onClick={() => navigate("/admin/dashboard/students")}
								className={
									isActive("/admin/dashboard/students") ? "active" : ""
								}
							>
								<FaUser className="me-2" />
								Manage Students
							</Nav.Link>

							<Nav.Link
								onClick={() => navigate("/admin/dashboard/teachers")}
								className={
									isActive("/admin/dashboard/teachers") ? "active" : ""
								}
							>
								<FaChalkboardTeacher className="me-2" />
								Manage Teachers
							</Nav.Link>

							<Nav.Link
								onClick={() => navigate("/admin/dashboard/courses")}
								className={isActive("/admin/dashboard/courses") ? "active" : ""}
							>
								<FaBook className="me-2" />
								Manage Courses
							</Nav.Link>

							<Nav.Link
								onClick={() => navigate("/admin/dashboard/events")}
								className={isActive("/admin/dashboard/events") ? "active" : ""}
							>
								<FaCalendar className="me-2" />
								Manage Events
							</Nav.Link>

							<hr />

							<Nav.Link onClick={() => navigate("/")}>
								<FaHome className="me-2" />
								Back to Website
							</Nav.Link>
						</Nav>
					</Col>

					{/* Main Content Area */}
					<Col md={9} lg={10} className="admin-main-content">
						{location.pathname === "/admin/dashboard" ? (
							<DashboardHome />
						) : (
							<Outlet />
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

// Dashboard Home Component
const DashboardHome = () => {
	const navigate = useNavigate();

	const dashboardCards = [
		{
			title: "Students",
			icon: FaUser,
			color: "#3b82f6",
			description: "Manage student records, enrollments, and information",
			path: "/admin/dashboard/students",
		},
		{
			title: "Teachers",
			icon: FaChalkboardTeacher,
			color: "#10b981",
			description: "Manage faculty members and their assignments",
			path: "/admin/dashboard/teachers",
		},
		{
			title: "Courses",
			icon: FaBook,
			color: "#f59e0b",
			description: "Manage courses, subjects, and curriculum",
			path: "/admin/dashboard/courses",
		},
		{
			title: "Events",
			icon: FaCalendar,
			color: "#8b5cf6",
			description: "Manage university events and activities",
			path: "/admin/dashboard/events",
		},
	];

	return (
		<div className="dashboard-home">
			<h2 className="mb-4">Welcome to Admin Dashboard</h2>
			<p className="text-muted mb-4">
				Manage students, teachers, courses, and events from here.
			</p>

			<Row>
				{dashboardCards.map((card, index) => (
					<Col md={6} lg={3} key={index} className="mb-4">
						<Card
							className="dashboard-card h-100 cursor-pointer"
							onClick={() => navigate(card.path)}
							style={{ borderTop: `4px solid ${card.color}` }}
						>
							<Card.Body className="text-center">
								<card.icon
									size={50}
									style={{ color: card.color }}
									className="mb-3"
								/>
								<h5 className="fw-bold">{card.title}</h5>
								<p className="text-muted small">{card.description}</p>
								<Button variant="outline-primary" size="sm">
									Manage
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default AdminDashboard;
