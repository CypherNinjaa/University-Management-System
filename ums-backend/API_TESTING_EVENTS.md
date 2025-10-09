# API Testing Guide - Event Management

This guide shows how to test all Event Management endpoints.

## Base URL

```
http://localhost:5000/api/events
```

## 1. Get All Events

**Request:**

```http
GET /api/events
```

**Response:**

```json
{
	"success": true,
	"count": 6,
	"data": [
		{
			"id": 1,
			"event_name": "Orientation Day 2025",
			"description": "Welcome new students and introduce them to university life",
			"event_date": "2025-08-15",
			"event_time": "09:00:00",
			"location": "Main Auditorium",
			"category": "Academic",
			"max_attendees": 500,
			"expected_attendees": 500,
			"organizer": "Student Affairs Office",
			"status": "Upcoming",
			"registration_required": 1,
			"created_at": "2025-10-09T12:00:00.000Z",
			"updated_at": "2025-10-09T12:00:00.000Z"
		}
		// ... more events
	]
}
```

## 2. Get Upcoming Events

**Request:**

```http
GET /api/events/upcoming
```

**Response:**

```json
{
	"success": true,
	"count": 5,
	"data": [
		// Only events with status='Upcoming' and event_date >= today
	]
}
```

## 3. Get Single Event

**Request:**

```http
GET /api/events/1
```

**Response:**

```json
{
	"success": true,
	"data": {
		"id": 1,
		"event_name": "Orientation Day 2025",
		"description": "Welcome new students and introduce them to university life",
		"event_date": "2025-08-15",
		"event_time": "09:00:00",
		"location": "Main Auditorium",
		"category": "Academic",
		"max_attendees": 500,
		"expected_attendees": 500,
		"organizer": "Student Affairs Office",
		"status": "Upcoming",
		"registration_required": 1
	}
}
```

## 4. Get Events by Category

**Request:**

```http
GET /api/events/category/Workshop
```

**Available Categories:**

- Academic
- Research
- Career
- Workshop
- Sports
- Networking
- Cultural

**Response:**

```json
{
	"success": true,
	"count": 1,
	"data": [
		// All events with category='Workshop'
	]
}
```

## 5. Get Events by Status

**Request:**

```http
GET /api/events/status/Upcoming
```

**Available Statuses:**

- Upcoming
- Ongoing
- Completed
- Cancelled

**Response:**

```json
{
	"success": true,
	"count": 6,
	"data": [
		// All events with status='Upcoming'
	]
}
```

## 6. Create New Event

**Request:**

```http
POST /api/events
Content-Type: application/json

{
  "event_name": "AI Workshop 2025",
  "description": "Introduction to Artificial Intelligence and Machine Learning",
  "event_date": "2025-11-20",
  "event_time": "15:00:00",
  "location": "Tech Lab 3",
  "category": "Workshop",
  "max_attendees": 50,
  "expected_attendees": 45,
  "organizer": "Computer Science Department",
  "status": "Upcoming",
  "registration_required": true
}
```

**Response:**

```json
{
	"success": true,
	"message": "Event created successfully",
	"data": {
		"id": 7,
		"event_name": "AI Workshop 2025",
		"event_date": "2025-11-20",
		"event_time": "15:00:00",
		"location": "Tech Lab 3"
	}
}
```

**Required Fields:**

- event_name
- event_date (format: YYYY-MM-DD)
- event_time (format: HH:MM:SS)
- location

**Optional Fields:**

- description
- category
- max_attendees (default: 100)
- expected_attendees (default: 0)
- organizer
- status (default: 'Upcoming')
- registration_required (default: false)

## 7. Update Event

**Request:**

```http
PUT /api/events/7
Content-Type: application/json

{
  "event_name": "Advanced AI Workshop 2025",
  "description": "Deep dive into AI and ML concepts",
  "event_date": "2025-11-22",
  "event_time": "16:00:00",
  "location": "Tech Lab 4",
  "category": "Workshop",
  "max_attendees": 60,
  "expected_attendees": 55,
  "organizer": "Computer Science Department",
  "status": "Upcoming",
  "registration_required": true
}
```

**Response:**

```json
{
	"success": true,
	"message": "Event updated successfully",
	"data": {
		"id": 7,
		"event_name": "Advanced AI Workshop 2025"
		// ... updated fields
	}
}
```

## 8. Delete Event

**Request:**

```http
DELETE /api/events/7
```

**Response:**

```json
{
	"success": true,
	"message": "Event deleted successfully"
}
```

## Error Responses

### Event Not Found

```json
{
	"success": false,
	"message": "Event not found"
}
```

### Validation Error

```json
{
	"success": false,
	"message": "Please provide event name, date, time, and location"
}
```

### Server Error

```json
{
	"success": false,
	"message": "Error creating event",
	"error": "Detailed error message"
}
```

## Testing with cURL

### Get All Events

```bash
curl http://localhost:5000/api/events
```

### Create Event

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Test Event",
    "event_date": "2025-12-01",
    "event_time": "10:00:00",
    "location": "Room 101",
    "category": "Academic",
    "status": "Upcoming"
  }'
```

### Update Event

```bash
curl -X PUT http://localhost:5000/api/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Updated Event",
    "event_date": "2025-12-02",
    "event_time": "11:00:00",
    "location": "Room 102",
    "status": "Upcoming"
  }'
```

### Delete Event

```bash
curl -X DELETE http://localhost:5000/api/events/1
```

## Testing with Postman

1. **Import Collection:**

   - Create a new collection named "UMS Events"
   - Add base URL variable: `{{base_url}}` = `http://localhost:5000`

2. **Add Requests:**

   - GET All Events: `{{base_url}}/api/events`
   - GET Upcoming: `{{base_url}}/api/events/upcoming`
   - GET by ID: `{{base_url}}/api/events/:id`
   - POST Create: `{{base_url}}/api/events` (with JSON body)
   - PUT Update: `{{base_url}}/api/events/:id` (with JSON body)
   - DELETE: `{{base_url}}/api/events/:id`

3. **Test Scenarios:**
   - Create a new event
   - Verify it appears in the list
   - Update the event details
   - Get event by category
   - Get upcoming events
   - Delete the event

## Integration with Frontend

**Example React/JavaScript code:**

```javascript
// Get all events
const fetchEvents = async () => {
	try {
		const response = await fetch("http://localhost:5000/api/events");
		const data = await response.json();
		if (data.success) {
			console.log("Events:", data.data);
		}
	} catch (error) {
		console.error("Error fetching events:", error);
	}
};

// Create event
const createEvent = async (eventData) => {
	try {
		const response = await fetch("http://localhost:5000/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventData),
		});
		const data = await response.json();
		if (data.success) {
			console.log("Event created:", data.data);
		}
	} catch (error) {
		console.error("Error creating event:", error);
	}
};

// Update event
const updateEvent = async (id, eventData) => {
	try {
		const response = await fetch(`http://localhost:5000/api/events/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(eventData),
		});
		const data = await response.json();
		if (data.success) {
			console.log("Event updated:", data.data);
		}
	} catch (error) {
		console.error("Error updating event:", error);
	}
};

// Delete event
const deleteEvent = async (id) => {
	try {
		const response = await fetch(`http://localhost:5000/api/events/${id}`, {
			method: "DELETE",
		});
		const data = await response.json();
		if (data.success) {
			console.log("Event deleted");
		}
	} catch (error) {
		console.error("Error deleting event:", error);
	}
};
```

Happy Testing! 🎓
