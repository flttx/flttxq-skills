#!/usr/bin/env node

const { main } = require("../scripts/install.js");

main(process.argv.slice(2)).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
