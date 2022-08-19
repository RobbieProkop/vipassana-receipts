const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get all receipts" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Create new receipt" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `update receipt ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete receipt ${req.params.id}` });
});

module.exports = router;
