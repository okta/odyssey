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

import { configDefaults } from "vitest/config";

import { createVitestProject } from "./createVitestProject.js";

describe(createVitestProject.name, () => {
  test("node project with an override", () => {
    expect(createVitestProject({ type: "node", name: "custom" })).toStrictEqual(
      {
        test: {
          environment: "node",
          exclude: configDefaults.exclude.concat("**/dist/**"),
          globals: true,
          include: ["**/*.node.test.{ts,tsx}"],
          name: "custom",
        },
      },
    );
  });

  test("browser project with extra setup and prebundled dependencies", () => {
    const project = createVitestProject({
      type: "browser",
      optimizeDepsInclude: ["extra-dependency"],
      setupFiles: ["./package-setup.ts"],
    });

    expect(project.optimizeDeps?.include).toStrictEqual([
      "@emotion/react/jsx-dev-runtime",
      "react/jsx-runtime",
      "react-dom/client",
      "vitest-browser-react",
      "extra-dependency",
    ]);
    expect(project.test?.setupFiles).toStrictEqual([
      "@okta/odyssey-test-tooling/browser",
      "./package-setup.ts",
    ]);
  });

  test("browser project with a custom command and name", () => {
    const project = createVitestProject({
      type: "browser",
      commands: { custom: () => Promise.resolve() },
      name: "custom",
    });

    expect(project.test?.name).toBe("custom");
    expect(project.test?.include).toStrictEqual(["**/*.browser.test.{ts,tsx}"]);
    expect(project.test?.setupFiles).toStrictEqual([
      "@okta/odyssey-test-tooling/browser",
    ]);
    expect(Object.keys(project.test?.browser?.commands ?? {})).toStrictEqual([
      "custom",
      "parkPointer",
    ]);
    expect(Object.keys(project.test ?? {}).toSorted()).toStrictEqual([
      "attachmentsDir",
      "browser",
      "clearMocks",
      "globals",
      "include",
      "name",
      "setupFiles",
    ]);
  });
});
