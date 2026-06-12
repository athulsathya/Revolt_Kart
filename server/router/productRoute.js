const express = require("express");
const {
  addProduct,
  getAllProduct,
  deleProduct,
  updateProduct,
} = require("../controller/productController");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticated");
const { multipleUpload } = require("../middleware/multer");
const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, multipleUpload, addProduct);
router.get("/getallproducts", getAllProduct);
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleProduct);
router.put(
  "/update/:productId",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct,
);

module.exports = router;
