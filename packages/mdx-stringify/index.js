const stringify = require("remark-stringify");
const unherit = require("unherit");
const xtend = require("xtend");

function mdxStringify(options) {
  var Local = unherit(stringify.Compiler);
  Local.prototype.options = xtend(
    Local.prototype.options,
    this.data("settings"),
    options
  );
  this.Compiler = Local;
  this.Compiler.prototype.visitors.jsx = jsx;
  this.Compiler.prototype.visitors.import = imprt;
  this.Compiler.prototype.visitors.export = exprt;

  function jsx(node) {
    return node.value;
  }

  function imprt(node) {
    return node.value;
  }

  function exprt(node) {
    return node.value;
  }
}

mdxStringify.Compiler = stringify.Compiler;
module.exports = mdxStringify;
