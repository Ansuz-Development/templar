import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

import fs from "fs";
import path from "path";

import { readFileSync } from "fs";
import * as XLSX from "xlsx/xlsx.mjs";

const __dirname = path.resolve();

// Load the docx file as binary content
const contents = [
  fs.readFileSync(
    path.resolve(__dirname, "example.docx"),
    "binary"
  ),
  fs.readFileSync(
    path.resolve(__dirname, "example_2.docx"),
    "binary"
  ),
];

const buf = readFileSync("./example.xlsx");
/* buf is a Buffer */
const workbook = XLSX.read(buf);

var sheet_name_list = workbook.SheetNames;
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

for (const content of contents) {
  for (const person of data) {
    console.log(person);

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(person);

    const docxBuf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    // buf is a nodejs Buffer, you can either write it to a
    // file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, `${new Date().getTime()}-output-${person.name}.docx`), docxBuf);
  }
}
