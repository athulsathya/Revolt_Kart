const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  removeCart,
} = require("../controller/cartController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = express.Router();

router.get("get", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.put("/update", isAuthenticated, updateCart);
router.delete("/remove", isAuthenticated, removeCart);
module.exports = router;
