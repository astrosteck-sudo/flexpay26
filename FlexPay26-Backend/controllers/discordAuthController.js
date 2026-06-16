const jwt = require("jsonwebtoken");

const discordCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userData = encodeURIComponent(
      JSON.stringify({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      })
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}&user=${userData}`
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};