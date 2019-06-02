const convert = require("org-to-markdown");
const orgString = `
* Org file

- List of stuff
- unicorns

#+begin_src js repl
const unicorns = "are awesome";
#+end_src
  `;

(async () => {
  const md = await convert(orgString);
  console.log(md);
})();
