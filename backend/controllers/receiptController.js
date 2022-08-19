// @desc:   Get All Receipts
//@route:   GET /api/receipts
//@access   Private
const getAllReceipts = (req, res) => {
  res.status(200).json({ message: "Get all receipts" });
};

// @desc:   Get One Receipt
//@route:   GET /api/receipts/:id
//@access   Private
const getOneReceipt = (req, res) => {
  res.status(200).json({ message: `Get receipt #${req.params.id}` });
};

// @desc:   Create Receipt
//@route:   POST /api/receipts
//@access   Private
const createReceipt = (req, res) => {
  res.status(200).json({ message: `Create new receipt` });
};

// @desc:   Update Receipt
//@route:   PUT /api/receipts/:id
//@access   Private
const updateReceipt = (req, res) => {
  res.status(200).json({ message: `Update receipt #${req.params.id}` });
};

// @desc:   Delete Receipt
//@route:   DELETE /api/receipts/:id
//@access   Private
const deleteReceipt = (req, res) => {
  res.status(200).json({ message: `Delete receipt #${req.params.id}` });
};

module.exports = {
  getAllReceipts,
  getOneReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};
