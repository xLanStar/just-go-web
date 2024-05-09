module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/hooks.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        name: "react-redux",
        importNames: ["useSelector", "useDispatch"],
        message:
          "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
      },
    ],
    "prettier/prettier": [
      "warn",
      {},
      {
        usePrettierrc: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
