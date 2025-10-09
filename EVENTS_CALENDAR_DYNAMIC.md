# EventsCalendar Component - Made Dynamic

## Changes Made

### 1. Added API Integration

- Imported `eventAPI` from `services/api.js`
- Imported `useEffect` hook for data fetching
- Added `Spinner` and `Alert` components for loading/error states

### 2. State Management

```javascript
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

### 3. Data Fetching (useEffect)

- Fetches events from backend API on component mount
- Filters only "Upcoming" and "Ongoing" events
- Sorts events by date (earliest first)
- Limits display to 4 most recent events
- Handles errors gracefully

### 4. Enhanced Category Colors

Added support for all event categories from database:

- Academic → primary (blue)
- Technical → danger (red)
- Sports → success (green)
- Cultural → info (cyan)
- Social → info (cyan)
- Workshop → warning (yellow)
- Seminar → primary (blue)

### 5. Date & Time Formatting Functions

- `formatEventDate()` - Converts date to "Monday, January 1, 2025" format
- `formatEventTime()` - Converts 24-hour time (HH:MM:SS) to 12-hour format (10:30 AM)

### 6. Dynamic UI States

#### Loading State

```jsx
{loading && (
    <Spinner animation="border" variant="primary" />
    <p>Loading events...</p>
)}
```

#### Error State

```jsx
{
	error && <Alert variant="danger">{error}</Alert>;
}
```

#### No Events State

```jsx
{
	events.length === 0 && (
		<Alert variant="info">
			No upcoming events at the moment. Check back soon!
		</Alert>
	);
}
```

### 7. Updated Event Display

Now uses database field names:

- `event.event_name` (was `event.title`)
- `event.event_date` (was `event.date`)
- `event.event_time` (was `event.time`)
- `event.expected_attendees` or `event.max_attendees` (was `event.attendees`)
- `event.registration_required` - Shows "Open Event" or "Register Now"

### 8. Dynamic Button Text

```jsx
<Button disabled={event.registration_required === "No"}>
	{event.registration_required === "No" ? "Open Event" : "Register Now"}
</Button>
```

## How It Works

1. **Component Mounts** → Calls API to fetch events
2. **Loading State** → Shows spinner while fetching
3. **Success** → Displays filtered & sorted events
4. **Error** → Shows error message if API fails
5. **No Events** → Shows friendly message if no upcoming events

## Connected to Backend

The component now:

- ✅ Fetches real data from `http://localhost:5000/api/events`
- ✅ Updates automatically when events are added/edited in Admin Panel
- ✅ Filters by status (Upcoming/Ongoing only)
- ✅ Sorts by date (earliest first)
- ✅ Limits to 4 events for clean display
- ✅ Handles all error cases gracefully

## Testing

1. **Add events in Admin Panel** → `/admin/dashboard/events`
2. **Go to Home Page** → Events section will show your created events
3. **Change event status** → Only "Upcoming" and "Ongoing" events appear
4. **Delete all events** → "No upcoming events" message appears

## Gallery Section

Note: The gallery carousel still uses hardcoded images from Unsplash. This could be made dynamic in the future by:

1. Adding an `images` table to database
2. Allowing file uploads in admin panel
3. Fetching images via API

---

**Status:** ✅ Fully Dynamic and Connected to Backend!
