const express = require("express");
const router = express.Router();
const {
  getAllReceipts,
  getOneReceipt,
  updateReceipt,
  createReceipt,
  deleteReceipt,
} = require("../controllers/receiptController");

const { protect } = require("../middleware/authMiddleware");

//get all and create new receipt
router.route("/").get(protect, getAllReceipts).post(protect, createReceipt);

//get one, update, and delete receipt
router
  .route("/:id")
  .get(protect, getOneReceipt)
  .put(protect, updateReceipt)
  .delete(protect, deleteReceipt);

module.exports = router;
