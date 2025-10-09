# Programs Page - Made Dynamic

## Changes Made

### 1. Added API Integration

- Imported `courseAPI` from `services/api.js`
- Imported `useEffect` hook for data fetching
- Added `Spinner` and `Alert` components for UI feedback
- Added `FaChalkboardTeacher` icon for teacher display

### 2. State Management

```javascript
const [programs, setPrograms] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [selectedLevel, setSelectedLevel] = useState("All");
```

### 3. Data Fetching & Transformation (useEffect)

Fetches courses from backend and transforms them into program format:

```javascript
{
    id: course.id,
    title: course.course_name,                    // Course name → Program title
    level: course.semester || "Undergraduate",     // Semester → Level
    duration: course.duration || "Variable",       // Course duration
    category: course.department || "General",      // Department → Category
    description: course.description,               // Course description
    features: [...],                               // Parsed from description
    tuition: "Contact admissions",                 // Placeholder
    students: course.max_students,                 // Max enrollment
    credits: course.credits,                       // Course credits
    teacher_name: course.teacher_name || "TBA",    // Assigned teacher
    course_code: course.course_code,               // Course identifier
    featured: course.credits >= 4                  // Featured if 4+ credits
}
```

### 4. Filtering Logic

- **Status Filter**: Only shows courses with `status = "Active"`
- **Search**: Still works across course names and descriptions
- **Category**: Filters by department (dynamically generated)
- **Level**: Filters by semester (dynamically generated)

### 5. Enhanced UI States

#### Loading State

```jsx
{loading && (
    <Spinner animation="border" variant="primary" size="lg" />
    <p>Loading programs...</p>
)}
```

#### Error State

```jsx
{
	error && (
		<Alert variant="danger">
			<h5>Oops! Something went wrong</h5>
			<p>{error}</p>
		</Alert>
	);
}
```

#### No Programs State

```jsx
{
	programs.length === 0 && (
		<Alert variant="info">
			<FaGraduationCap size={50} />
			<h5>No programs available</h5>
			<p>Check back later...</p>
		</Alert>
	);
}
```

#### No Results State

```jsx
{filteredPrograms.length === 0 && (
    <h4>No programs found</h4>
    <p>Try adjusting your search criteria</p>
)}
```

### 6. Updated Card Display

Added dynamic fields:

- **Course Code**: Displays above teacher name

  ```jsx
  <strong>Course Code:</strong> {program.course_code}
  ```

- **Teacher Name**: Shows assigned instructor

  ```jsx
  <FaChalkboardTeacher /> {program.teacher_name}
  ```

- **Credits**: Replaces rating display
  ```jsx
  <FaBookOpen className="text-success" />
  <div className="stat-value">{program.credits}</div>
  <div className="stat-label">Credits</div>
  ```

### 7. Feature Parsing

Automatically extracts key areas from course description:

- Splits description by periods
- Takes first 4 sentences as features
- Falls back to default text if no description

```javascript
features: course.description
	? course.description
			.split(".")
			.filter((s) => s.trim().length > 0)
			.slice(0, 4)
	: ["Course content available upon enrollment"];
```

### 8. Dynamic Featured Courses

Courses are marked as "Featured" based on credits:

```javascript
featured: course.credits >= 4; // 4 or more credits = Featured
```

## Database Field Mapping

| Database Field | Display As             | Notes                |
| -------------- | ---------------------- | -------------------- |
| `course_name`  | Title                  | Main heading         |
| `course_code`  | Course Code            | Shown below title    |
| `semester`     | Level                  | e.g., "Fall 2024"    |
| `duration`     | Duration               | e.g., "16 weeks"     |
| `department`   | Category               | Filter option        |
| `description`  | Description + Features | Parsed into sections |
| `credits`      | Credits                | Displayed as stat    |
| `max_students` | Max Students           | Replaces "Students"  |
| `teacher_name` | Teacher                | Shows instructor     |
| `status`       | (Filter)               | Only "Active" shown  |

## Dynamic Filters

### Category Filter (Department)

Automatically populated from unique departments in database:

- Computer Science
- Business Administration
- Engineering
- etc.

### Level Filter (Semester)

Automatically populated from unique semesters:

- Fall 2024
- Spring 2025
- Undergraduate (default)
- etc.

## How It Works

1. **Component Mounts** → Calls `courseAPI.getAll()`
2. **Loading State** → Shows spinner while fetching
3. **Data Transform** → Converts courses to program format
4. **Filter Active** → Only displays courses with `status = "Active"`
5. **Display** → Shows transformed data in cards
6. **Search/Filter** → Works with transformed data

## Connected to Backend

The Programs page now:

- ✅ Fetches real courses from `http://localhost:5000/api/courses`
- ✅ Updates automatically when courses are added/edited in Admin Panel
- ✅ Filters by active status
- ✅ Shows course code, teacher, credits, and max students
- ✅ Dynamically generates category and level filters
- ✅ Parses course descriptions into feature lists
- ✅ Marks high-credit courses as "Featured"
- ✅ Handles loading, error, and empty states

## Testing

1. **Add courses in Admin Panel** → `/admin/dashboard/courses`
2. **Go to Programs Page** → `/programs`
3. **Verify Display**:

   - Course name appears as program title
   - Course code shown below title
   - Teacher name displayed
   - Credits shown in stats
   - Department appears as category
   - Only active courses visible

4. **Test Filters**:

   - Search by course name
   - Filter by department (category)
   - Filter by semester (level)

5. **Test States**:
   - Set all courses to "Inactive" → See "No programs available"
   - Search for non-existent course → See "No programs found"
   - Stop backend → See error message

## Future Enhancements

Could be improved by:

1. **Tuition Field**: Add `tuition` column to courses table
2. **Rating System**: Add `reviews` table for student ratings
3. **Enrollment Count**: Track actual enrolled students (vs max)
4. **Course Images**: Add thumbnail images for visual appeal
5. **Prerequisites**: Show required courses
6. **Syllabus Download**: Link to PDF syllabus

---

**Status:** ✅ Fully Dynamic and Connected to Backend!

The Programs page now displays real course data from the database and updates automatically when courses are managed in the admin panel.
