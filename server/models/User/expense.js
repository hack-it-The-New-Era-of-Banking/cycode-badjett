const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: {
      type: String,
    },
    moneySpent: {
      type: mongoose.Types.Decimal128,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expenses", expensesSchema);
