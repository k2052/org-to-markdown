const orgToMarkDown = require("org-to-markdown");

module.exports = async function(source) {
  const callback = this.async();
  const result = await orgToMarkDown(source);

  callback(null, result);
};
