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
  BackgroundColor: theme.ColorBackgroundPrimaryLight,
  BodyFontSize: theme.FontSizeBody,
  BorderColor: theme.ColorBackgroundPrimaryBase,
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  BoxShadow: theme.ShadowScale1,
  ColumnGap: theme.SpaceScale1,
  MaxWidth: theme.FontLineLengthMax,
  PaddingBlock: theme.SpaceScale3,
  PaddingInline: theme.SpaceScale3,
  RowGap: 0,
  TextColor: theme.ColorTextBody,

  DismissInsetBlockStart: theme.SpaceScale3,
  DismissInsetInlineEnd: theme.SpaceScale3,
  DismissedAnimationDelay: "1000ms",
  DismissedAnimationDuration: "1000ms",

  HeadingFontSize: theme.FontSizeHeading6,
  HeadingFontWeight: theme.FontWeightBold,
  HeadingLineHeight: theme.FontLineHeightHeading6,
  HeadingMarginBlock: theme.SpaceScale0,
  HeadingMarginInline: 0,
  HeadingTextColor: theme.ColorTextBody,

  IconColor: theme.ColorPrimaryBase,
  IconInsetBlockStart: theme.SpaceScale3,
  IconInsetInlineStart: theme.SpaceScale3,
  IconMargin: theme.SpaceScale3,
  IconSize: theme.FontSizeHeading4,

  InAnimationDelay: "0s",
  InAnimationDuration: "300ms",
  HoverOutAnimationDelay: "300s",
  OutAnimationDelay: "5300ms",
  OutAnimationDuration: "1000ms",
  ReducedAnimationDuration: "300ms",

  PenInsetBlockEnd: theme.SpaceScale3,
  PenInsetInlineEnd: theme.SpaceScale3,
  PenRowGap: theme.SpaceScale1,

  CautionBackgroundColor: theme.ColorBackgroundCautionLight,
  CautionBorderColor: theme.ColorBackgroundCautionBase,
  CautionIconColor: theme.ColorCautionDark,

  DangerBackgroundColor: theme.ColorBackgroundDangerLight,
  DangerBorderColor: theme.ColorBackgroundDangerBase,
  DangerIconColor: theme.ColorDangerBase,

  SuccessBackgroundColor: theme.ColorBackgroundSuccessLight,
  SuccessBorderColor: theme.ColorBackgroundSuccessBase,
  SuccessIconColor: theme.ColorSuccessBase,
});
