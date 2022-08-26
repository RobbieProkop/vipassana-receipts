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

//Get one receipt
const getOneReceipt = async (receiptId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL + receiptId, config);
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

//Edit Receipt
const editReceipt = async (receiptId, receiptData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(API_URL + receiptId, receiptData, config);
  return data;
};

//Delete Receipt
const deleteReceipt = async (receiptId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(API_URL + receiptId, config);
  return data;
};

const receiptService = {
  getAll,
  getOneReceipt,
  createReceipt,
  editReceipt,
  deleteReceipt,
};

export default receiptService;
