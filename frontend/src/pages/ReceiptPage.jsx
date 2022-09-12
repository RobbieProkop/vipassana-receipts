import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

const ReceiptPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const receipt = useSelector((state) => {
    return state.receipts.receiptsArr.filter((receipt) => receipt._id === id);
  });
  console.log("receipt", receipt[0]);

  const receiptDate = new Date(receipt[0].createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const generatePDF = () => {
    var doc = new jsPDF("l", "px");

    doc.text(20, 20, "This is the first title.");
    doc.text(20, 60, "This is the second title.");
    doc.text(20, 100, "This is the thrid title.");

    doc.save(`AVF-tax-receipt-${receiptDate}.pdf`);
  };

  useEffect(() => {}, [dispatch, receipt]);

  return (
    <div className="receipt-page">
      <div className="receipt-info">
        <div className="receipt-head">
          <h3>
            N<sub>0</sub>. {receipt[0].receiptNumber}
          </h3>
          <h1>Alberta Vipassana Foundation</h1>

          {/* delete receipt */}
          <button
            className="btn btn-delete"
            onClick={() => navigate(`/${id}/confirm`)}
          >
            X
          </button>
        </div>
        <p>PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4</p>

        <p>Charitable Reg. #85502 1739 RR 0001</p>
        <p>
          Canadian Revenue Agency: <a>www.cra-arc.gc.ca</a>
        </p>
      </div>
      <div className="donor">
        <div>
          <h3>
            Date: {receiptDate}
            {/* {new Date(receipt[0].createdAt).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })} */}
          </h3>
          <h3>Donation Location: {receipt[0].place}</h3>
          <h3>
            Donor: {receipt[0].firstName} {receipt[0].lastName}
          </h3>
          <h3>Address: {receipt[0].address},</h3>
          <h3>Postal Code: {receipt[0].postalCode}</h3>
        </div>
        <div>
          <h3>Donation Type: {receipt[0].type}</h3>
          <h3>Amount: ${receipt[0].number}</h3>
          <h3>Total Amount Received: {receipt[0].words} </h3>
          <h3>Digital Signature: {receipt[0].signature}</h3>
        </div>
        <p>OFFICIAL RECEIPT FOR INCOME TAX PURPOSES</p>
      </div>

      {/* edit and Download receipt */}
      <div className="edit">
        <Link to={`/edit/${receipt[0]._id}`} className="btn btn-edit btn-block">
          Edit
        </Link>
        {/*  need to figure out where this will go. should be downloadable and emailable */}
        <a
          className="btn btn-delete btn-block"
          target="_blank"
          onClick={generatePDF}
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};
export default ReceiptPage;
