const express = require("express");
const router = express.Router();
const expenseController = require("../../controller/Main/ExpenseController");

// Get Expense by Id
router.get("/", expenseController.expense_get);

// Create Budget Category
router.post("/", expenseController.expense_post);

// Update Budget Category
router.put("/", expenseController.expense_put);

// Delete Budget Category
router.delete("/", expenseController.expense_delete);

module.exports = router;