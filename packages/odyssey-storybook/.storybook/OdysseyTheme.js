import { create } from "@storybook/theming";
import {
  HueNeutral50,
  HueNeutral200,
  HueNeutral500,
  HueNeutral600,
  HueNeutralWhite,
  PalettePrimaryMain,
  PalettePrimaryDark,
  TypographyColorBody,
  TypographyColorBodyInverse,
  TypographyFamilyBody,
  TypographyFamilyMono,
} from "@okta/odyssey-design-tokens";

export default create({
  base: "light",

  PalettePrimary: PalettePrimaryMain,
  colorSecondary: PalettePrimaryDark,

  // UI
  appBg: HueNeutral50,
  appContentBg: HueNeutralWhite,
  appBorderColor: HueNeutral200,
  appBorderRadius: 4,

  // Typography
  fontBase: TypographyFamilyBody,
  fontCode: TypographyFamilyMono,

  // Text colors
  textColor: TypographyColorBody,
  textInverseColor: TypographyColorBodyInverse,

  // Toolbar default and active colors
  barTextColor: HueNeutral600,
  barSelectedColor: TypographyColorBody,
  barBg: HueNeutralWhite,

  // Form colors
  inputBg: HueNeutralWhite,
  inputBorder: HueNeutral500,
  inputTextColor: TypographyColorBody,
  inputBorderRadius: 4,

  brandTitle: "Odyssey Design System",
  //brandUrl: 'https://odyssey.okta.com',
  //brandImage: 'https://place-hold.it/350x150',
});
