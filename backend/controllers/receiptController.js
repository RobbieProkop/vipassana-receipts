require('dotenv').config();

const asyncHandler = require("express-async-handler");
const Receipt = require("../models/receiptModel");
const User = require("../models/userModel");
const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

// This is to allow the backend to continue working with mongo until the sql migration is 100% complete
const SQL_ENABLED = process.env.SQL_ENABLED

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// To continue using mongo during migration all new code will be in if (SQL_ENABLED) and old code will be the else

// @desc:   Get All Receipts
//@route:   GET /api/receipts
//@access   Private
const getAllReceipts = asyncHandler(async (req, res) => {
  // sql will grab 50 receipts at a time this is prep for that
  const offset = req.query.offset ? Number(req.query.offset) : 0
  let receipts = []
  if (SQL_ENABLED) {
    receipts = await sequelize.query(
      `SELECT receipt_number, place, first_name, email, address, city, province, postal_code, type, number, words, signature, created_at
      FROM Receipts
      ORDER BY receipt_number DESC
      LIMIT 50
      OFFSET :offset;`, {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          offset: offset
        }
      }
    )
  } else {
    receipts = await Receipt.find({ user: req.user.id });
  }
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
  if (!req.user) {
    res.status(400);
    throw new Error("Please complete all text fields");
  }
  let receipt = []
  if (SQL_ENABLED) {
    receipt = await sequelize.query(
      `INSERT INTO Receipts (place, first_name, email, address, city, province, postal_code, type, number, words, signature, created_at)
      VALUES (:place, :first_name, :email, :address, :city, :province, :postal_code, :type, :number, :words, :signature, :created_at);`, {
        raw: true,
        type: QueryTypes.INSERT,
        replacements: {
          place: req.body.place ? req.body.place : null,
          first_name: req.body.firstName ? req.body.firstName : null,
          last_name: req.body.lastName ? req.body.lastName : null,
          email: req.body.email ? req.body.email : null,
          address: req.body.address ? req.body.address : null,
          city: req.body.city ? req.body.city : null,
          province: req.body.province ? req.body.province : null,
          postal_code: req.body.postalCode ? req.body.postalCode : null,
          type: req.body.type ? req.body.type : null,
          number: req.body.number ? req.body.number : null,
          words: req.body.words ? req.body.words : null,
          signature: req.body.signature ? req.body.signature : null,
          created_at: req.body.createdAt ? req.body.createdAt : null
        }
      }
    )
  } else {
    receipt = await Receipt.create({
      user: req.user.id,
      receiptNumber: req.body.receiptNumber,
      place: req.body.place,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      // houseNumber: req.body.houseNumber,
      // street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      // country: req.body.country,
      postalCode: req.body.postalCode,
      type: req.body.type,
  
      number: req.body.number,
      words: req.body.words,
  
      signature: req.body.signature,
    });
  }

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

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //make sure logged in user matches receipt user
  if (receipt.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
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

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //make sure logged in user matches receipt user
  if (receipt.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
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
