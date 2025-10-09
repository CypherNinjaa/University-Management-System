/* 
====================================
EVENT ROUTES
====================================
All CRUD routes for event management
*/

const express = require("express");
const router = express.Router();
const {
	getAllEvents,
	getEventById,
	getUpcomingEvents,
	createEvent,
	updateEvent,
	deleteEvent,
	getEventsByCategory,
	getEventsByStatus,
} = require("../controllers/eventController");

// GET /api/events - Get all events
router.get("/", getAllEvents);

// GET /api/events/upcoming - Get upcoming events
router.get("/upcoming", getUpcomingEvents);

// GET /api/events/category/:category - Get events by category
router.get("/category/:category", getEventsByCategory);

// GET /api/events/status/:status - Get events by status
router.get("/status/:status", getEventsByStatus);

// GET /api/events/:id - Get single event
router.get("/:id", getEventById);

// POST /api/events - Create new event
router.post("/", createEvent);

// PUT /api/events/:id - Update event
router.put("/:id", updateEvent);

// DELETE /api/events/:id - Delete event
router.delete("/:id", deleteEvent);

module.exports = router;
