const User = require("../../models/User/User");
const InvalidToken = require("../../models/InvalidToken");
const BudgetCategory = require("../../models/Main/BudgetCategory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../utilities/catchAsync");
const AppError = require("../../utilities/appError");

// Login route
const user_login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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
  const { firstName, lastName, email, password } = req.body;

  // Check if user already exists
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new AppError("Email already used.", 400));
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword, // Save the hashed password
  });

  await user.save();

  await BudgetCategory.create({ userId: user._id, category: "Food" });
  await BudgetCategory.create({ userId: user._id, category: "Rent" });
  await BudgetCategory.create({ userId: user._id, category: "Electricity" });
  await BudgetCategory.create({ userId: user._id, category: "Water" });
  await BudgetCategory.create({ userId: user._id, category: "Internet" });
  await BudgetCategory.create({ userId: user._id, category: "Transportation" });
  await BudgetCategory.create({ userId: user._id, category: "School Fees" });
  await BudgetCategory.create({ userId: user._id, category: "Health" });
  await BudgetCategory.create({ userId: user._id, category: "Hobbies" });
  await BudgetCategory.create({ userId: user._id, category: "Clothing" });
  await BudgetCategory.create({ userId: user._id, category: "Personal Care" });
  await BudgetCategory.create({ userId: user._id, category: "Utilities" });
  await BudgetCategory.create({ userId: user._id, category: "Miscellaneous" });
  await BudgetCategory.create({
    userId: user._id,
    category: "Dining Out / Takeout",
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
