
import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Tabs,
	Tab,
} from "react-bootstrap";
import {
	FaNewspaper,
	FaTrophy,
	FaStar,
	FaCalendarAlt,
	FaEye,
} from "react-icons/fa";
import "./NewsHighlights.css";

const NewsHighlights = () => {
	// Sample news data - in real app, this would come from an API
	const [newsItems] = useState([
		{
			id: 1,
			category: "Achievement",
			title: "EduVerse University Ranks #1 in National Research Excellence",
			excerpt:
				"Our university has been recognized as the leading research institution for the third consecutive year...",
			date: "2025-07-20",
			image: null, // Can add image URLs here
			
			featured: true,
		},
		{
			id: 2,
			category: "Student Life",
			title: "New State-of-the-Art Library Opens This Fall",
			excerpt:
				"The revolutionary learning space features AI-powered study assistants and collaborative zones...",
			date: "2025-07-18",
			image: null,
		
			featured: false,
		},
		{
			id: 3,
			category: "Research",
			title: "Breakthrough in Sustainable Energy Research",
			excerpt:
				"Faculty team develops new solar panel technology that increases efficiency by 40%...",
			date: "2025-07-15",
			image: null,
			featured: true,
		},
		{
			id: 4,
			category: "Awards",
			title: "Professor Smith Wins Nobel Prize in Chemistry",
			excerpt:
				"Distinguished faculty member recognized for groundbreaking work in molecular biology...",
			date: "2025-07-12",
			image: null,
			
			featured: true,
		},
	]);

	const [achievements] = useState([
		{
			id: 1,
			title: "Global University Rankings",
			description: "Ranked #15 globally among top universities",
			icon: FaTrophy,
			color: "warning",
		},
		{
			id: 2,
			title: "Research Excellence",
			description: "Over $50M in research funding secured this year",
			icon: FaStar,
			color: "success",
		},
		{
			id: 3,
			title: "Student Success",
			description: "98% graduate employment rate within 6 months",
			icon: FaTrophy,
			color: "primary",
		},
		{
			id: 4,
			title: "Innovation Awards",
			description: "25+ patents filed by faculty and students",
			icon: FaStar,
			color: "info",
		},
	]);

	// Filter news by category
	const getNewsByCategory = (category) => {
		return newsItems.filter((item) =>
			category === "All" ? true : item.category === category
		);
	};

	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Achievement: "success",
			"Student Life": "primary",
			Research: "info",
			Awards: "warning",
		};
		return colors[category] || "secondary";
	};

	return (
		<section id="news" className="news-section py-5">
			<Container>
				{/* Section Header */}
				<Row className="text-center mb-5">
					<Col>
						<h2 className="section-title">
							<FaNewspaper className="me-3" />
							News & Highlights
						</h2>
						<p className="section-subtitle">
							Stay informed about the latest developments, achievements, and
							exciting news from our campus
						</p>
					</Col>
				</Row>

				{/* Featured Achievements */}
				<Row className="mb-5">
					<Col>
						<h3 className="highlights-title mb-4">Recent Achievements</h3>
						<Row>
							{achievements.map((achievement) => {
								const IconComponent = achievement.icon;
								return (
									<Col md={6} lg={3} key={achievement.id} className="mb-3">
										<Card className="achievement-card h-100">
											<Card.Body className="text-center">
												<div
													className={`achievement-icon bg-${achievement.color}`}
												>
													<IconComponent size={30} />
												</div>
												<h5 className="achievement-title">
													{achievement.title}
												</h5>
												<p className="achievement-description">
													{achievement.description}
												</p>
											</Card.Body>
										</Card>
									</Col>
								);
							})}
						</Row>
					</Col>
				</Row>

				{/* News Articles with Tabs */}
				<Row>
					<Col>
						<h3 className="news-title mb-4">Latest News</h3>

						<Tabs defaultActiveKey="All" className="news-tabs mb-4">
							<Tab eventKey="All" title="All News">
								<Row>
									{getNewsByCategory("All").map((newsItem) => (
										<Col md={6} lg={6} key={newsItem.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItem.featured ? "featured" : ""
												}`}
											>
												{newsItem.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}

												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItem.category)}>
															{newsItem.category}
														</Badge>
														
													</div>

													<h5 className="news-title-card">{newsItem.title}</h5>
													<p className="news-excerpt">{newsItem.excerpt}</p>

													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItem.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItem.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>

							<Tab eventKey="Achievement" title="Achievements">
								<Row>
									{getNewsByCategory("Achievement").map((newsItem) => (
										<Col md={6} lg={6} key={newsItem.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItem.featured ? "featured" : ""
												}`}
											>
												{newsItem.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}

												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItem.category)}>
															{newsItem.category}
														</Badge>
														
													</div>

													<h5 className="news-title-card">{newsItem.title}</h5>
													<p className="news-excerpt">{newsItem.excerpt}</p>

													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItem.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItem.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>

							<Tab eventKey="Research" title="Research">
								<Row>
									{getNewsByCategory("Research").map((newsItem) => (
										<Col md={6} lg={6} key={newsItem.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItem.featured ? "featured" : ""
												}`}
											>
												{newsItem.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}

												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItem.category)}>
															{newsItem.category}
														</Badge>
														
													</div>

													<h5 className="news-title-card">{newsItem.title}</h5>
													<p className="news-excerpt">{newsItem.excerpt}</p>

													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItem.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItem.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>
						</Tabs>

						{/* View All News Button */}
						<div className="text-center mt-4">
							<Button
								variant="primary"
								size="lg"
								onClick={() => alert("View all news page - Coming soon!")}
							>
								View All News
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default NewsHighlights;
