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
        "Installation",
        ["Odyssey-React-MUI", "Odyssey-React-Labs"],
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
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
};
