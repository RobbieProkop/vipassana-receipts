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
  const [searchMonth, setSearchMonth] = useState("");
  const [donor, setDonor] = useState("");

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
            <label htmlFor="postSearch">Search by Donor</label>
            <input
              type="text"
              name="user"
              id="search-user"
              value={donor}
              placeholder="Donor:"
              onChange={(e) => setDonor(e.target.value)}
              disabled={searchMonth}
            />
          </div>

          <div className="column">
            <label htmlFor="postSearch">Search by Month</label>
            <input
              type="text"
              name="searchId"
              id="search-postId"
              value={searchMonth}
              placeholder="Month:"
              onChange={(e) => setSearchMonth(e.target.value)}
              disabled={donor}
            />
          </div>
        </div>
      </section>
      <section className="content">
        {receiptsArr.length > 0 ? (
          <div className="receipts">
            {receiptsArr
              .filter((receipt) => {
                const month = receipt.createdAt.split("-")[1];
                if (!searchMonth && !donor) {
                  return receipt;
                } else if (
                  receipt.firstName === donor ||
                  receipt.lastName === donor ||
                  receipt.firstName + receipt.lastName === donor
                ) {
                  return receipt;
                } else if (month === searchMonth) {
                  // this needs to be converted to month names
                  return receipt;
                }
              })
              //newest receipts will show first
              .sort((a, b) => {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
              })

              .map((receipt) => (
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
