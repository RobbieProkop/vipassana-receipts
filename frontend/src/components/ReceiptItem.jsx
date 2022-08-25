import { useDispatch } from "react-redux";
import { deleteReceipt } from "../features/receipts/receiptSlice";

const ReceiptItem = ({ receipt }) => {
  const dispatch = useDispatch();
  return (
    <div className="receipt-form">
      <div>{new Date(receipt.createdAt).toLocaleString("en-GB")}</div>
      <h2>{receipt.receiptNumber}</h2>
      <div>
        <h4>ID: {receipt.receiptNumber}</h4>
        <div>
          {/* <Link to={`/${receipt._id}`} className="btn btn-edit">
            Edit
          </Link> */}
          <button
            //This would work if I had access to the backend. Need the deletePost to return the post.id in order to filter it out.
            onClick={() => dispatch(deleteReceipt(receipt._id))}
            className="btn btn-delete"
          >
            Delete
          </button>
        </div>
      </div>

      <h3>
        Donor: {receipt.firstName} {receipt.lastName}
      </h3>
    </div>
  );
};
export default ReceiptItem;
