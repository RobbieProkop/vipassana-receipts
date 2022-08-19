const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/receipts", require("./routes/receiptRoutes"));

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
