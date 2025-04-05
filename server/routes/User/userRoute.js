const express = require("express");
const router = express.Router();
const userController = require("../../controller/User/UserController");

// Get User
router.get("/", userController.user_get);

// Delete User
router.delete("/", userController.user_delete);

// Delete User
router.put("/", userController.user_update);

module.exports = router;
