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
import { dirname, join } from "node:path";

export interface PackageInfo {
  /** The full package name (e.g., "@okta/odyssey-react-mui") */
  name: string;
  /** For contribution packages, the version of @okta/odyssey-react-mui they depend on */
  odysseyDependencyVersion: string | null;
  /** Short identifier derived from package name (e.g., "odyssey", "iga-components") */
  shortName: string;
  /** The package version */
  version: string | null;
}

/**
 * Extracts a short identifier from a package name.
 * - "@okta/odyssey-react-mui" → "odyssey"
 * - "@okta/odyssey-contributions-iga-components" → "iga-components"
 * - "@okta/odyssey-contributions-wp-components" → "wp-components"
 */
const extractShortName = (packageName: string): string => {
  // Handle odyssey-react-mui specially
  if (packageName === "@okta/odyssey-react-mui") {
    return "odyssey";
  }

  // Handle contribution packages
  const contributionsMatch = packageName.match(
    /^@okta\/odyssey-contributions-(.+)$/,
  );
  if (contributionsMatch) {
    return contributionsMatch[1];
  }

  // Fallback: return the package name without scope
  return packageName.replace(/^@[^/]+\//, "");
};

/**
 * Walks up the directory tree from `startDir` to find the nearest `package.json`
 * that belongs to an Odyssey package (core or contributions).
 *
 * @param startDir - The directory to start searching from
 * @returns Package info object, or null if not found
 */
export const findOdysseyPackageInfo = (
  startDir: string,
): PackageInfo | null => {
  let dir = startDir;

  while (true) {
    const candidate = join(dir, "package.json");

    try {
      const contents = readFileSync(candidate, "utf-8");
      const pkg = JSON.parse(contents) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        name?: string;
        peerDependencies?: Record<string, string>;
        version?: string;
      };

      // Check if this is an Odyssey package
      if (
        pkg.name === "@okta/odyssey-react-mui" ||
        pkg.name?.startsWith("@okta/odyssey-contributions-")
      ) {
        // For contribution packages, extract the odyssey-react-mui dependency version
        let odysseyDependencyVersion: string | null = null;
        if (pkg.name?.startsWith("@okta/odyssey-contributions-")) {
          const depVersion =
            pkg.dependencies?.["@okta/odyssey-react-mui"] ||
            pkg.devDependencies?.["@okta/odyssey-react-mui"] ||
            pkg.peerDependencies?.["@okta/odyssey-react-mui"];
          if (depVersion) {
            // Strip semver range prefixes (^, ~, >=, etc.) to get the base version
            odysseyDependencyVersion = depVersion.replace(/^[^\d]*/, "");
          }
        }

        return {
          name: pkg.name,
          version: pkg.version || null,
          shortName: extractShortName(pkg.name),
          odysseyDependencyVersion,
        };
      }
    } catch {
      // no package.json here — keep walking up
    }

    const parent = dirname(dir);

    // Reached the filesystem root without finding it
    if (parent === dir) return null;

    // Stop if we've walked up into a node_modules directory
    // (prevents finding dependencies instead of the source package)
    if (parent.endsWith("/node_modules") || parent.includes("/node_modules/")) {
      return null;
    }

    dir = parent;
  }
};
