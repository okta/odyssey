import { create } from "@storybook/theming";
import { ColorPrimaryBase, ColorPrimaryDark, ColorPaletteNeutral000, ColorPaletteNeutralWhite, ColorPaletteNeutral200, FontFamilyBase, FontFamilyMono, ColorTextBody, ColorTextBodyInverse, ColorPaletteNeutral600, ColorPaletteNeutral500 } from "@okta/odyssey-design-tokens";

export default create({
  base: "light",

  colorPrimary: ColorPrimaryBase,
  colorSecondary: ColorPrimaryDark,

  // UI
  appBg: ColorPaletteNeutral000,
  appContentBg: ColorPaletteNeutralWhite,
  appBorderColor: ColorPaletteNeutral200,
  appBorderRadius: 4,

  // Typography
  fontBase: FontFamilyBase,
  fontCode: FontFamilyMono,

  // Text colors
  textColor: ColorTextBody,
  textInverseColor: ColorTextBodyInverse,

  // Toolbar default and active colors
  barTextColor: ColorPaletteNeutral600,
  barSelectedColor: ColorTextBody,
  barBg: ColorPaletteNeutralWhite,

  // Form colors
  inputBg: ColorPaletteNeutralWhite,
  inputBorder: ColorPaletteNeutral500,
  inputTextColor: ColorTextBody,
  inputBorderRadius: 4,

  brandTitle: "Odyssey Design System",
  //brandUrl: 'https://odyssey.okta.com',
  //brandImage: 'https://place-hold.it/350x150',
});
