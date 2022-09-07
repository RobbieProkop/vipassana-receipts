import { useNavigate } from "react-router-dom";

const Confirm = ({ id }) => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate("/:id");
  };

  const onDelete = () => {
    dispatch(deleteReceipt(receipt[0]._id));
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
