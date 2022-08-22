import axios from "axios";

const API_URL = "/api/users/me";

//get all receipts
const getAll = async () => {
  const { data } = await axios.get(API_URL);

  return data;
};

const receiptService = {
  getAll,
};

export default receiptService;
