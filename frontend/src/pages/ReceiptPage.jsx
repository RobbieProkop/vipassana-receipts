import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

const ReceiptPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const receipt = useSelector((state) => {
    return state.receipts.receiptsArr.filter((receipt) => receipt._id === id);
  });

  const receiptDate = new Date(receipt[0].createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  //variables for pdf print
  const addressArr = receipt[0].address.split(",");
  const addy = addressArr[0];
  const city = addressArr[1];
  const province = addressArr[2];
  const country = addressArr[3];

  //used to put the amount on different lines of the pdf
  const amount = receipt[0].words.split(" ");

  const amount1 =
    amount.length > 2 ? [...amount].splice(0, 2).join(" ") : amount.join(" ");

  const amount2 = amount.length > 2 ? [...amount].splice(2).join(" ") : "";

  //jspdf onclick function
  const generatePDF = () => {
    var doc = new jsPDF("l", "px", "a4");

    // rectangle border
    doc.rect(24, 24, 585, 350);

    //pdf content
    doc.setFontSize(18);
    doc.text(40, 60, `N0. ${receipt[0].receiptNumber}`);

    //header
    doc.setFontSize(28);
    doc.text(190, 60, "Alberta Vipassana Foundation");

    doc.setFontSize(16);
    doc.text(195, 80, "PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4");

    doc.text(195, 95, "Charitable Reg. #85502 1739 RR 0001");
    doc.text(195, 110, "Canadian Revenue Agency: www.cra-arc.gc.ca");

    //donation info
    doc.setFontSize(18);
    doc.text(90, 160, `Date: ${receiptDate}`);
    doc.text(90, 180, `Location: ${receipt[0].place}`);
    doc.text(90, 200, `Donor: ${receipt[0].firstName} ${receipt[0].lastName}`);
    doc.text(90, 220, `${addy},`);
    doc.setLineWidth(0.7);
    doc.line(90, 225, 280, 225);
    doc.text(85, 240, `${city}, ${province}, ${country}`);
    doc.line(90, 245, 280, 245);
    doc.text(90, 260, `${receipt[0].postalCode}`);
    doc.line(90, 265, 140, 265);

    doc.setFontSize(14);
    doc.text(90, 280, `Address`);

    doc.setFontSize(18);
    doc.text(410, 160, `Donation Type: ${receipt[0].type}`);
    doc.text(410, 180, `Amount: $${receipt[0].number} `);
    doc.text(410, 200, `${amount1} `);
    doc.line(410, 205, 540, 205);

    doc.text(410, 220, `${amount2} `);
    doc.line(410, 225, 540, 225);

    doc.setFontSize(12);
    doc.text(410, 240, `Total Amount Received`);
    doc.setFontSize(20);
    doc.text(410, 280, `${receipt[0].signature} `);
    doc.line(410, 285, 540, 285);
    doc.setFontSize(12);
    doc.text(410, 300, `Digital Signature`);

    doc.setFontSize(16);
    doc.text(180, 350, `OFFICIAL RECEIPT FOR INCOME TAX PURPOSES`);

    // doc.fromHTML(document.getElementById("receipt"), {
    //   callback: function (doc) {
    //     doc.save(`AVF-tax-receipt-${receiptDate}.pdf`);
    //   },
    // });

    doc.save(`AVF-tax-receipt-${receiptDate}.pdf`);
  };

  useEffect(() => {}, [dispatch, receipt]);

  return (
    <main className="receipt-page">
      <div id="receipt">
        <div className="receipt-info">
          <div className="receipt-head">
            <h3>
              N<sub>0</sub>. {receipt[0].receiptNumber}
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
            <h3>
              Date: {receiptDate}
              {/* {new Date(receipt[0].createdAt).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })} */}
            </h3>
            <h3>Location: {receipt[0].place}</h3>
            <h3>
              Donor: {receipt[0].firstName} {receipt[0].lastName}
            </h3>
            <h3>Address: {receipt[0].address},</h3>
            <h3>Postal Code: {receipt[0].postalCode}</h3>
          </div>
          <div>
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
        <Link to={`/edit/${receipt[0]._id}`} className="btn btn-edit btn-block">
          Edit
        </Link>

        <a
          className="btn btn-down btn-block"
          target="_blank"
          onClick={generatePDF}
        >
          Download PDF
        </a>
      </div>
    </main>
  );
};
export default ReceiptPage;
