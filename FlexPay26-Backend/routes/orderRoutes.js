const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const { getOrderByReference } = require("../controllers/orderController");

// router.post("/create", authenticate, createOrder);

//router.get("/my-orders", authenticate, getMyOrders);

 //outer.get("/dashboard", authenticate, getDashboardStats);

router.get("/reference/:reference",authenticate, getOrderByReference);

module.exports = router;
