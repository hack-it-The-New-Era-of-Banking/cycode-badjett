const Expense = require("../../models/Main/Expense");
const BudgetCategory = require("../../models/Main/BudgetCategory");
const User = require("../../models/User/User");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");

// Get Expense by Id
const expense_get = catchAsync(async (req, res, next) => {
  const { id, userId } = req.query;

  let expense;

  if (!id && !userId) return next(new AppError("Expense identifier not found", 400));

  id ? expense = await Expense.findById(id).populate("category") : expense = await Expense.find({userId: userId}).populate("category");

  if (!expense)
    return next(new AppError("Expense not found. Invalid Expense Identifier.", 404));

  let totalExpenseSum = 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  if (Array.isArray(expense)) {
    expense = expense
      .filter((item) => {
        const expenseDate = new Date(item.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .map((item) => {
        const totalExpense = item.amount;
        totalExpenseSum += totalExpense;
        return {
          ...item.toObject(),
          totalExpense,
        };
      });
  } else {
    const expenseDate = new Date(expense.date);
    if (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    ) {
      const totalExpense = expense.amount;
      totalExpenseSum = totalExpense;
      expense = {
        ...expense.toObject(),
        totalExpense,
      };
    } else {
      expense = null;
    }
  }
  
  let total7ExpenseSum;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  if (Array.isArray(expense)) {
    expense = expense
      .filter((item) => {
        const expenseDate = new Date(item.date);
        return expenseDate >= sevenDaysAgo;
      })
      .map((item) => {
        return {
          ...item,
        };
      });

    total7ExpenseSum = expense.reduce((sum, item) => sum + item.amount, 0);
  } else {
    const expenseDate = new Date(expense.date);
    if (expenseDate >= sevenDaysAgo) {
      total7ExpenseSum = expense.amount;
      expense = {
        ...expense,
      };
    } else {
      expense = null;
    }
  }
  
  return res.status(200).json({ message: "Income Successfully Fetched", days7: total7ExpenseSum, month: totalExpenseSum, expense});
});

// Create Expense
const expense_post = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  const { category, amount, description, paymentMethod, date, is_recurring } = req.body;

  const isUserValid = await User.findById(userId);

  if (!isUserValid)
    return next(new AppError("User not found. Invalid User ID.", 404));

  if (
    !amount &&
    !description &&
    !paymentMethod &&
    !category && 
    !date && 
    !is_recurring
  ) {
    return next(new AppError("Cannot create expense, no data.", 400));
  }
  
  const newExpense = new Expense({
    userId, category, amount, description, paymentMethod, date, is_recurring
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { expense: newExpense._id } },
    { new: true }
  );

  await BudgetCategory.findByIdAndUpdate(
    category,
    { $push: { totalSpent: newExpense._id } },
    { new: true }
  );

  await newExpense.save();

  return res
    .status(200)
    .json({ message: "Expense Successfully Created", newExpense });
});

// Update Expense
const expense_put = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const { category, amount, description, paymentMethod, date, is_recurring } =
    req.body;

  if (!id) return next(new AppError("Expense identifier not found", 400));

  if (
    !amount &&
    !description &&
    !paymentMethod &&
    !category && 
    !date && 
    !is_recurring
  ) {
    return next(new AppError("No data to update", 400));
  }

  const expense = await Expense.findById(id);

  if (!expense) {
    return next(new AppError("Expense not found. Invalid Expense ID.", 404));
  }

  let updates = {};

  if (amount) updates.amount = amount;
  if (description) updates.description = description;
  if (paymentMethod) updates.paymentMethod = paymentMethod;
  if (category) updates.category = category;
  if (date) updates.date = date;
  if (is_recurring) updates.is_recurring = is_recurring;


  const updatedExpense = await Expense.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updatedExpense) {
    return next(new AppError("Expense not found", 404));
  }

  return res
    .status(200)
    .json({ message: "Expense Updated Successfully", updatedExpense });
});

// Delete Expense
const expense_delete = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new AppError("Expense identifier not found", 400));

  const expense = await Expense.findById(id);
  if (!expense) return next(new AppError("Expense not found", 404));

  if(expense.userId.toString() !== req.userId) {
    return next(new AppError("You are not authorized to delete this budget category", 403));
  }

  const deletedExpense = await Expense.findByIdAndDelete(id);

  if (!deletedExpense) return next(new AppError("Expense not found", 404));

  return res
    .status(200)
    .json({ message: "Expense Successfully Deleted", deletedExpense });
});

module.exports = {
  expense_get,
  expense_post,
  expense_put,
  expense_delete,
};