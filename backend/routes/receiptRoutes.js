const express = require("express");
const router = express.Router();
const {
  getAllReceipts,
  getOneReceipt,
  updateReceipt,
  createReceipt,
  deleteReceipt,
} = require("../controllers/receiptController");

//Get All Receipts
router.get("/", getAllReceipts);

//Get 1 receipt
router.get("/:id", getOneReceipt);

//Create a receipt
router.post("/", createReceipt);

//Update a receipt
router.put("/:id", updateReceipt);

//Delete a receipt
router.delete("/:id", deleteReceipt);

module.exports = router;
