import { useState } from "react";
import generateReport from "../helpers/generateReport";
import { toast } from "react-toastify";
import generateExcel from "../helpers/generateExcel";

const Reports = ({ receipts, donor, setDonor }) => {
  // const [donor, setDonor] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onClick = () => {
    setShowForm(!showForm);
  };
  const start = new Date(startDate);
  const end = new Date(endDate);

  const filteredReceipts = receipts.filter((receipt) => {
    const date = new Date(receipt.createdAt.split("T")[0]);

    return date <= end && date >= start;
  });

  const createExcel = () => {
    if (!startDate) {
      return toast.error("Please select a start date");
    }
    if (!endDate) {
      return toast.error("Please select an end date");
    }

    generateExcel(filteredReceipts, startDate, endDate);
    setShowForm(!showForm);
  };

  const createReport = () => {
    if (!startDate) {
      return toast.error("Please select a start date");
    }
    if (!endDate) {
      return toast.error("Please select an end date");
    }
    generateReport(filteredReceipts, startDate, endDate);
    setShowForm(!showForm);
  };
  return (
    <>
      {!showForm && (
        <>
          <div className="column">
            <label htmlFor="postSearch">Search by Donor</label>
            <input
              type="text"
              name="user"
              id="search-user"
              value={donor}
              placeholder="Donor:"
              onChange={(e) => setDonor(e.target.value)}
            />
          </div>
          <div className="column">
            <button onClick={onClick} className="btn btn-secondary">
              Documents
            </button>
          </div>
        </>
      )}
      {showForm && (
        <form className="reports-form ">
          <div className="form-group">
            <div className="form-control">
              <label htmlFor="report start">Start</label>
              <input
                type="date"
                className="form-group"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="report end">End</label>
              <input
                type="date"
                min="2022-01-01"
                className="form-group"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button className="form-btn btn" type="button" onClick={createExcel}>
            Excel
          </button>
          <button
            className="form-btn btn btn-secondary"
            type="button"
            onClick={createReport}
          >
            Report
          </button>

          <button
            className="form-btn btn btn-cancel"
            type="button"
            onClick={() => setShowForm(!showForm)}
          >
            Cancel
          </button>
        </form>
      )}
    </>
  );
};
export default Reports;
