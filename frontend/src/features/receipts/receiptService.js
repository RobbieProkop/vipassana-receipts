import axios from "axios";

const API_URL = "/api/receipts/";

//get all receipts
const getAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL, config);

  return data;
};

//Create new Receipt
const createReceipt = async (receiptData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, receiptData, config);
  return data;
};

const receiptService = {
  getAll,
  createReceipt,
};

export default receiptService;
