const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../Utilities/catchAsync");

// Get User by Id or Username
const user_get = catchAsync(async (req, res, next) => {
  const { userId, username } = req.query;

  const user = userId
    ? await User.findById(userId)
    : await User.findOne({ username: username })
  const { password, likedPost, __v, ...other } = user._doc;

  if (!user) return next(new AppError("User not found", 404));

  return res.status(200).json({ message: "User Fetched", other });
});

// Delete User
const user_delete = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  if (id === req.userId) {
    await User.findByIdAndDelete(id);
    return res.status(200).json("Account Successfully Deleted");
  } else {
    return res.status(403).json("You can only delete your own account");
  }
});

module.exports = {
  user_get,
  user_delete,
};
