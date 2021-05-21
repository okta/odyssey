import "./preview.scss";

export const parameters = {
  controls: { expanded: true },
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
  previewTabs: {
    docs: { hidden: true },
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff',
      },
      {
        name: 'gradient',
        value: 'linear-gradient(135deg,#00297a,#1662dd) no-repeat',
      },
    ],
  },
};
