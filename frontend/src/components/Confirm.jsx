import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteReceipt } from "../features/receipts/receiptSlice";

const Confirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const receipt = useSelector((state) => {
    return state.receipts.receiptsArr.filter((receipt) => receipt._id === id);
  });

  const onCancel = () => {
    navigate(`/${id}`);
  };
  const onDelete = () => {
    dispatch(deleteReceipt(id));
    navigate("/");
  };

  return (
    <main className="confirm">
      <h1>Are you sure you want to delete?</h1>
      <section className="actions">
        <button className="onCancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="onDelete" onClick={onDelete}>
          Delete
        </button>
      </section>
    </main>
  );
};
export default Confirm;
