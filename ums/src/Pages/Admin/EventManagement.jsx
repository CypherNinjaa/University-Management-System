/* Event Management - Full CRUD */

import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	Card,
	Table,
	Button,
	Modal,
	Form,
	InputGroup,
	Badge,
	Spinner,
	Alert,
} from "react-bootstrap";
import {
	FaPlus,
	FaEdit,
	FaTrash,
	FaSearch,
	FaCalendarAlt,
} from "react-icons/fa";
import { eventAPI } from "../../services/api";
import "./Admin.css";

const EventManagement = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [currentEvent, setCurrentEvent] = useState(null);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [formData, setFormData] = useState({
		event_name: "",
		description: "",
		event_date: "",
		event_time: "",
		location: "",
		category: "Academic",
		max_attendees: "100",
		expected_attendees: "",
		organizer: "",
		status: "Upcoming",
		registration_required: "Yes",
	});

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			setLoading(true);
			const response = await eventAPI.getAll();
			if (response.data.success) setEvents(response.data.data);
		} catch (err) {
			console.error("Error fetching events:", err);
			setError("Failed to load events");
		} finally {
			setLoading(false);
		}
	};

	const filteredEvents = events.filter(
		(event) =>
			event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.location?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddClick = () => {
		setModalMode("add");
		setFormData({
			event_name: "",
			description: "",
			event_date: new Date().toISOString().split("T")[0],
			event_time: "10:00",
			location: "",
			category: "Academic",
			max_attendees: "100",
			expected_attendees: "",
			organizer: "",
			status: "Upcoming",
			registration_required: "Yes",
		});
		setShowModal(true);
	};

	const handleEditClick = (event) => {
		setModalMode("edit");
		setFormData({
			event_name: event.event_name,
			description: event.description || "",
			event_date: event.event_date ? event.event_date.split("T")[0] : "",
			event_time: event.event_time || "",
			location: event.location || "",
			category: event.category || "Academic",
			max_attendees: event.max_attendees || "100",
			expected_attendees: event.expected_attendees || "",
			organizer: event.organizer || "",
			status: event.status || "Upcoming",
			registration_required: event.registration_required || "Yes",
		});
		setCurrentEvent(event);
		setShowModal(true);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (modalMode === "add") {
				await eventAPI.create(formData);
				setSuccess("Event added successfully!");
			} else {
				await eventAPI.update(currentEvent.id, formData);
				setSuccess("Event updated successfully!");
			}
			fetchEvents();
			setShowModal(false);
		} catch (err) {
			console.error("Error saving event:", err);
			setError(err.response?.data?.message || "Failed to save event");
		}
	};

	const handleDelete = async (event) => {
		if (window.confirm(`Delete ${event.event_name}?`)) {
			try {
				await eventAPI.delete(event.id);
				setSuccess("Event deleted successfully!");
				fetchEvents();
			} catch (err) {
				console.error("Error deleting event:", err);
				setError("Failed to delete event");
			}
		}
	};

	const getStatusColor = (status) => {
		return (
			{
				Upcoming: "primary",
				Ongoing: "success",
				Completed: "secondary",
				Cancelled: "danger",
			}[status] || "secondary"
		);
	};

	return (
		<div className="event-management">
			<Row className="mb-4">
				<Col>
					<h2 className="fw-bold">
						<FaCalendarAlt className="me-2" />
						Event Management
					</h2>
					<p className="text-muted">
						Manage all university events and activities
					</p>
				</Col>
			</Row>

			{success && (
				<Alert variant="success" dismissible onClose={() => setSuccess("")}>
					{success}
				</Alert>
			)}
			{error && (
				<Alert variant="danger" dismissible onClose={() => setError("")}>
					{error}
				</Alert>
			)}

			<Card className="mb-4">
				<Card.Body>
					<Row className="align-items-center">
						<Col md={8}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									placeholder="Search by event name, category, or location..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={4} className="text-end">
							<Button variant="primary" onClick={handleAddClick}>
								<FaPlus className="me-2" />
								Add New Event
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					{loading ? (
						<div className="text-center py-5">
							<Spinner animation="border" variant="primary" />
						</div>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>Event Name</th>
									<th>Date</th>
									<th>Time</th>
									<th>Location</th>
									<th>Category</th>
									<th>Max Attendees</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredEvents.map((event) => (
									<tr key={event.id}>
										<td>
											<strong>{event.event_name}</strong>
										</td>
										<td>
											{event.event_date
												? new Date(event.event_date).toLocaleDateString()
												: "N/A"}
										</td>
										<td>{event.event_time || "N/A"}</td>
										<td>{event.location}</td>
										<td>{event.category}</td>
										<td>{event.max_attendees}</td>
										<td>
											<Badge bg={getStatusColor(event.status)}>
												{event.status}
											</Badge>
										</td>
										<td>
											<Button
												variant="outline-primary"
												size="sm"
												className="me-2"
												onClick={() => handleEditClick(event)}
											>
												<FaEdit />
											</Button>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleDelete(event)}
											>
												<FaTrash />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
					<div className="text-muted mt-3">
						Total Events: <strong>{filteredEvents.length}</strong>
					</div>
				</Card.Body>
			</Card>

			<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>
						{modalMode === "add" ? "Add New Event" : "Edit Event"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Event Name *</Form.Label>
							<Form.Control
								name="event_name"
								value={formData.event_name}
								onChange={handleInputChange}
								required
								placeholder="e.g., Annual Science Fair"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								placeholder="Brief description of the event"
							/>
						</Form.Group>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Event Date *</Form.Label>
									<Form.Control
										type="date"
										name="event_date"
										value={formData.event_date}
										onChange={handleInputChange}
										required
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Event Time</Form.Label>
									<Form.Control
										type="time"
										name="event_time"
										value={formData.event_time}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group className="mb-3">
							<Form.Label>Location</Form.Label>
							<Form.Control
								name="location"
								value={formData.location}
								onChange={handleInputChange}
								placeholder="e.g., Main Auditorium"
							/>
						</Form.Group>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Category</Form.Label>
									<Form.Select
										name="category"
										value={formData.category}
										onChange={handleInputChange}
									>
										<option value="Academic">Academic</option>
										<option value="Sports">Sports</option>
										<option value="Cultural">Cultural</option>
										<option value="Technical">Technical</option>
										<option value="Social">Social</option>
										<option value="Workshop">Workshop</option>
										<option value="Seminar">Seminar</option>
										<option value="Other">Other</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Status</Form.Label>
									<Form.Select
										name="status"
										value={formData.status}
										onChange={handleInputChange}
									>
										<option value="Upcoming">Upcoming</option>
										<option value="Ongoing">Ongoing</option>
										<option value="Completed">Completed</option>
										<option value="Cancelled">Cancelled</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Max Attendees</Form.Label>
									<Form.Control
										type="number"
										name="max_attendees"
										value={formData.max_attendees}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Expected Attendees</Form.Label>
									<Form.Control
										type="number"
										name="expected_attendees"
										value={formData.expected_attendees}
										onChange={handleInputChange}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Organizer</Form.Label>
									<Form.Control
										name="organizer"
										value={formData.organizer}
										onChange={handleInputChange}
										placeholder="e.g., Student Council"
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Registration Required</Form.Label>
									<Form.Select
										name="registration_required"
										value={formData.registration_required}
										onChange={handleInputChange}
									>
										<option value="Yes">Yes</option>
										<option value="No">No</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
						<div className="text-end">
							<Button
								variant="secondary"
								onClick={() => setShowModal(false)}
								className="me-2"
							>
								Cancel
							</Button>
							<Button variant="primary" type="submit">
								{modalMode === "add" ? "Add Event" : "Update Event"}
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default EventManagement;
