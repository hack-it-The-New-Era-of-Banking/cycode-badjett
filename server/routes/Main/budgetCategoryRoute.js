const express = require("express");
const router = express.Router();
const budgetCategoryController = require("../../controller/Main/BudgetCategoryController");
const checkAuth = require("../../utilities/checkAuth");

// Get BudgetCategory by Id
router.get("/", budgetCategoryController.budgetCategory_get);

// Get BudgetCategory by User
router.get("/u", budgetCategoryController.budgetCategory_userGet);

// Create Budget Category
router.post("/", budgetCategoryController.budgetCategory_post);

// Update Budget Category
router.put("/", budgetCategoryController.budgetCategory_put);

// Delete Budget Category
router.delete("/", budgetCategoryController.budgetCategory_delete);


module.exports = router;