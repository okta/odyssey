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
  ColorBorder: theme.ColorBorderUi,
  ColorBorderInvalid: theme.ColorBorderDangerBase,
  ColorBorderDisabled: theme.ColorBorderDisabled,
  ColorBackground: theme.ColorBackgroundBase,
  ColorBackgroundDisabled: theme.ColorBackgroundDisabled,
  ColorText: theme.ColorTextBody,
  ColorTextDisabled: theme.ColorTextBody,
  ColorTextPlaceholder: theme.ColorTextSub,
  ColorFocusOutline: theme.ColorFocusPrimary,
  ColorFocusOutlineInvalid: theme.ColorFocusDanger,
  BorderWidth: theme.BorderWidthBase,
  BorderStyle: theme.BorderStyleBase,
  BorderRadius: theme.BorderRadiusBase,
  PaddingBlock: theme.SpaceEmXs,
  PaddingInline: theme.SpaceEmS,
  MaxWidth: theme.FontLineLengthMax,
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  LineHeight: theme.FontLineHeightBase,
  FocusOutlineWidth: theme.FocusOutlineWidthBase,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
  RtlBackgroundPositionRightOffset: theme.SpaceRemS,
  SearchPaddingInlineStart: theme.SpaceRemXs,
  IndicatorSize: "1.1487rem",
  IndicatorInsetInlineStart: theme.SpaceRemS,
});
