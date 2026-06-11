const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  initializePayment,
  paystackWebhook,
} = require("../controllers/paymentController");

router.post("/initialize", authenticate, initializePayment);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // 👈 only here
  paystackWebhook,
);

module.exports = router;
