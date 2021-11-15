import "@okta/odyssey-react/dist/odyssey-deprecated-global.251d01.css";

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
      order: ["Welcome", "Contributing", "Guidelines", "Components", "Utilities"],
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
