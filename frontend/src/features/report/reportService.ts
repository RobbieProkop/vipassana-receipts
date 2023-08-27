import axios from "axios";
import { ReportType } from "../states";

// axios.defaults.baseURL = "https://vipassana-receipts.onrender.com";
// axios.defaults.baseURL = "http://localhost:5000";
const API_URL = "/api/reports/";

//Create new Receipt
const genReport = async (reportDates: ReportType, token: string) => {
  const { startDate, endDate } = reportDates;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      startDate: startDate,
      endDate: endDate
    }
  };


  const { data } = await axios.get(API_URL, config);
  return data;
};

const receiptService = {
  genReport,
};

export default receiptService;
