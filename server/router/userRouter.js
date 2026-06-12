const express = require("express");
const {
  register,
  verify,
  reVerify,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  changePassword,
  allUser,
  getUserById,
  getAllUsers,
  updateUser,
} = require("../controller/userController");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticated");
const { singleUpload } = require("../middleware/multer");
const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/change-password/:email", changePassword);
router.get("/all-user", isAuthenticated, isAdmin, allUser); //check if any error occured need to improve
router.get("/get-user/:userId", getUserById);
router.get("/get-all-user", getAllUsers);
router.put("/update/:id", isAuthenticated, singleUpload, updateUser);

module.exports = router;
