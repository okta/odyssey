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
  ColorTextBody: theme.ColorTextBody,
  ColorTextBodyInverse: theme.ColorTextBodyInverse,
  ColorTextDanger: theme.ColorTextDanger,
  ColorTextPrimary: theme.ColorTextPrimary,
  ColorTextSub: theme.ColorTextSub,
  FontFamilyBase: theme.FontFamilyBase,
  FontLineHeightNormal: theme.FontLineHeightBase,
  FontLineHeightHeading: theme.FontLineHeightHeading,
  FontSizeBase: theme.FontSizeBody,
  FontSizeCaption: theme.FontSizeCaption,
  FontStyleItalic: "italic",
  FontStyleNormal: theme.FontStyleNormal,
  FontTransformCapitalize: "capitalize",
  FontTransformLowercase: "lowercase",
  FontTransformNone: "none",
  FontTransformUppercase: "uppercase",
  FontWeightBold: theme.FontWeightBold,
  FontWeightNormal: theme.FontWeightNormal,

  // abbr
  BorderBlockEndStyleAbbr: "dashed",
  BorderBlockEndWidthAbbr: theme.BorderWidthBase,
  ColorBorderBlockEndAbbr: theme.ColorBorderPrimaryDark,

  // em
  FontStyleEm: "italic",

  // strong
  FontWeightStrong: theme.FontWeightBold,

  // sup
  FontLineHeightSup: 1,
  FontSizeSup: "0.7583rem",

  // sub
  FontLineHeightSub: 1,
  FontSizeSub: "0.7583rem",

  // blockquote
  BorderInlineStartStyleBlockquote: theme.BorderStyleBase,
  BorderInlineStartWidthBlockquote: "3px",
  ColorBorderInlineStartBlockquote: theme.ColorBorderDisplay,
  FontMaxWidthBlockquote: theme.FontLineLengthMax,
  SpaceMarginBlockEndBlockquote: theme.SpaceEmM,
  SpaceMarginBlockStartBlockquote: 0,
  SpaceMarginInlineBlockquote: 0,
  SpacePaddingBlockBlockquote: 0,
  SpacePaddingInlineEndBlockquote: 0,
  SpacePaddingInlineStartBlockquote: theme.SpaceRemS,

  // p
  FontMaxWidthP: theme.FontLineLengthMax,
  SpaceMarginBlockEndP: theme.SpaceEmM,
  SpaceMarginBlockStartP: 0,
  SpaceMarginInlineP: 0,

  // pre
  FontFamilyPre: theme.FontFamilyMono,
  SpaceMarginBlockEndPre: theme.SpaceEmM,
  SpaceMarginBlockStartPre: 0,
  SpaceMarginInlinePre: 0,

  // cite
  FontStyleCite: "italic",

  // del
  ColorBackgroundDel: theme.ColorBackgroundDangerBase,

  // dfn
  FontStyleDfn: "italic",

  // ins
  ColorBackgroundIns: theme.ColorBackgroundSuccessLight,

  // kbd
  BorderWidthKbd: theme.BorderWidthBase,
  BorderStyleKbd: theme.BorderStyleBase,
  BorderRadiusKbd: theme.BorderRadiusBase,
  ColorBackgroundKbd: theme.ColorBackgroundDisabled,
  ColorBorderKbd: theme.ColorBorderDisplay,
  ColorShadowInsideKbd: theme.ColorPaletteNeutral000,
  ColorShadowOutsideKbd: theme.ColorPaletteNeutral200,
  FontLineHeightKbd: theme.FontLineHeightHeading,
  FontWeightKbd: theme.FontWeightNormal,
  SpacePaddingBlockKbd: 0,
  SpacePaddingInlineKbd: theme.SpaceRemXs,

  // mark
  ColorBackgroundMark: theme.ColorBackgroundCautionLight,

  // samp
  ColorBackgroundSamp: theme.ColorBackgroundDisabled,
  FontFamilySamp: theme.FontFamilyMono,
  FontSizeSamp: theme.FontSizeBody,
  ShadowSamp: "0 1px 0 #d7d7dc",
  SpacePaddingBlockSamp: 0,
  SpacePaddingInlineSamp: "0.5ch",

  // samp kbd
  ColorBackgroundSampKbd: theme.ColorBackgroundBase,

  // small
  FontSizeSmall: theme.FontSizeCaption,

  // details
  FontSizeDetails: theme.FontSizeBody,

  // summary
  BorderRadiusSummary: theme.BorderRadiusBase,
  FontSizeSummary: theme.FontSizeHeading5,
  FontWeightSummary: theme.FontWeightBold,

  // code
  FontFamilyCode: theme.FontFamilyMono,

  // var
  FontStyleVar: "italic",
  FontWeightVar: theme.FontWeightBold,
});
