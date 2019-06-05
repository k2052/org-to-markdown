import test from "ava";
const unified = require("unified");
const parse = require("orga-unified");
const getStdin = require("get-stdin");
const orgaToRemark = require("orga-remark");
const stringify = require("mdx-stringify");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const options = {
  showHidden: false,
  depth: null,
  colors: true
};

const inspect = n => {
  return util.inspect(n, options);
};

test("things work", async t => {
  const s = await readFile("Test.org", "utf8");
  const r = await readFile("TestOutput.md", "utf8");
  const md = await unified()
    .use(parse)
    .use(orgaToRemark)
    .use(stringify)
    .process(s);
  t.is(md.contents, r);
});
