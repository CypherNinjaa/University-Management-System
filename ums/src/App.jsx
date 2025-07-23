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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
	return (
		<Router>
			<div className="App">
				{/* 
        ====================================
        NAVIGATION HEADER
        ====================================
        Fixed navigation bar with:
        - University logo
        - Navigation menu with React Router Links
        - Login button
        - Responsive mobile menu
        */}
				<Navbar />

				{/* 
        ====================================
        MAIN CONTENT ROUTES
        ====================================
        React Router handles navigation between:
        - Home: Landing page with all sections
        - Programs: Academic programs and courses
        - Faculty: Faculty directory and profiles
        - About: University information and history
        - Contact: Contact forms and information
        */}
				<main className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/programs" element={<Programs />} />
						<Route path="/faculty" element={<Faculty />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
				</main>

				{/* 
        ====================================
        FOOTER
        ====================================
        Site footer containing:
        - University contact information
        - Important links and resources
        - Social media connections
        - Copyright and legal information
        */}
				<Footer />
			</div>
		</Router>
	);
}

export default App;
