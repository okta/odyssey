/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  HueNeutral200,
  HueNeutral50,
  HueNeutral500,
  HueNeutral600,
  HueNeutralWhite,
  PalettePrimaryDark,
  PalettePrimaryMain,
  TypographyColorBody,
  TypographyColorInverse,
  TypographyFamilyBody,
  TypographyFamilyMono,
} from "@okta/odyssey-design-tokens";
import { create } from "storybook/theming";

import packageJson from "../package.json" with { type: "json" };

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
