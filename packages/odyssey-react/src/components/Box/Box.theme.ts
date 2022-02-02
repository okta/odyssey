/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { ThemeReducer } from "@okta/odyssey-react-theme";

export const theme: ThemeReducer = (theme) => ({
  // REMOVE THIS
  /* eslint-disable @okta/odyssey/no-invalid-theme-properties */

  // Font
  FontFamilyBase: theme.FontFamilyBase,
  FontWeightNormal: theme.FontWeightNormal,
  FontStyleNormal: theme.FontStyleNormal,
  FontSize: theme.FontSizeBody,
  FontLineHeightBase: theme.FontLineHeightBase,
  ColorTextBody: theme.ColorTextBody,

  // Space
  SpaceRemXs: theme.SpaceRemXs,
  SpaceRemS: theme.SpaceRemS,
  SpaceRemM: theme.SpaceRemM,
  SpaceRemL: theme.SpaceRemL,
  SpaceRemXl: theme.SpaceRemXl,

  // Border
  BorderWidthBase: theme.BorderWidthBase,
  BorderStyleBase: theme.BorderStyleBase,
  BorderRadiusBase: theme.BorderRadiusBase,
  BorderRadiusOuter: theme.BorderRadiusOuter,
  ColorBorderBase: "transparent",
  ColorBorderUi: theme.ColorBorderUi,
  ColorBorderDisplay: theme.ColorBorderDisplay,
  ColorBorderPrimary: theme.ColorBorderPrimaryBase,
  ColorBorderDanger: theme.ColorBorderDangerBase,

  // Focus Outline
  ColorFocusPrimary: theme.ColorFocusPrimary,
  ColorFocusDanger: theme.ColorFocusDanger,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,

  // Background
  ColorBackgroundBase: theme.ColorBackgroundBase,
  ColorBackgroundDisabled: theme.ColorBackgroundDisabled,
  ColorBackgroundPrimaryLight: theme.ColorBackgroundPrimaryLight,
  ColorBackgroundPrimaryBase: theme.ColorBackgroundPrimaryBase,
  ColorBackgroundPrimaryDark: theme.ColorBackgroundPrimaryDark,
  ColorBackgroundDangerLight: theme.ColorBackgroundDangerLight,
  ColorBackgroundDangerBase: theme.ColorBackgroundDangerBase,
  ColorBackgroundDangerDark: theme.ColorBackgroundDangerDark,
  ColorBackgroundCautionLight: theme.ColorBackgroundCautionLight,
  ColorBackgroundCautionBase: theme.ColorBackgroundCautionBase,
  ColorBackgroundCautionDark: theme.ColorBackgroundCautionDark,
  ColorBackgroundSuccessLight: theme.ColorBackgroundSuccessLight,
  ColorBackgroundSuccessBase: theme.ColorBackgroundSuccessBase,
  ColorBackgroundSuccessDark: theme.ColorBackgroundSuccessDark,

  // Shadow
  ShadowBase: theme.ShadowBase,
  ShadowHover: theme.ShadowHover,
});
