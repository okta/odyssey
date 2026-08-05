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

import { setupOdysseyDebugListener } from "@okta/odyssey-contributions-ui-component-identifier";
import {
  ABSOLUTE_MINIMUM_HEIGHT,
  ABSOLUTE_MINIMUM_WIDTH,
} from "@okta/odyssey-react-mui";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

import {
  STANDARD_APPLITOOLS_HEIGHT,
  STANDARD_APPLITOOLS_WIDTH,
} from "../src/tools/applitoolsBrowserSize.js";
import { ResetArgsDecorator } from "../src/tools/ResetArgsDecorator.js";

setupOdysseyDebugListener();

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "ok_PL", title: "Pseudo-loc (DEBUG)" },
        { value: "ok_SK", title: "Show Keys (DEBUG)" },
        { value: "en", title: "English" },
        { value: "zh_CN", title: "Chinese (PRC)" },
        { value: "zh_TW", title: "Chinese" },
        { value: "cs", title: "Czech" },
        { value: "da", title: "Danish" },
        { value: "de", title: "Deutsch" },
        { value: "nl_NL", title: "Dutch" },
        { value: "el", title: "Greek" },
        { value: "es", title: "Spanish" },
        { value: "fi", title: "Finnish" },
        { value: "fr", title: "French" },
        { value: "ht", title: "Haitian Creole" },
        { value: "hu", title: "Hungarian" },
        { value: "id", title: "Indonesian" },
        { value: "it", title: "Italian" },
        { value: "ja", title: "Japanese" },
        { value: "ko", title: "Korean" },
        { value: "ms", title: "Malaysian" },
        { value: "nb", title: "Norwegian" },
        { value: "pl", title: "Polish" },
        { value: "pt_BR", title: "Portuguese (Brazil)" },
        { value: "ro", title: "Romanian" },
        { value: "ru", title: "Russian" },
        { value: "sv", title: "Swedish" },
        { value: "th", title: "Thai" },
        { value: "tr", title: "Turkish" },
        { value: "uk", title: "Ukrainian" },
        { value: "vi", title: "Vietnamese" },
      ],
      showName: true,
    },
  },
};

const preview = {
  // Popover widths are measured from the anchor field the moment they open.
  // Waiting for fonts before each story prevents the ~1px right-edge shift
  // caused by a web font swapping in mid-open.
  //
  // Do NOT simplify to `await document.fonts.ready` alone. Our body font loads
  // with `display: swap` and each face is fetched lazily on first use, so
  // fonts.ready resolves immediately when nothing has been requested yet.
  // Explicitly loading every registered face first forces the fetches, and
  // the subsequent ready await blocks until they settle — race-independent.
  async beforeEach() {
    await Promise.all(
      Array.from(document.fonts, (font: FontFace) => font.load()),
    );
    await document.fonts.ready;
  },

  decorators: [ResetArgsDecorator],

  parameters: {
    a11y: {
      options: {
        runOnly: [
          "section508",
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
        ],
      },
    },
    backgrounds: {
      options: {
        white: {
          name: "White",
          value: "#ffffff",
        },

        gray: {
          name: "Gray",
          value: "#f4f4f4",
        },
      },
    },
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
    docs: {
      argTypes: {
        sort: "alpha",
      },
      codePanel: true,
      controls: {
        sort: "alpha",
      },
      source: {
        excludeDecorators: true,
        // Strip the ::key=value metadata stamp from displayNames in code snippets.
        // The vite plugin stamps "Button::pkg=odyssey&odysseyV=1.56.0" for the
        // scanner, but Storybook should show just "Button".
        // Handles both JSX tags (<Button::...>) and string literals ("Button::...").
        transform: (source: string) =>
          source.replace(/(\w+)::[^"'>\s]+/g, "$1"),
      },
    },
    grid: {
      cellSize: 10,
    },
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
    react: {
      strictMode: true,
    },
    previewTabs: {
      "storybook/docs/panel": { index: -1 },
    },
    viewMode: "docs",
    // Storybook defaults the viewport toolbar to MINIMAL_VIEWPORTS (small
    // mobile, large mobile, tablet, desktop). Spread those and add viewports
    // for the regimes useCompactViewportMatches reports, so each is selectable
    // for every story: the WCAG 1.4.10 reflow floor (both axes compact) plus
    // one viewport per axis that isolates it. The compact axis of each derives
    // from the exported ABSOLUTE_MINIMUM_* constants so it cannot drift; the
    // non-compact axis uses the standard Applitools capture size, which is well
    // clear of the compact thresholds so only one axis matches.
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        absoluteMinimum: {
          name: `Absolute minimum (${ABSOLUTE_MINIMUM_WIDTH}×${ABSOLUTE_MINIMUM_HEIGHT})`,
          styles: {
            height: `${ABSOLUTE_MINIMUM_HEIGHT}px`,
            width: `${ABSOLUTE_MINIMUM_WIDTH}px`,
          },
          type: "mobile",
        },
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

  tags: ["autodocs"],
} satisfies Preview;

export default preview;
