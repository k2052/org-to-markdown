#!/usr/bin/env node
"use strict";
const meow = require("meow");
const orgToMarkDown = require(".");
const getStdin = require("get-stdin");

(async () => {
  const s = await getStdin();
  const processed = await orgToMarkDown(s);
  console.log(processed);
})();
