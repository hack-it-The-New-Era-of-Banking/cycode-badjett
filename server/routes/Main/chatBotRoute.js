const express = require("express");
const router = express.Router();
const chatBotController = require("../../controller/Content/ChatBotController");

// Create Budget Category
router.post("/", chatBotController.chat_post);

module.exports = router;
