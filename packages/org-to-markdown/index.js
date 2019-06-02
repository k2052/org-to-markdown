const unified = require("unified");
const parse = require("orga-unified");
const orgaToRemark = require("orga-remark");
const stringify = require("mdx-stringify");

const convert = async s => {
  const md = await unified()
        .use(parse)
        .use(orgaToRemark)
        .use(stringify)
        .process(s);

  return md.contents;
};

module.exports = convert;
