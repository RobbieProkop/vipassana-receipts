const express = require("express");
const router = express.Router();
const { genReport } = require("../controllers/receiptController");

const { protect } = require("../middleware/authMiddleware");

//get one, update, and delete receipt
router.route("/:startDate/:endDate").get(protect, genReport);

module.exports = router;
