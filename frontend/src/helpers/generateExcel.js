import * as XLSX from "xlsx/xlsx.mjs";
import { saveAs } from "file-saver";

const generateExcel = (receipts, start, end) => {
  const headers = [
    "firstName",
    "lastName",
    "email",
    "number",
    "words",
    "type",
    "address",
    "city",
    "province",
    "postalCode",
  ];

  const filteredData = receipts.map((receipt) =>
    headers.reduce((acc, key) => {
      acc[key] = receipt[key];
      return acc;
    }, {})
  );

  let total = 0;
  receipts.forEach((receipt) => {
    total += receipt.number;
  });

  const workbook = new XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(filteredData);

  // Add the "Total" header
  const totalHeaderCell = XLSX.utils.encode_cell({
    r: 0,
    c: headers.length,
  });
  worksheet[totalHeaderCell] = { t: "s", v: "Total" };

  // Set the total value
  const totalRow = filteredData.length + 5;
  const totalColumn = headers.length;
  const totalCell = XLSX.utils.encode_cell({
    r: totalRow,
    c: totalColumn,
  });
  worksheet[totalCell] = { t: "n", v: total };

  // Update worksheet dimensions to include the total cell
  worksheet["!ref"] = XLSX.utils.encode_range({
    s: { c: 0, r: 0 },
    e: { c: totalColumn, r: totalRow },
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const filename = `dana-report-${start}-course.xlsx`;
  const file = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(new Blob([file], { type: "application/octet-stream" }), filename);
};
export default generateExcel;
