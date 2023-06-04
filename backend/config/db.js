require('dotenv').config();

// sequelize.query(
//   `CREATE TABLE IF NOT EXISTS Receipts
//   (
//     receipt_number SERIAL PRIMARY KEY,
//     place VARCHAR(255),
//     first_name VARCHAR(255),
//     email VARCHAR(255),
//     address VARCHAR(255),
//     city VARCHAR(255),
//     province VARCHAR(255),
//     postal_code VARCHAR(255),
//     type VARCHAR(255),
//     number INT,
//     words VARCHAR(255),
//     signature VARCHAR(255),
//     created_at timestamp with time zone DEFAULT now()
//   );
//   ALTER SEQUENCE receiptNumber
//   RESTART WITH 100000;
//   `, {
//     raw: true
//   }
// )

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
