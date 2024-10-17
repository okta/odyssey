/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const { pattern, template, header } = require("./utils/header");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules", "dist", "dist-composite"],
  plugins: ["header", "import", "@okta/odyssey"],
  rules: {
    "header/header": [
      "error",
      "block",
      ["!", { pattern, template }, ...header.split("\n")],
      2,
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.docgen.*",
          "**/*.stories.*",
          "**/*.test.*",
          "**/*.ts",
          "**/jest.setup.js",
          "**/scripts/*",
          "**/vite.config.js",
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      extends: ["eslint:recommended"],
    },
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
    },
    {
      files: ["jest.setup.js", "*.test.*"],
      env: {
        jest: true,
      },
    },
    {
      files: ["*.theme.ts"],
      rules: {
        "@okta/odyssey/no-invalid-theme-properties": "error",
      },
    },
    {
      files: ["*.jsx", "*.tsx"],
      extends: [
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        "jsx-a11y/label-has-associated-control": [
          2,
          {
            labelAttributes: ["children"],
          },
        ],
      },
    },
  ],
};
