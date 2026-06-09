const router = require("express").Router();

const {
  register,
  login
} = require("../contollers/auth.controller");

router.post("/register", register);
router.post("/login", login);
//////
module.exports = router;