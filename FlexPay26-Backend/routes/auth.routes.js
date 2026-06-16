const router = require("express").Router();
const passport = require("passport");

const { register, login } = require("../controllers/auth.controller");
const { discordCallback } = require("../controllers/discordAuthController");

router.post("/register", register);
router.post("/login", login);
router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/login",
    session: false,
  }),
  discordCallback,
);

module.exports = router;
module.exports = router;
