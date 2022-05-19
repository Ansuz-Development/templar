import { readFileSync } from "fs";
import * as XLSX from "xlsx/xlsx.mjs";

const buf = readFileSync("./example.xlsx");
/* buf is a Buffer */
const workbook = XLSX.read(buf);

var sheet_name_list = workbook.SheetNames;
console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
