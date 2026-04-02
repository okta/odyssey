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

import type { PluginObj } from "@babel/core";

import { dirname } from "node:path";

import { findOdysseyPackageInfo } from "./find-odyssey-version.js";

/**
 * Babel plugin that stamps Odyssey package information into React `displayName`
 * assignments at build time.
 *
 * Format: component::pkg=<package>&odysseyV=<version>
 * - Core: `Button.displayName = "Button"` → `Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0"`
 * - Contributions: `Button.displayName = "Button"` → `Button.displayName = "Button::pkg=iga-components&odysseyV=1.55.0"`
 *
 * This lets the UI component identifier identify both the component source package
 * and version directly from the React fiber tree.
 */
function odysseyDisplayNameVersionPlugin({
  types: t,
}: {
  types: typeof import("@babel/core").types;
}): PluginObj {
  // Resolved lazily on the first assignment expression Babel encounters.
  // We try to find it from the file being transpiled, or fall back to process.cwd()
  // (which works when Babel is invoked from odyssey-react-mui directly).
  let suffix: string | null | undefined;

  return {
    name: "odyssey-displayname-version",
    visitor: {
      AssignmentExpression(path, state) {
        // Lazily resolve package info only once
        if (suffix === undefined) {
          const filename = state.file.opts.filename;
          const startDir = filename ? dirname(filename) : process.cwd();
          const packageInfo = findOdysseyPackageInfo(startDir);

          if (packageInfo) {
            const odysseyVersion =
              packageInfo.name === "@okta/odyssey-react-mui"
                ? packageInfo.version
                : packageInfo.odysseyDependencyVersion;

            const params = new URLSearchParams({
              pkg: packageInfo.shortName,
            });

            if (odysseyVersion) {
              params.set("odysseyV", odysseyVersion);
            }

            suffix = params.toString();
          } else {
            suffix = null;
          }
        }

        if (!suffix) return;

        const { left, right } = path.node;

        // Match: <anything>.displayName = "<string without ::>"
        if (
          t.isMemberExpression(left) &&
          t.isIdentifier(left.property, { name: "displayName" }) &&
          t.isStringLiteral(right) &&
          !right.value.includes("::")
        ) {
          path.node.right = t.stringLiteral(`${right.value}::${suffix}`);
        }
      },
    },
  };
}

export = odysseyDisplayNameVersionPlugin;
