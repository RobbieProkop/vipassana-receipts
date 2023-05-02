import jsPDF from "jspdf";
const generateReport = (receipts) => {
  var doc = new jsPDF("l", "px", "a4");

  console.log("receiptsGen", receipts);

  // rectangle border
  doc.rect(24, 24, 585, 350);

  //pdf content
  doc.setFontSize(18);

  // doc.text(40, 60, `N0. ${receipt[0].receiptNumber}`);

  // //header
  // doc.setFontSize(28);
  // doc.text(190, 60, "Alberta Vipassana Foundation");

  // doc.setFontSize(16);
  // doc.text(195, 80, "PO Box 8412 - Market Mall, Calgary, AB, T3A 5C4");

  // doc.text(195, 95, "Charitable Reg. #85502 1739 RR 0001");
  // doc.text(195, 110, "Canadian Revenue Agency: www.cra-arc.gc.ca");

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
  // doc.save(
  //   `AVF-${receipt[0].receiptNumber}-${receipt[0].firstName}-${receipt[0].lastName}.pdf`
  // );
};
export default generateReport;
