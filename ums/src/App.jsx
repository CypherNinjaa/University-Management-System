/* 
====================================
MAIN APPLICATION COMPONENT
====================================
This is the main App component that brings together all sections:
1. Navigation Header with logo and menu items
2. Hero Section with university welcome
3. Events & Calendar Section
4. News & Highlights Section  
5. Why Choose Us Section
6. Student Success Stories Carousel
7. FAQ Section
8. Footer

The app uses React Bootstrap for responsive design and 
React Icons for consistent iconography throughout.
*/

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import all our custom components
import Navbar from "./Components/Common/Navbar/Navbar";
import Footer from "./Components/Common/Footer";
import HeroSection from "./Components/Home/HeroSection";
import EventsCalendar from "./Components/Home/EventsCalendar";
import NewsHighlights from "./Components/Home/NewsHighlights";
import WhyChooseUs from "./Components/Home/WhyChooseUs";
import StudentSuccessStories from "./Components/Home/StudentSuccessStories";
import FAQ from "./Components/Home/FAQ";

function App() {
	return (
		<div className="App">
			{/* 
      ====================================
      STEP 1: NAVIGATION HEADER
      ====================================
      Fixed navigation bar with:
      - University logo
      - Navigation menu (Home, Programs, Faculty, etc.)
      - Login button
      - Responsive mobile menu
      */}
			<Navbar />

			{/* 
      ====================================
      STEP 2: HERO/LANDING SECTION
      ====================================
      Main landing area with:
      - Welcome message and university introduction
      - Call-to-action buttons
      - University highlights and statistics
      */}
			<HeroSection />

			{/* 
      ====================================
      STEP 3: EVENTS & CALENDAR SECTION
      ====================================
      Interactive section showing:
      - Monthly calendar with event indicators
      - Upcoming events list
      - Event registration capabilities
      */}
			<EventsCalendar />

			{/* 
      ====================================
      STEP 4: NEWS & HIGHLIGHTS SECTION
      ====================================
      Dynamic news section featuring:
      - Featured news stories
      - Category-based news filtering
      - Latest university achievements
      */}
			<NewsHighlights />

			{/* 
      ====================================
      STEP 5: WHY CHOOSE US SECTION
      ====================================
      Promotional section highlighting:
      - University advantages and benefits
      - Key statistics and achievements
      - Success metrics and rankings
      */}
			<WhyChooseUs />

			{/* 
      ====================================
      STEP 6: STUDENT SUCCESS STORIES
      ====================================
      Carousel section showcasing:
      - Student testimonials and achievements
      - Success stories from different programs
      - Alumni career highlights
      */}
			<StudentSuccessStories />

			{/* 
      ====================================
      STEP 7: FAQ SECTION
      ====================================
      Information section with:
      - Frequently asked questions
      - Searchable accordion interface
      - Contact information for support
      */}
			<FAQ />

			{/* 
      ====================================
      STEP 8: FOOTER
      ====================================
      Site footer containing:
      - University contact information
      - Important links and resources
      - Social media connections
      - Copyright and legal information
      */}
			<Footer />
		</div>
	);
}

export default App;
