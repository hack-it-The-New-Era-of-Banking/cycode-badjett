const express = require("express");
const router = express.Router();
const incomeController = require("../../controller/Main/IncomeController");

// Get Income by Id
router.get("/", incomeController.income_get);

// Create Budget Category
router.post("/", incomeController.income_post);

// Update Budget Category
router.put("/", incomeController.income_put);

// Delete Budget Category
router.delete("/", incomeController.income_delete);

module.exports = router;