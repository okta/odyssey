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

import { playwright } from "@vitest/browser-playwright";
import {
  configDefaults,
  type TestProjectInlineConfiguration,
} from "vitest/config";

import { parkPointer } from "./browserCommands.js";

type ProjectTestConfig = NonNullable<TestProjectInlineConfiguration["test"]>;

type BrowserConfig = NonNullable<ProjectTestConfig["browser"]>;

export const VITEST_PROJECT_TYPES = {
  browser: "browser",
  node: "node",
} as const;

type NodeProjectOptions = Omit<ProjectTestConfig, "browser">;

export type NodeProjectArgs = NodeProjectOptions & {
  type: typeof VITEST_PROJECT_TYPES.node;
};

type BrowserProjectOptions = Omit<ProjectTestConfig, "browser"> & {
  /**
   * Commands to register next to `parkPointer`, which the shared browser setup calls before each test.
   */
  commands?: BrowserConfig["commands"];
  /**
   * Dependencies to prebundle at startup, added to `SHARED_OPTIMIZE_DEPS_INCLUDE`.
   */
  optimizeDepsInclude?: string[];
  provider?: BrowserConfig["provider"];
  resolve?: TestProjectInlineConfiguration["resolve"];
  /**
   * Browser setup files for this package. They run after the shared setup from `@okta/odyssey-test-tooling/browser`, so put only package-specific setup in them. Stack packages already pass their `vitest-browser-setup.project.ts`.
   */
  setupFiles?: ProjectTestConfig["setupFiles"];
};

export type BrowserProjectArgs = BrowserProjectOptions & {
  type: typeof VITEST_PROJECT_TYPES.browser;
};

export type CreateVitestProjectArgs = NodeProjectArgs | BrowserProjectArgs;

// Prebundled at startup because the first test that renders imports them, and a dependency found mid-run makes Vite reload the page. The startup scan misses the Emotion JSX runtime because only the compiled test files import it, and every Odyssey package compiles JSX with `jsxImportSource: "@emotion/react"`.
const SHARED_OPTIMIZE_DEPS_INCLUDE = [
  "@emotion/react/jsx-dev-runtime",
  "react/jsx-runtime",
  "react-dom/client",
  "vitest-browser-react",
];

// Registers `toBeAccessible` and the pointer, viewport, and storage hooks before any of the package's own setup files run.
const SHARED_BROWSER_SETUP_FILE = "@okta/odyssey-test-tooling/browser";

const createNodeProject = (
  overrides: NodeProjectOptions,
): TestProjectInlineConfiguration => ({
  test: {
    environment: "node",
    // A package's `dist` holds the compiled `*.node.test.js` files, which would run a second time next to their sources.
    exclude: configDefaults.exclude.concat("**/dist/**"),
    globals: true,
    include: ["**/*.node.test.{ts,tsx}"],
    name: "unit",
    ...overrides,
  },
});

const createBrowserProject = ({
  commands = {},
  optimizeDepsInclude = [],
  provider = playwright(),
  resolve,
  setupFiles = [],
  ...overrides
}: BrowserProjectOptions): TestProjectInlineConfiguration => ({
  optimizeDeps: {
    include: SHARED_OPTIMIZE_DEPS_INCLUDE.concat(optimizeDepsInclude),
    // See docs/decisions/2026-10-23-disable-rolldown-inline-const-in-browser-tests.md.
    rolldownOptions: {
      optimization: { inlineConst: false },
    },
  },
  resolve,
  test: {
    browser: {
      commands: { ...commands, parkPointer },
      enabled: true,
      headless: true,
      instances: [
        {
          browser: "chromium",
          screenshotDirectory: "__vitest-screenshots",
          viewport: {
            height: 768,
            width: 1024,
          },
        },
      ],
      provider,
    },
    attachmentsDir: "__vitest-screenshots",
    clearMocks: true,
    globals: true,
    include: ["**/*.browser.test.{ts,tsx}"],
    name: "browser",
    ...overrides,
    setupFiles: [SHARED_BROWSER_SETUP_FILE].concat(setupFiles),
  },
});

// `type` picks the builder and is not a Vitest option, so it must not reach the spread into `test`.
const getProjectOptions = <ProjectArgs extends CreateVitestProjectArgs>(
  projectArgs: ProjectArgs,
): Omit<ProjectArgs, "type"> =>
  Object.fromEntries(
    Object.entries(projectArgs).filter(([optionName]) => optionName !== "type"),
  ) as Omit<ProjectArgs, "type">;

/**
 * Returns a Vitest project for `test.projects`. A `node` project runs `*.node.test.{ts,tsx}` in Node. A `browser` project runs `*.browser.test.{ts,tsx}` in headless Chromium through Playwright. It loads the `/browser` setup before the package's own `setupFiles` and registers `parkPointer`, which that setup calls.
 */
export const createVitestProject = (
  projectArgs: CreateVitestProjectArgs,
): TestProjectInlineConfiguration =>
  projectArgs.type === VITEST_PROJECT_TYPES.browser
    ? createBrowserProject(getProjectOptions(projectArgs))
    : createNodeProject(getProjectOptions(projectArgs));
