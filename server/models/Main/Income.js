const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobTitle: {
      type: String,
    },
    earnedIncome: Number,
    additionalCompensation: Number,
    category: {
      type: String,
      enum: ["Passive", "Monthly"],
    },
    dateReceived: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Income", incomeSchema);
