const db = require("../config/db"); // Import MySQL connection pool
const bcrypt = require("bcrypt"); // For hashing and comparing passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens

// ======================= REGISTER CONTROLLER =======================
const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Validate required fields
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (phoneNumber.length != 10) {
      return res.status(400).json({
        message: "Phone number must 10 digits long",
      });
    }

    // Check if user already exists by email
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Hash password with bcrypt (saltRounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    await db.query(
      `
      INSERT INTO users
      (username, email, password, phone)
      VALUES (?,?,?,?)
      `,
      [username, email, hashedPassword, phoneNumber],
    );

    // Success response
    setTimeout(() => {
      res.status(201).json({
        message: "Account created successfully",
      });
    }, 2000);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================= LOGIN CONTROLLER =======================
const login = async (req, res) => {
  try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    // Find user by email
    const [users] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = users[0];

    // Compare provided password with hashed password in DB
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT token with user_id and role
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET, // Secret key stored in .env
      {
        expiresIn: "7d", // Token valid for 7 days
      },
    );

    // Success response with token and user info
    res.json({
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Export controllers
module.exports = {
  register,
  login,
};
