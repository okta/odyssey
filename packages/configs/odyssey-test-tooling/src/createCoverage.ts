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

import type { CoverageOptions } from "vitest/node";

// Stories, generated output (including the `properties/` translation bundles), declaration files, and re-export or type-only files hold no logic a unit test can exercise, so counting them only lowers the figure.
const SHARED_COVERAGE_EXCLUDE = [
  "**/*.d.ts",
  "**/*.generated/**",
  "**/*.generated.{ts,tsx}",
  "**/*.stories.{ts,tsx}",
  "**/@types/**",
  "**/index.ts",
  "**/properties/**",
  "**/types.ts",
];

// Each package keeps its sources under `src`, so a package lists only the extra extensions it ships.
const SHARED_COVERAGE_INCLUDE = ["src/**/*.{ts,tsx}"];

export type CreateCoverageArgs = {
  /**
   * Files with no logic a unit test can catch a bug in, added to the shared excludes. Give each a reason in a comment where it is passed.
   */
  exclude?: string[];
  /**
   * Source files added to the shared include, every `.ts` and `.tsx` file under `src`, for a package whose sources use other extensions.
   */
  include?: string[];
};

/**
 * Returns the coverage options every package uses, with the 80% floor. A package's own includes and excludes are added to the shared ones, never swapped in for them.
 */
export const createCoverage = ({
  exclude = [],
  include = [],
}: CreateCoverageArgs = {}): CoverageOptions => ({
  exclude: SHARED_COVERAGE_EXCLUDE.concat(exclude),
  include: SHARED_COVERAGE_INCLUDE.concat(include),
  reporter: ["text", "json-summary"],
  thresholds: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
});
