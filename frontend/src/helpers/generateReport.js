import jsPDF from "jspdf";

const generateReport = async (receipts, start, end) => {
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
        visaTotal += Number(receipt.number);
        break;
      case "MasterCard":
        mcTotal += Number(receipt.number);
        break;
      case "Debit":
        debitTotal += Number(receipt.number);
        break;
      case "Cash":
        cashTotal += Number(receipt.number);
        break;
      case "Cheque":
        chequeTotal += Number(receipt.number);
        break;
      case "In-Kind":
        inKind += Number(receipt.number);
        break;
      default:
        break;
    }

    totalDonations += Number(receipt.number);
  });

  const centerText = (text) => {
    let textWidth = doc.getTextWidth(text);
    let pageWidth = doc.internal.pageSize.width;
    return (pageWidth - textWidth) / 2;
  };
  let doc = new jsPDF("p", "px", "a4");
  //pdf content
  doc.setFontSize(28);

  //Heading
  let headingText = `AVF Donations Report`;
  let PObox = "PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4";
  let charitable = "Charitable Reg. #85502 1739 RR 0001";
  let cra = "Canadian Revenue Agency: www.cra-arc.gc.ca";

  doc.text(centerText(headingText), 60, headingText);

  doc.setFontSize(12);
  doc.text(centerText(PObox), 80, PObox);
  doc.text(centerText(charitable), 90, charitable);
  doc.text(centerText(cra), 100, cra);

  doc.setFontSize(16);

  //Report Start Date
  doc.text(40, 140, `Report Start Date: ${start}`);

  //Report End Date
  doc.text(40, 160, `Report End Date: ${end}`);

  doc.setFontSize(20);
  // Counts
  doc.text(40, 200, `Totals`);
  doc.line(40, 205, 80, 205);

  doc.setFontSize(16);
  doc.text(40, 225, `Visa: $${visaTotal}`);
  doc.text(40, 245, `MasterCard: $${mcTotal}`);
  doc.text(40, 265, `Debit: $${debitTotal}`);
  doc.text(40, 285, `Cash: $${cashTotal}`);
  doc.text(40, 305, `Cheque: $${chequeTotal}`);
  doc.text(40, 325, `In Kind: $${inKind}`);

  // Donor Count
  doc.text(40, 365, `Number of Donors: ${receipts.length.toLocaleString()}`);

  // Donation total
  doc.text(40, 385, `Total Donations: $${totalDonations.toLocaleString()}`);

  // doc.line(410, 285, 540, 285);

  doc.save(`AVF-report-${start}-to-${end}.pdf`);
};
export default generateReport;
