import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReceiptItem from "../components/ReceiptItem";
import Spinner from "../components/Spinner";
import { getAll } from "../features/receipts/receiptSlice";
import Reports from "../components/Reports";
import { AppDispatch, RootState } from "../app/store";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { receiptsArr, isLoading, isError, message } = useSelector(
    (state: RootState) => state.receipts
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

  const receiptsArrCopy = [...receiptsArr];

  return (
    <>
      <section className="heading">
        <p>Receipts Dashboard</p>
        <Link to="/form">
          {" "}
          <button className="btn">Add A Receipt</button>
        </Link>
        <div className="search">
          <Reports receipts={receiptsArr} donor={donor} setDonor={setDonor} />
        </div>
      </section>
      <section className="content">
        {receiptsArrCopy.length > 0 ? (
          <div className="receipts">
            {receiptsArrCopy
              // .filter((receipt) => {
              //   const month = receipt.createdAt.split("-")[1];

              //   const checkNameMatch = (name: string | undefined): boolean => {
              //     if (!name) return false;
              //     return name.toLowerCase().includes(donor.toLowerCase());
              //   };
              //   // If no donor, return all receipts.
              //   if (!donor) return true;

              //   // check name for matches
              //   if (
              //     checkNameMatch(receipt.full_name) ||
              //     checkNameMatch(receipt.firstName) ||
              //     checkNameMatch(receipt.lastName) ||
              //     checkNameMatch(receipt.firstName + " " + receipt.lastName)
              //   ) {
              //     return true;
              //   }

              //   // if month matches searchMonth
              //   if (month === searchMonth) return true;

              //   return false;
              // })
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
