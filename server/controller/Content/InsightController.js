const { OpenAI } = require("openai");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");
const User = require("../../models/User/User");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create Income
const insight_post = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId)
    .populate("budgetCategory")
    .populate("expense")
    .populate("income");
  const spendingSummary = user.expense.reduce((summary, expense) => {
    summary[expense.category] =
      (summary[expense.category] || 0) + expense.amount;
    return summary;
  }, {});

  const incomeSummary = user.income.reduce((summary, income) => {
    summary.totalEarnedIncome =
      (summary.totalEarnedIncome || 0) + income.earnedIncome;
    summary.totalAdditionalCompensation =
      (summary.totalAdditionalCompensation || 0) +
      income.additionalCompensation;
    return summary;
  }, {});

  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    input: [
      {
        role: "system",
        content: `
            You are a smart budgeting assistant designed to help users manage their personal finances.
            Your goal is to provide practical financial feedbacl advice based on income, expenses, and savings goals.
            Tell the user insights if it spend more than the budget and how they should save, or tell the user how good they save their money and other feedback as well

            Be proffesional, kind, clear, concise, and supportive. Do not provide investment advice or legal financial recommendations.

            Here is the user's financial context:
            - Monthly Income: ${user.income.reduce(
              (sum, inc) => sum + inc.earnedIncome + inc.additionalCompensation,
              0
            )}
      - Spending Habits: ${JSON.stringify(spendingSummary)}
      - Budget Categories: ${user.budgetCategory
        .map((cat) => `${cat.category}: ₱${cat.budget}`)
        .join(", ")}
      - Income Summary: ${JSON.stringify(incomeSummary)}
      Use this information to provide personalized financial advice.
        `,
      },
    ],
  });

  return res.status(200).json({ reply: response.output_text });
});

module.exports = {
  insight_post,
};
