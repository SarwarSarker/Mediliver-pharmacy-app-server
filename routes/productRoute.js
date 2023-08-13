const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const upload = require("../utils/multer");
const { admin } = require("../middleware/adminMiddleware");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/",upload.single("image"), [auth, admin], setProduct);
router.route("/:id").put(upload.single("image"), [auth, admin], updateProduct);
router.route("/:id").delete([auth, admin], deleteProduct);

module.exports = router;
