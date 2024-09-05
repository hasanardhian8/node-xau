const express = require("express");
const router = express.Router();
const rewardController = require("../controller/rewardcoin.controller");

const authenticateToken = require("../middleware/authenticateToken");

// Ensure that the controller exports these functions
router.post("/add", authenticateToken, rewardController.add);
router.get("/getall", authenticateToken, rewardController.getAll);
router.get("/getlast", authenticateToken, rewardController.getLast);

module.exports = router;
