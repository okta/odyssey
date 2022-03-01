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
  PaddingBlock: theme.SpaceEmXs,
  PaddingInline: theme.SpaceEmS,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTimingFunction: theme.TransitionTimingBase,
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  TextColor: theme.ColorTextBodyInverse,
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  FontWeight: theme.FontWeightBold,
  LineHeight: theme.FontLineHeightBase,

  FocusOutlineColor: theme.FocusOutlineColorPrimary,
  FocusOutlineOffset: theme.FocusOutlineOffsetBase,
  FocusOutlineStyle: theme.FocusOutlineStyle,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,

  // Label
  LabelMinWidth: theme.SpaceEmL,
  LabelMarginInlineStart: theme.SpaceRemXs,

  // Primary Variant
  PrimaryBackgroundColor: theme.ColorPrimaryBase,
  PrimaryBorderColor: "transparent",
  PrimaryDisabledBackgroundColor: theme.ColorPrimaryLight,
  PrimaryDisabledBorderColor: "transparent",
  PrimaryFocusBackgroundColor: theme.ColorPrimaryDark,
  PrimaryHoverBackgroundColor: theme.ColorPrimaryDark,
  PrimaryHoverBorderColor: theme.ColorBorderPrimaryDark,

  // Secondary Variant
  SecondaryBackgroundColor: theme.ColorBackgroundBase,
  SecondaryBorderColor: theme.ColorPrimaryBase,
  SecondaryDisabledBackgroundColor: theme.ColorBackgroundBase,
  SecondaryDisabledBorderColor: theme.ColorPrimaryLight,
  SecondaryDisabledTextColor: theme.ColorPaletteBlue300,
  SecondaryFocusBackgroundColor: theme.ColorBackgroundBase,
  SecondaryFocusBorderColor: theme.ColorPrimaryBase,
  SecondaryFocusTextColor: theme.ColorTextPrimary,
  SecondaryHoverBackgroundColor: theme.ColorPrimaryBase,
  SecondaryHoverBorderColor: theme.ColorPrimaryBase,
  SecondaryHoverTextColor: theme.ColorTextBodyInverse,
  SecondaryTextColor: theme.ColorTextPrimary,

  // Danger Variant
  DangerBackgroundColor: theme.ColorBackgroundDangerDark,
  DangerDisabledBackgroundColor: theme.ColorDangerLight,
  DangerDisabledBorderColor: theme.ColorBorderDangerLight,
  DangerFocusBackgroundColor: theme.ColorPaletteRed900,
  DangerFocusOutlineColor: theme.FocusOutlineColorDanger,
  DangerHoverBackgroundColor: theme.ColorPaletteRed900,
  DangerHoverBorderColor: theme.ColorBorderDangerDark,

  // Dismiss Variant
  DismissBackgroundColor: "transparent",
  DismissHoverBorderColor: "transparent",
  DismissTextColor: "inherit",
  DismissDisabledTextColor: theme.ColorNeutralBase,
  DismissLineHeight: 1,
  DismissPaddingBlock: theme.SpaceEmXs,
  DismissPaddingInline: theme.SpaceEmXs,
  DismissHoverBackgroundColor: "rgba(255, 255, 255, 0.6)",
  DismissFocusBackgroundColor: "rgba(255, 255, 255, 0.6)",
  DismissDisabledBackgroundColor: "rgba(235, 235, 237, 0.6)",

  // Dismiss Inverted Variant
  DismissInvertedBoxShadowColor: theme.ColorPaletteNeutralWhite,

  // Clear Variant
  ClearBackgroundColor: "transparent",
  ClearDisabledBackgroundColor: "transparent",
  ClearDisabledTextColor: theme.ColorPrimaryLight,
  ClearFocusBackgroundColor: theme.ColorBackgroundBase,
  ClearFocusTextColor: theme.ColorTextPrimary,
  ClearHoverBackgroundColor: theme.ColorBackgroundPrimaryLight,
  ClearHoverBorderColor: "transparent",
  ClearHoverTextColor: theme.ColorPaletteBlue900,
  ClearTextColor: theme.ColorPrimaryBase,

  // Wide Layout
  WideLayoutMarginBlock: 0,
  WideLayoutMarginBlockEnd: theme.SpaceRemS,
  WideLayoutMarginInline: 0,

  // Small Size
  SmallSizeFontSize: theme.FontSizeCaption,
  SmallSizeLineHeight: theme.FontLineHeightHeading,

  // Large Size
  LargeSizePaddingBlock: theme.SpaceEmS,
  LargeSizePaddingInline: theme.SpaceEmM,
});
