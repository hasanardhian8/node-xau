const router = require("express").Router();
const countdownController = require("../controller/countdown.controller");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", authenticateToken, countdownController.add);
router.get("/", authenticateToken, countdownController.get);

module.exports = router;
