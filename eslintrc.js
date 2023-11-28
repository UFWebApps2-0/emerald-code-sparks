module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: "latest",
    },
    "plugins": [
        "react"
    ],
    extends: [
      "eslint:recommended",
    //   "plugin:react/recommended",
    ],
    env: {
      node: true,
      browser: true,
      es6: true,
    },
    overrides: [
      // * -- Global overrides --
      {
        files: [
          "**/*",
        ],
        rules: {
          // Enforce consistent spacing in object and array declarations
          //
          // Mainly added to ensure that imports have correct spacing
          // because the fixes by default use no spacing
          "object-curly-spacing": ["error", "always", {
            arraysInObjects: false,
            objectsInObjects: true,
          }],
  
          // Make sure imports are sorted
          "simple-import-sort/imports": "error",
  
          // Make sure imports are used
          "unused-imports/no-unused-imports": "error",
  
          // Prevent race conditions with promises
          "require-atomic-updates": "error",
  
          // Style
          "array-bracket-newline": ["error", "consistent"],
          "array-element-newline": ["error", "consistent"],
          "arrow-spacing": ["error", { before: true, after: true }],
          "brace-style": "error",
          "comma-dangle": ["error", "always-multiline"],
          "comma-spacing": "error",
          "comma-style": "error",
          "computed-property-spacing": "error",
          "curly": "error",
          "dot-location": ["error", "property"],
          "eol-last": ["error", "always"],
          "generator-star-spacing": "error",
          "key-spacing": "error",
          "keyword-spacing": "error",
          "new-parens": "error",
          "no-multi-spaces": "error",
          "no-multiple-empty-lines": ["error", { max: 1 }],
          "no-tabs": "error",
          "padded-blocks": ["error", "never"],
          "switch-colon-spacing": "error",
          "yield-star-spacing": "error",
          "spaced-comment": ["error", "always", {
            line: {
              markers: ["/"],
            },
            block: {
              balanced: true,
            },
          }],
  
          "indent": ["error", 2, { SwitchCase: 1 }],
        },
      },
    ],
  };