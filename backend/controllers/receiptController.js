const asyncHandler = require("express-async-handler");

const Receipt = require("../models/receiptModel");

// @desc:   Get All Receipts
//@route:   GET /api/receipts
//@access   Private
const getAllReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find();
  res.status(200).json(receipts);
});

// @desc:   Get One Receipt
//@route:   GET /api/receipts/:id
//@access   Private
const getOneReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (!receipt) {
    res.status(400);
    throw new Error("Receipt not found");
  }
  res.status(200).json(receipt);
});

// @desc:   Create Receipt
//@route:   POST /api/receipts
//@access   Private
const createReceipt = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please complete all text fields");
  }

  const receipt = await Receipt.create({
    text: req.body.text,
  });

  res.status(200).json(receipt);
});

// @desc:   Update Receipt
//@route:   PUT /api/receipts/:id
//@access   Private
const updateReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (!receipt) {
    res.status(400);
    throw new Error("Receipt not found");
  }

  const updatedReceipt = await Receipt.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedReceipt);
});

// @desc:   Delete Receipt
//@route:   DELETE /api/receipts/:id
//@access   Private
const deleteReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id);

  if (!receipt) {
    res.status(400);
    throw new Error("Receipt not found");
  }

  await receipt.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllReceipts,
  getOneReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};
