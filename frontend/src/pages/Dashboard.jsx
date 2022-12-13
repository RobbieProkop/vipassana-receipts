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

  //selecting the month
  const onChange = (e) => {
    setSearchMonth(e.target.value);
  };

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }

    dispatch(getAll());
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

          <div className="column month-search">
            <label htmlFor="postSearch">Search by Month</label>
            <select name="month" onChange={onChange} disabled={donor}>
              <option value="" defaultValue>
                Sort by Month
              </option>
              <option value="01">01 - January</option>
              <option value="02">02 - February</option>
              <option value="03">03 - March</option>
              <option value="04">04 - April</option>
              <option value="05">05 - May</option>
              <option value="06">06 - June</option>
              <option value="07">07 - July</option>
              <option value="08">08 - August</option>
              <option value="09">09 - September</option>
              <option value="10">10 - October</option>
              <option value="11">11 - November</option>
              <option value="12">12 - December</option>
            </select>
          </div>
        </div>
      </section>
      <section className="content">
        {receiptsArr.length > 0 ? (
          <div className="receipts">
            {receiptsArr
              .filter((receipt) => {
                const month = receipt.createdAt.split("-")[1];
                //returns all receipts
                if (!searchMonth && !donor) {
                  return receipt;
                } else if (
                  //returns Donor Names that match
                  receipt.firstName
                    .toLowerCase()
                    .includes(donor.toLowerCase()) ||
                  receipt.lastName
                    .toLowerCase()
                    .includes(donor.toLowerCase()) ||
                  (receipt.firstName + " " + receipt.lastName)
                    .toLowerCase()
                    .includes(donor.toLowerCase())
                ) {
                  return receipt;
                } else if (month === searchMonth) {
                  //returns donation month matches
                  return receipt;
                }
              })
              //newest receipts will show first
              .sort((a, b) => {
                if (a.createdAt < b.createdAt) return 1;
                if (a.createdAt > b.createdAt) return -1;
                return 0;
              })

              .map((receipt, index) => (
                <ReceiptItem receipt={receipt} key={index} />
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
