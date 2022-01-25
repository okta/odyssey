/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  // Border
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,

  // Color
  ColorBackground: theme.ColorBackgroundBase,
  ColorBackgroundDisabled: theme.ColorBackgroundDisabled,
  ColorBorder: theme.ColorBorderUi,
  ColorBorderDisabled: theme.ColorBorderDisabled,
  ColorBorderHoverFocus: theme.ColorPrimaryBase,
  ColorBorderInvalid: theme.ColorBorderDangerBase,
  ColorFocusOutline: theme.ColorFocusPrimary,
  ColorFocusOutlineInvalid: theme.ColorFocusDanger,
  ColorShadow: theme.ColorBackgroundPrimaryLight,
  ColorText: theme.ColorTextBody,
  ColorTextDisabled: theme.ColorTextBody,
  ColorTextPlaceholder: theme.ColorTextSub,

  // Font
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  LineHeight: theme.FontLineHeightBase,

  // Sizing
  FocusOutlineWidth: theme.FocusOutlineWidthBase,
  MaxWidth: theme.FontLineLengthMax,
  MinHeight: theme.SpaceRemL,
  MinWidth: theme.SpaceRemM,

  // Space
  SpaceMarginBlockEnd: 0,
  SpaceMarginBlockStart: theme.SpaceRemXs,
  SpaceMarginInline: 0,
  SpacePaddingBlockEnd: theme.SpaceEmS,
  SpacePaddingBlockStart: theme.SpaceEmXs,
  SpacePaddingInline: theme.SpaceEmS,

  // Transition
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
});
