const { OpenAI } = require("openai");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");
const User = require("../../models/User/User");
const Expense = require("../../models/Main/Expense"); // Import the Expense model
const Income = require("../../models/Main/Income"); // Import the Income model

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create Income
const chat_post = catchAsync(async (req, res, next) => {
  // Find user and check if exists
  const user = await User.findById(req.userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Fetch budget categories
  const budgetCategories = await user.populate("budgetCategory");

  // Fetch expenses separately
  const expenses = await Expense.find({ userId: req.userId }).populate(
    "category"
  );

  const income = await Income.find({ userId: req.userId });

  // Create spending summary
  const spendingSummary = {};
  if (expenses && expenses.length > 0) {
    expenses.forEach((expense) => {
      const categoryName = expense.category
        ? expense.category.category
        : "Uncategorized";
      spendingSummary[categoryName] =
        (spendingSummary[categoryName] || 0) + expense.amount;
    });
  }

  // Safely get monthly income
  let monthlyIncome = 0;
  let incomeDetails = [];
  if (income && income.length > 0) {
    monthlyIncome = income.reduce((sum, inc) => {
      incomeDetails.push({
        jobTitle: inc.jobTitle || "Unknown",
        earnedIncome: inc.earnedIncome || 0,
        additionalCompensation: inc.additionalCompensation || 0,
        date: inc.date || "Unknown Date",
      });
      return sum + (inc.earnedIncome || 0) + (inc.additionalCompensation || 0);
    }, 0);
  }

  // Safely get budget categories
  let budgetCategoriesString = "No budget categories set";
  if (user.budgetCategory && user.budgetCategory.length > 0) {
    budgetCategoriesString = user.budgetCategory
      .map((cat) => `${cat.category || "Unnamed"}: ₱${cat.budget || 0}`)
      .join(", ");
  }

  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
                        You are Wingman, a smart budgeting assistant designed to help users manage their personal finances.
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
                        - Monthly Income: ₱${monthlyIncome}, ${JSON.stringify(
            incomeDetails
          )}
                        - Spending Habits: ${JSON.stringify(spendingSummary)}
                        - Budget Categories: ${budgetCategoriesString}
                        
                        Use this information to provide personalized financial advice.
                    `,
        },
        { role: "user", content: message },
      ],
    });

    return res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return next(new AppError("Failed to generate AI response", 500));
  }
});

module.exports = {
  chat_post,
};
