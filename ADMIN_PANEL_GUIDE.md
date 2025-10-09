# Admin Panel Setup & Testing Guide

## Prerequisites

- MySQL server running on localhost:3306
- MySQL password: 9199
- Node.js installed

## Backend Setup

1. **Navigate to backend directory:**

   ```powershell
   cd d:\hariom-project\University-Management-System\ums-backend
   ```

2. **Install dependencies (if not done):**

   ```powershell
   npm install
   ```

3. **Import database schema:**

   - Open MySQL Workbench or command line
   - Run the SQL file: `database_schema.sql`
   - This creates the database `university_db` with all tables and sample data

4. **Start backend server:**
   ```powershell
   node server.js
   ```
   - Server will run on http://localhost:5000
   - You should see: "Server running on port 5000"

## Frontend Setup

1. **Navigate to frontend directory:**

   ```powershell
   cd d:\hariom-project\University-Management-System\ums
   ```

2. **Install dependencies (if needed):**

   ```powershell
   npm install
   ```

3. **Start development server:**
   ```powershell
   npm run dev
   ```
   - Vite dev server runs on http://localhost:5173

## Testing Admin Panel

### 1. Admin Login

- URL: http://localhost:5173/admin/login
- Default credentials:
  - **Username:** admin
  - **Password:** admin123
- Click "Login" button
- Should redirect to dashboard

### 2. Admin Dashboard

- URL: http://localhost:5173/admin/dashboard
- You'll see:
  - Sidebar navigation (Students, Teachers, Courses)
  - Dashboard cards with counts
  - Logout button

### 3. Student Management

- Click "Students" in sidebar
- **Test Operations:**
  - **View:** See all students in table
  - **Search:** Type in search box to filter
  - **Add:** Click "Add New Student" button
    - Fill form fields (Student ID, names, email, phone, DOB, gender, address, enrollment date, status)
    - Click "Add Student"
  - **Edit:** Click edit icon on any row
    - Modify fields
    - Click "Update Student"
  - **Delete:** Click delete icon
    - Confirm deletion

### 4. Teacher Management

- Click "Teachers" in sidebar
- **Test Operations:**
  - **View:** See all teachers in table
  - **Search:** Filter by name, email, or department
  - **Add:** Click "Add New Teacher"
    - Fill all fields including salary, department, qualification
    - Click "Add Teacher"
  - **Edit:** Modify existing teacher data
  - **Delete:** Remove teacher record

### 5. Course Management

- Click "Courses" in sidebar
- **Test Operations:**
  - **View:** See all courses
  - **Search:** Filter by course code, name, or department
  - **Add:** Click "Add New Course"
    - Enter course code, name, credits
    - Select teacher from dropdown (populated from teachers table)
    - Fill duration, department, semester, max students
    - Click "Add Course"
  - **Edit:** Update course details
  - **Delete:** Remove course

## API Endpoints

### Authentication

- POST `/api/auth/login` - Admin login

### Students

- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get single student
- POST `/api/students` - Create student
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student

### Teachers

- GET `/api/teachers` - Get all teachers
- GET `/api/teachers/:id` - Get single teacher
- POST `/api/teachers` - Create teacher
- PUT `/api/teachers/:id` - Update teacher
- DELETE `/api/teachers/:id` - Delete teacher

### Courses

- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get single course
- POST `/api/courses` - Create course
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course

## Troubleshooting

### Backend Issues

**Error: "Cannot connect to database"**

- Check MySQL is running: `net start MySQL80` (or your MySQL service name)
- Verify password in `ums-backend/.env` is `9199`
- Check database exists: `SHOW DATABASES;` in MySQL

**Error: "Port 5000 already in use"**

- Kill existing process: `netstat -ano | findstr :5000`
- Then: `taskkill /PID [PID_NUMBER] /F`

### Frontend Issues

**Error: "Cannot read properties of undefined"**

- Check backend is running (http://localhost:5000)
- Check CORS is configured correctly
- Clear browser localStorage: `localStorage.clear()` in console

**Login doesn't work**

- Open browser console (F12) to see errors
- Check Network tab for API calls
- Verify admin credentials in database: `SELECT * FROM admins;`

**Blank page after login**

- Check React Router routes in App.jsx
- Ensure AdminDashboard uses `<Outlet />` for nested routes
- Check browser console for errors

### Database Issues

**Empty tables**

- Run the INSERT statements from `database_schema.sql`
- Sample data includes 3 students, 3 teachers, 3 courses

**Foreign key errors**

- Ensure teachers exist before creating courses with teacher_id
- Check teacher_id in courses matches an actual teacher.id

## Expected Behavior

✅ **Login:** Redirects to dashboard, saves admin data to localStorage
✅ **Dashboard:** Shows sidebar, navigation works
✅ **CRUD Operations:** All create, read, update, delete operations work
✅ **Search/Filter:** Filtering updates table in real-time
✅ **Validation:** Required fields show browser validation
✅ **Feedback:** Success/error alerts appear after operations
✅ **Responsive:** UI adapts to mobile screens

## Next Steps

1. **Event Management:** Create EventManagement.jsx component
2. **Authentication:** Add route protection (redirect to login if not authenticated)
3. **Validation:** Add form validation (email format, phone number, etc.)
4. **Pagination:** Add pagination for large datasets
5. **Export:** Add export to Excel/PDF functionality
6. **Reports:** Create analytics and reporting features

## File Structure Reference

```
ums/
├── src/
│   ├── Pages/
│   │   └── Admin/
│   │       ├── AdminLogin.jsx          # Login page
│   │       ├── AdminLogin.css          # Login styles
│   │       ├── AdminDashboard.jsx      # Main dashboard
│   │       ├── AdminDashboard.css      # Dashboard styles
│   │       ├── StudentManagement.jsx   # Student CRUD
│   │       ├── TeacherManagement.jsx   # Teacher CRUD
│   │       ├── CourseManagement.jsx    # Course CRUD
│   │       └── Admin.css               # Shared admin styles
│   ├── services/
│   │   └── api.js                      # Axios API service
│   └── App.jsx                         # Route configuration

ums-backend/
├── config/
│   └── database.js                     # MySQL connection
├── controllers/
│   ├── authController.js               # Login logic
│   ├── studentController.js            # Student CRUD logic
│   ├── teacherController.js            # Teacher CRUD logic
│   └── courseController.js             # Course CRUD logic
├── routes/
│   ├── authRoutes.js
│   ├── studentRoutes.js
│   ├── teacherRoutes.js
│   └── courseRoutes.js
├── database_schema.sql                 # Database setup
├── .env                                # Environment variables
└── server.js                           # Express app entry
```

## Notes

- The lint warnings about unused `err` variables are non-critical
- Admin data is stored in localStorage (simple auth, not production-ready)
- No password hashing per user request (learning project)
- Course dropdown fetches teachers dynamically from API
