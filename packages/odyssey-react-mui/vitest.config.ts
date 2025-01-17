/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
    // browser: {
    //   enabled: true,
    //   name: 'chromium',
    //   provider: 'playwright',
    // },
    coverage: {
      reporter:
        process.env.NODE_ENV === "test" ? ["text-summary"] : ["text", "html"],
      thresholds: {
        branches: 76,
        functions: 44,
        lines: 36,
        statements: 36,
      },
    },
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
