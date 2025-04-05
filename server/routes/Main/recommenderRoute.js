const express = require("express");
const router = express.Router();
const RecomenderAIController = require("../../controller/Content/RecomenderAIController");

// Create Budget Category
router.post("/", RecomenderAIController.recommend_post);

module.exports = router;
