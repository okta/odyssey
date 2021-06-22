import "./preview.scss";

export const parameters = {
  controls: {
    expanded: true,
    sort: 'requiredFirst'
  },
  grid: {
    cellSize: 10
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      method: '',
      order: [
        "Welcome",
        [
          "Introduction (README)",
          "Code Style & Conventions",
          "Component Status"
        ],
        "Base",
        "Components",
        "Patterns"
      ],
      locales: '',
    },
  },
};
