import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteReceipt } from "../features/receipts/receiptSlice";

const ReceiptPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const receipt = useSelector((state) => {
    return state.receipts.receiptsArr.filter((receipt) => receipt._id === id);
  });
  console.log("receipt", receipt[0]);

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
            Date:{" "}
            {new Date(receipt[0].createdAt).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </h3>
          <h3>Donation Location: {receipt[0].place}</h3>
          <h3>
            Donor: {receipt[0].firstName} {receipt[0].lastName}
          </h3>
          <h3>Address: {receipt[0].address},</h3>
          <h3>Postal Code: {receipt[0].postalCode}</h3>
        </div>
        <div>
          <h3>
            Donation: ${receipt[0].number} {receipt[0].type}{" "}
          </h3>
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
        <Link
          to={`/edit/${receipt[0]._id}`}
          className="btn btn-delete btn-block"
        >
          Email PDF
        </Link>
      </div>
    </div>
  );
};
export default ReceiptPage;
