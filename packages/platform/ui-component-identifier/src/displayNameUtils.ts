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

/**
 * Parses a stamped displayName into its components.
 *
 * The stamp format is `component::key=value&key=value` where the metadata
 * portion uses URL search param encoding for extensibility.
 *
 * Known keys:
 * - `pkg` — package short name (e.g., "odyssey", "iga-components")
 * - `odysseyV` — Odyssey version (e.g., "1.55.0")
 *
 * @param stampedName - DisplayName with metadata stamp
 * @returns Parsed components or null if not stamped
 *
 * @example
 * ```ts
 * parseStampedDisplayName("Button::pkg=odyssey&odysseyV=1.55.0")
 * // → { componentName: "Button", package: "odyssey", version: "1.55.0" }
 *
 * parseStampedDisplayName("DataView::pkg=iga-components")
 * // → { componentName: "DataView", package: "iga-components", version: null }
 *
 * parseStampedDisplayName("Button")
 * // → null (not stamped)
 * ```
 */
export const parseStampedDisplayName = (stampedName: string) => {
  if (stampedName.includes("::")) {
    const [componentName, paramsString] = stampedName.split("::");
    const params = new URLSearchParams(paramsString);

    const pkg = params.get("pkg");
    if (pkg) {
      return {
        componentName,
        package: pkg,
        version: params.get("odysseyV"),
      };
    }
  }

  return null;
};

/**
 * Converts a package pattern name to a human-readable display name.
 * Strips "-components" suffix, then title-cases words (uppercase if <= 3 chars).
 *
 * Examples:
 *  "oin-components" -> "OIN"
 *  "resource-access-policy-components" -> "Resource Access Policy"
 *  "odyssey" -> "Odyssey"
 */
export const getPackageDisplayName = (pattern: string) =>
  pattern
    .replace(/-components$/, "")
    .split("-")
    .map((word) =>
      word.length <= 3
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
