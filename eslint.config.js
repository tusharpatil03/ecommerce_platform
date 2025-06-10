import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    rules: {
      "no-unused-vars": "off",
    },
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    // Note: there should be no other properties in this object
    ignores: [
      "coverage",
      "**/public",
      "**/dist",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
    ],
  },
  eslintPluginPrettierRecommended,
]);
