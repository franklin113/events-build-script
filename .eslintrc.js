module.exports = {
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true, // just use this on ecmaFeatures, no need "experimentalObjectRestSpread" anymore.
    },
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
