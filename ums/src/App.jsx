/* 
====================================
MAIN APPLICATION COMPONENT
====================================
This is the main App component that sets up routing for:
1. Home Page - All landing sections
2. Programs Page - Academic programs and courses
3. Faculty Page - Faculty directory and information
4. About Page - University information and history
5. Contact Page - Contact forms and information

The app uses React Router for navigation and React Bootstrap 
for responsive design throughout.
*/

import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import all our custom components
import Navbar from "./Components/Common/Navbar/Navbar";
import Footer from "./Components/Common/Footer";

// Import page components
import Home from "./Pages/Home";
import Programs from "./Pages/Programs";
import Faculty from "./Pages/Faculty";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

// Import admin pages
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import StudentManagement from "./Pages/Admin/StudentManagement";
import TeacherManagement from "./Pages/Admin/TeacherManagement";
import CourseManagement from "./Pages/Admin/CourseManagement";
import EventManagement from "./Pages/Admin/EventManagement";

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

// Component to handle success stories redirect with scroll
function SuccessStoriesRedirect() {
	React.useEffect(() => {
		setTimeout(() => {
			const element = document.getElementById("success-stories");
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}, 100);
	}, []);

	return <Navigate to="/" replace />;
}

function AppContent() {
	const isAdminRoute = window.location.pathname.startsWith("/admin");

	return (
		<div className="App">
			{/* Show Navbar only for public pages */}
			{!isAdminRoute && <Navbar />}

			<main className="main-content">
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/programs" element={<Programs />} />
					<Route path="/faculty" element={<Faculty />} />
					<Route path="/success-stories" element={<SuccessStoriesRedirect />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />

					{/* Admin Routes */}
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route path="/admin/dashboard" element={<AdminDashboard />}>
						<Route path="students" element={<StudentManagement />} />
						<Route path="teachers" element={<TeacherManagement />} />
						<Route path="courses" element={<CourseManagement />} />
						<Route path="events" element={<EventManagement />} />
					</Route>
				</Routes>
			</main>

			{/* Show Footer only for public pages */}
			{!isAdminRoute && <Footer />}
		</div>
	);
}

export default App;
