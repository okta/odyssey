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

import type { Preview } from "@storybook/react-vite";

import {
  ABSOLUTE_MINIMUM_HEIGHT,
  ABSOLUTE_MINIMUM_WIDTH,
} from "@okta/odyssey-react-mui";
import basePreview, {
  globalTypes,
} from "@okta/odyssey-storybook-preset/preview";

import {
  STANDARD_APPLITOOLS_HEIGHT,
  STANDARD_APPLITOOLS_WIDTH,
} from "../src/tools/applitoolsBrowserSize.js";

export { globalTypes };

// The host extends the shared preset preview with its own story ordering and
// the single-axis Applitools reflow viewports its remaining stories rely on for
// visual regression. Both move into the preset (or per-package VRT config) as
// the fleet migrates; kept here so the host behaves exactly as before today.
const preview = {
  ...basePreview,

  parameters: {
    ...basePreview.parameters,

    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction (README)",
          "Docs",
          "Odyssey Core",
          "Unified UI Shell",
        ],
        locales: "en",
      },
    },

    viewport: {
      options: {
        ...basePreview.parameters.viewport.options,
        compactHeight: {
          name: `Compact height (${STANDARD_APPLITOOLS_WIDTH}×${ABSOLUTE_MINIMUM_HEIGHT})`,
          styles: {
            height: `${ABSOLUTE_MINIMUM_HEIGHT}px`,
            width: `${STANDARD_APPLITOOLS_WIDTH}px`,
          },
          type: "other",
        },
        compactWidth: {
          name: `Compact width (${ABSOLUTE_MINIMUM_WIDTH}×${STANDARD_APPLITOOLS_HEIGHT})`,
          styles: {
            height: `${STANDARD_APPLITOOLS_HEIGHT}px`,
            width: `${ABSOLUTE_MINIMUM_WIDTH}px`,
          },
          type: "mobile",
        },
      },
    },
  },
} satisfies Preview;

export default preview;
