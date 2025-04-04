const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");

// Get User by Id or Username
const user_get = catchAsync(async (req, res, next) => {
  const { userId } = req.query;

  const user = await User.findById(userId)
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

module.exports = {
  user_get,
  user_delete,
};
