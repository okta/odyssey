import { create } from "@storybook/theming";
import {
  HueNeutral50,
  HueNeutral200,
  HueNeutral500,
  HueNeutral600,
  HueNeutralWhite,
  PalettePrimaryBase,
  PalettePrimaryDark,
  ColorTextBody,
  ColorTextBodyInverse,
  FontFamilyBase,
  FontFamilyMono,
} from "@okta/odyssey-design-tokens";

export default create({
  base: "light",

  PalettePrimary: PalettePrimaryBase,
  colorSecondary: PalettePrimaryDark,

  // UI
  appBg: HueNeutral50,
  appContentBg: HueNeutralWhite,
  appBorderColor: HueNeutral200,
  appBorderRadius: 4,

  // Typography
  fontBase: FontFamilyBase,
  fontCode: FontFamilyMono,

  // Text colors
  textColor: ColorTextBody,
  textInverseColor: ColorTextBodyInverse,

  // Toolbar default and active colors
  barTextColor: HueNeutral600,
  barSelectedColor: ColorTextBody,
  barBg: HueNeutralWhite,

  // Form colors
  inputBg: HueNeutralWhite,
  inputBorder: HueNeutral500,
  inputTextColor: ColorTextBody,
  inputBorderRadius: 4,

  brandTitle: "Odyssey Design System",
  //brandUrl: 'https://odyssey.okta.com',
  //brandImage: 'https://place-hold.it/350x150',
});
