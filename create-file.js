#!/usr/bin/env node

const {
  exportDataToCsv
} = require("./utils");

const fileName = process.argv.slice(2)[0];
const data = process.argv.slice(2)[1];

exportDataToCsv(fileName, data);