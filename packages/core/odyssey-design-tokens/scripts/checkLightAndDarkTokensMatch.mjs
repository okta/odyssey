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

// Both exports must have exactly the same token names with the same value types, in both directions. The dark build layers `src/dark` over `src/light`, so a dark source file naming a token that light lacks would ship that name in the dark export alone. A light token missing from the dark export, or a token whose type differs between the two, would break any app that swaps one export for the other. This runs on the built exports, after both builds, so it checks what consumers actually import rather than the source layering that produces it.

import { fileURLToPath } from "node:url";

const getTypeName = (value) => typeof value;

/**
 * Returns every way the two token exports disagree: names only one side has, and names whose value type differs between the two sides.
 */
export const getTokenParityMismatches = ({ darkTokens, lightTokens }) => {
  const lightTokenNames = Object.keys(lightTokens);
  const darkTokenNames = Object.keys(darkTokens);

  return {
    missingFromDark: lightTokenNames.filter(
      (tokenName) => !Object.hasOwn(darkTokens, tokenName),
    ),
    missingFromLight: darkTokenNames.filter(
      (tokenName) => !Object.hasOwn(lightTokens, tokenName),
    ),
    typeMismatches: lightTokenNames
      .filter((tokenName) => Object.hasOwn(darkTokens, tokenName))
      .filter(
        (tokenName) =>
          getTypeName(lightTokens[tokenName]) !==
          getTypeName(darkTokens[tokenName]),
      ),
  };
};

const getMismatchReport = ({
  missingFromDark,
  missingFromLight,
  typeMismatches,
}) =>
  [
    missingFromLight.length > 0
      ? [
          "In the dark export but not the light one. Add each to src/light, or remove it from src/dark:",
        ].concat(missingFromLight.map((tokenName) => `  ${tokenName}`))
      : [],
    missingFromDark.length > 0
      ? [
          "In the light export but not the dark one. Check config.dark.cjs still includes src/light:",
        ].concat(missingFromDark.map((tokenName) => `  ${tokenName}`))
      : [],
    typeMismatches.length > 0
      ? [
          "A different value type in each export. Give the dark value the light value's type:",
        ].concat(typeMismatches.map((tokenName) => `  ${tokenName}`))
      : [],
  ]
    .flat()
    .join("\n");

const isRunDirectly = process.argv[1] === fileURLToPath(import.meta.url);

if (isRunDirectly) {
  const [lightTokens, darkTokens] = await Promise.all([
    import(new URL("../dist/index.mjs", import.meta.url).href),
    import(new URL("../dist/dark.mjs", import.meta.url).href),
  ]);

  const mismatchReport = getMismatchReport(
    getTokenParityMismatches({ darkTokens, lightTokens }),
  );

  if (mismatchReport) {
    console.error(mismatchReport);
    process.exit(1);
  }
}
