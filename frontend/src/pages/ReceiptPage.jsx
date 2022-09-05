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
      <div>
        <div className="receipt-info">
          <h3>
            N<sub>0</sub>: {receipt[0].receiptNumber}
          </h3>
          <div className="receipt-head">
            <h1>Alberta Vipassana Foundation</h1>
          </div>
          <p>PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4</p>

          <p>Charitable Reg. #85502 1739 RR 0001</p>
          <p>
            Canadian Revenue Agency: <a>www.cra-arc.gc.ca</a>
          </p>
        </div>
      </div>
      <div>
        <h3>
          Date:{" "}
          {new Date(receipt[0].createdAt).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </h3>
        <h3>Place: {receipt[0].place}</h3>
      </div>
      <div>
        <h3>
          Donor: {receipt[0].firstName} {receipt[0].lastName}
        </h3>
        <h3>
          Address: {receipt[0].address}, {receipt[0].postalCode}
        </h3>
      </div>
      <div>
        <h3>
          Donation: ${receipt[0].number} {receipt[0].type}{" "}
        </h3>
        <h3>Total Amount Received: {receipt[0].words} </h3>
        <h3>DIgital Signature: {receipt[0].signature}</h3>
      </div>

      {/* edit and delete */}
      <div>
        <div>
          <Link to={`/edit/${receipt[0]._id}`} className="btn btn-edit">
            Edit
          </Link>
          <button
            onClick={() => dispatch(deleteReceipt(receipt[0]._id))}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReceiptPage;
