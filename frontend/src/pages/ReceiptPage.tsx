import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAll } from "../features/receipts/receiptSlice";
import generatePDF from "../helpers/generatePDF";
import Spinner from "../components/Spinner";
import { AppDispatch, RootState } from "../app/store";
import { ReceiptType } from "../features/states";
import ErrorPage from "./ErrorPage";

const ReceiptPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { receiptsArr, isLoading } = useSelector(
    (state: RootState) => state.receipts
  );

  useEffect(() => {
    if (!receiptsArr.length) {
      console.log("empty array");
      dispatch(getAll());
    }
  }, [dispatch]);

  if (receiptsArr.length > 0) {
    const receipt: ReceiptType[] = receiptsArr.filter(
      (receipt: ReceiptType) => {
        return receipt.receipt_number?.toString() === id;
      }
    );

    if (!receipt[0]) return <ErrorPage />;

    const receiptDate = new Date(receipt[0].created_at).toLocaleString(
      "en-GB",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    );

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        {receiptsArr.length > 0 ? (
          <main className="receipt-page">
            <div id="receipt">
              <div className="receipt-info">
                <div className="receipt-head">
                  <h3>
                    N<sub>0</sub>.{" "}
                    {receipt[0].receiptNumber
                      ? receipt[0].receiptNumber
                      : receipt[0].receipt_number}
                  </h3>
                  <h1>Alberta Vipassana Foundation</h1>

                  {/* delete receipt */}
                  <button
                    className="btn btn-delete"
                    onClick={() => navigate(`/${id}/confirm`)}
                  >
                    X
                  </button>
                </div>
                <p>PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4</p>

                <p>Charitable Reg. #85502 1739 RR 0001</p>
                <p>
                  Canadian Revenue Agency: <a>www.cra-arc.gc.ca</a>
                </p>
              </div>
              <div className="donor">
                <div>
                  <h3>Location: {receipt[0].place}</h3>
                  {receipt[0].firstName ? (
                    <h3>
                      Donor: {receipt[0].firstName} {receipt[0].lastName}
                    </h3>
                  ) : (
                    <h3>Donor: {receipt[0].full_name}</h3>
                  )}

                  <h3>Address: {receipt[0].address},</h3>
                  <h3>City: {receipt[0].city},</h3>
                  <h3>Province: {receipt[0].province},</h3>
                  {/* <h3>Country: {receipt[0].country},</h3> */}
                  <h3>Postal Code: {receipt[0].postal_code}</h3>
                </div>
                <div>
                  <h3>
                    Date: {receiptDate}
                    {/* {new Date(receipt[0].created_at).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })} */}
                  </h3>
                  <h3>Email: {receipt[0].email},</h3>
                  <h3>Donation Type: {receipt[0].type}</h3>
                  <h3>Amount: ${receipt[0].number}</h3>
                  <h3>Total Amount Received: {receipt[0].words} </h3>
                  <h3>Digital Signature: {receipt[0].signature}</h3>
                </div>
                <p>OFFICIAL RECEIPT FOR INCOME TAX PURPOSES</p>
              </div>
            </div>
            {/* edit and Download receipt */}
            <div className="edit">
              <Link
                to={`/edit/${receipt[0].receipt_number}`}
                className="btn btn-edit btn-block"
              >
                Edit
              </Link>

              <a
                className="btn btn-down btn-block"
                target="_blank"
                onClick={() => generatePDF(receipt)}
              >
                Download PDF
              </a>
            </div>
          </main>
        ) : (
          <h3>No Receipts to show</h3>
        )}
      </>
    );
  }
  return <h3>Receipt Not Found</h3>;
};

// return <h3> Receipt Not Found</h3>;
export default ReceiptPage;
