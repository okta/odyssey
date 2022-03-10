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
  // eslint-disable-next-line @okta/odyssey/no-invalid-theme-properties
  MaxLineLength: theme.FontLineLengthMax,

  PaddingBlock: theme.SpaceScale3,
  PaddingInline: theme.SpaceScale3,

  IconInsetBlockStart: theme.SpaceScale3,
  IconInsetInlineStart: theme.SpaceScale3,
  IconMarginInlineEnd: theme.SpaceScale3,
  IconSize: theme.FontSizeHeading5,

  HeadingMarginInlineEnd: theme.SpaceScale0,
  HeadingMobileMarginBlockEnd: theme.SpaceScale0,

  ContentMarginInlineEnd: theme.SpaceScale3,
  ContentMobileMarginBlockEnd: theme.SpaceScale0,

  DismissButtonInsetInlineEnd: theme.SpaceScale3,
  DismissButtonMarginInlineStart: theme.SpaceScale3,

  DismissablePaddingBlock: theme.SpaceScale3,
  DismissablePaddingInlineEnd: theme.SpaceScale6,
  DismissablePaddingInlineStart: theme.SpaceScale3,

  CautionBackgroundColor: theme.ColorBackgroundCautionLight,
  CautionIconColor: theme.ColorCautionDark,

  DangerBackgroundColor: theme.ColorBackgroundDangerLight,
  DangerIconColor: theme.ColorDangerBase,

  InfoBackgroundColor: theme.ColorBackgroundPrimaryLight,
  InfoIconColor: theme.ColorPrimaryBase,
});
