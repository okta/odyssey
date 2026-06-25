/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { readdir, writeFile } from "node:fs/promises";
import { basename, extname } from "node:path";

const currentYear = new Date().getFullYear();

export const headerCopyrightLicense = `/*!
 * Copyright (c) ${currentYear}-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// Code automatically generated; DO NOT EDIT.

`;

const getIconNamesFromDirectory = async (directoryPath: string) => {
  const filenames = await readdir(directoryPath);
  return filenames
    .filter((filename) => extname(filename) === ".tsx")
    .map((filename) => basename(filename, extname(filename)))
    .toSorted();
};

const formatExportStatements = ({
  exportDirectory,
  iconNames,
}: {
  exportDirectory: string;
  iconNames: readonly string[];
}) =>
  iconNames
    .map((iconName) =>
      exportDirectory
        ? `export * from "./${exportDirectory}/${iconName}.js";`
        : `export * from "./${iconName}.js";`,
    )
    .join("\n");

const formatNamesModule = (iconNames: readonly string[]) => {
  const arrayLiteral = iconNames
    .map((iconName) => `  "${iconName}",`)
    .join("\n");
  return `${headerCopyrightLicense}export const iconNames = [
${arrayLiteral}
] as const satisfies readonly string[];

export type IconName = (typeof iconNames)[number];
`;
};

// Each entry's `import("./<Name>.js")` is a static path so Vite/Rollup/Webpack
// emit one chunk per icon file. Consumers look the lazy component up by
// `IconName`, and only the rendered icon's chunk is fetched at runtime.
const formatLazyIconDictionaryModule = (iconNames: readonly string[]) => {
  const recordEntries = iconNames
    .map(
      (iconName) =>
        `  ${iconName}: lazy(() =>\n    import("./${iconName}.js").then((module) => ({ default: module.${iconName}Icon })),\n  ),`,
    )
    .join("\n");
  return `${headerCopyrightLicense}import { type ComponentType, lazy, type LazyExoticComponent } from "react";

import type { SvgIconNoChildrenProps } from "../SvgIcon.js";
import type { IconName } from "./names.js";

export type LazyIconComponent = LazyExoticComponent<
  ComponentType<SvgIconNoChildrenProps>
>;

export const lazyIconDictionary: Record<IconName, LazyIconComponent> = {
${recordEntries}
};
`;
};

const iconNames = await getIconNamesFromDirectory("./src/icons.generated");
const logoNames = await getIconNamesFromDirectory("./src/logos.generated");

await Promise.all([
  writeFile("./src/icons.generated/names.ts", formatNamesModule(iconNames)),
  writeFile(
    "./src/icons.generated/lazyIconDictionary.ts",
    formatLazyIconDictionaryModule(iconNames),
  ),
  writeFile(
    "./src/icons.generated/index.ts",
    `${headerCopyrightLicense}${formatExportStatements({
      exportDirectory: "",
      iconNames,
    })}\n`,
  ),
  writeFile(
    "./src/logos.generated/index.ts",
    `${headerCopyrightLicense}${formatExportStatements({
      exportDirectory: "",
      iconNames: logoNames,
    })}\n`,
  ),
]);

console.info("Completed writing icon and logo index files.");
