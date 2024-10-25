import type { Preview } from "@storybook/react";

export const globalTypes = {
  rtlDirection: "ltr",
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "cs", title: "Czech" },
        { value: "da", title: "Danish" },
        { value: "de", title: "Deutsch" },
        { value: "el", title: "Greek" },
        { value: "en", title: "English" },
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
        { value: "nl_NL", title: "Dutch" },
        { value: "ok_PL", title: "(Test Language) Pseudo-loc" },
        { value: "ok_SK", title: "(Test Language) Show Keys" },
        { value: "pl", title: "Polish" },
        { value: "pt_BR", title: "Portuguese (Brazil)" },
        { value: "ro", title: "Romanian" },
        { value: "ru", title: "Russian" },
        { value: "sv", title: "Swedish" },
        { value: "th", title: "Thai" },
        { value: "tr", title: "Turkish" },
        { value: "uk", title: "Ukrainian" },
        { value: "vi", title: "Vietnamese" },
        { value: "zh_CN", title: "Chinese (PRC)" },
        { value: "zh_TW", title: "Chinese" },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
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
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
    grid: {
      cellSize: 10,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Welcome",
          ["Introduction (README)", "Docs Status"],
          "Installation",
          "Odyssey-React-MUI",
          "Guidelines",
          "Contributing",
          "MUI Components",
          "Labs Components",
          "Customization",
        ],
        locales: "",
      },
    },
    viewMode: "docs",
    previewTabs: {
      "storybook/docs/panel": { index: -1 },
    },
    backgrounds: {
      values: [
        {
          name: "White",
          value: "#ffffff",
        },
        {
          name: "Gray",
          value: "#f4f4f4",
        },
        {
          name: "Dark (unused)",
          value: "#1d1d21",
        },
      ],
    },
    docs: {
      argTypes: {
        sort: "alpha",
      },
      controls: {
        sort: "alpha",
      },
      source: {
        excludeDecorators: true,
      },
    },
  },
};

export default preview;
