const mongoose = require("mongoose");

const budgetCategorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: {
      type: String,
    },
    totalBudget: {
      type: mongoose.Types.Decimal128,
    },
    description: {
      type: String,
    },
    budgetInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "BudgetInfo" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BudgetCategory", budgetCategorySchema);
