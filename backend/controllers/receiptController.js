const asyncHandler = require("express-async-handler");

const Receipt = require("../models/receiptModel");

// @desc:   Get All Receipts
//@route:   GET /api/receipts
//@access   Private
const getAllReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find({ user: req.user.id });
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
  if (!req.body.signature) {
    res.status(400);
    throw new Error("Please complete all text fields");
  }

  const receipt = await Receipt.create({
    user: req.user.id,
    receiptNumber: req.body.receiptNumber,
    place: req.body.place,
    firstName: req.body.firstName,
    lastName: req.body.lastName,

    houseNumber: req.body.houseNumber,
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    postalCode: req.body.postalCode,

    number: req.body.number,
    words: req.body.words,

    signature: req.body.signature,
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
