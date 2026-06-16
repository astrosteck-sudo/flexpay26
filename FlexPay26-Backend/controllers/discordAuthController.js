const jwt = require("jsonwebtoken");

const discordCallback = async (req, res) => {
  try {
    
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  discordCallback,
};