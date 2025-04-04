const User = require("../../models/User/User");
const InvalidToken = require("../../models/InvalidToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../utilities/catchAsync");
const AppError = require("../../utilities/appError");

// Login route
const user_login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne(
    email
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  await User.findByIdAndUpdate(user._id);

  const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  return res.json({
    user,
    token,
  });
});

// Signup route
const user_signup = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  // Check if user already exists
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new AppError("Email already used.", 400));
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword, // Save the hashed password
  });

  const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  return res.status(200).json({
    user,
    token,
  });
});

// Logout route
const user_logout = catchAsync(async (req, res, next) => {
  const token = req.header("Authorization");

  const invalidToken = new InvalidToken({
    token: token,
  });

  await invalidToken.save();

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const userId = decoded.user._id;
  await User.findByIdAndUpdate(userId, { logOutTime: Date.now() });

  return res
    .status(200)
    .json({ message: "Logged Out Successfully", invalidToken });
});


module.exports = {
  user_login,
  user_signup,
  user_logout,
};
