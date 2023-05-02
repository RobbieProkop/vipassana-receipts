import { useState } from "react";

const Reports = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {!showForm && <button className="btn btn-primary">Report</button>}
      {showForm && (
        <form className="report-form">
          <div className="form-control">
            <label htmlFor="report start">Start</label>
            <input type="date" />
          </div>
        </form>
      )}
    </>
  );
};
export default Reports;
