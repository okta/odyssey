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
  /* eslint-disable @okta/odyssey/no-invalid-theme-properties */
  // Width/Height
  MaxLineLength: theme.FontLineLengthMax,

  // Space
  Space1: theme.Space1,
  Space2: theme.Space2,
  Space4: theme.Space4,
  Space7: theme.Space7,
  Space9: theme.Space9,

  // Shadow
  BaseBoxShadow: theme.ShadowBase,
  HoverBoxShadow: theme.ShadowHover,

  // Focus Outline
  PrimaryFocusOutlineColor: theme.FocusOutlineColorPrimary,
  DangerFocusOutlineColor: theme.FocusOutlineColorDanger,
  FocusOutlineOffset: theme.FocusOutlineOffsetBase,
  FocusOutlineStyle: theme.FocusOutlineStyle,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,
  /* eslint-enable @okta/odyssey/no-invalid-theme-properties */

  // Root
  FontFamily: theme.FontFamilyBase,

  // Text
  BaseFontFamily: theme.FontFamilyBase,
  NormalFontWeight: theme.FontWeightNormal,
  NormalFontStyle: theme.FontStyleNormal,
  FontSize: theme.FontSizeBody,
  BodyLineHeight: theme.FontLineHeightBody,
  BodyTextColor: theme.ColorTextBody,

  // Border
  BaseBorderWidth: theme.BorderWidthBase,
  BaseBorderStyle: theme.BorderStyleBase,
  BaseBorderRadius: theme.BorderRadiusBase,
  OuterBorderRadius: theme.BorderRadiusOuter,
  BaseBorderColor: "transparent",
  UiBorderColor: theme.ColorBorderUi,
  DisplayBorderColor: theme.ColorBorderDisplay,
  PrimaryBorderColor: theme.ColorBorderPrimaryBase,
  DangerBorderColor: theme.ColorBorderDangerBase,

  // Background
  BaseBackgroundColor: theme.ColorBackgroundBase,
  DisabledBackgroundColor: theme.ColorBackgroundDisabled,
  PrimaryLightBackgroundColor: theme.ColorBackgroundPrimaryLight,
  PrimaryBaseBackgroundColor: theme.ColorBackgroundPrimaryBase,
  PrimaryDarkBackgroundColor: theme.ColorBackgroundPrimaryDark,
  DangerLightBackgroundColor: theme.ColorBackgroundDangerLight,
  DangerBaseBackgroundColor: theme.ColorBackgroundDangerBase,
  DangerDarkBackgroundColor: theme.ColorBackgroundDangerDark,
  CautionLightBackgroundColor: theme.ColorBackgroundCautionLight,
  CautionBaseBackgroundColor: theme.ColorBackgroundCautionBase,
  CautionDarkBackgroundColor: theme.ColorBackgroundCautionDark,
  SuccessLightBackgroundColor: theme.ColorBackgroundSuccessLight,
  SuccessBaseBackgroundColor: theme.ColorBackgroundSuccessBase,
  SuccessDarkBackgroundColor: theme.ColorBackgroundSuccessDark,
});
