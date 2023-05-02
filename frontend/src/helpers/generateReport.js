import jsPDF from "jspdf";
const generateReport = (receipts, start, end) => {
  let totalDonations = 0;
  let visaTotal = 0;
  let mcTotal = 0;
  let debitTotal = 0;
  let cashTotal = 0;
  let chequeTotal = 0;
  let inKind = 0;

  receipts.forEach((receipt) => {
    if (receipt.type === "VOID") return;
    switch (receipt.type) {
      case "Visa":
        visaTotal += receipt.number;
        break;
      case "MasterCard":
        mcTotal += receipt.number;
        break;
      case "Debit":
        debitTotal += receipt.number;
        break;
      case "Cash":
        cashTotal += receipt.number;
        break;
      case "Cheque":
        chequeTotal += receipt.number;
        break;
      case "In-Kind":
        inKind += receipt.number;
      default:
        break;
    }

    totalDonations += receipt.number;
  });

  const centerText = (text) => {
    let textWidth = doc.getTextWidth(text);
    let pageWidth = doc.internal.pageSize.width;
    return (pageWidth - textWidth) / 2;
  };
  console.log("total", totalDonations);
  let doc = new jsPDF("p", "px", "a4");
  //pdf content
  doc.setFontSize(20);

  //Heading
  let headingText = `AVF Donations Report`;
  let PObox = "PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4";
  let charitable = "Charitable Reg. #85502 1739 RR 0001";
  let cra = "Canadian Revenue Agency: www.cra-arc.gc.ca";

  doc.text(centerText(headingText), 60, headingText);

  doc.setFontSize(12);
  doc.text(centerText(PObox), 80, PObox);
  doc.text(centerText(charitable), 100, charitable);
  doc.text(centerText(cra), 120, cra);

  doc.setFontSize(16);

  //Report Start Date
  doc.text(40, 140, `Report Start Date: ${start}`);

  //Report End Date
  doc.text(40, 160, `Report End Date: ${end}`);

  doc// Donor Count
  .doc
    .text(40, 200, `Number of Donors: ${receipts.length.toLocaleString()}`);

  // Donation total
  doc.text(40, 180, `Total Donations: $${totalDonations.toLocaleString()}`);

  // //header
  // doc.setFontSize(28);
  // doc.text(190, 60, "Alberta Vipassana Foundation");

  // //donation info
  // doc.setFontSize(18);
  // doc.text(90, 160, `${receiptDate}`);
  // doc.text(90, 180, `Location: ${receipt[0].place}`);
  // doc.text(90, 200, `Donor: ${receipt[0].firstName} ${receipt[0].lastName}`);
  // doc.text(90, 220, `Email: ${receipt[0].email}`);
  // doc.text(90, 240, `${addy},`);
  // doc.setLineWidth(0.7);
  // doc.line(90, 245, 280, 245);
  // doc.text(85, 260, ` ${city}, ${province}, Canada`);
  // doc.line(90, 265, 280, 265);
  // doc.text(90, 280, `${receipt[0].postalCode}`);
  // doc.line(90, 285, 140, 285);

  // doc.text(410, 160, `Donation Type: ${receipt[0].type}`);
  // doc.text(410, 180, `Amount: $${receipt[0].number} `);
  // doc.text(410, 200, `${amount1} `);
  // doc.line(410, 205, 540, 205);

  // doc.text(410, 220, `${amount2} `);
  // doc.line(410, 225, 540, 225);

  // doc.setFontSize(12);
  // doc.text(410, 240, `Total Amount Received`);
  // doc.setFontSize(20);
  // doc.text(410, 280, `${receipt[0].signature} `);
  // doc.line(410, 285, 540, 285);
  // doc.setFontSize(12);
  // doc.text(410, 300, `Digital Signature`);

  // doc.setFontSize(16);
  // doc.text(180, 350, `OFFICIAL RECEIPT FOR INCOME TAX PURPOSES`);
  doc.save(`AVF-report-${start}-to-${end}.pdf`);
};
export default generateReport;
