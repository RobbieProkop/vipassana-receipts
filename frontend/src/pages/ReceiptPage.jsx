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
  console.log("receipt", receipt);

  useEffect(() => {}, [dispatch, receipt]);

  return (
    <div className="receipt-item">
      <div>
        <div>
          {new Date(receipt.createdAt).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </div>
        <div>
          <div>
            <Link to={`/edit/${receipt._id}`} className="btn btn-edit">
              Edit
            </Link>
            <button
              onClick={() => dispatch(deleteReceipt(receipt._id))}
              className="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <h2>ID: {receipt.receiptNumber}</h2>
      <div>
        <h3>
          Donor: {receipt.firstName} {receipt.lastName}
        </h3>
        <h3>Amount: ${receipt.number}</h3>
      </div>
    </div>
  );
};
export default ReceiptPage;
