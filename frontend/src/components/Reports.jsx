import { useState } from "react";
import generateReport from "../helpers/generateReport";

const Reports = () => {
  const [donor, setDonor] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onClick = () => {
    setShowForm(!showForm);
  };

  const onSubmit = () => {
    generateReport();
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
              <input type="date" className="form-group" />
            </div>
            <div className="form-control">
              <label htmlFor="report end">End</label>
              <input type="date" className="form-group" />
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
