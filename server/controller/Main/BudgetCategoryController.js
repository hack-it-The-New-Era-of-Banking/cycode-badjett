const BudgetCategory = require("../../models/Main/BudgetCategory");
const User = require("../../models/User/User");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");

// Get BudgetCategory by Id
const budgetCategory_get = catchAsync(async (req, res, next) => {
  const { id, userId } = req.query;

  let budgetCategory;

  if (!id && !userId)
    return next(new AppError("Budget Category identifier not found", 400));

  id
    ? (budgetCategory = await BudgetCategory.findById(id)
        .populate("totalSpent")
        .populate("userId"))
    : (budgetCategory = await BudgetCategory.find({ userId: userId })
        .populate("totalSpent")
        .populate("userId"));

  if (Array.isArray(budgetCategory)) {
    budgetCategory = budgetCategory.map((category) => {
      const totalSpentPerMonth = category.totalSpent.reduce((acc, curr) => {
        const month = new Date(curr.date).getMonth();
        acc[month] = (acc[month] || 0) + curr.moneySpent;
        return acc;
      }, {});
      return { ...category.toObject(), totalSpentPerMonth };
    });
  } else {
    const totalSpentPerMonth = budgetCategory.totalSpent.reduce((acc, curr) => {
      const month = new Date(curr.date).getMonth();
      acc[month] = (acc[month] || 0) + curr.moneySpent;
      return acc;
    }, {});
    budgetCategory = { ...budgetCategory.toObject(), totalSpentPerMonth };
  }

  if (!budgetCategory)
    return next(
      new AppError(
        "Budget Category not found. Invalid Budget Category Identifier.",
        404
      )
    );

  return res.status(200).json(budgetCategory);
});

// Create Budget Category
const budgetCategory_post = catchAsync(async (req, res, next) => {
  const { userId } = req.query;
  const { category, budget, description } = req.body;

  const isUserValid = await User.findById(userId);

  if (!isUserValid)
    return next(new AppError("User not found. Invalid User ID.", 404));

  if (!category && !budget && !description) {
    return next(
      new AppError("Cannot create budget category, Empty category.", 400)
    );
  }

  if (isUserValid.budgetCategory.some((cat) => cat.toString() === category)) {
    return next(new AppError("Duplicate Budget Category. Not Save.", 400));
  }

  const newBudgetCategory = new BudgetCategory({
    userId,
    category,
    budget,
    description,
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { budgetCategory: newBudgetCategory._id } },
    { new: true }
  );

  await newBudgetCategory.save();

  return res.status(200).json({
    message: "Budget Category Successfully Created",
    newBudgetCategory,
  });
});

// Update BudgetCategory
const budgetCategory_put = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const { category, budget, description } = req.body;

  if (!id)
    return next(new AppError("Budget Category identifier not found", 400));

  if (!category && !budget && !description) {
    return next(new AppError("No data to update", 400));
  }

  const budgetCategory = await BudgetCategory.findById(id).populate(
    "totalSpent"
  );

  if (!budgetCategory) {
    return next(
      new AppError(
        "Budget Category not found. Invalid Budget Category ID.",
        404
      )
    );
  }

  let updates = {};

  if (category) updates.category = category;
  if (budget) updates.budget = budget;
  if (description) updates.description = description;

  const updatedBudgetCategory = await BudgetCategory.findByIdAndUpdate(
    id,
    updates,
    {
      new: true,
    }
  );

  if (!updatedBudgetCategory) {
    return next(new AppError("Budget Category not found", 404));
  }

  return res.status(200).json({
    message: "Budget Category Updated Successfully",
    updatedBudgetCategory,
  });
});

// Delete BudgetCategory
const budgetCategory_delete = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  if (!id)
    return next(new AppError("Budget Category identifier not found", 400));

  const budgetCategory = await BudgetCategory.findById(id);
  if (!budgetCategory)
    return next(new AppError("Budget Category not found", 404));

  if (budgetCategory.userId !== req.userId) {
    return next(
      new AppError("You are not authorized to delete this budget category", 403)
    );
  }

  const deletedBudgetCategory = await BudgetCategory.findByIdAndDelete(id);

  if (!deletedBudgetCategory)
    return next(new AppError("Budget Category not found", 404));

  return res.status(200).json({
    message: "Budget Category Successfully Deleted",
    deletedBudgetCategory,
  });
});

module.exports = {
  budgetCategory_get,
  budgetCategory_post,
  budgetCategory_put,
  budgetCategory_delete,
};
