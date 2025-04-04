const { OpenAI } = require('openai');
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create Income
const chat_post = catchAsync(async (req, res, next) => {
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