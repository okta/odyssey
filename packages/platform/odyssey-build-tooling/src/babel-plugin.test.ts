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

import { transformSync } from "@babel/core";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

const require = createRequire(import.meta.url);
const pluginPath = require.resolve("../dist/src/babel-plugin.cjs");

/**
 * The babel plugin is a CJS module loaded by `@babel/core` via native
 * `require`, which bypasses vitest's module mock system. This means
 * `vi.mock("node:fs")` with memfs won't reach it. Instead, we create
 * real temp directories with package.json files that `findOdysseyPackageInfo`
 * discovers when walking up from the filename passed to `transformSync`.
 */
const tmpBase = join(tmpdir(), "odyssey-babel-plugin-test");
const coreDir = join(tmpBase, "odyssey-react-mui", "src");
const contribDir = join(tmpBase, "odyssey-contributions-iga-components", "src");
const contribNoDepsDir = join(tmpBase, "odyssey-contributions-no-deps", "src");
const nonOdysseyDir = join(tmpBase, "some-other-lib", "src");

beforeAll(() => {
  rmSync(tmpBase, { recursive: true, force: true });

  mkdirSync(coreDir, { recursive: true });
  writeFileSync(
    join(coreDir, "..", "package.json"),
    JSON.stringify({
      name: "@okta/odyssey-react-mui",
      version: "1.55.0",
    }),
  );

  mkdirSync(contribDir, { recursive: true });
  writeFileSync(
    join(contribDir, "..", "package.json"),
    JSON.stringify({
      name: "@okta/odyssey-contributions-iga-components",
      version: "0.5.0",
      peerDependencies: { "@okta/odyssey-react-mui": "^1.47.1" },
    }),
  );

  mkdirSync(contribNoDepsDir, { recursive: true });
  writeFileSync(
    join(contribNoDepsDir, "..", "package.json"),
    JSON.stringify({
      name: "@okta/odyssey-contributions-no-deps",
      version: "1.0.0",
    }),
  );

  mkdirSync(nonOdysseyDir, { recursive: true });
  writeFileSync(
    join(nonOdysseyDir, "..", "package.json"),
    JSON.stringify({ name: "some-other-lib", version: "2.0.0" }),
  );
});

afterAll(() => {
  rmSync(tmpBase, { recursive: true, force: true });
});

/**
 * The babel plugin caches its suffix per plugin instance. We clear the require
 * cache before each transform to ensure a fresh plugin with fresh resolution.
 */
const findVersionPath = require.resolve("../dist/src/find-odyssey-version.js");

const transform = (code: string, filename: string) => {
  delete require.cache[pluginPath];
  delete require.cache[findVersionPath];

  const result = transformSync(code, {
    plugins: [pluginPath],
    filename,
    configFile: false,
    babelrc: false,
  });
  return result?.code ?? null;
};

describe("odysseyDisplayNameVersionPlugin (babel)", () => {
  test("stamps core odyssey displayName with pkg and odysseyV", () => {
    const result = transform(
      `Button.displayName = "Button";`,
      join(coreDir, "Button.tsx"),
    );

    expect(result).toContain(
      `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0"`,
    );
  });

  test("stamps contribution displayName with pkg and odysseyV from peerDependencies", () => {
    const result = transform(
      `DataView.displayName = "DataView";`,
      join(contribDir, "DataView.tsx"),
    );

    expect(result).toContain(
      `DataView.displayName = "DataView::pkg=iga-components&odysseyV=1.47.1"`,
    );
  });

  test("stamps contribution without odysseyV when dependency version is missing", () => {
    const result = transform(
      `Widget.displayName = "Widget";`,
      join(contribNoDepsDir, "Widget.tsx"),
    );

    expect(result).toContain(`Widget.displayName = "Widget::pkg=no-deps"`);
    expect(result).not.toContain("odysseyV");
  });

  test("does not stamp when file is in a non-odyssey package", () => {
    const result = transform(
      `Button.displayName = "Button";`,
      join(nonOdysseyDir, "Button.tsx"),
    );

    expect(result).toContain(`Button.displayName = "Button"`);
    expect(result).not.toContain("::");
  });

  test("does not double-stamp already stamped displayNames", () => {
    const input = `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0";`;
    const result = transform(input, join(coreDir, "Button.tsx"));

    expect(result!.match(/::/g)).toHaveLength(1);
  });

  test("stamps multiple displayNames in the same file", () => {
    const code = [
      `Button.displayName = "Button";`,
      `Badge.displayName = "Badge";`,
    ].join("\n");

    const result = transform(code, join(coreDir, "components.tsx"));

    expect(result).toContain(
      `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0"`,
    );
    expect(result).toContain(
      `Badge.displayName = "Badge::pkg=odyssey&odysseyV=1.55.0"`,
    );
  });

  test("handles single-quoted displayName strings", () => {
    const result = transform(
      `Button.displayName = 'Button';`,
      join(coreDir, "Button.tsx"),
    );

    expect(result).toContain(
      `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0"`,
    );
  });
});
