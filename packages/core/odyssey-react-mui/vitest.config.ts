/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/@types/**",
        "**/icons.generated/**",
        "**/index.ts",
        "**/properties/**",
        "**/types.ts",
      ],
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        branches: 78,
        functions: 56,
        lines: 57,
        statements: 57,
      },
    },
    projects: [
      {
        test: {
          environment: "node",
          globals: true,
          include: ["**/*.node.test.{ts,tsx}"],
          name: "unit",
          setupFiles: ["./vitest-node-setup.ts"],
        },
      },
      {
        test: {
          // TODO: revert these changes once MUI Upgrade is done, see OKTA-960544
          environment: "jsdom",
          globals: true,
          include: [
            "**/DatePicker.jsdom.test.tsx",
            "**/DateTimePicker.jsdom.test.tsx",
          ],
          name: "jsdom-hack",
          setupFiles: ["./vitest-jsdom-setup.ts"],
        },
      },
      {
        optimizeDeps: {
          include: ["@emotion/react/jsx-dev-runtime"],
        },
        test: {
          browser: {
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
            provider: "playwright",
          },
          globals: true,
          include: ["**/*.browser.test.{ts,tsx}"],
          name: "browser",
          setupFiles: ["./vitest-browser-setup.ts"],
        },
      },
    ],
  },
});
