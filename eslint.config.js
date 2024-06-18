// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: ["jest"],
    extends: ["plugin:jest/recommended", "plugin:jest/style"],
    rules: {
      "jest/expect-expect": [
        "warn",
        {
          assertFunctionNames: ["expect", "expectTypeOf"],
        },
      ],
    },
  },
);
