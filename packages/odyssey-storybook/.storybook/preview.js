import "@okta/odyssey-react/dist/odyssey-deprecated-global.css";

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
      order: ["Welcome", "Guidelines", "Components", "Utilities"],
      locales: "",
    },
  },
  previewTabs: {
    docs: { hidden: true },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#ffffff",
      },
      {
        name: "gradient",
        value: "linear-gradient(135deg,#00297a,#1662dd) no-repeat",
      },
    ],
  },
};
