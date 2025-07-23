import { useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Carousel,
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
import "./EventsCalendar.css";

const EventsCalendar = () => {
	// Sample events data - in real app, this would come from an API
	const [events] = useState([
		{
			id: 1,
			title: "Orientation Day 2025",
			date: "2025-08-15",
			time: "09:00 AM",
			location: "Main Auditorium",
			category: "Academic",
			attendees: 500,
			description: "Welcome new students and introduce them to university life",
		},
		{
			id: 2,
			title: "Research Symposium",
			date: "2025-08-20",
			time: "02:00 PM",
			location: "Science Building",
			category: "Research",
			attendees: 200,
			description: "Annual research presentation by faculty and students",
		},
		{
			id: 3,
			title: "Career Fair 2025",
			date: "2025-08-25",
			time: "10:00 AM",
			location: "Exhibition Hall",
			category: "Career",
			attendees: 1000,
			description: "Meet with top employers and explore career opportunities",
		},
		{
			id: 4,
			title: "Cultural Festival",
			date: "2025-09-01",
			time: "06:00 PM",
			location: "Campus Grounds",
			category: "Cultural",
			attendees: 800,
			description: "Celebrate diversity with music, dance, and food",
		},
	]);

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
		};
		return colors[category] || "secondary";
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
						{events.map((event) => (
							<Card key={event.id} className="event-card mb-3">
								<Card.Body>
									<Row>
										<Col md={8}>
											{/* Event Title and Category */}
											<div className="d-flex align-items-center mb-2">
												<h5 className="event-title mb-0 me-3">{event.title}</h5>
												<Badge bg={getCategoryColor(event.category)}>
													{event.category}
												</Badge>
											</div>

											{/* Event Description */}
											<p className="event-description text-muted mb-3">
												{event.description}
											</p>

											{/* Event Details */}
											<div className="event-details">
												<div className="detail-item">
													<FaCalendarAlt className="detail-icon" />
													<span>
														{new Date(event.date).toLocaleDateString("en-US", {
															weekday: "long",
															year: "numeric",
															month: "long",
															day: "numeric",
														})}
													</span>
												</div>

												<div className="detail-item">
													<FaClock className="detail-icon" />
													<span>{event.time}</span>
												</div>

												<div className="detail-item">
													<FaMapMarkerAlt className="detail-icon" />
													<span>{event.location}</span>
												</div>

												<div className="detail-item">
													<FaUsers className="detail-icon" />
													<span>{event.attendees} Expected Attendees</span>
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
												onClick={() =>
													alert(
														`Registration for ${event.title} - Coming Soon!`
													)
												}
											>
												Register Now
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
