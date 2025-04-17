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
        // '**/*.cjs',
        // '**/*.config.ts',
        "**/icons.generated/**",
        "**/index.ts",
        "**/properties/**",
        // '**/scripts/**',
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
    workspace: [
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
          browser: {
            enabled: true,
            headless: true,
            instances: [
              {
                browser: "chromium",
                screenshotDirectory: "__vitest-screenshots",
              },
            ],
            provider: "playwright",
            viewport: {
              height: 768,
              width: 1024,
            },
          },
          globals: true,
          include: ["**/*.browser.test.{ts,tsx}"],
          name: "integration",
          setupFiles: ["./vitest-browser-setup.ts"],
        },
      },
    ],
  },
});
