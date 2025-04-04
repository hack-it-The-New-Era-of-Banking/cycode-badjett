const mongoose = require("mongoose");

const budgetCategorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: {
      type: String,
    },
    budget: {
      type: Number
    },
    description: {
      type: String,
    },
    totalSpent: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenses" }], // sa controller automatically sum all of it up
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BudgetCategory", budgetCategorySchema);
