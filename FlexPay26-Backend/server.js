// Load environment variables from .env file
require("dotenv").config();

const express = require("express");   // Import Express framework
const cors = require("cors");         // Enable Cross-Origin Resource Sharing
const helmet = require("helmet");     // Secure HTTP headers

const app = express();

// ======================= MIDDLEWARE =======================
// Allow cross-origin requests (frontend can call backend from another domain/port)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Add security headers to protect against common vulnerabilities
app.use(helmet());

// ======================= BASIC ROUTE =======================
// Root route to confirm backend is running
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ======================= DATABASE CONNECTION =======================
// Import MySQL connection pool
const db = require("./config/db");

// Test database connection once at startup
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("MySQL Connected ✅");
    conn.release(); // Release connection back to pool
  } catch (err) {
    console.error("Database connection failed ❌", err);
  }
})();

// ======================= ROUTES =======================
// Mount authentication routes under /api/auth
app.use("/api/auth", require("./routes/auth.routes"));

// ======================= SERVER START =======================
// Use PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
