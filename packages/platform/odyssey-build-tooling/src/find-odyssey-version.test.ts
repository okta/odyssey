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

const { findOdysseyPackageInfo } = await import("./find-odyssey-version.js");

describe("findOdysseyPackageInfo", () => {
  afterEach(() => {
    vol.reset();
  });

  describe("core package (@okta/odyssey-react-mui)", () => {
    beforeEach(() => {
      vol.fromJSON({
        "/packages/core/odyssey-react-mui/package.json": JSON.stringify({
          name: "@okta/odyssey-react-mui",
          version: "1.55.0",
        }),
      });
    });

    test("finds package info from a source file directory", () => {
      const result = findOdysseyPackageInfo(
        "/packages/core/odyssey-react-mui/src",
      );

      expect(result).toEqual({
        name: "@okta/odyssey-react-mui",
        version: "1.55.0",
        shortName: "odyssey",
        odysseyDependencyVersion: null,
      });
    });

    test("finds package info from a nested directory", () => {
      const result = findOdysseyPackageInfo(
        "/packages/core/odyssey-react-mui/src/components/Button",
      );

      expect(result).toEqual({
        name: "@okta/odyssey-react-mui",
        version: "1.55.0",
        shortName: "odyssey",
        odysseyDependencyVersion: null,
      });
    });

    test("finds package info from the package root directory", () => {
      const result = findOdysseyPackageInfo("/packages/core/odyssey-react-mui");

      expect(result).toEqual({
        name: "@okta/odyssey-react-mui",
        version: "1.55.0",
        shortName: "odyssey",
        odysseyDependencyVersion: null,
      });
    });
  });

  describe("contribution packages", () => {
    test("extracts odysseyDependencyVersion from peerDependencies", () => {
      vol.fromJSON({
        "/packages/contributions/iga-components/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-iga-components",
          version: "0.5.0",
          peerDependencies: { "@okta/odyssey-react-mui": "^1.47.1" },
        }),
      });

      const result = findOdysseyPackageInfo(
        "/packages/contributions/iga-components/src",
      );

      expect(result).toEqual({
        name: "@okta/odyssey-contributions-iga-components",
        version: "0.5.0",
        shortName: "iga-components",
        odysseyDependencyVersion: "1.47.1",
      });
    });

    test("extracts odysseyDependencyVersion from dependencies", () => {
      vol.fromJSON({
        "/packages/contributions/wp-components/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-wp-components",
          version: "1.0.0",
          dependencies: { "@okta/odyssey-react-mui": "~1.50.0" },
        }),
      });

      const result = findOdysseyPackageInfo(
        "/packages/contributions/wp-components/src",
      );

      expect(result).toEqual({
        name: "@okta/odyssey-contributions-wp-components",
        version: "1.0.0",
        shortName: "wp-components",
        odysseyDependencyVersion: "1.50.0",
      });
    });

    test("extracts odysseyDependencyVersion from devDependencies", () => {
      vol.fromJSON({
        "/packages/contributions/test-pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-test-pkg",
          version: "2.0.0",
          devDependencies: { "@okta/odyssey-react-mui": ">=1.42.0" },
        }),
      });

      const result = findOdysseyPackageInfo(
        "/packages/contributions/test-pkg/src",
      );

      expect(result?.odysseyDependencyVersion).toBe("1.42.0");
    });

    test("returns null odysseyDependencyVersion when odyssey is not a dependency", () => {
      vol.fromJSON({
        "/packages/contributions/no-deps/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-no-deps",
          version: "1.0.0",
        }),
      });

      const result = findOdysseyPackageInfo(
        "/packages/contributions/no-deps/src",
      );

      expect(result).toEqual({
        name: "@okta/odyssey-contributions-no-deps",
        version: "1.0.0",
        shortName: "no-deps",
        odysseyDependencyVersion: null,
      });
    });
  });

  describe("short name extraction", () => {
    test("extracts 'odyssey' from @okta/odyssey-react-mui", () => {
      vol.fromJSON({
        "/pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-react-mui",
          version: "1.0.0",
        }),
      });

      expect(findOdysseyPackageInfo("/pkg/src")?.shortName).toBe("odyssey");
    });

    test("extracts contribution suffix from @okta/odyssey-contributions-*", () => {
      vol.fromJSON({
        "/pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-iga-components",
          version: "1.0.0",
        }),
      });

      expect(findOdysseyPackageInfo("/pkg/src")?.shortName).toBe(
        "iga-components",
      );
    });
  });

  describe("directory walking", () => {
    test("skips non-odyssey package.json files and keeps walking up", () => {
      vol.fromJSON({
        "/repo/packages/odyssey-react-mui/package.json": JSON.stringify({
          name: "@okta/odyssey-react-mui",
          version: "1.55.0",
        }),
        "/repo/packages/odyssey-react-mui/src/nested/package.json":
          JSON.stringify({
            name: "some-internal-package",
            version: "0.0.1",
          }),
      });

      const result = findOdysseyPackageInfo(
        "/repo/packages/odyssey-react-mui/src/nested",
      );

      expect(result?.name).toBe("@okta/odyssey-react-mui");
    });

    test("returns null when no odyssey package.json is found", () => {
      vol.fromJSON({
        "/repo/package.json": JSON.stringify({
          name: "some-other-project",
          version: "1.0.0",
        }),
      });

      const result = findOdysseyPackageInfo("/repo/src");

      expect(result).toBeNull();
    });

    test("returns null when walking up would enter node_modules", () => {
      vol.fromJSON({
        "/repo/node_modules/@okta/odyssey-react-mui/package.json":
          JSON.stringify({
            name: "@okta/odyssey-react-mui",
            version: "1.55.0",
          }),
      });

      // Starting from dist/src, walking up hits node_modules before finding
      // the package.json, so the guard stops the search.
      const result = findOdysseyPackageInfo(
        "/repo/node_modules/@okta/odyssey-react-mui/dist/src",
      );

      expect(result).toBeNull();
    });

    test("stops walking when parent is a node_modules directory", () => {
      vol.fromJSON({
        "/repo/packages/odyssey-react-mui/package.json": JSON.stringify({
          name: "@okta/odyssey-react-mui",
          version: "1.55.0",
        }),
        "/repo/node_modules/some-dep/package.json": JSON.stringify({
          name: "some-dep",
          version: "1.0.0",
        }),
      });

      // Starting from inside node_modules/some-dep/src — should NOT walk up
      // past node_modules to find odyssey-react-mui
      const result = findOdysseyPackageInfo("/repo/node_modules/some-dep/src");

      expect(result).toBeNull();
    });
  });

  describe("version handling", () => {
    test("returns null version when package.json has no version field", () => {
      vol.fromJSON({
        "/pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-react-mui",
        }),
      });

      const result = findOdysseyPackageInfo("/pkg/src");

      expect(result?.version).toBeNull();
    });

    test("strips ^ prefix from dependency version", () => {
      vol.fromJSON({
        "/pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-test",
          version: "1.0.0",
          peerDependencies: { "@okta/odyssey-react-mui": "^1.55.0" },
        }),
      });

      expect(findOdysseyPackageInfo("/pkg/src")?.odysseyDependencyVersion).toBe(
        "1.55.0",
      );
    });

    test("strips ~ prefix from dependency version", () => {
      vol.fromJSON({
        "/pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-test",
          version: "1.0.0",
          peerDependencies: { "@okta/odyssey-react-mui": "~1.55.0" },
        }),
      });

      expect(findOdysseyPackageInfo("/pkg/src")?.odysseyDependencyVersion).toBe(
        "1.55.0",
      );
    });

    test("strips >= prefix from dependency version", () => {
      vol.fromJSON({
        "/pkg/package.json": JSON.stringify({
          name: "@okta/odyssey-contributions-test",
          version: "1.0.0",
          peerDependencies: { "@okta/odyssey-react-mui": ">=1.42.0" },
        }),
      });

      expect(findOdysseyPackageInfo("/pkg/src")?.odysseyDependencyVersion).toBe(
        "1.42.0",
      );
    });
  });
});
