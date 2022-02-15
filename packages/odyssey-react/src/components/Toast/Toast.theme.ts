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
  InAnimationDelay: "0s",
  OutAnimationDelay: "5300ms",
  InAnimationDuration: "300ms",
  OutAnimationDuration: "1000ms",
  BackgroundColor: theme.ColorBackgroundPrimaryDark,
  BodyFontSize: theme.FontSizeBody,
  BorderRadius: theme.BorderRadiusBase,
  BoxShadow: theme.ShadowHover,
  CautionBackgroundColor: theme.ColorBackgroundCautionDark,
  CautionHeadingColor: theme.ColorTextBody,
  CautionIconColor: theme.ColorTextBody,
  CautionTextColor: theme.ColorTextBody,
  ColumnGap: theme.SpaceRemS,
  DangerBackgroundColor: theme.ColorBackgroundDangerDark,
  DismissedAnimationDelay: "1000ms",
  DismissedAnimationDuration: "1000ms",
  DismissInsetBlockStart: theme.SpaceRemXs,
  DismissInsetInlineEnd: theme.SpaceRemXs,
  HeadingFontSize: theme.FontSizeHeading6,
  HeadingFontWeight: theme.FontWeightBold,
  HeadingLineHeight: theme.FontLineHeightHeading6,
  HeadingMarginBlock: 0,
  HeadingMarginInline: 0,
  HeadingPaddingInlineEnd: theme.SpaceRemM,
  HeadingTextColor: theme.ColorTextBodyInverse,
  HoverOutAnimationDelay: "300s",
  IconSize: theme.FontSizeHeading4,
  IconColor: theme.ColorTextBodyInverse,
  MaxWidth: theme.FontLineLengthMax,
  PaddingBlock: theme.SpaceRemM,
  PaddingInline: theme.SpaceRemS,
  PenInsetBlockEnd: theme.SpaceRemM,
  PenInsetInlineEnd: theme.SpaceRemM,
  PenRowGap: theme.SpaceRemS,
  ReducedAnimationDuration: "300ms",
  RowGap: 0,
  SuccessBackgroundColor: theme.ColorBackgroundSuccessDark,
  TextColor: theme.ColorTextBodyInverse,
});
