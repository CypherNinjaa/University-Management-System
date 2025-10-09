/* 
====================================
ADMIN LOGIN PAGE
====================================
Simple text-based login for admin panel
Stores admin data in localStorage on successful login
*/

import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button,
	Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaUser, FaLock } from "react-icons/fa";
import { authAPI, saveAdminData, isAdminLoggedIn } from "../../services/api";
import "./AdminLogin.css";

const AdminLogin = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Redirect if already logged in
	useEffect(() => {
		if (isAdminLoggedIn()) {
			navigate("/admin/dashboard");
		}
	}, [navigate]);

	// Handle input changes
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError(""); // Clear error when user types
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		// Validate inputs
		if (!formData.username || !formData.password) {
			setError("Please enter both username and password");
			setLoading(false);
			return;
		}

		try {
			// Call login API
			const response = await authAPI.login(formData);

			if (response.data.success) {
				// Save admin data to localStorage
				saveAdminData(response.data.data);

				// Redirect to admin dashboard
				navigate("/admin/dashboard");
			} else {
				setError(response.data.message || "Login failed");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError(err.response?.data?.message || "Invalid username or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="admin-login-page">
			<Container>
				<Row className="justify-content-center align-items-center min-vh-100">
					<Col md={6} lg={5}>
						<Card className="login-card shadow-lg">
							<Card.Body className="p-5">
								{/* Logo and Title */}
								<div className="text-center mb-4">
									<FaUniversity size={60} className="text-primary mb-3" />
									<h2 className="fw-bold">Admin Login</h2>
									<p className="text-muted">University Management System</p>
								</div>

								{/* Error Alert */}
								{error && (
									<Alert
										variant="danger"
										dismissible
										onClose={() => setError("")}
									>
										{error}
									</Alert>
								)}

								{/* Login Form */}
								<Form onSubmit={handleSubmit}>
									{/* Username Field */}
									<Form.Group className="mb-3">
										<Form.Label>
											<FaUser className="me-2" />
											Username
										</Form.Label>
										<Form.Control
											type="text"
											name="username"
											placeholder="Enter username"
											value={formData.username}
											onChange={handleChange}
											required
											autoComplete="username"
										/>
									</Form.Group>

									{/* Password Field */}
									<Form.Group className="mb-4">
										<Form.Label>
											<FaLock className="me-2" />
											Password
										</Form.Label>
										<Form.Control
											type="password"
											name="password"
											placeholder="Enter password"
											value={formData.password}
											onChange={handleChange}
											required
											autoComplete="current-password"
										/>
									</Form.Group>

									{/* Submit Button */}
									<Button
										variant="primary"
										type="submit"
										className="w-100"
										size="lg"
										disabled={loading}
									>
										{loading ? "Logging in..." : "Login"}
									</Button>
								</Form>

								{/* Demo Credentials */}
								<div className="mt-4 p-3 bg-light rounded">
									<p className="mb-1 text-muted small">
										<strong>Demo Credentials:</strong>
									</p>
									<p className="mb-0 small">
										Username: <code>admin</code>
										<br />
										Password: <code>admin123</code>
									</p>
								</div>

								{/* Back to Home */}
								<div className="text-center mt-3">
									<Button
										variant="link"
										onClick={() => navigate("/")}
										className="text-decoration-none"
									>
										← Back to Home
									</Button>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AdminLogin;
