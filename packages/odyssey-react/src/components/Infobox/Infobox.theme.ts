/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  // Root
  BorderRadius: theme.BorderRadiusBase,
  BorderStyle: theme.BorderStyleBase,
  BorderWidth: theme.BorderWidthBase,
  ColumnGap: theme.SpaceScale2,
  MarginBlockEnd: theme.SpaceScale3,
  // eslint-disable-next-line @okta/odyssey/no-invalid-theme-properties
  MaxLineLength: theme.FontLineLengthMax,
  PaddingBlock: theme.SpaceScale3,
  PaddingInline: theme.SpaceScale3,

  IconInsetBlockStart: theme.SpaceScale3,
  IconInsetInlineStart: theme.SpaceScale3,
  IconMargin: theme.SpaceScale3,
  IconSize: theme.FontSizeHeading4,

  HeadingFontSize: theme.FontSizeHeading6,
  HeadingFontWeight: theme.FontWeightBold,
  HeadingLineHeight: theme.FontLineHeightHeading6,
  HeadingMarginBlock: theme.SpaceScale0,
  HeadingMarginInline: 0,
  HeadingTextColor: theme.ColorTextBody,

  ContentMarginBlockEnd: theme.SpaceScale2,

  // Variants
  CautionBackgroundColor: theme.ColorBackgroundCautionLight,
  CautionBorderColor: theme.ColorBackgroundCautionBase,
  CautionIconColor: theme.ColorCautionDark,
  DangerBackgroundColor: theme.ColorBackgroundDangerLight,
  DangerBorderColor: theme.ColorBackgroundDangerBase,
  DangerIconColor: theme.ColorDangerBase,
  InfoBackgroundColor: theme.ColorBackgroundPrimaryLight,
  InfoBorderColor: theme.ColorBackgroundPrimaryBase,
  InfoIconColor: theme.ColorPrimaryBase,
  SuccessBackgroundColor: theme.ColorBackgroundSuccessLight,
  SuccessBorderColor: theme.ColorBackgroundSuccessBase,
  SuccessIconColor: theme.ColorSuccessBase,
});
