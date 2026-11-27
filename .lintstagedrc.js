/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const { access } = require("node:fs/promises");
const { join, relative } = require("node:path");

process.env.IS_COMMITTING = "true";

// Every workspace package sits exactly two levels under `packages/` (`packages/core/odyssey-react-mui`), so the first three segments name the package. Anything shallower, such as a root script, belongs to the root project.
const PACKAGE_DIRECTORY = /^(?<packageDirectory>packages\/[^/]+\/[^/]+)\//;

const SUPPRESSIONS_FILE_NAME = "eslint-suppressions.json";

const getPackageDirectory = (filePath) =>
  relative(process.cwd(), filePath).match(PACKAGE_DIRECTORY)?.groups
    ?.packageDirectory ?? ".";

const getHasSuppressionsFile = (packageDirectory) =>
  access(join(packageDirectory, SUPPRESSIONS_FILE_NAME)).then(
    () => true,
    () => false,
  );

// ESLint reads `eslint-suppressions.json` from its working directory and records paths relative to it. Each package keeps its own file, so eslint runs from each package's directory, the same way the Nx eslint target does, or a staged file's recorded violations would be reported as new ones.
// `--prune-suppressions` lowers the recorded counts for the staged files when a commit fixes violations, then the file is staged with them. Without it ESLint exits 2 on the stale entry and blocks the commit that paid it down. Only the linted files are pruned, so other files' entries are left alone.
// lint-staged splits a command string back into arguments on spaces, so a path with a space in it (`src/Odyssey Core/...` in odyssey-storybook) would arrive as two missing files. Quoting keeps each path one argument.
const getQuotedFilePaths = (filePaths) =>
  filePaths.map((filePath) => `"${filePath}"`).join(" ");

const getEslintCommands = (filePaths) =>
  Promise.all(
    Object.entries(Object.groupBy(filePaths, getPackageDirectory)).map(
      ([packageDirectory, packageFilePaths]) =>
        getHasSuppressionsFile(packageDirectory).then((hasSuppressionsFile) =>
          hasSuppressionsFile
            ? [
                `yarn --cwd ${packageDirectory} run -T -B eslint --fix --prune-suppressions ${getQuotedFilePaths(packageFilePaths)}`,
                `git add ${join(packageDirectory, SUPPRESSIONS_FILE_NAME)}`,
              ]
            : [
                `yarn --cwd ${packageDirectory} run -T -B eslint --fix ${getQuotedFilePaths(packageFilePaths)}`,
              ],
        ),
    ),
  ).then((commandsByPackage) => commandsByPackage.flat());

module.exports = {
  // `--no-errors-on-unmatched` because the glob is every staged file while biome formats only the languages it supports. Markdown is not one of them, so a docs-only commit hands biome a set it ignores entirely, and without the flag "No files were processed in the specified paths" is an error that fails the whole pre-commit hook. A mixed commit hid this: one staged `.ts` is enough for biome to process something and exit 0.
  "*": "biome format --write --no-errors-on-unmatched",
  "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}": getEslintCommands,
  "packages/**/**/properties/*.properties": () => [
    "yarn generate:i18n:pseudoLocaleProperties",
    "git add packages/**/**/properties/*ok_SK.properties",
    "git add packages/**/**/properties/*ok_PL.properties",
  ],
};
