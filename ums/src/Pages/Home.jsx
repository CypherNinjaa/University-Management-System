/* 
====================================
HOME PAGE COMPONENT
====================================
This component contains all the sections for the home page:
- Hero Section with university welcome
- Events & Calendar Section
- News & Highlights Section  
- Why Choose Us Section
- Student Success Stories Carousel
- FAQ Section
*/

import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import EventsCalendar from "../Components/Home/EventsCalendar";
import NewsHighlights from "../Components/Home/NewsHighlights";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import StudentSuccessStories from "../Components/Home/StudentSuccessStories";
import FAQ from "../Components/Home/FAQ";

const Home = () => {
	return (
		<div className="home-page">
			{/* 
      ====================================
      HERO/LANDING SECTION
      ====================================
      Main landing area with:
      - Welcome message and university introduction
      - Call-to-action buttons
      - University highlights and statistics
      */}
			<HeroSection />

			{/* 
      ====================================
      EVENTS & CALENDAR SECTION
      ====================================
      Interactive section showing:
      - Gallery carousel with campus images
      - Upcoming events list
      - Event registration capabilities
      */}
			<EventsCalendar />

			{/* 
      ====================================
      NEWS & HIGHLIGHTS SECTION
      ====================================
      Dynamic news section featuring:
      - Featured news stories
      - Category-based news filtering
      - Latest university achievements
      */}
			<NewsHighlights />

			{/* 
      ====================================
      WHY CHOOSE US SECTION
      ====================================
      Promotional section highlighting:
      - University advantages and benefits
      - Key statistics and achievements
      - Success metrics and rankings
      */}
			<WhyChooseUs />

			{/* 
      ====================================
      STUDENT SUCCESS STORIES
      ====================================
      Carousel section showcasing:
      - Student testimonials and achievements
      - Success stories from different programs
      - Alumni career highlights
      */}
			<StudentSuccessStories />

			{/* 
      ====================================
      FAQ SECTION
      ====================================
      Information section with:
      - Frequently asked questions
      - Searchable accordion interface
      - Contact information for support
      */}
			<FAQ />
		</div>
	);
};

export default Home;
