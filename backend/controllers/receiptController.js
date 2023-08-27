require("dotenv").config();

const asyncHandler = require("express-async-handler");
const Receipt = require("../models/receiptModel");
const User = require("../models/userModel");
const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

// This is to allow the backend to continue working with mongo until the sql migration is 100% complete
const SQL_ENABLED = process.env.SQL_ENABLED;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// To continue using mongo during migration all new code will be in if (SQL_ENABLED) and old code will be the else

// @desc:   Get All Receipts
//@route:   GET /api/receipts
//@access   Private
const getAllReceipts = asyncHandler(async (req, res) => {
  // sql will grab 50 receipts at a time this is prep for that
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  let receipts = [];
  if (SQL_ENABLED) {
    receipts = await sequelize.query(
      `SELECT receipt_number, place, full_name, email, address, city, province, postal_code, type, number, words, signature, created_at
      FROM Receipts
      ORDER BY receipt_number DESC
      LIMIT 50
      OFFSET :offset;`,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          offset: offset,
        },
      }
    );
  } else {
    receipts = await Receipt.find({ user: req.user.id });
  }
  res.status(200).json(receipts);
});

// @desc:   Get One Receipt
//@route:   GET /api/receipts/:id
//@access   Private
const getOneReceipt = asyncHandler(async (req, res) => {
  let receipt = [];
  if (SQL_ENABLED) {
    receipt = await sequelize.query(
      `SELECT receipt_number, place, full_name, email, address, city, province, postal_code, type, number, words, signature, created_at
      FROM Receipts
      WHERE receipt_number = :id;
      `,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          id: req.params.id,
        },
      }
    );
  } else {
    receipt = await Receipt.findById(req.params.id);
  }

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
  let receipt = [];
  if (SQL_ENABLED) {
    receipt = await sequelize.query(
      `INSERT INTO Receipts (place, full_name, email, address, city, province, country, postal_code, type, number, words, signature)
      VALUES (:place, :full_name, :email, :address, :city, :province, :country, :postal_code, :type, :number, :words, :signature)
      RETURNING *;`,
      {
        raw: true,
        type: QueryTypes.INSERT,
        replacements: {
          place: req.body.place ? req.body.place : null,
          full_name: req.body.full_name ? req.body.full_name : null,
          email: req.body.email ? req.body.email : null,
          address: req.body.address ? req.body.address : null,
          city: req.body.city ? req.body.city : null,
          province: req.body.province ? req.body.province : null,
          country: req.body.country ? req.body.country : null,
          postal_code: req.body.postal_code ? req.body.postal_code : null,
          type: req.body.type ? req.body.type : null,
          number: req.body.number ? req.body.number : null,
          words: req.body.words ? req.body.words : null,
          signature: req.body.signature ? req.body.signature : null,
        },
      }
    );
    receipt = receipt[0];
  } else {
    receipt = await Receipt.create({
      user: req.user.id,
      receiptNumber: req.body.receiptNumber,
      place: req.body.place,
      full_name: req.body.full_name ? req.body.full_name : null,
      firstName: req.body.firstName ? req.body.firstName : null,
      lastName: req.body.lastName ? req.body.lastName : null,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      postalCode: req.body.postalCode,
      type: req.body.type,
      number: req.body.number,
      words: req.body.words,
      signature: req.body.signature,
    });
  }
  console.log("receipt", receipt);
  res.status(200).json(receipt);
});

// @desc:   Update Receipt
//@route:   PUT /api/receipts/:id
//@access   Private
const updateReceipt = asyncHandler(async (req, res) => {
  const updateableFields = [
    "receipt_number",
    "place",
    "full_name",
    "email",
    "address",
    "city",
    "province",
    "country",
    "postal_code",
    "type",
    "number",
    "words",
    "signature",
    "created_at",
  ];
  let receipt = [];
  let updates = { id: req.params.id };
  if (SQL_ENABLED) {
    // build query based on updateable fields
    sqlUpdate = `UPDATE Receipts SET`;
    for (let i = 0; i < updateableFields.length; i++) {
      if (req.body[updateableFields[i]]) {
        sqlUpdate += ` ${updateableFields[i]} = :${updateableFields[i]},`;
        updates[updateableFields[i]] = req.body[updateableFields[i]];
      }
    }
    // break out if no updates passed
    if (Object.keys(updates).length === 1) {
      res.status(400);
      throw new Error("No updates needed");
    }
    // remove trailing ,
    sqlUpdate = sqlUpdate.slice(0, -1);
    sqlWhere = ` WHERE receipt_number = :id RETURNING *;`;
    // put full query together
    sql = sqlUpdate + sqlWhere;
    receipt = await sequelize.query(sql, {
      raw: true,
      type: QueryTypes.UPDATE,
      replacements: updates,
    });
    receipt = receipt[0];
  } else {
    receipt = await Receipt.findById(req.params.id);

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

    receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  }
  res.status(200).json(receipt);
});

// @desc:   Delete Receipt
//@route:   DELETE /api/receipts/:id
//@access   Private
const deleteReceipt = asyncHandler(async (req, res) => {
  let receipt = [];
  if (SQL_ENABLED) {
    receipt = await sequelize.query(
      `DELETE FROM Receipts
      WHERE receipt_number = :id;
      `,
      {
        raw: true,
        type: QueryTypes.DELETE,
        replacements: {
          id: req.params.id,
        },
      }
    );
  } else {
    receipt = await Receipt.findById(req.params.id);
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
  }

  res.status(200).json({ id: req.params.id });
});

// @desc:   Generate Report. Gets all receipts between two dates for the report
//@route:   GET /api/reports/:startDate/:endDate
//@access   Private

// @desc:   Get All Receipts
//@route:   GET /api/receipts
//@access   Private
const genReport = asyncHandler(async (req, res) => {
  let receipts = [];

  receipts = await sequelize.query(
    `SELECT receipt_number, place, full_name, email, address, city, province, postal_code, type, number, words, signature, created_at
      FROM Receipts
      WHERE created_at >= :startDate AND created_at < (:endDate::date + interval '1 day')
      ORDER BY receipt_number DESC;`,
    {
      raw: true,
      type: QueryTypes.SELECT,
      replacements: {
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      },
    }
  );

  res.status(200).json(receipts);
});

module.exports = {
  getAllReceipts,
  getOneReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  genReport,
};
