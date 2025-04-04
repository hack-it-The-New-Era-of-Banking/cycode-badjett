const express = require("express");
const router = express.Router();
const budgetCategoryController = require("../../controller/Main/BudgetCategoryController");

// Get BudgetCategory by Id
router.get("/", budgetCategoryController.budgetCategory_get);

// Create Budget Category
router.post("/", budgetCategoryController.budgetCategory_post);

// Update Budget Category
router.put("/", budgetCategoryController.budgetCategory_put);

// Delete Budget Category
router.delete("/", budgetCategoryController.budgetCategory_delete);

module.exports = router;