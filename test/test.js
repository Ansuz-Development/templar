import { createRequire } from "module";
import {unifySchemas} from "../src/utils.js";

const require = createRequire(import.meta.url);
const schema1 = require("../samples/data-01.json");

const schemas = unifySchemas([schema1, schema1, schema1]);

console.log(JSON.stringify(schemas, null, 2));
