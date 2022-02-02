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
  // REMOVE THIS
  /* eslint-disable @okta/odyssey/no-invalid-theme-properties */
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  ColorBackground: theme.ColorBackgroundBase,
  ColorBackgroundDisabled: theme.ColorBackgroundDisabled,
  ColorBorder: theme.ColorBorderUi,
  ColorBorderDisabled: theme.ColorBorderDisabled,
  ColorBorderHoverFocus: theme.ColorPrimaryBase,
  ColorBorderInvalid: theme.ColorBorderDangerBase,
  ColorFocusOutline: theme.ColorFocusPrimary,
  ColorFocusOutlineInvalid: theme.ColorFocusDanger,
  ColorText: theme.ColorTextBody,
  ColorTextDisabled: theme.ColorTextBody,
  ColorTextPlaceholder: theme.ColorTextSub,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  IndicatorInsetInlineStart: theme.SpaceRemS,
  IndicatorSize: "1.1487rem",
  LineHeight: theme.FontLineHeightBase,
  MaxWidth: theme.FontLineLengthMax,
  MarginBlock: 0,
  MarginInline: 0,
  PaddingBlock: theme.SpaceEmXs,
  PaddingInline: theme.SpaceEmS,
  SearchPaddingInlineStart: theme.SpaceRemXs,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
});
