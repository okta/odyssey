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

import {
  createCoverage,
  createVitestProject,
} from "@okta/odyssey-test-tooling";
import { defineConfig } from "vitest/config";

import { emulateColorScheme } from "./emulateColorScheme.js";

// Matches the bare `@okta/odyssey-react-mui` specifier and nothing after it. A plain string alias also matches every subpath as a prefix, so `@okta/odyssey-react-mui/labs` would resolve to `src/index.ts/labs` and fail.
const ODYSSEY_REACT_MUI_ROOT_SPECIFIER = /^@okta\/odyssey-react-mui$/;

export default defineConfig({
  test: {
    coverage: createCoverage({
      // `test-utils/` and `testSupport*` files are fixtures the tests import, not shipped code. The theme files below only map tokens to MUI style overrides, so VRT is what catches a change in them; a unit test could only restate the values.
      exclude: [
        "**/test-utils/**",
        "**/testSupport*.{ts,tsx}",
        "src/labs/DatePickers/dateTimePickerTheme.ts",
        "src/theme/components/**",
        "src/theme/components.tsx",
        "src/theme/mixins.ts",
        "src/theme/shape.ts",
        "src/theme/spacing.ts",
        "src/theme/typography.ts",
      ],
    }),
    projects: [
      createVitestProject({ type: "node" }),
      createVitestProject({
        type: "browser",
        commands: { emulateColorScheme },
        // `@okta/odyssey-test-tooling`'s render helpers import `@okta/odyssey-react-mui`. Pointing that at this package's source, not its `dist`, gives the helper the same OdysseyProvider and theme context the components under test read, and keeps the tests off a stale build.
        resolve: {
          alias: [
            {
              find: ODYSSEY_REACT_MUI_ROOT_SPECIFIER,
              replacement: `${import.meta.dirname}/src/index.ts`,
            },
          ],
        },
        setupFiles: ["./vitest-browser-setup.ts"],
      }),
    ],
  },
});
