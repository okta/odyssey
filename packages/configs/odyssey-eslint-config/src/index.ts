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
import json from "@eslint/json";
import nxEslintPlugin from "@nx/eslint-plugin";
import { contributionsPlugin } from "@okta/odyssey-contributions-promotion-check";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import headerPlugin from "eslint-plugin-header";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import reactHooksPlugin from "eslint-plugin-react-hooks";
// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { configs as storybookPluginConfigs } from "eslint-plugin-storybook";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
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

// The @nx/eslint inferred lint target runs `eslint .` with cwd set to each
// project directory, so process.cwd() would scope the TypeScript project
// service to a single project and miss workspace-level config files it does not
// include (e.g. a package's vitest.config.ts). Anchor tsconfigRootDir to the
// monorepo root so resolution matches a root-level `eslint .`. Only the linted
// project's own files are loaded per invocation, so memory stays bounded.
const findWorkspaceRoot = (startDirectory: string): string => {
  const packageJsonPath = resolve(startDirectory, "package.json");

  if (
    existsSync(packageJsonPath) &&
    "workspaces" in
      (JSON.parse(readFileSync(packageJsonPath, "utf8")) as Record<
        string,
        unknown
      >)
  ) {
    return startDirectory;
  }

  const parentDirectory = dirname(startDirectory);

  return parentDirectory === startDirectory
    ? process.cwd()
    : findWorkspaceRoot(parentDirectory);
};

const workspaceRoot = findWorkspaceRoot(import.meta.dirname);

const eslintConfig = createTsEslintConfig(
  {
    name: getPrefixedEslintConfigName("global"),
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        projectService: true,
        tsconfigRootDir: workspaceRoot,
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
      "packages/platform/**/*",
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
    // importPlugin.flatConfigs.recommended pins ecmaVersion to 2018, which
    // rejects ES2020+ syntax (import.meta, ??, ?.) in plain JS/.mjs files.
    // Restore the intended modern baseline for the JavaScript file group.
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
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
    extends: [
      ...storybookPluginConfigs["flat/recommended"],
      ...storybookPluginConfigs["flat/addon-interactions"],
      ...storybookPluginConfigs["flat/csf-strict"],
    ],
    files: ["**/*.stories.tsx"],
    name: getPrefixedEslintConfigName("storybook"),
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
    files: ["packages/contributions/**/contributionsMetadata.json"],
    language: "json/json",
    name: getPrefixedEslintConfigName("contributions-metadata"),
    plugins: {
      contributions: contributionsPlugin,
      json,
    },
    rules: {
      "contributions/metadata-completeness": "error",
    },
  },

  {
    name: getPrefixedEslintConfigName("global-ignores"),
    ignores: [
      "**/.*/**/*",
      "!**/.storybook/**/*",
      "**/coverage/**/*",
      "**/dist/**/*",
      "**/node_modules/**/*",
      "**/public/mockServiceWorker.js",
      "**/public/mockServiceWorker.generated.js",
      "**/src/properties/ts/*.ts",
      // Generated Blueprint authoring schema (~3.5 MB); linting it OOMs the
      // type-aware parser and it is a build artifact, not authored source.
      "packages/contributions/odyssey-blueprint/blueprint.schema.generated.json",
      "packages/platform/extractor/test/golden/**/*",
      "packages/platform/odyssey-contributions-stack/**/files/**/*",
      "packages/platform/odyssey-contributions-promotion-check/src/utils/componentExports.ts",
    ],
  },

  {
    name: getPrefixedEslintConfigName("bin-scripts"),
    // bin/*.mjs scripts import from dist/ which doesn't exist at lint time —
    // the import is valid at runtime after `yarn build`. Disabling resolution
    // at the config level is cleaner than per-file inline disables.
    files: ["packages/contributions/odyssey-blueprint/bin/*.mjs"],
    rules: {
      "import/no-unresolved": "off",
    },
  },

  {
    // Allows us to enforce boundaries in the monorepo.
    // e.g. `scope:core` can't depend on `scope:contributions`.
    name: getPrefixedEslintConfigName("nx-module-boundaries"),
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.cts",
      "**/*.mts",
      "**/*.js",
      "**/*.jsx",
    ],
    plugins: { "@nx": nxEslintPlugin },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: false,
          allow: [],
          depConstraints: [
            {
              sourceTag: "scope:core",
              onlyDependOnLibsWithTags: ["scope:core", "scope:tools"],
            },
            {
              sourceTag: "scope:contributions",
              onlyDependOnLibsWithTags: [
                "scope:core",
                "scope:platform",
                "scope:contributions",
                "scope:tools",
              ],
            },
            {
              sourceTag: "scope:platform",
              onlyDependOnLibsWithTags: [
                "scope:core",
                "scope:platform",
                "scope:tools",
              ],
            },
            {
              sourceTag: "scope:app",
              onlyDependOnLibsWithTags: ["*"],
            },
            {
              sourceTag: "scope:tools",
              onlyDependOnLibsWithTags: ["scope:tools", "scope:platform"],
            },
          ],
        },
      ],
    },
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
