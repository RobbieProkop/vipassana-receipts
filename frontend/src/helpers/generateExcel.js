import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";

const generateExcel = (receipts, start, end) => {
  const headers = [
    "receipt_number",
    "full_name",
    "email",
    "number",
    "words",
    "type",
    "address",
    "city",
    "province",
    "postal_code",
  ];

  const filteredData = receipts.map((receipt) =>
    headers.reduce((acc, key) => {
      acc[key] = receipt[key];
      return acc;
    }, {})
  );

  let total = 0;
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
        break;
      default:
        break;
    }

    total += receipt.number;
  });
  const workbook = new XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(filteredData);

  // Add the "Total" headers
  const totalHeaders = [
    "visa Total",
    "mc Total",
    "debit Total",
    "cash Total",
    "cheque Total",
    "inKind Total",
    "Total",
  ];

  totalHeaders.forEach((header, index) => {
    const headerCell = XLSX.utils.encode_cell({
      r: 0,
      c: headers.length + index,
    });
    worksheet[headerCell] = { t: "s", v: header };
  });

  // Set the total values
  const totalRow = filteredData.length + 5;
  const totalValues = [
    visaTotal,
    mcTotal,
    debitTotal,
    cashTotal,
    chequeTotal,
    inKind,
    total,
  ];

  totalValues.forEach((value, index) => {
    const totalCell = XLSX.utils.encode_cell({
      r: totalRow,
      c: headers.length + index,
    });
    worksheet[totalCell] = { t: "n", v: value };
  });

  // Update worksheet dimensions to include the total cells
  worksheet["!ref"] = XLSX.utils.encode_range({
    s: { c: 0, r: 0 },
    e: { c: headers.length + totalHeaders.length - 1, r: totalRow },
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const filename = `dana-report-${start}-course.xlsx`;
  const file = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(new Blob([file], { type: "application/octet-stream" }), filename);
};
export default generateExcel;
