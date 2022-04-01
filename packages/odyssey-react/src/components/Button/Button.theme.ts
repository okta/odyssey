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
  // eslint-disable-next-line @okta/odyssey/no-invalid-theme-properties
  MarginBlock: 0,
  MarginInline: 0,
  PaddingBlock: theme.SpaceScale2,
  PaddingInline: theme.SpaceScale2,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTimingFunction: theme.TransitionTimingBase,
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  TextColor: theme.ColorTextBodyInverse,
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  FontWeight: theme.FontWeightBold,
  LineHeight: theme.FontLineHeightUi,

  FocusOutlineColor: theme.FocusOutlineColorPrimary,
  FocusOutlineOffset: theme.FocusOutlineOffsetBase,
  FocusOutlineStyle: theme.FocusOutlineStyle,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,

  // Label
  LabelMinWidth: theme.SpaceScale6,
  LabelMarginInlineStart: theme.SpaceScale1,

  // Primary Variant
  PrimaryBackgroundColor: theme.ColorPrimaryBase,
  PrimaryBorderColor: "transparent",
  PrimaryActiveBackgroundColor: theme.ColorPrimaryBase,
  PrimaryActiveBorderColor: "transparent",
  PrimaryDisabledBackgroundColor: theme.ColorPrimaryLight,
  PrimaryDisabledBorderColor: "transparent",
  PrimaryFocusBackgroundColor: theme.ColorPrimaryDark,
  PrimaryHoverBackgroundColor: theme.ColorPrimaryDark,
  PrimaryHoverBorderColor: "transparent",

  // Secondary Variant
  SecondaryBackgroundColor: theme.ColorPaletteNeutral000,
  SecondaryBorderColor: theme.ColorBorderDisplay,
  SecondaryActiveBorderColor: theme.ColorPrimaryBase,
  SecondaryDisabledBackgroundColor: theme.ColorPaletteNeutral100,
  SecondaryDisabledBorderColor: theme.ColorPaletteNeutral100,
  SecondaryDisabledTextColor: theme.ColorPaletteNeutral500,
  SecondaryFocusBackgroundColor: theme.ColorBackgroundPrimaryLight,
  SecondaryFocusBorderColor: theme.ColorPrimaryBase,
  SecondaryFocusTextColor: theme.ColorTextPrimary,
  SecondaryHoverBackgroundColor: theme.ColorBackgroundPrimaryLight,
  SecondaryHoverBorderColor: theme.ColorPaletteBlue300,
  SecondaryHoverTextColor: theme.ColorTextPrimary,
  SecondaryTextColor: theme.ColorTextBody,

  // Danger Variant
  DangerBackgroundColor: theme.ColorBackgroundDangerDark,
  DangerActiveBorderColor: "transparent",
  DangerActiveBackgroundColor: theme.ColorBackgroundDangerDark,
  DangerDisabledBackgroundColor: theme.ColorDangerLight,
  DangerDisabledBorderColor: theme.ColorBorderDangerLight,
  DangerFocusBackgroundColor: theme.ColorPaletteRed900,
  DangerFocusOutlineColor: theme.FocusOutlineColorDanger,
  DangerHoverBackgroundColor: theme.ColorPaletteRed900,
  DangerHoverBorderColor: "transparent",

  // Floating Variant
  FloatingBackgroundColor: "transparent",
  FloatingTextColor: "inherit",
  FloatingActiveBackgroundColor: "rgba(29, 29, 33, 0.2)",
  FloatingDisabledTextColor: theme.ColorNeutralBase,
  FloatingHoverBackgroundColor: "rgba(29, 29, 33, 0.1)",
  FloatingDisabledBackgroundColor: "rgba(235, 235, 237, 0.6)",

  // Affix Variant
  AffixBackgroundColor: "transparent",
  AffixDisabledBackgroundColor: "transparent",
  AffixDisabledTextColor: theme.ColorPaletteNeutral500,
  AffixFocusBackgroundColor: theme.ColorPaletteNeutral200,
  AffixFocusTextColor: theme.ColorTextBody,
  AffixHoverBackgroundColor: theme.ColorPaletteNeutral200,
  AffixHoverBorderColor: "transparent",
  AffixHoverTextColor: theme.ColorTextBody,
  AffixPadding: theme.SpaceScale0,
  AffixTextColor: theme.ColorTextBody,

  // Wide Layout
  WideLayoutMarginBlock: 0,
  WideLayoutMarginBlockEnd: theme.SpaceScale3,
  WideLayoutMarginInline: 0,

  // Small Size
  SmallSizeFontSize: theme.FontSizeBody,
  SmallSizePaddingBlock: theme.SpaceScale1,
  SmallSizePaddingInline: theme.SpaceScale2,

  // Large Size
  LargeSizePaddingBlock: theme.SpaceScale3,
  LargeSizePaddingInline: theme.SpaceScale3,
});
