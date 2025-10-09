/* 
====================================
EVENT CONTROLLER
====================================
CRUD operations for event management
*/

const { promisePool } = require("../config/database");

// Get all events
const getAllEvents = async (req, res) => {
	try {
		const [events] = await promisePool.query(
			"SELECT * FROM events ORDER BY event_date ASC, event_time ASC"
		);

		res.status(200).json({
			success: true,
			count: events.length,
			data: events,
		});
	} catch (error) {
		console.error("Get events error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching events",
			error: error.message,
		});
	}
};

// Get single event by ID
const getEventById = async (req, res) => {
	try {
		const { id } = req.params;

		const [events] = await promisePool.query(
			"SELECT * FROM events WHERE id = ?",
			[id]
		);

		if (events.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Event not found",
			});
		}

		res.status(200).json({
			success: true,
			data: events[0],
		});
	} catch (error) {
		console.error("Get event error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching event",
			error: error.message,
		});
	}
};

// Get upcoming events
const getUpcomingEvents = async (req, res) => {
	try {
		const [events] = await promisePool.query(
			`SELECT * FROM events 
             WHERE status = 'Upcoming' AND event_date >= CURDATE()
             ORDER BY event_date ASC, event_time ASC`
		);

		res.status(200).json({
			success: true,
			count: events.length,
			data: events,
		});
	} catch (error) {
		console.error("Get upcoming events error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching upcoming events",
			error: error.message,
		});
	}
};

// Create new event
const createEvent = async (req, res) => {
	try {
		const {
			event_name,
			description,
			event_date,
			event_time,
			location,
			category,
			max_attendees,
			expected_attendees,
			organizer,
			status,
			registration_required,
		} = req.body;

		// Validate required fields
		if (!event_name || !event_date || !event_time || !location) {
			return res.status(400).json({
				success: false,
				message: "Please provide event name, date, time, and location",
			});
		}

		const [result] = await promisePool.query(
			`INSERT INTO events 
            (event_name, description, event_date, event_time, location, category, 
            max_attendees, expected_attendees, organizer, status, registration_required) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				event_name,
				description,
				event_date,
				event_time,
				location,
				category,
				max_attendees || 100,
				expected_attendees || 0,
				organizer,
				status || "Upcoming",
				registration_required || false,
			]
		);

		res.status(201).json({
			success: true,
			message: "Event created successfully",
			data: {
				id: result.insertId,
				event_name,
				event_date,
				event_time,
				location,
			},
		});
	} catch (error) {
		console.error("Create event error:", error);
		res.status(500).json({
			success: false,
			message: "Error creating event",
			error: error.message,
		});
	}
};

// Update event
const updateEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			event_name,
			description,
			event_date,
			event_time,
			location,
			category,
			max_attendees,
			expected_attendees,
			organizer,
			status,
			registration_required,
		} = req.body;

		// Check if event exists
		const [existingEvent] = await promisePool.query(
			"SELECT * FROM events WHERE id = ?",
			[id]
		);

		if (existingEvent.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Event not found",
			});
		}

		await promisePool.query(
			`UPDATE events SET 
            event_name = ?, description = ?, event_date = ?, event_time = ?, 
            location = ?, category = ?, max_attendees = ?, expected_attendees = ?, 
            organizer = ?, status = ?, registration_required = ?
            WHERE id = ?`,
			[
				event_name,
				description,
				event_date,
				event_time,
				location,
				category,
				max_attendees,
				expected_attendees,
				organizer,
				status,
				registration_required,
				id,
			]
		);

		res.status(200).json({
			success: true,
			message: "Event updated successfully",
			data: { id, ...req.body },
		});
	} catch (error) {
		console.error("Update event error:", error);
		res.status(500).json({
			success: false,
			message: "Error updating event",
			error: error.message,
		});
	}
};

// Delete event
const deleteEvent = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if event exists
		const [existingEvent] = await promisePool.query(
			"SELECT * FROM events WHERE id = ?",
			[id]
		);

		if (existingEvent.length === 0) {
			return res.status(404).json({
				success: false,
				message: "Event not found",
			});
		}

		await promisePool.query("DELETE FROM events WHERE id = ?", [id]);

		res.status(200).json({
			success: true,
			message: "Event deleted successfully",
		});
	} catch (error) {
		console.error("Delete event error:", error);
		res.status(500).json({
			success: false,
			message: "Error deleting event",
			error: error.message,
		});
	}
};

// Get events by category
const getEventsByCategory = async (req, res) => {
	try {
		const { category } = req.params;

		const [events] = await promisePool.query(
			"SELECT * FROM events WHERE category = ? ORDER BY event_date ASC",
			[category]
		);

		res.status(200).json({
			success: true,
			count: events.length,
			data: events,
		});
	} catch (error) {
		console.error("Get events by category error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching events by category",
			error: error.message,
		});
	}
};

// Get events by status
const getEventsByStatus = async (req, res) => {
	try {
		const { status } = req.params;

		const [events] = await promisePool.query(
			"SELECT * FROM events WHERE status = ? ORDER BY event_date ASC",
			[status]
		);

		res.status(200).json({
			success: true,
			count: events.length,
			data: events,
		});
	} catch (error) {
		console.error("Get events by status error:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching events by status",
			error: error.message,
		});
	}
};

module.exports = {
	getAllEvents,
	getEventById,
	getUpcomingEvents,
	createEvent,
	updateEvent,
	deleteEvent,
	getEventsByCategory,
	getEventsByStatus,
};
