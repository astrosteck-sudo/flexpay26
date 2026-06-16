 db = require("../config/db");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

const { findOrCreateDiscordUser } = require("../services/discordService");

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateDiscordUser(profile);

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    // fetch the user from DB by ID
    const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
