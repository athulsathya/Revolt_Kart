const express = require("express");
const {
  createOrder,
  verifyPayment,
  getMyOrder,
  getAllOrderAdmin,
  getUserOrder,
} = require("../controller/orderController");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);
router.get("/myorder", isAuthenticated, getMyOrder);
router.get("/all", isAuthenticated, isAdmin, getAllOrderAdmin);
router.get("/user-order/:userId", isAuthenticated, isAdmin, getUserOrder);

module.exports = router;
