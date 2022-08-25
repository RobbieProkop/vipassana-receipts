const mongoose = require("mongoose");

const receiptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiptNumber: {
      type: Number,
      required: [true, "Please add receipt number"],
    },
    //where receipt is issued
    place: {
      type: String,
      required: [true, "Please add a location"],
    },
    //donor name
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
    },
    // donor address

    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    // houseNumber: {
    //   type: Number,
    //   required: [true, "Please add a house number"],
    // },
    // street: {
    //   type: String,
    //   required: [true, "Please add a street"],
    // },
    // city: {
    //   type: String,
    //   required: [true, "Please add a city"],
    // },
    // province: {
    //   type: String,
    //   required: [true, "Please add a provine"],
    // },
    // country: {
    //   type: String,
    //   required: [true, "Please add a country"],
    // },
    postalCode: {
      type: String,
      required: [true, "Please add a postal code"],
    },
    //donation amount
    number: {
      type: Number,
      required: [true, "Please add a donation amount"],
    },
    words: {
      type: String,
      required: [true, "Please add a donation amount"],
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
