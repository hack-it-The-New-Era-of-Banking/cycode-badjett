const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // budget Category ID
    category:  { type: mongoose.Schema.Types.ObjectId, ref: "BudgetCategory" },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
    },
    date: Date,
    is_recurring : {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expenses", expensesSchema);
