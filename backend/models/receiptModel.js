const mongoose = require("mongoose");

const receiptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    place: {
      type: String,
      required: [true, "Please add a location"],
    },
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    amount: {
      number: {
        type: Number,
        required: [true, "Please add a donation amount"],
      },
      words: {
        type: String,
        required: [true, "Please add a donation amount"],
      },
    },

    signature: {
      type: String,
      required: [true, "Please add a signature"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Receipt", receiptSchema);
