import { useNavigate } from "react-router-dom";

const ReceiptItem = ({ receipt }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${receipt._id}`);
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
          {new Date(receipt.createdAt).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </div>
        <div className="receipt-snippet">
          <div>
            <h2>ID: {receipt.receiptNumber}</h2>
            <h3>
              Donor: {receipt.firstName} {receipt.lastName}
            </h3>
          </div>
          <h3>Amount: ${receipt.number}</h3>
        </div>
      </div>
    </div>
  );
};
export default ReceiptItem;
