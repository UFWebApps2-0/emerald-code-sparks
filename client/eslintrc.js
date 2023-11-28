const messages = {
    useAppButton: "Use <AppButton> instead.",
    useAppImage: "Use <AppImage> instead.",
    useReactQueryInsteadOfDevlupApi: "DevlupApi is restricted in React components. Use React Query instead. React Query de-duplicates requests and invalidates cached requests on mutations, along with some other benefits.",
  };
  
  module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: "latest",
    },
    extends: [
      "eslint:recommended",
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
      // * -- React --
    {
        files: [
          "*.tsx",
        ],
  
        plugins: [
          "jsx-a11y",
        ],
  
        extends: [
          "plugin:react/recommended",
          // Use strict over recommended because it doesn't introduce many new errors
          "plugin:jsx-a11y/strict",
        ],
  
        settings: {
          react: {
            version: "detect",
          },
        },
  
        rules: {
          // Accessibility and prevents unintended behavior
          // in the case of form buttons.
          "react/button-has-type": "error",
  
          // Optimization and prevents unintended behavior due to
          // array indices being used as child keys.
          //
          // Disabled for now since it requires lot of changes to implement.
          // "react/no-array-index-key": "error",
  
          // Prevents display names from being undefined
          // Useful for debugging and rarely a problem
          "react/display-name": "error",
  
          // Children should be defined as child elements rather than a property
          // of the parent tag
          "react/no-children-prop": "error",
  
          // Prevents dangerouslySetInnerHTML and children from being used together
          // since dangerouslySetInnerHTML will overwrite children.
          // Because of this, React will crash if this is done.
          //
          // The rule doesn't seem to work, but no harm in enabling.
          "react/no-danger-with-children": "error",
  
          // Optimization, this makes sure that functions passed as props are stable.
          // For example, callbacks have to be wrapped with useCallback
          // or declared outside of the component render function.
          //
          // Disabled for now since it requires lot of changes to implement.
          // "react/jsx-no-bind": "error",
  
          // Increase severity to error
          // Wrong usage can change code behaviour
          "react-hooks/exhaustive-deps": "error",
  
          // Style
          "react/jsx-tag-spacing": [
            "error",
            {
              closingSlash: "never",
              beforeSelfClosing: "never",
              afterOpening: "never",
              beforeClosing: "never",
            },
          ],
  
          // * Reduced severity from default
  
          // Requires characters like ; " ' to be escaped, leading to hard
          // to read code
          "react/no-unescaped-entities": "off",
  
          // Automatically imported by Next.js
          "react/react-in-jsx-scope": "off",
        },
      },
    ],
  };