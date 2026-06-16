// Load environment variables from .env file
require("dotenv").config();
require("./config/passport");

const express = require("express"); // Import Express framework
const cors = require("cors"); // Enable Cross-Origin Resource Sharing
const helmet = require("helmet"); // Secure HTTP headers
const session = require("express-session"); // Session middleware // Secure HTTP headersconst session = require("express-session");
const passport = require("passport");


const app = express();

// ======================= MIDDLEWARE =======================
// Allow cross-origin requests (frontend can call backend from another domain/port)
app.use(cors());

// Parse incoming JSON request bodies
// server.js

// With this — skip JSON parsing for the Paystack webhook route:
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payment/webhook") {
    next(); // skip — raw body handled in the route itself
  } else {
    express.json()(req, res, next);
  }
});

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

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ======================= ROUTES =======================
// Mount authentication routes under /api/auth
app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/health", require("./routes/health.routes"));

app.use("/api/orders", require("./routes/orderRoutes"));

//app.use("/api/payment", require("./routes/orderRoutes"));

app.use("/api/packages", require("./routes/packageRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));

// app.use(
//   "/api/payment",
//   express.raw({
//     type: "application/json",
//   }),
// );

// ======================= SERVER START =======================
// Use PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
