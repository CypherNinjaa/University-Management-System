/* 
====================================
STEP 5: EVENTS & CALENDAR COMPONENT
====================================
This component displays:
- Upcoming university events
- Interactive calendar view
- Event details and registration links
- Responsive grid layout
*/

import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaUsers,
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

	// Get current date for calendar highlighting
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	// Generate calendar days for current month
	const generateCalendarDays = () => {
		const firstDay = new Date(currentYear, currentMonth, 1);
		const lastDay = new Date(currentYear, currentMonth + 1, 0);
		const days = [];

		// Add empty cells for days before month starts
		for (let i = 0; i < firstDay.getDay(); i++) {
			days.push(null);
		}

		// Add actual days of the month
		for (let day = 1; day <= lastDay.getDate(); day++) {
			const date = new Date(currentYear, currentMonth, day);
			const hasEvent = events.some((event) => {
				const eventDate = new Date(event.date);
				return eventDate.toDateString() === date.toDateString();
			});

			days.push({
				day: day,
				date: date,
				hasEvent: hasEvent,
				isToday: date.toDateString() === currentDate.toDateString(),
			});
		}

		return days;
	};

	const calendarDays = generateCalendarDays();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

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
							Upcoming Events & Calendar
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
						<h3 className="events-title mb-4">Upcoming Events</h3>

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

					{/* Mini Calendar - Right Side */}
					<Col lg={4}>
						<Card className="calendar-card">
							<Card.Header className="calendar-header">
								<h4 className="calendar-title mb-0">
									{monthNames[currentMonth]} {currentYear}
								</h4>
							</Card.Header>

							<Card.Body>
								{/* Calendar Grid */}
								<div className="calendar-grid">
									{/* Day Headers */}
									{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
										(day) => (
											<div key={day} className="calendar-day-header">
												{day}
											</div>
										)
									)}

									{/* Calendar Days */}
									{calendarDays.map((day, index) => (
										<div
											key={index}
											className={`calendar-day ${day === null ? "empty" : ""} ${
												day && day.isToday ? "today" : ""
											} ${day && day.hasEvent ? "has-event" : ""}`}
										>
											{day && day.day}
											{day && day.hasEvent && <div className="event-dot"></div>}
										</div>
									))}
								</div>

								{/* Calendar Legend */}
								<div className="calendar-legend mt-3">
									<div className="legend-item">
										<div className="legend-dot today-dot"></div>
										<span>Today</span>
									</div>
									<div className="legend-item">
										<div className="legend-dot event-dot"></div>
										<span>Event</span>
									</div>
								</div>
							</Card.Body>
						</Card>

						{/* Quick Stats */}
						<Card className="stats-card mt-3">
							<Card.Body>
								<h5 className="stats-title">This Month</h5>
								<div className="stats-grid">
									<div className="stat-item">
										<div className="stat-number">12</div>
										<div className="stat-label">Total Events</div>
									</div>
									<div className="stat-item">
										<div className="stat-number">3.2K</div>
										<div className="stat-label">Participants</div>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default EventsCalendar;
