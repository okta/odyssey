import type { Preview } from "@storybook/react-vite";
import { setupOdysseyDebugListener } from "@okta/odyssey-contributions-ui-component-identifier";

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
  },

  tags: ["autodocs"],
} satisfies Preview;

export default preview;
