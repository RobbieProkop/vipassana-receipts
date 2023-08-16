import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteReceipt } from "../features/receipts/receiptSlice";
import { AppDispatch } from "../app/store";

const Confirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  if (!id) {
    navigate("/");
    return <h3>Id Not Found</h3>;
  }
  // const receipt = useSelector((state) => {
  //   return state.receipts.receiptsArr.filter((receipt) => receipt._id === id);
  // });

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
        <button className="btn btn-block btn-danger" onClick={onDelete}>
          Delete
        </button>
        <button className="btn btn-block btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </section>
    </main>
  );
};
export default Confirm;
