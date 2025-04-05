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
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    token: String,
    preferences: {
      type: [String],
      enum: [
        "Sports",
        "Music",
        "Travel",
        "Art",
        "Technology",
        "Food",
        "Video Games",
        "Comics and Manga",
        "Self-Care",
        "Travelling",
        "Home Decorations",
        "Sneaker Collecting",
      ],
      required: true,
    },
    budgetCategory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "BudgetCategory" },
    ],
    income: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }],
    expense: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenses" }],

    // connect budget info
    // connect expenses
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
