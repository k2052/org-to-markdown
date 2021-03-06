const h = require("unist-builder");
const visit = require("unist-util-visit");
function toMdxAst(tree) {
  visit(tree, "section", (node, index, parent) => {
    node.children.forEach(n => {
      n.parent = parent;
    });
    parent.children.splice(index, 1, ...node.children);
  });

  visit(tree, "headline", node => {
    node.type = "heading";
    node.depth = node.level;
  });

  visit(tree, "block", node => {
    node.type = "code";
    node.lang = node.params[0];
    node.meta = node.params.slice(1);
  });

  visit(tree, "link", node => {
    node.url = node.uri.raw;
    if (node.desc) {
      node.children.push(h("text", { value: node.desc }));
    } else {
      node.children.push(h("text", { value: node.uri.raw }));
    }
  });

  visit(tree, "bold", node => {
    node.type = "strong";
  });

  visit(tree, "italic", node => {
    node.type = "emphasis";
  });

  visit(tree, "underline", node => {
    node.type = "emphasis";
  });

  visit(tree, "list.item", node => {
    node.type = "listItem";
  });

  visit(tree, "verbatim", node => {
    node.type = "inlineCode";
    node.value = node.children[0].value;
  });

  visit(tree, "drawer", (node, index, parent) => {
    parent.children.splice(index, 1);
  });

  return tree;
}

function plugin(destination, options) {
  if (destination && !destination.process) {
    options = destination;
    destination = null;
  }

  return destination ? bridge(destination, options) : mutate(options);
}

function bridge(destination, options) {
  return transformer;
  function transformer(node, file, next) {
    destination.run(toMdxAst(node, options), file, done);
    function done(err) {
      next(err);
    }
  }
}

function mutate(options) {
  return transformer;
  function transformer(node) {
    return toMdxAst(node, options);
  }
}

module.exports = plugin;
