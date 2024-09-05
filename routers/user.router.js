const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

const authenticateToken = require("../middleware/authenticateToken"); // Adjust path

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", authenticateToken, userController.getUsers); // Protect this route
router.get("/profile", authenticateToken, userController.getProfile); // Protect this route
router.patch("/password", authenticateToken, userController.updatePassword);
router.put("/profile", authenticateToken, userController.updateProfile);

module.exports = router;
