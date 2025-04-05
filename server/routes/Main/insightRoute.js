const express = require("express");
const router = express.Router();
const InsightController = require("../../controller/Content/InsightController");
const ExpenseInsight = require("../../controller/Content/ExpenseInsight");

// Create Budget Category
router.post("/", InsightController.insight_post);

// Insight Expense
router.post("/expense", ExpenseInsight.insight_post);

module.exports = router;
