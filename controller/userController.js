const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc     Register new User
//@route    POST /api/register
//access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Authentic a User
//@route    POST /api/login
//access    Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials.");
  }
});

//@desc     Authentic a User
//@route    GET /api/profile
//access    Public
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  });
});

//@desc     Get all Users
//@route    GET /api/users
//access    Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select(["-password", "-isAdmin"]);
  res.status(200).json(users);
});

//generate JWT
const generateToken = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
  h;
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
};
