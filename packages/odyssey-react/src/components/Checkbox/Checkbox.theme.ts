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
  ColorBorderChecked: theme.ColorPrimaryBase,
  ColorBorderHover: theme.ColorPrimaryBase,
  ColorBorderFocus: theme.ColorPrimaryBase,
  ColorBorderDisabled: theme.ColorBorderDisabled,
  ColorBorderDisabledChecked: theme.ColorPrimaryLight,
  ColorBorderInvalid: theme.ColorBorderDanger,
  ColorBorderInvalidHover: theme.ColorDangerDark,
  ColorBackground: theme.ColorPrimaryBase,
  ColorBackgroundDisabled: theme.ColorBackgroundDisabled,
  ColorBackgroundDisabledChecked: theme.ColorPrimaryLight,
  ColorBackgroundInvalid: theme.ColorBackgroundDangerDark,
  ColorCheck: theme.ColorTextBodyInverse,
  ColorTextDisabled: theme.ColorTextBody,
  ColorTextInvalid: theme.ColorTextDanger,
  ColorFocusOutline: theme.ColorFocusPrimary,
  ColorFocusOutlineInvalid: theme.ColorFocusDanger,
  FocusOutlineWidth: theme.FocusOutlineWidth,
  MarginBottom: theme.SpaceRemXs,
  PaddingLabelLeft: theme.SpaceEmS,
  FontSize: theme.FontSizeBase,
  FontWeight: theme.FontWeightNormal,
  BorderRadius: theme.BorderRadiusBase,
  BoxSize: "1em",
  BorderSize: "2px",
  BorderStyle: theme.BorderStyleBase,
  CheckSize: "0.75em",
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
});
