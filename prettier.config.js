// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSameLine: true,
  arrowParens: 'always',
  jsxBracketSameLine: true,
  printWidth: 200,
};

module.exports = config;
