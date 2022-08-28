import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReceiptItem from "../components/ReceiptItem";
import Spinner from "../components/Spinner";
import { getAll, reset } from "../features/receipts/receiptSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { receiptsArr, isLoading, isError, message } = useSelector(
    (state) => state.receipts
  );

  useEffect(() => {
    // if (isError) {
    //   console.log(message);
    // }

    if (!user) {
      navigate("/login");
    }

    dispatch(getAll());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Receipts Dashboard</p>
      </section>
      <Link to="/form">
        {" "}
        <button className="btn">Add A Receipt</button>
      </Link>
      <section className="content">
        {receiptsArr.length > 0 ? (
          <div className="receipts">
            {receiptsArr.map((receipt) => (
              <ReceiptItem receipt={receipt} key={receipt._id} />
            ))}
          </div>
        ) : (
          <h3>No Receipts to show</h3>
        )}
      </section>
    </>
  );
};
export default Dashboard;
