const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");

// Get User by Id or Username
const user_get = catchAsync(async (req, res, next) => {
  const { userId } = req.query;

  const user = await User.findById(userId);
  const { password, likedPost, __v, ...other } = user._doc;

  if (!user) return next(new AppError("User not found", 404));

  return res.status(200).json({ message: "User Fetched", other });
});

// Delete User
const user_delete = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  if (userId === req.userId) {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } else {
    return res.status(403).json({
      message: "You can only delete your own account",
    });
  }
});

// Update User
const user_update = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  const { firstName, lastName, email, preferences } = req.body;

  if (!userId)
    return next(new AppError("Budget Category identifier not found", 400));

  if (!firstName && !lastName && !email && !preferences) {
    return next(new AppError("No data to update", 400));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found. Invalid User ID.", 404));
  }

  let updates = {};

  if (firstName) updates.firstName = firstName;
  if (lastName) updates.lastName = lastName;
  if (email) updates.email = email;
  if (preferences) updates.preferences = preferences;

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
  });

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    message: "User Updated Successfully",
    updatedUser,
  });
});

module.exports = {
  user_get,
  user_delete,
  user_update,
};
