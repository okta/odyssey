import { create } from "@storybook/theming";

export default create({
  base: "light",

  colorPrimary: "#1662dd",
  colorSecondary: "#00297a",

  // UI
  appBg: "#f5f5f6",
  appContentBg: "#ffffff",
  appBorderColor: "#d7d7dc",
  appBorderRadius: 4,

  // Typography
  fontBase:
    '"Public Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Noto Sans Arabic", sans-serif',
  fontCode:
    '"Inconsolata", "SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", monospace',

  // Text colors
  textColor: "#1d1d21",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#6e6e78",
  barSelectedColor: "#1d1d21",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#8c8c96",
  inputTextColor: "#1d1d21",
  inputBorderRadius: 4,

  brandTitle: "Odyssey Design System",
  //brandUrl: 'https://odyssey.okta.com',
  //brandImage: 'https://place-hold.it/350x150',
});
