const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const {
  initializePayment,
  paystackWebhook,
} = require("../controllers/paymentController");

// User-facing route (JWT required)
router.post("/initialize", authenticate, initializePayment);

// Webhook route (raw body required for signature verification)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }), // 👈 scoped only here
  paystackWebhook,
);

module.exports = router;
