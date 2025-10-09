/* 
====================================
DATABASE CONFIGURATION
====================================
MySQL database connection setup using mysql2 package
Creates a connection pool for efficient database operations
*/

const mysql = require("mysql2");
require("dotenv").config();

// Create MySQL connection pool
const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "9199",
	database: process.env.DB_NAME || "university_management_system",
	port: process.env.DB_PORT || 3306,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

// Get promise-based connection
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
	try {
		const connection = await promisePool.getConnection();
		console.log("✅ Database connected successfully!");
		console.log(`📊 Database: ${process.env.DB_NAME}`);
		connection.release();
		return true;
	} catch (error) {
		console.error("❌ Database connection failed:", error.message);
		return false;
	}
};

module.exports = {
	pool,
	promisePool,
	testConnection,
};
