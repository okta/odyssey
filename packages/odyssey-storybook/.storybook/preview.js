import "@okta/odyssey-react/dist/odyssey-deprecated-global.f23925.css";

export const parameters = {
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
      method: "",
      order: [
        "Welcome",
        ["Introduction (README)", "Docs Status"],
        "Contributing",
        "Guidelines",
        "Components",
      ],
      locales: "",
    },
  },
  previewTabs: {
    "storybook/docs/panel": { index: -1 },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "Page Background",
        value: "#ffffff",
      },
      {
        name: "Page Background (dark)",
        value: "#1d1d21",
      },
    ],
  },
};
