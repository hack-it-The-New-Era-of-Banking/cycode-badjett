const express = require("express");
const router = express.Router();
const userController = require("../../controller/User/UserController");
const notificationController = require("./../../controller/Content/NotificationController");

// Get User
router.get("/", userController.user_get);

// Delete User
router.delete("/", userController.user_delete);

// // Get User Notification
// router.get("/n", notificationController.notification_get);

// // Update Notification
// router.put("/n", notificationController.notification_put);

module.exports = router;
