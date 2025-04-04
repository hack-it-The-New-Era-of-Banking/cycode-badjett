const mongoose = require("mongoose");

const BudgetCategoryItemsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetCategory" },
    itemName: {
      type: String,
    },
    itemPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BudgetCategoryItems",
  BudgetCategoryItemsSchema
);
