require('dotenv').config();

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const { Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');

// Create connection to postgres
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
// const table = sequelize.query(
//   `CREATE TABLE Persons (
//     PersonID int,
//     LastName varchar(255),
//     FirstName varchar(255),
//     Address varchar(255),
//     City varchar(255)
//   );`,
//   {
//     type: QueryTypes.RAW
//   }
// );

// console.log(table)

const insert = () => {
  sequelize.query(
    `INSERT INTO PERSONS (personid, lastname, firstname, address, city)
    VALUES (1, 'testerson', 'test', 'here', 'testville')`
  )
}

for (let i = 0; i < 500; i++) {
  insert()
}


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
