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
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  ColorBackground: theme.ColorBackgroundBase,
  ColorBackgroundDisabled: theme.ColorBackgroundDisabled,
  ColorBackgroundButton: theme.ColorPaletteBlue400,
  ColorBackgroundButtonHoverFocus: theme.ColorPrimaryBase,
  ColorBackgroundDisabledReadonly: theme.ColorBackgroundDisabled,
  ColorBorder: theme.ColorBorderUi,
  ColorBorderDisabled: theme.ColorBorderDisabled,
  ColorBorderDisabledHover: theme.ColorBorderUi,
  ColorBorderDisabledReadonly: theme.ColorBorderDisabled,
  ColorBorderHoverFocus: theme.ColorBorderPrimaryBase,
  ColorBorderInvalid: theme.ColorBorderDangerBase,
  ColorButtonIndicator: theme.ColorPaletteNeutralWhite,
  ColorFocusDanger: theme.ColorFocusDanger,
  ColorFocusPrimary: theme.ColorFocusPrimary,
  ColorText: theme.ColorTextBody,
  ColorTextDisabled: theme.ColorTextBody,
  ColorTextPlaceholder: theme.ColorTextSub,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,
  FontFamily: theme.FontFamilyBase,
  FontLineHeight: theme.FontLineHeightBase,
  FontMaxWidth: theme.FontLineLengthMax,
  FontSize: theme.FontSizeBody,
  SpaceMarginBlock: 0,
  SpaceMarginInline: 0,
  SpacePaddingBlock: theme.SpaceEmXs,
  SpacePaddingInline: theme.SpaceEmS,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
});
