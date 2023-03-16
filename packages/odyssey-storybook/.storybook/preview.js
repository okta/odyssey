export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "Page Background",
    grid: {
      cellSize: 10,
    },
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
  controls: {
    expanded: true,
    sort: "requiredFirst",
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
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
};
