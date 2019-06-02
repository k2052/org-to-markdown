const images = require("remark-images");
const emoji = require("remark-emoji");

const withOrg = require("next-orga")({
  extension: /\.org?$/,
  options: {
    remarkPlugins: [images, emoji]
  }
});

module.exports = withOrg({
  pageExtensions: ["js", "jsx", "md", "org"]
});
