const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc:   Register new user
//@route:   POST /api/users
//@access   PRIVATE (only trust and admin should exist, no new users can be created)
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(User._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});
// @desc:   Authenticate user
//@route:   POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //check for user usernanme
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    console.log(await bcrypt.compare(password, user.password));
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});
// @desc:   Get user data
//@route:   GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  console.log(_id);

  res.status(200).json({
    id: _id,
    username,
    email,
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
