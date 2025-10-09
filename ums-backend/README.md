# University Management System - Backend API

Simple backend API for managing university data with admin authentication.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- MySQL Workbench or command line access

### Step 1: Install Dependencies

```bash
cd ums-backend
npm install
```

### Step 2: Setup MySQL Database

1. Make sure MySQL is running on your system
2. Open MySQL Workbench or command line
3. Run the SQL script to create the database:

```bash
# Using MySQL command line
mysql -u root -p9199 < database_schema.sql

# Or copy and paste the contents of database_schema.sql into MySQL Workbench and execute
```

This will:

- Create the `university_management_system` database
- Create tables: admins, students, teachers, courses, enrollments, events
- Insert default admin user (username: `admin`, password: `admin123`)
- Insert sample data for testing

### Step 3: Configure Environment Variables

The `.env` file is already configured with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=9199
DB_NAME=university_management_system
PORT=5000
```

Modify if your MySQL settings are different.

### Step 4: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on: `http://localhost:5000`

## 📋 API Endpoints

### Authentication

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
	"success": true,
	"message": "Login successful",
	"data": {
		"id": 1,
		"username": "admin",
		"fullName": "System Administrator",
		"email": "admin@eduverse.edu",
		"role": "admin",
		"isLoggedIn": true
	}
}
```

**Frontend should store this data in localStorage:**

```javascript
localStorage.setItem("adminData", JSON.stringify(response.data));
```

### Students

#### Get All Students

```http
GET /api/students
```

#### Get Single Student

```http
GET /api/students/:id
```

#### Create Student

```http
POST /api/students
Content-Type: application/json

{
  "student_id": "STU004",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@student.edu",
  "phone": "1234567890",
  "date_of_birth": "2002-05-15",
  "gender": "Male",
  "address": "123 Main St",
  "enrollment_date": "2024-09-01",
  "status": "Active"
}
```

#### Update Student

```http
PUT /api/students/:id
Content-Type: application/json

{
  "student_id": "STU004",
  "first_name": "John Updated",
  "last_name": "Doe",
  ...
}
```

#### Delete Student

```http
DELETE /api/students/:id
```

### Teachers

Same CRUD operations as students:

- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get single teacher
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

**Create Teacher Example:**

```json
{
	"teacher_id": "TCH004",
	"first_name": "John",
	"last_name": "Smith",
	"email": "john.smith@eduverse.edu",
	"phone": "9876543210",
	"date_of_birth": "1985-03-20",
	"gender": "Male",
	"department": "Computer Science",
	"qualification": "PhD",
	"specialization": "Machine Learning",
	"joining_date": "2024-01-15",
	"salary": 75000.0,
	"status": "Active"
}
```

### Courses

Same CRUD operations:

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

**Create Course Example:**

```json
{
	"course_code": "CS301",
	"course_name": "Web Development",
	"description": "Full stack web development course",
	"credits": 4,
	"duration": "16 weeks",
	"teacher_id": 1,
	"department": "Computer Science",
	"semester": "Fall 2024",
	"max_students": 50,
	"status": "Active"
}
```

### Events

Same CRUD operations:

- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get single event
- `GET /api/events/category/:category` - Get events by category
- `GET /api/events/status/:status` - Get events by status
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

**Create Event Example:**

```json
{
	"event_name": "Tech Workshop 2025",
	"description": "Learn about latest technologies",
	"event_date": "2025-11-15",
	"event_time": "14:00:00",
	"location": "Computer Lab",
	"category": "Workshop",
	"max_attendees": 100,
	"expected_attendees": 85,
	"organizer": "IT Department",
	"status": "Upcoming",
	"registration_required": true
}
```

**Event Categories:** Academic, Research, Career, Workshop, Sports, Networking, Cultural

**Event Statuses:** Upcoming, Ongoing, Completed, Cancelled

## 🔐 Authentication Flow

This is a **simple learning project** with basic authentication:

1. **Login:** Frontend sends username and password to `/api/auth/login`
2. **Response:** Backend checks database and returns admin data
3. **Store:** Frontend stores admin data in `localStorage`
4. **Access:** Frontend checks `localStorage` for admin data to show/hide admin features

**No JWT or encryption** - Plain text password comparison for simplicity.

## 📊 Database Schema

### Tables:

1. **admins** - Admin user credentials
2. **students** - Student information
3. **teachers** - Teacher/faculty information
4. **courses** - Course catalog
5. **enrollments** - Student-course relationships
6. **events** - University events and activities

### Default Admin:

- **Username:** admin
- **Password:** admin123

## 🛠️ Technology Stack

- **Express.js** - Web framework
- **MySQL2** - Database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **body-parser** - Parse request bodies

## 📝 Development Notes

- All passwords are stored in **plain text** (learning purpose only)
- No authentication middleware on CRUD routes (add if needed)
- CORS is configured for `http://localhost:5173` (Vite dev server)
- All responses follow the format: `{ success: boolean, message: string, data: object }`

## 🐛 Troubleshooting

### Database Connection Error

- Check if MySQL is running
- Verify credentials in `.env` file
- Make sure database exists: `CREATE DATABASE university_management_system;`

### Port Already in Use

- Change PORT in `.env` file
- Or kill the process using port 5000

### CORS Error

- Make sure FRONTEND_URL in `.env` matches your React app URL
- Default is `http://localhost:5173`

## 📚 Testing with Postman

Import this collection or test endpoints manually:

1. **Test Login:**

   - POST `http://localhost:5000/api/auth/login`
   - Body: `{ "username": "admin", "password": "admin123" }`

2. **Test Get Students:**

   - GET `http://localhost:5000/api/students`

3. **Test Create Student:**
   - POST `http://localhost:5000/api/students`
   - Body: See create student example above

## 📖 Next Steps

To integrate with React frontend:

1. Install axios: `npm install axios`
2. Create API service file
3. Call endpoints from React components
4. Store admin data in localStorage after login
5. Show admin dashboard if logged in

Happy coding! 🎓
