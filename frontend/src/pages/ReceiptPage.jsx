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
  console.log("receipt", receipt[0]);

  const receiptDate = new Date(receipt[0].createdAt).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const generatePDF = () => {
    // html2canvas($("#canvas"), {
    //   onrendered: function (canvas) {
    //     var imgData = canvas.toDataURL("image/png");
    //     var doc = new jsPDF("l", "px");
    //     doc.addImage(imgData, "PNG", 10, 10);
    //     doc.save(`AVF-tax-receipt-${receiptDate}.pdf`);
    //   },
    // });
    // Bring the page zoom level back to 100%

    var doc = new jsPDF("l", "px", "a4");

    doc.text(20, 30, `N0. ${receipt[0].receiptNumber}`);
    doc.text(235, 30, "Alberta Vipassana Foundation");

    doc.text(200, 50, "PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4");

    doc.text(200, 65, "Charitable Reg. #85502 1739 RR 0001");
    doc.text(200, 80, "Canadian Revenue Agency: www.cra-arc.gc.ca");
    doc.text(20, 120, `Date: ${receiptDate}`);
    doc.text(20, 140, `Donation Location: ${receipt[0].place}`);
    doc.text(20, 160, `Donor: ${receipt[0].firstName} ${receipt[0].lastName}`);
    doc.text(20, 180, `Address: ${receipt[0].address},`);
    doc.text(20, 200, `Postal Code: ${receipt[0].postalCode}`);
    doc.text(20, 220, `Donation Type: ${receipt[0].type}`);
    doc.text(20, 240, `Amount: $${receipt[0].number}`);
    doc.text(20, 260, `Total Amount Received: ${receipt[0].words} `);
    doc.text(20, 280, `Digital Signature: ${receipt[0].signature}`);
    doc.text(20, 300, `OFFICIAL RECEIPT FOR INCOME TAX PURPOSES`);

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
            <h3>Donation Location: {receipt[0].place}</h3>
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
        {/*  need to figure out where this will go. should be downloadable and emailable */}
        <a
          className="btn btn-delete btn-block"
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
