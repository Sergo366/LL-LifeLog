import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Підключення базових конфігів Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Додаткові правила та Prettier
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      // Стиль і помилки
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "no-duplicate-imports": "error",

      // React
      "react/jsx-key": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Import
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error",
      "import/no-cycle": "warn",
      "import/prefer-default-export": "off",

      // Next.js-specific
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-sync-scripts": "error",

      // Prettier
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
