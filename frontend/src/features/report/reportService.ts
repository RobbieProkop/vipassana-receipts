import axios from "axios";
import { ReportType } from "../states";

// axios.defaults.baseURL = "https://vipassana-receipts.onrender.com";
// axios.defaults.baseURL = "http://localhost:5000";
const API_URL = "/api/reports/:startDate/:endDate";

//Create new Receipt
const genReport = async (reportDates: ReportType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { startDate, endDate } = reportDates;

  const { data } = await axios.get(`${API_URL}${startDate}/${endDate}`, config);
  return data;
};

const receiptService = {
  genReport,
};

export default receiptService;
