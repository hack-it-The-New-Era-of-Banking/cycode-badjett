const { OpenAI } = require("openai");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");
const User = require("../../models/User/User");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create Income
const insight_post = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId).populate("expense");
  const spendingSummary = Array.isArray(user.expense)
    ? user.expense.reduce((summary, expense) => {
        summary[expense.category] =
          (summary[expense.category] || 0) + expense.amount;
        return summary;
      }, {})
    : {};

  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    input: [
      {
        role: "system",
        content: `
            You are a smart budgeting assistant designed to help users manage their personal finances.
            Your goal is to provide practical financial feedback advice based on their spending habit and how they can save and make it short.
            For example: You could save ₱500 this week by reducing dining out expenses

            Be proffesional, kind, clear, concise, and supportive. Do not provide investment advice or legal financial recommendations.

            Here is the user's financial context:
            - Spending Habits: ${JSON.stringify(spendingSummary)} 
            Use this information to provide personalized financial expense advice.
        `,
      },
    ],
  });

  return res.status(200).json({ reply: response.output_text });
});

module.exports = {
  insight_post,
};
