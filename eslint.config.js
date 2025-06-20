import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    ...js.configs.recommended[0],
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { "@eslint/js": js },
    languageOptions: { globals: globals.browser },
  },
  {
    ...tseslint.configs.recommended[0],
    files: ["**/*.ts"],
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      ...tseslint.configs.recommended[0].rules,
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
    },
    languageOptions: { parser: tseslint.parser },
  },
  {
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
