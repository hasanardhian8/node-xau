const router = require("express").Router();
const payController = require("../controller/payment.controller");

const authenticateToken = require("../middleware/authenticateToken");

router.post("/add", authenticateToken, payController.add);
router.get("/get", authenticateToken, payController.get);
router.get("/getall", authenticateToken, payController.getAll);

module.exports = router;
