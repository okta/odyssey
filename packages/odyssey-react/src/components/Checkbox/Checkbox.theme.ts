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
  MarginBlockEnd: theme.SpaceRemXs,
  BorderColor: theme.ColorBorderUi,
  BorderRadius: theme.BorderRadiusBase,
  BorderSize: "2px",
  BorderStyle: theme.BorderStyleBase,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,
  FontSize: theme.FontSizeBody,
  FontWeight: theme.FontWeightNormal,
  HoverBorderColor: theme.ColorPrimaryBase,
  FocusBorderColor: theme.ColorPrimaryBase,
  FocusOutlineColor: theme.ColorFocusPrimary,
  FocusOutlineWidth: theme.FocusOutlineWidthSmall,

  BoxBackgroundColor: "transparent",
  BoxSize: "1em",

  CheckColor: theme.ColorTextBodyInverse,
  CheckSize: "0.75em",

  LabelPaddingInlineStart: theme.SpaceEmS,

  CheckedBorderColor: theme.ColorPrimaryBase,
  CheckedBoxBackgroundColor: theme.ColorPrimaryBase,

  DisabledBorderColor: theme.ColorBorderDisabled,
  DisabledBoxBackgroundColor: theme.ColorBackgroundDisabled,
  DisabledCheckedBorderColor: theme.ColorPrimaryLight,
  DisabledCheckedBoxBackgroundColor: theme.ColorPrimaryLight,
  DisabledTextColor: theme.ColorTextBody,

  InvalidBorderColor: theme.ColorBorderDangerBase,
  InvalidBoxBackgroundColor: theme.ColorBackgroundDangerDark,
  InvalidFocusOutlineColor: theme.ColorFocusDanger,
  InvalidHoverBorderColor: theme.ColorDangerDark,
  InvalidTextColor: theme.ColorTextDanger,
});
