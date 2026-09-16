/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The ESM build emits bare subpath imports into MUI (`@mui/material/Accordion`).
// MUI 5 ships no `exports` map, so Node's ESM loader rejects those as directory
// imports. The `node` condition is what steers Node at the CJS build instead,
// and because Node evaluates conditions in declaration order it only works while
// `node` precedes `import`.
const packageManifest = JSON.parse(
  readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
    "utf8",
  ),
) as {
  exports: Record<string, Record<string, string> | string>;
};

const conditionalSubpaths = Object.entries(packageManifest.exports).flatMap(
  ([subpath, conditions]) =>
    typeof conditions === "string" ? [] : [[subpath, conditions] as const],
);

describe("package export conditions", () => {
  test("every conditional subpath resolves node and default to its CommonJS build", () => {
    const misroutedSubpaths = conditionalSubpaths.flatMap(
      ([subpath, conditions]) =>
        conditions.node === conditions.require &&
        conditions.default === conditions.require
          ? []
          : [subpath],
    );

    expect(misroutedSubpaths).toStrictEqual([]);
  });

  test("every conditional subpath declares node ahead of import", () => {
    const misorderedSubpaths = conditionalSubpaths.flatMap(
      ([subpath, conditions]) => {
        const conditionNames = Object.keys(conditions);
        const nodeIndex = conditionNames.indexOf("node");
        const importIndex = conditionNames.indexOf("import");
        return nodeIndex !== -1 && nodeIndex < importIndex ? [] : [subpath];
      },
    );

    expect(misorderedSubpaths).toStrictEqual([]);
  });

  test("declares a conditional subpath for every entry point the build emits", () => {
    expect(conditionalSubpaths.map(([subpath]) => subpath)).toStrictEqual([
      "./__internal",
      "./icons",
      "./lazy-loaded-icons",
      "./icon-names",
      "./logos",
      "./labs",
      "./test-selectors",
      "./ui-shell",
      "./web-component",
      "./charts",
      ".",
    ]);
  });
});
