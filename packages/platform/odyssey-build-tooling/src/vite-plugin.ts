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

import { dirname } from "node:path";

import {
  findOdysseyPackageInfo,
  type PackageInfo,
} from "./find-odyssey-version.js";

// Minimal Plugin shape — avoids a hard dependency on `vite` types.
interface OdysseyVitePlugin {
  name: string;
  transform: (
    code: string,
    id: string,
  ) => { code: string; map: null } | null | undefined;
}

/**
 * Vite plugin that stamps Odyssey package information into React `displayName`
 * assignments at transform time.
 *
 * **Format:** `component::pkg=<package>&odysseyV=<version>`
 *
 * The `::` separator cleanly delineates the component name from key-value
 * metadata, which is encoded as URL search params for easy extensibility.
 * New keys can be added without breaking existing parsers.
 *
 * **For core Odyssey components (@okta/odyssey-react-mui):**
 * - `Button.displayName = "Button"` → `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0"`
 *
 * **For contribution components (@okta/odyssey-contributions-*):**
 * - `Button.displayName = "Button"` → `Button.displayName = "Button::pkg=iga-components&odysseyV=1.47.1"`
 * - `odysseyV` is the `@okta/odyssey-react-mui` dependency version from the contribution's package.json
 *
 * This lets the `@okta/odyssey-contributions-ui-component-identifier` scanner
 * identify both the component source package and version directly from the
 * React fiber tree — no extra DOM attributes or runtime lookups needed.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { odysseyDisplayNameVersionPlugin } from "@okta/odyssey-build-tooling/vite-plugin";
 *
 * export default {
 *   plugins: [odysseyDisplayNameVersionPlugin()],
 * };
 * ```
 *
 * @remarks
 * This plugin auto-detects the package being built by walking up the directory
 * tree from each transformed file. It supports both core and contribution packages.
 */
export const odysseyDisplayNameVersionPlugin = (): OdysseyVitePlugin => {
  // Cache package info per package to avoid repeated lookups
  const packageInfoCache = new Map<string, PackageInfo | null>();

  return {
    name: "odyssey-displayname-version",
    transform(code, id) {
      // Only process Odyssey package files (core or contributions)
      // Match: odyssey-react-mui OR /contributions/ (for contribution packages)
      if (
        !id.includes("odyssey-react-mui") &&
        !id.includes("/contributions/")
      ) {
        return null;
      }

      // Only process JS/TS source files
      if (!/\.[jt]sx?$/.test(id)) return null;

      // Short-circuit if there are no displayName assignments
      if (!code.includes(".displayName")) return null;

      // Resolve package info from the file's directory
      // Use the directory as cache key to avoid repeated lookups for the same package
      const fileDir = dirname(id);
      let packageInfo = packageInfoCache.get(fileDir);

      if (packageInfo === undefined) {
        packageInfo = findOdysseyPackageInfo(fileDir);
        packageInfoCache.set(fileDir, packageInfo);
      }

      if (!packageInfo) return null;

      // Determine the metadata to stamp as key-value pairs.
      // Format: component::pkg=<package>&odysseyV=<version>
      // Core: odysseyV is the package's own version
      // Contributions: odysseyV is the @okta/odyssey-react-mui dependency version
      const odysseyVersion =
        packageInfo.name === "@okta/odyssey-react-mui"
          ? packageInfo.version
          : packageInfo.odysseyDependencyVersion;

      const params = new URLSearchParams({ pkg: packageInfo.shortName });
      if (odysseyVersion) {
        params.set("odysseyV", odysseyVersion);
      }
      const suffix = params.toString();

      // Stamp .displayName = "X" → .displayName = "X::<params>"
      // The character class `[^"':]` excludes colons to prevent double-stamping.
      const stamped = code.replace(
        /\.displayName\s*=\s*["']([^"':]+)["']/g,
        `.displayName = "$1::${suffix}"`,
      );

      return stamped !== code ? { code: stamped, map: null } : null;
    },
  };
};
