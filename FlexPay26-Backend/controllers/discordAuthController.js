const jwt = require("jsonwebtoken");

const discordCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const userData = encodeURIComponent(
      JSON.stringify({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      }),
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}&user=${userData}`,
    );
  } catch (error) {
    console.error(error); // optional: log the error for debugging

    // Redirect to frontend error page with provider info
    return res.redirect(`${process.env.FRONTEND_URL}/login-error`);
  }
};

module.exports = {
  discordCallback,
};
