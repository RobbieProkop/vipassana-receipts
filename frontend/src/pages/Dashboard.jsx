import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReceiptItem from "../components/ReceiptItem";
import Spinner from "../components/Spinner";
import { getAll } from "../features/receipts/receiptSlice";
import Reports from "../components/Reports";

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
        <p>Receipts Dashboard</p>
        <Link to="/form">
          {" "}
          <button className="btn">Add A Receipt</button>
        </Link>
        <div className="search">
          <Reports receipts={receiptsArr} />
        </div>
      </section>
      <section className="content">
        {receiptsArr.length > 0 ? (
          <div className="receipts">
            {receiptsArr
              .filter((receipt) => {
                const month = receipt.createdAt.split("-")[1];
                //returns all receipts
                if (!donor) {
                  return receipt;
                } else if (
                  //returns Donor Names that match
                  receipt.full_name
                    .toLowerCase()
                    .includes(donor.toLowerCase()) ||
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
