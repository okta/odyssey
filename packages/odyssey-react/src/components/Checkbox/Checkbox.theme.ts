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
  BorderRadius: theme.BorderRadiusBase,
  FontSize: theme.FontSizeBody,
  FontWeight: theme.FontWeightNormal,
  TransitionDuration: theme.TransitionDurationBase,
  TransitionTiming: theme.TransitionTimingBase,

  BoxBackgroundColor: "transparent",
  BoxBorderColor: theme.ColorBorderUi,
  BoxBorderStyle: theme.BorderStyleBase,
  BoxBorderWidth: "2px",
  BoxCheckedBackgroundColor: theme.ColorPrimaryBase,
  BoxCheckedBorderColor: theme.ColorPrimaryBase,
  BoxDisabledBackgroundColor: theme.ColorBackgroundDisabled,
  BoxDisabledBorderColor: theme.ColorBorderDisabled,
  BoxDisabledCheckedBackgroundColor: theme.ColorPrimaryLight,
  BoxDisabledCheckedBorderColor: theme.ColorPrimaryLight,
  BoxFocusBorderColor: theme.ColorPrimaryBase,
  BoxFocusOutlineColor: theme.ColorFocusPrimary,
  BoxFocusOutlineWidth: theme.FocusOutlineWidthSmall,
  BoxHoverBorderColor: theme.ColorPrimaryBase,
  BoxInvalidBackgroundColor: theme.ColorBackgroundDangerDark,
  BoxInvalidBorderColor: theme.ColorBorderDangerBase,
  BoxInvalidFocusOutlineColor: theme.ColorFocusDanger,
  BoxInvalidHoverBorderColor: theme.ColorDangerDark,
  BoxSize: "1em",

  LabelPaddingInlineStart: theme.SpaceEmS,
  LabelDisabledTextColor: theme.ColorTextBody,
  LabelInvalidTextColor: theme.ColorTextDanger,

  IndicatorColor: theme.ColorTextBodyInverse,
  IndicatorSize: "0.75em",
});
