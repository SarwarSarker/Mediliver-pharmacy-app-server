const express = require("express");
const {
  getOrders,
  getMyOrder,
  setOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/orderController");
const router = express.Router();
const { admin } = require("../middleware/adminMiddleware");
const { auth } = require("../middleware/authMiddleware");

router.route("/").get(getOrders);
router.route("/:id").get(getMyOrder);
router.route("/").post(auth, setOrder);
router.route("/:id").put([auth, admin], updateOrder);
router.route("/:id").delete([auth, admin],deleteOrder);

module.exports = router;
