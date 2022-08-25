import { useDispatch } from "react-redux";
import { deleteReceipt } from "../features/receipts/receiptSlice";
import { Link } from "react-router-dom";

const ReceiptItem = ({ receipt }) => {
  const dispatch = useDispatch();

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
            <Link to={`/${receipt._id}`} className="btn btn-edit">
              Edit
            </Link>
            <button
              //This would work if I had access to the backend. Need the deletePost to return the post.id in order to filter it out.
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
export default ReceiptItem;
