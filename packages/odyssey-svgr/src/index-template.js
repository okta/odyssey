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

const path = require("path");
const headerComment = require("./header-comment");

const getBaseName = (filePath) =>
  path.basename(filePath, path.extname(filePath));

const getExportName = (basename) => `${basename}Icon`;

function toKebabCase(string) {
  return string
    .split("")
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join("")
    .trim()
    .replace(/[_\s]+/g, "-");
}

function odysseyIconIndexTemplate(filePaths) {
  const iconComponentExport = `export * from "./Icon";\n\n`;

  const importExportEntries = filePaths
    .map((filePath) => {
      const basename = getBaseName(filePath);
      const exportName = getExportName(basename);
      return `import { ${exportName} } from "./${basename}";\nexport * from "./${basename}";\n`;
    })
    .join("\n");

  const iconDict = filePaths
    .map((filePath) => {
      const exportName = getExportName(getBaseName(filePath));
      return [
        toKebabCase(exportName.substring(0, exportName.length - 4)),
        exportName,
      ];
    })
    .reduce((prev, curr, i) => {
      return (
        prev +
        `\n  ${curr[0].includes("-") ? `"${curr[0]}"` : curr[0]}: ${curr[1]}${
          i < filePaths.length - 1 ? "," : ",\n};\n"
        }`
      );
    }, "export const iconDictionary = {");

  return (
    headerComment + iconComponentExport + importExportEntries + `\n` + iconDict
  );
}

module.exports = odysseyIconIndexTemplate;
