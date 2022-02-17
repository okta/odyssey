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
  // Font
  /* eslint-disable @okta/odyssey/no-invalid-theme-properties */
  TextColor: theme.ColorTextBody,
  BodyTextColor: theme.ColorTextBody,
  BodyInverseTextColor: theme.ColorTextBodyInverse,
  DangerTextColor: theme.ColorTextDanger,
  PrimaryTextColor: theme.ColorTextPrimary,
  SubTextColor: theme.ColorTextSub,
  /* eslint-enable @okta/odyssey/no-invalid-theme-properties */
  FontFamily: theme.FontFamilyBase,

  LineHeight: theme.FontLineHeightBody,
  BodyLineHeight: theme.FontLineHeightBody,
  /* eslint-disable  @okta/odyssey/no-invalid-theme-properties */
  Heading1LineHeight: theme.FontLineHeightHeading1,
  Heading2LineHeight: theme.FontLineHeightHeading2,
  Heading3LineHeight: theme.FontLineHeightHeading3,
  Heading4LineHeight: theme.FontLineHeightHeading4,
  Heading5LineHeight: theme.FontLineHeightHeading5,
  Heading6LineHeight: theme.FontLineHeightHeading6,
  /* eslint-enable  @okta/odyssey/no-invalid-theme-properties */

  FontSize: theme.FontSizeBody,
  BaseFontSize: theme.FontSizeBody,
  CaptionFontSize: theme.FontSizeCaption,

  ItalicFontStyle: "italic",
  NormalFontStyle: theme.FontStyleNormal,

  /* eslint-disable  @okta/odyssey/no-invalid-theme-properties */
  CapitalizeTextTransform: "capitalize",
  LowercaseTextTransform: "lowercase",
  NoneTextTransform: "none",
  UppercaseTextTransform: "uppercase",
  /* eslint-enable  @okta/odyssey/no-invalid-theme-properties */

  BoldFontWeight: theme.FontWeightBold,
  NormalFontWeight: theme.FontWeightNormal,

  // abbr
  AbbrBorderBlockEndStyle: "dashed",
  AbbrBorderBlockEndWidth: theme.BorderWidthBase,
  AbbrBorderBlockEndColor: theme.ColorBorderPrimaryDark,

  // em
  EmFontStyle: "italic",

  // strong
  StrongFontWeight: theme.FontWeightBold,

  // sup
  SupLineHeight: 1,
  SupFontSize: "0.7583rem",

  // sub
  SubLineHeight: 1,
  SubFontSize: "0.7583rem",

  // blockquote
  BlockquoteBorderInlineStartStyle: theme.BorderStyleBase,
  BlockquoteBorderInlineStartWidth: "3px",
  BlockquoteBorderInlineStartColor: theme.ColorBorderDisplay,
  BlockquoteMaxWidth: theme.FontLineLengthMax,
  BlockquoteMarginBlockEnd: theme.SpaceScale4,
  BlockquoteMarginBlockStart: 0,
  BlockquoteMarginInline: 0,
  BlockquotePaddingBlock: 0,
  BlockquotePaddingInlineEnd: 0,
  BlockquotePaddingInlineStart: theme.SpaceScale2,

  // p
  PMaxWidth: theme.FontLineLengthMax,
  PMarginBlockEnd: theme.SpaceScale4,
  PMarginBlockStart: 0,
  PMarginInline: 0,

  // pre
  PreFontFamily: theme.FontFamilyMono,
  PreMarginBlockEnd: theme.SpaceScale4,
  PreMarginBlockStart: 0,
  PreMarginInline: 0,

  // cite
  CiteFontStyle: "italic",

  // del
  DelBackgroundColor: theme.ColorBackgroundDangerBase,

  // dfn
  DfnFontStyle: "italic",

  // ins
  InsBackgroundColor: theme.ColorBackgroundSuccessLight,

  // kbd
  KbdBorderWidth: theme.BorderWidthBase,
  KbdBorderStyle: theme.BorderStyleBase,
  KbdBorderColor: theme.ColorBorderDisplay,
  KbdBorderRadius: theme.BorderRadiusBase,
  KbdBackgroundColor: theme.ColorBackgroundDisabled,
  KbdInsideBoxShadowColor: theme.ColorPaletteNeutral000,
  KbdOutsideBoxShadowColor: theme.ColorPaletteNeutral200,
  KbdLineHeight: theme.FontLineHeightUi,
  KbdFontWeight: theme.FontWeightNormal,
  KbdPaddingBlock: 0,
  KbdPaddingInline: theme.SpaceScale1,

  // mark
  MarkBackgroundColor: theme.ColorBackgroundCautionLight,

  // samp
  SampBackgroundColor: theme.ColorBackgroundDisabled,
  SampFontFamily: theme.FontFamilyMono,
  SampFontSize: theme.FontSizeBody,
  SampBoxShadow: "0 1px 0 #d7d7dc",
  SampPaddingBlock: 0,
  SampPaddingInline: "0.5ch",

  // samp kbd
  SampKbdBackgroundColor: theme.ColorBackgroundBase,

  // small
  SmallFontSize: theme.FontSizeCaption,

  // details
  DetailsFontSize: theme.FontSizeBody,

  // summary
  SummaryBorderRadius: theme.BorderRadiusBase,
  SummaryFocusOutlineColor: theme.FocusOutlineColorPrimary,
  SummaryFocusOutlineOffset: theme.FocusOutlineOffsetBase,
  SummaryFocusOutlineStyle: theme.FocusOutlineStyle,
  SummaryFocusOutlineWidth: theme.FocusOutlineWidthBase,
  SummaryFontSize: theme.FontSizeHeading5,
  SummaryFontWeight: theme.FontWeightBold,

  // code
  CodeFontFamily: theme.FontFamilyMono,

  // var
  VarFontStyle: "italic",
  VarFontWeight: theme.FontWeightBold,
});
