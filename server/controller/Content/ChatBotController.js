const { OpenAI } = require('openai');
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");
const User = require('../../models/User/User');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create Income
const chat_post = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.userId).populate("budgetCategory").populate("expense");
const spendingSummary = user.expense.reduce((summary, expense) => {
  summary[expense.category] = (summary[expense.category] || 0) + expense.amount;
  return summary;
}, {});

    const { message } = req.body;

    const response = await openai.responses.create({
        model: "gpt-4o-mini-2024-07-18",
        input: [{ role: "system", content: `
            You are a smart budgeting assistant designed to help users manage their personal finances.
            Your goal is to provide practical financial advice based on income, expenses, and savings goals.
            You can help users:
            - Track expenses and categorize them (e.g., food, rent, entertainment).
            - Provide budgeting tips and strategies (e.g., 50/30/20 rule).
            - Suggest ways to save money based on their spending habits.
            - Recommend cost-effective alternatives for purchases.
            - Answer general financial questions.
            - Help users set and achieve financial goals.
            - Encourage good financial habits and mindful spending.

            Be clear, concise, and supportive. Do not provide investment advice or legal financial recommendations.

            You are a smart budgeting assistant. Here is the user's financial context:
      - Monthly Income: ${user.income.reduce((sum, inc) => sum + inc.earnedIncome + inc.additionalCompensation, 0)}
      - Spending Habits: ${JSON.stringify(spendingSummary)}
      - Budget Categories: ${user.budgetCategory.map(cat => `${cat.category}: ₱${cat.budget}`).join(", ")}
      Use this information to provide personalized financial advice.
        `},
        { role: "user", content: message }],
    });

  return res
    .status(200)
    .json({ reply: response.output_text });
});

module.exports = {
  chat_post,
};