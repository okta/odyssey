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

import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import headerPlugin from "eslint-plugin-header";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import {
  config as createTsEslintConfig,
  configs as tsEslintConfigs,
} from "typescript-eslint";

// import * as headerPlugin from "./utils/headerPlugin.cjs"
import { headerText, pattern, template } from "./utils/header.js";

// Total hackjob because `eslint-plugin-header` hasn't been updated in forever and isn't compatible with ESLint v9+. TS doesn't like the fact that we're modifying `meta` which is internal to the plugin. -Kevin Ghadyani
const modifiedHeaderPlugin = {
  ...headerPlugin,
  rules: {
    ...headerPlugin.rules,
    header: {
      ...headerPlugin.rules!.header,
      meta: {
        ...(headerPlugin.rules!.header as { meta: object }).meta,
        schema: false,
      },
    },
  },
} as typeof headerPlugin;

// Total hackjob because `eslint-plugin-header` hasn't been updated in forever and isn't compatible with ESLint v9+. TS doesn't like the fact that we're modifying `meta` which is internal to the plugin. -Kevin Ghadyani
const modifiedReactHooksPlugin = {
  ...reactHooksPlugin,
  configs: {
    ...reactHooksPlugin.configs,
    recommended: {
      ...reactHooksPlugin.configs.recommended,
      // They're referencing their own plugin cyclically and ESLint no longer alows that.
      plugins: {},
    },
  },
} as typeof reactHooksPlugin;

const getPrefixedEslintConfigName = (name: string) =>
  `odyssey-eslint-config/${name}`;

const eslintConfig = createTsEslintConfig(
  {
    name: getPrefixedEslintConfigName("global"),
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
      sourceType: "module",
    },
    settings: {
      // "import/parsers": {
      //   "@typescript-eslint/parser": [".ts", ".tsx"]
      // },
      "import/resolver": {
        node: true,
        typescript: true,
      },
    },
  },

  {
    name: getPrefixedEslintConfigName("header-plugin"),
    ignores: [
      "packages/contributions/**/*",
      "packages/core/odyssey-contribution-tooling/**/*",
      "packages/tools/odyssey-cli/**/*",
    ],
    plugins: {
      header: modifiedHeaderPlugin,
    },
    rules: {
      "header/header": [
        "error",
        "block",
        ["!", { pattern, template }, ...headerText.split("\n")],
        2,
      ],
    },
  },

  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      tsEslintConfigs.eslintRecommended,
    ],
    name: getPrefixedEslintConfigName("javascript"),
    // rules: {
    //   "import/no-extraneous-dependencies": [
    //     "error",
    //     {
    //       devDependencies: [
    //         "**/*.docgen.*",
    //         "**/*.stories.*",
    //         "**/*.test.*",
    //         "**/*.ts",
    //         "**/scripts/*",
    //         "**/vitest.config.js",
    //       ],
    //     },
    //   ],
    // },
  },

  {
    extends: [
      js.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      tsEslintConfigs.eslintRecommended,
      ...tsEslintConfigs.recommendedTypeChecked,
    ],
    files: ["**/*.ts", "**/*.cts", "**/*.mts", "**/*.tsx"],
    name: getPrefixedEslintConfigName("typescript"),
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": ["off"],
    },
  },

  {
    extends: [
      jsxA11yPlugin.flatConfigs.recommended,
      modifiedReactHooksPlugin.configs.recommended,
    ],
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    name: getPrefixedEslintConfigName("react"),
    plugins: {
      "react-hooks": modifiedReactHooksPlugin,
    },
    rules: {
      "jsx-a11y/label-has-associated-control": [
        2,
        {
          labelAttributes: ["children"],
        },
      ],
    },
  },

  {
    files: ["**/vitest.setup.*", "**/*.test.*"],
    languageOptions: {
      globals: {
        vi: true,
        vitest: true,
      },
    },
    name: getPrefixedEslintConfigName("test"),
  },

  {
    name: getPrefixedEslintConfigName("global-ignores"),
    ignores: [
      "**/.*/**/*",
      "**/coverage/**/*",
      "**/dist/**/*",
      "**/node_modules/**/*",
      "**/src/properties/ts/*.ts",
    ],
  },

  process.env.IS_CI === "true" ||
    process.env.IS_COMMITTING === "true" ||
    process.env.HAS_SORTING === "true"
    ? {
        files: ["**/*.ts", "**/*.cts", "**/*.mts", "**/*.tsx"],
        name: getPrefixedEslintConfigName("sorting"),
        plugins: {
          perfectionist: perfectionistPlugin,
        },
        rules: {
          "perfectionist/sort-array-includes": "error",
          "perfectionist/sort-enums": "error",
          "perfectionist/sort-exports": [
            "error",
            {
              partitionByNewLine: true, // keep existing new lines between export groups
            },
          ],
          "perfectionist/sort-imports": "error",
          "perfectionist/sort-interfaces": "error",
          "perfectionist/sort-jsx-props": "error",
          "perfectionist/sort-named-exports": "error",
          "perfectionist/sort-named-imports": "error",
          "perfectionist/sort-object-types": "error",
          "perfectionist/sort-sets": "error",
          "perfectionist/sort-switch-case": "error",
        },
      }
    : {},
);

export default eslintConfig;
