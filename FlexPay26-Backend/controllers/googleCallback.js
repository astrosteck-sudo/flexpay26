const jwt = require("jsonwebtoken");

const googleCallback = async (req, res) => {
  try {
    const profile = req.user;

    const email = profile.email;

    // let user = await User.findOne({
    //   where: { email },
    // });
    // console.log('User', user)

    // if (!user) {
    //   user = await User.create({
    //     email,
    //     username: profile.displayName,
    //     google_id: profile.id,
    //   });
    // }

    function getFormattedDate() {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const token = jwt.sign(
      {
        user_id: profile.id,
        role: "customer",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const userData = encodeURIComponent(
      JSON.stringify({
        user_id: profile.user_id,
        username: profile.username,
        email: profile.email,
        role: profile.role,
        created_at: profile.created_at,
      }),
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}&user=${userData}`,
    );
  } catch (err) {
    console.error(err);

    res.redirect(`${process.env.FRONTEND_URL}/login-error`);
  }
};

module.exports = {
  googleCallback,
};
