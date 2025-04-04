const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    token: String,
    budgetCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "BudgetCategory" }],

    // connect budget info
    // connect expenses
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
