import { useNavigate } from "react-router-dom";
import { ReceiptType } from "../features/states";

interface ReceiptProps {
  receipt: ReceiptType;
}

const ReceiptItem = ({ receipt }: ReceiptProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${receipt.receipt_number}`);
  };
  const onDelete = () => {
    navigate(`/${receipt._id}/confirm`);
  };

  return (
    <div className="receipt-item">
      <div className="delete">
        <div>
          <button onClick={onDelete} className="btn btn-delete">
            X
          </button>
        </div>
      </div>

      <div className="receipt-body" onClick={onClick}>
        <div>
          {new Date(receipt.created_at).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </div>
        <div className="receipt-snippet">
          <h2>ID: {receipt.receiptNumber || receipt.receipt_number}</h2>
          <div>
            {receipt.firstName ? (
              <h3>
                Donor: {receipt.firstName} {receipt.lastName}
              </h3>
            ) : (
              <h3>Donor: {receipt.full_name}</h3>
            )}
            <h3>Amount: ${receipt.number}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReceiptItem;
