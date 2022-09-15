import { useEffect, useState } from "react";
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

  //useStates
  const [searchId, setSearchId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
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
        <Link to="/form">
          {" "}
          <button className="btn">Add A Receipt</button>
        </Link>

        {/* THIS IS NOT DOING A GET REQUEST BY POST ID, IT IS FILTERING THE POSTS INSTEAD. MAY CHANGE LATER */}
        <div className="search">
          <div className="column">
            <label htmlFor="postSearch">Search by Month</label>
            <input
              type="text"
              name="user"
              id="search-user"
              value={userId}
              placeholder="User:"
              onChange={(e) => setUserId(e.target.value)}
              disabled={searchId}
            />
          </div>

          <div className="column">
            <label htmlFor="postSearch">Search by ID</label>
            <input
              type="text"
              name="searchId"
              id="search-postId"
              value={searchId}
              placeholder="ID:"
              onChange={(e) => setSearchId(e.target.value)}
              disabled={userId}
            />
          </div>
        </div>
      </section>
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
