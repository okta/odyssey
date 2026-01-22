import { create } from "storybook/theming";
import {
  HueNeutral50,
  HueNeutral200,
  HueNeutral500,
  HueNeutral600,
  HueNeutralWhite,
  PalettePrimaryMain,
  PalettePrimaryDark,
  TypographyColorBody,
  TypographyColorInverse,
  TypographyFamilyBody,
  TypographyFamilyMono,
} from "@okta/odyssey-design-tokens";
import packageJson from "../package.json";

export default create({
  base: "light",

  colorPrimary: PalettePrimaryMain,
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
  textInverseColor: TypographyColorInverse,

  // Toolbar default and active colors
  barTextColor: HueNeutral600,
  barSelectedColor: TypographyColorBody,
  barBg: HueNeutralWhite,

  // Form colors
  inputBg: HueNeutralWhite,
  inputBorder: HueNeutral500,
  inputTextColor: TypographyColorBody,
  inputBorderRadius: 4,

  brandTitle: `Odyssey Design System v${packageJson.version}`,
  //brandUrl: 'https://odyssey.okta.com',
  //brandImage: 'https://place-hold.it/350x150',
});
