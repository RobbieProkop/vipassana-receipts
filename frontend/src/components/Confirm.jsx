const Confirm = () => {
  const onCancel = () => {};
  const onDelete = () => {};
  return (
    <main className="card confirm">
      <h1>Are you sure you want to delete?</h1>
      <section className="actions">
        <button className="cancel" onClick={onCancel}>
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
