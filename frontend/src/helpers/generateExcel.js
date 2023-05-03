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

  const workbook = new XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(receipts, { header: headers });
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const filename = `dana-report-${start}-course.xlsx`;
  const file = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(new Blob([file], { type: "application/octet-stream" }), filename);
};
export default generateExcel;
