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

import { vol } from "memfs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("node:fs", async () => {
  return (await vi.importActual("memfs")).fs;
});

const { odysseyDisplayNameVersionPlugin } = await import("./vite-plugin.js");

const corePackageJson = JSON.stringify({
  name: "@okta/odyssey-react-mui",
  version: "1.55.0",
});

const contributionPackageJson = JSON.stringify({
  name: "@okta/odyssey-contributions-iga-components",
  version: "0.5.0",
  peerDependencies: { "@okta/odyssey-react-mui": "^1.47.1" },
});

const contributionNoDepsPackageJson = JSON.stringify({
  name: "@okta/odyssey-contributions-no-deps",
  version: "1.0.0",
});

const nonOdysseyPackageJson = JSON.stringify({
  name: "some-other-lib",
  version: "2.0.0",
});

describe("odysseyDisplayNameVersionPlugin", () => {
  beforeEach(() => {
    vol.fromJSON({
      "/packages/core/odyssey-react-mui/package.json": corePackageJson,
      "/packages/contributions/iga-components/package.json":
        contributionPackageJson,
      "/packages/contributions/no-deps/package.json":
        contributionNoDepsPackageJson,
      "/packages/other/some-other-lib/package.json": nonOdysseyPackageJson,
    });
  });

  afterEach(() => {
    vol.reset();
  });

  test("stamps core odyssey displayName with pkg and odysseyV", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `Button.displayName = "Button";`;
    const result = plugin.transform(
      code,
      "/packages/core/odyssey-react-mui/src/Button.tsx",
    );

    expect(result).not.toBeNull();
    expect(result!.code).toBe(
      `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0";`,
    );
  });

  test("stamps contribution displayName with pkg and odysseyV", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `DataView.displayName = "DataView";`;
    const result = plugin.transform(
      code,
      "/packages/contributions/iga-components/src/DataView.tsx",
    );

    expect(result).not.toBeNull();
    expect(result!.code).toBe(
      `DataView.displayName = "DataView::pkg=iga-components&odysseyV=1.47.1";`,
    );
  });

  test("stamps contribution without odysseyV when dependency version is missing", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `Widget.displayName = "Widget";`;
    const result = plugin.transform(
      code,
      "/packages/contributions/no-deps/src/Widget.tsx",
    );

    expect(result).not.toBeNull();
    expect(result!.code).toBe(`Widget.displayName = "Widget::pkg=no-deps";`);
  });

  test("stamps multiple displayNames in the same file", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = [
      `Button.displayName = "Button";`,
      `Badge.displayName = "Badge";`,
    ].join("\n");

    const result = plugin.transform(
      code,
      "/packages/core/odyssey-react-mui/src/components.tsx",
    );

    expect(result).not.toBeNull();
    expect(result!.code).toContain(
      `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0"`,
    );
    expect(result!.code).toContain(
      `Badge.displayName = "Badge::pkg=odyssey&odysseyV=1.55.0"`,
    );
  });

  test("does not double-stamp already stamped displayNames", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0";`;
    const result = plugin.transform(
      code,
      "/packages/core/odyssey-react-mui/src/Button.tsx",
    );

    expect(result).toBeNull();
  });

  test("skips files outside odyssey packages", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `Button.displayName = "Button";`;
    const result = plugin.transform(code, "/packages/other/some-lib/Button.ts");

    expect(result).toBeNull();
  });

  test("skips non-JS/TS files", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `.displayName { color: red; }`;
    const result = plugin.transform(
      code,
      "/packages/core/odyssey-react-mui/src/styles.css",
    );

    expect(result).toBeNull();
  });

  test("skips files without displayName assignments", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `export const Button = () => <button>Click</button>;`;
    const result = plugin.transform(
      code,
      "/packages/core/odyssey-react-mui/src/Button.tsx",
    );

    expect(result).toBeNull();
  });

  test("returns null when package info is not found", () => {
    const plugin = odysseyDisplayNameVersionPlugin();
    const code = `Button.displayName = "Button";`;
    const result = plugin.transform(
      code,
      "/packages/other/some-other-lib/src/Button.tsx",
    );

    expect(result).toBeNull();
  });
});
