import { useState } from "react";
import generateReport from "../helpers/generateReport";

const Reports = ({ receipts }) => {
  const [donor, setDonor] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onClick = () => {
    setShowForm(!showForm);
  };

  const onSubmit = () => {
    const filteredReceipts = receipts.filter((receipt) => {
      const date = new Date(receipt.createdAt.split("T")[0]);
      const start = new Date(startDate);
      const end = new Date(endDate);

      console.log("date", date <= end);

      return date <= end && date >= start;
    });

    generateReport(filteredReceipts);
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
              Report
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

          <button
            className="form-btn btn btn-primary"
            type="button"
            onClick={onSubmit}
          >
            Submit
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
