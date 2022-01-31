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
  BackgroundColor: theme.ColorBackgroundBase,
  BorderColor: theme.ColorBorderUi,
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  ButtonBackgroundColor: theme.ColorPaletteBlue400,
  ButtonFocusBoxShadowColor: theme.ColorFocusPrimary,
  ButtonFocusBoxShadowSpread: theme.FocusOutlineWidthBase,
  ButtonHoverFocusBackgroundColor: theme.ColorPrimaryBase,
  ButtonIndicatorColor: theme.ColorPaletteNeutralWhite,
  DisabledBackgroundColor: theme.ColorBackgroundDisabled,
  DisabledBorderColor: theme.ColorBorderDisabled,
  DisabledBorderStyle: theme.BorderStyleBase,
  DisabledBorderWidth: theme.BorderWidthBase,
  DisabledHoverBorderColor: theme.ColorBorderUi,
  DisabledReadonlyBackgroundColor: theme.ColorBackgroundDisabled,
  DisabledReadonlyBorderColor: theme.ColorBorderDisabled,
  DisabledReadonlyHoverBorderColor: theme.ColorBorderDisabled,
  DisabledTextColor: theme.ColorTextSub,
  FocusBoxShadowColor: theme.ColorFocusPrimary,
  FocusBoxShadowSpread: theme.FocusOutlineWidthBase,
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  HoverFocusBorderColor: theme.ColorBorderPrimaryBase,
  InvalidBorderColor: theme.ColorBorderDangerBase,
  InvalidFocusBoxShadowColor: theme.ColorFocusDanger,
  LineHeight: theme.FontLineHeightBase,
  MarginBlock: 0,
  MarginInline: 0,
  MaxWidth: theme.FontLineLengthMax,
  PaddingBlock: theme.SpaceEmXs,
  PaddingInline: theme.SpaceEmS,
  PlaceholderTextColor: theme.ColorTextSub,
  TextColor: theme.ColorTextBody,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
});
