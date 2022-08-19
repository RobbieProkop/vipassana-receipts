const express = require("express");
const router = express.Router();
const {
  getAllReceipts,
  getOneReceipt,
  updateReceipt,
  createReceipt,
  deleteReceipt,
} = require("../controllers/receiptController");

//get all and create new receipt
router.route("/").get(getAllReceipts).post(createReceipt);

//get one, update, and delete receipt
router
  .route("/:id")
  .get(getOneReceipt)
  .put(updateReceipt)
  .delete(deleteReceipt);

module.exports = router;
