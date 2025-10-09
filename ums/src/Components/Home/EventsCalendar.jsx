import { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Carousel,
	Spinner,
	Alert,
} from "react-bootstrap";
import {
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaUsers,
	FaImages,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { eventAPI } from "../../services/api";
import "./EventsCalendar.css";

const EventsCalendar = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Fetch events from API
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);
				const response = await eventAPI.getAll();
				if (response.data.success) {
					// Filter only upcoming and ongoing events, sort by date
					const upcomingEvents = response.data.data
						.filter(
							(event) =>
								event.status === "Upcoming" || event.status === "Ongoing"
						)
						.sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
						.slice(0, 4); // Show only 4 most recent events
					setEvents(upcomingEvents);
				}
			} catch (err) {
				console.error("Error fetching events:", err);
				setError("Failed to load events. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	// Sample gallery images - in real app, these would be actual event photos
	const [galleryImages] = useState([
		{
			id: 1,
			src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "University Campus - Main Building",
			title: "Beautiful Campus Grounds",
			description:
				"Our stunning campus provides the perfect environment for learning",
		},
		{
			id: 2,
			src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "Students in Library",
			title: "State-of-the-Art Library",
			description:
				"Modern facilities equipped with latest technology and resources",
		},
		{
			id: 3,
			src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "Graduation Ceremony",
			title: "Graduation Ceremony",
			description: "Celebrating our graduates' achievements and bright futures",
		},
		{
			id: 4,
			src: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "Laboratory Research",
			title: "Research Excellence",
			description: "Cutting-edge research facilities and innovative projects",
		},
		{
			id: 5,
			src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "Student Activities",
			title: "Campus Life",
			description: "Vibrant student life with numerous activities and events",
		},
	]);

	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Academic: "primary",
			Research: "success",
			Career: "warning",
			Cultural: "info",
			Technical: "danger",
			Sports: "success",
			Social: "info",
			Workshop: "warning",
			Seminar: "primary",
		};
		return colors[category] || "secondary";
	};

	// Format date for display
	const formatEventDate = (dateString) => {
		if (!dateString) return "Date TBA";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Format time for display
	const formatEventTime = (timeString) => {
		if (!timeString) return "Time TBA";
		// If time is in HH:MM:SS format, convert to 12-hour format
		const timeParts = timeString.split(":");
		if (timeParts.length >= 2) {
			let hours = parseInt(timeParts[0]);
			const minutes = timeParts[1];
			const ampm = hours >= 12 ? "PM" : "AM";
			hours = hours % 12 || 12;
			return `${hours}:${minutes} ${ampm}`;
		}
		return timeString;
	};

	return (
		<section id="events" className="events-section py-5">
			<Container>
				{/* Section Header */}
				<Row className="text-center mb-5">
					<Col>
						<h2 className="section-title">
							<FaCalendarAlt className="me-3" />
							Upcoming Events
						</h2>
						<p className="section-subtitle">
							Stay updated with the latest events, workshops, and activities
							happening on campus
						</p>
					</Col>
				</Row>

				<Row>
					{/* Events List - Left Side */}
					<Col lg={8} className="mb-4">
						{/* Loading State */}
						{loading && (
							<div className="text-center py-5">
								<Spinner animation="border" variant="primary" />
								<p className="mt-3 text-muted">Loading events...</p>
							</div>
						)}

						{/* Error State */}
						{error && (
							<Alert variant="danger" className="text-center">
								{error}
							</Alert>
						)}

						{/* No Events State */}
						{!loading && !error && events.length === 0 && (
							<Alert variant="info" className="text-center">
								<FaCalendarAlt className="mb-2" size={40} />
								<p className="mb-0">
									No upcoming events at the moment. Check back soon!
								</p>
							</Alert>
						)}

						{/* Events Display */}
						{!loading &&
							!error &&
							events.length > 0 &&
							events.map((event) => (
								<Card key={event.id} className="event-card mb-3">
									<Card.Body>
										<Row>
											<Col md={8}>
												{/* Event Title and Category */}
												<div className="d-flex align-items-center mb-2">
													<h5 className="event-title mb-0 me-3">
														{event.event_name}
													</h5>
													<Badge bg={getCategoryColor(event.category)}>
														{event.category}
													</Badge>
												</div>

												{/* Event Description */}
												<p className="event-description text-muted mb-3">
													{event.description || "No description available"}
												</p>

												{/* Event Details */}
												<div className="event-details">
													<div className="detail-item">
														<FaCalendarAlt className="detail-icon" />
														<span>{formatEventDate(event.event_date)}</span>
													</div>

													<div className="detail-item">
														<FaClock className="detail-icon" />
														<span>{formatEventTime(event.event_time)}</span>
													</div>

													<div className="detail-item">
														<FaMapMarkerAlt className="detail-icon" />
														<span>{event.location || "Location TBA"}</span>
													</div>

													<div className="detail-item">
														<FaUsers className="detail-icon" />
														<span>
															{event.expected_attendees || event.max_attendees}{" "}
															Expected Attendees
														</span>
													</div>
												</div>
											</Col>

											<Col
												md={4}
												className="d-flex align-items-center justify-content-end"
											>
												<Button
													variant="primary"
													className="register-btn"
													disabled={event.registration_required === "No"}
													onClick={() =>
														alert(
															`Registration for ${event.event_name} - Coming Soon!`
														)
													}
												>
													{event.registration_required === "No"
														? "Open Event"
														: "Register Now"}
												</Button>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							))}
					</Col>

					{/* Gallery Carousel - Right Side */}
					<Col lg={4}>
						<Card className="gallery-card">
							<Card.Header className="gallery-header">
								<h4 className="gallery-title mb-0">
									<FaImages className="me-2" />
									Campus Gallery
								</h4>
							</Card.Header>

							<Card.Body className="p-0">
								<Carousel
									fade
									interval={3000}
									controls={true}
									indicators={true}
									className="campus-carousel"
								>
									{galleryImages.map((image) => (
										<Carousel.Item key={image.id}>
											<div className="carousel-image-container">
												<img
													className="carousel-image"
													src={image.src}
													alt={image.alt}
												/>
												<div className="carousel-overlay">
													<div className="carousel-content">
														<h5 className="carousel-title">{image.title}</h5>
														<p className="carousel-description">
															{image.description}
														</p>
													</div>
												</div>
											</div>
										</Carousel.Item>
									))}
								</Carousel>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default EventsCalendar;
