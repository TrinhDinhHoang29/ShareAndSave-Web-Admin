// utils/exportToExcel.ts
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function exportToExcel<T = any>({
  data,
  fileName,
  sheetName = "Sheet1",
}: {
  data: T[];
  fileName: string;
  sheetName?: string;
}) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `${fileName}.xlsx`);
}
export interface ExcelHeader<T> {
  /** Tiêu đề hiển thị */
  label: string;
  /** Thuộc tính trong object */
  key: keyof T;
}

export async function exportToExcelHeader<T>(
  data: T[],
  headers: ExcelHeader<T>[],
  fileName: string = "export.xlsx"
) {
  // Tạo dữ liệu dạng [{label1: value1, label2: value2}]
  const exportData = data.map((item) => {
    const row: Record<string, any> = {};
    headers.forEach((header) => {
      row[header.label] = item[header.key] ?? "";
    });
    return row;
  });

  // Tạo worksheet & workbook
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Xuất file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(blob, fileName);
}
