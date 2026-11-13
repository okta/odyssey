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

import { createCoverage } from "./createCoverage.js";

const SHARED_EXCLUDE = [
  "**/*.d.ts",
  "**/*.generated/**",
  "**/*.generated.{ts,tsx}",
  "**/*.stories.{ts,tsx}",
  "**/@types/**",
  "**/index.ts",
  "**/properties/**",
  "**/types.ts",
];

const SHARED_INCLUDE = ["src/**/*.{ts,tsx}"];

const FLOOR = { branches: 80, functions: 80, lines: 80, statements: 80 };

describe(createCoverage.name, () => {
  test("package excludes and includes", () => {
    expect(
      createCoverage({
        exclude: ["src/theme/**"],
        include: ["src/**/*.{cts,mjs}"],
      }),
    ).toStrictEqual({
      exclude: SHARED_EXCLUDE.concat("src/theme/**"),
      include: SHARED_INCLUDE.concat("src/**/*.{cts,mjs}"),
      reporter: ["text", "json-summary"],
      thresholds: FLOOR,
    });
  });
});
