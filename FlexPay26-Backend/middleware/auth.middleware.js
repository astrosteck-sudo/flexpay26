const jwt = require("jsonwebtoken");

// Middleware to authenticate requests using JWT
const authenticate = (req, res, next) => {
  // Extract the Authorization header (expected format: "Bearer <token>")
  const authHeader = req.headers.authorization;

  // If no Authorization header is provided, reject the request
  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  // Split the header to get the actual token string
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key from .env
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach decoded payload (user info) to request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();

  } catch (err) {
    // If verification fails (expired/invalid token), reject the request
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authenticate;
