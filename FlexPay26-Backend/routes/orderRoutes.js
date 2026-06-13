const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const adminAuth = require("../middleware/adminAuth");

const {
  getOrderByReference,
  getDashboard,
  getOrders,
  completeOrder,
  getCompletedOrders
} = require("../controllers/orderController");

router.get("/dashboard", authenticate, getDashboard);

// router.post("/create", authenticate, createOrder);

//router.get("/my-orders", authenticate, getMyOrders);

//outer.get("/dashboard", authenticate, getDashboardStats);

router.get("/admin/orders", authenticate, adminAuth, getOrders);

router.patch(
  "/admin/orders/:orderId/completed",
  authenticate,
  adminAuth,
  completeOrder,
);

router.get("/admin/orders/completed", authenticate, adminAuth, getCompletedOrders);
router.get("/reference/:reference", authenticate, getOrderByReference);

module.exports = router;
