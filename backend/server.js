const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use("/api/receipts", require("./routes/receiptRoutes"));

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
