const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
  createOrder,
  getMyOrders,
  getDashboardStats,
} = require("../controllers/orderController");


router.post("/create", authenticate, createOrder);

router.get("/my-orders", authenticate, getMyOrders);

router.get("/dashboard", authenticate, getDashboardStats);

module.exports = router;
