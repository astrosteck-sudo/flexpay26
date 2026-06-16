const router = require("express").Router();
const passport = require("passport");

const { register, login } = require("../controllers/auth.controller");
const { discordCallback } = require("../controllers/discordAuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  (req, res, next) => {
    passport.authenticate("discord", (err, user, info) => {
      if (err) {
        console.error("Discord OAuth Error:", err);
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        console.error("Discord OAuth Failure Info:", info);
        return res.status(400).json({ error: info });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error("Login Error:", err);
          return res.status(500).json({ error: err.message });
        }
        return discordCallback(req, res);
      });
    })(req, res, next);
  }
);


router.get("/login", (req, res) => {
  console.error("OAuth2 Failure:", req.session.messages);
  res.status(400).send("Discord OAuth failed");
});
module.exports = router;
