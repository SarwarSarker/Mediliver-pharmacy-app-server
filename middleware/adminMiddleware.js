const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const admin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("You are not alowed to do that!");
  }
});

module.exports = { admin };
