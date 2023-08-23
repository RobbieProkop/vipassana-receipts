import axios from "axios";
import { CreateReceiptType, ReceiptType } from "../states";

// axios.defaults.baseURL = "https://vipassana-receipts.onrender.com";
// axios.defaults.baseURL = "http://localhost:5000";
const API_URL = "/api/receipts/";

//get all receipts
const getAll = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL, config);

  return data;
};

//Get one receipt
const getOneReceipt = async (receiptId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(API_URL + receiptId, config);
  return data;
};

//Create new Receipt
const createReceipt = async (receiptData: CreateReceiptType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, receiptData, config);
  return data;
};

//Edit Receipt
const editReceipt = async (receiptData: CreateReceiptType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { receiptNumber } = receiptData;

  const { data } = await axios.put(
    API_URL + receiptNumber,
    receiptData,
    config
  );
  return data;
};

//Delete Receipt
const deleteReceipt = async (receiptId: string, token: string) => {
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
