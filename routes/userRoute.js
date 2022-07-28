const express = require("express");
const {
  getUser,
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controller/userController");
const { admin } = require("../middleware/adminMiddleware");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUser);
router.get("/", [auth, admin], getAllUsers);

module.exports = router;
