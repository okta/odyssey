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
  ...root(theme),

  // Primary Variant
  ColorBackgroundPrimary: theme.ColorPrimaryBase,
  ColorBackgroundPrimaryDisabled: theme.ColorPrimaryLight,
  ColorBackgroundPrimaryFocus: theme.ColorPrimaryDark,
  ColorBackgroundPrimaryHover: theme.ColorPrimaryDark,
  ColorBorderPrimary: "transparent",
  ColorBorderPrimaryDisabled: "transparent",
  ColorBorderPrimaryHover: theme.ColorBorderPrimaryDark,
  Gutter: theme.SpaceRemS,

  // Secondary Variant
  ColorBackgroundSecondary: theme.ColorBackgroundBase,
  ColorBackgroundSecondaryDisabled: theme.ColorBackgroundBase,
  ColorBackgroundSecondaryFocus: theme.ColorBackgroundBase,
  ColorBackgroundSecondaryHover: theme.ColorPrimaryBase,
  ColorBorderSecondary: theme.ColorPrimaryBase,
  ColorBorderSecondaryDisabled: theme.ColorPrimaryLight,
  ColorBorderSecondaryFocus: theme.ColorPrimaryBase,
  ColorBorderSecondaryHover: theme.ColorPrimaryBase,
  ColorTextSecondary: theme.ColorTextPrimary,
  ColorTextSecondaryDisabled: theme.ColorPaletteBlue300,
  ColorTextSecondaryFocus: theme.ColorTextPrimary,
  ColorTextSecondaryHover: theme.ColorTextBodyInverse,

  // Danger Variant
  ColorBackgroundDanger: theme.ColorBackgroundDangerDark,
  ColorBackgroundDangerDisabled: theme.ColorDangerLight,
  ColorBackgroundDangerFocus: theme.ColorPaletteRed900,
  ColorBackgroundDangerHover: theme.ColorPaletteRed900,
  ColorBorderDangerDisabled: theme.ColorBorderDangerLight,
  ColorBorderDangerHover: theme.ColorBorderDangerDark,
  ColorFocusOutlineDanger: theme.ColorFocusDanger,

  // Dismiss Variant
  ColorBackgroundDismiss: "transparent",
  ColorBorderDismissHover: "transparent",
  ColorTextDismiss: "inherit",
  ColorTextDismissDisabled: theme.ColorNeutralBase,
  FontLineHeightDismiss: 1,
  SpacePaddingBlockDismiss: theme.SpaceEmXs,
  SpacePaddingInlineDismiss: theme.SpaceEmXs,
  ColorBackgroundDismissHover: "rgba(255, 255, 255, 0.6)",
  ColorBackgroundDismissFocus: "rgba(255, 255, 255, 0.6)",
  ColorBackgroundDismissDisabled: "rgba(235, 235, 237, 0.6)",

  // Dismiss Inverted Variant
  ColorShadowDismissInverted: theme.ColorPaletteNeutralWhite,

  // Clear Variant
  ColorBackgroundClear: "transparent",
  ColorBackgroundClearDisabled: "transparent",
  ColorBackgroundClearFocus: theme.ColorBackgroundBase,
  ColorBackgroundClearHover: theme.ColorBackgroundPrimaryLight,
  ColorBorderClearHover: "transparent",
  ColorTextClear: theme.ColorPrimaryBase,
  ColorTextClearDisabled: theme.ColorPrimaryLight,
  ColorTextClearFocus: theme.ColorTextPrimary,
  ColorTextClearHover: theme.ColorPaletteBlue900,

  // Wide Layout
  SpaceMarginBlockEndWideLayout: theme.SpaceRemS,
  SpaceMarginBlockWideLayout: 0,
  SpaceMarginInlineWideLayout: 0,

  // Small Size
  FontLineHeightSmallSize: theme.FontLineHeightTitle,
  FontSizeSmallSize: theme.FontSizeCaption,

  // Large Size
  SpacePaddingBlockLargeSize: theme.SpaceEmS,
  SpacePaddingInlineLargeSize: theme.SpaceEmM,
});

const root: ThemeReducer = (theme) => ({
  // Font
  ColorText: theme.ColorTextBodyInverse,
  FontFamily: theme.FontFamilyBase,
  FontLineHeight: theme.FontLineHeightBase,
  FontSize: theme.FontSizeBody,
  FontWeight: theme.FontWeightBold,
  FontWhiteSpace: "nowrap",

  // Space
  SpaceMarginBlock: 0,
  SpaceMarginInline: 0,
  SpacePaddingBlock: theme.SpaceEmXs,
  SpacePaddingInline: theme.SpaceEmS,

  // Border
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,

  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,

  LabelMinWidth: theme.SpaceEmL,
  LabelSpaceMarginInlineStart: theme.SpaceRemXs,

  FocusOutlineWidth: theme.FocusOutlineWidthBase,
});
