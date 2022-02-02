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

  PaddingBlock: theme.SpaceRemS,
  PaddingInline: theme.SpaceRemM,

  IconMarginInlineEnd: theme.SpaceRemS,
  IconSize: theme.FontSizeHeading5,

  HeadingMarginInlineEnd: theme.SpaceRemXs,

  ContentMarginInlineEnd: theme.SpaceRemM,

  DismissButtonInsetInlineEnd: theme.SpaceRemM,
  DismissButtonMarginInlineStart: theme.SpaceRemM,

  DismissablePaddingBlock: theme.SpaceRemS,
  DismissablePaddingInlineEnd: theme.SpaceRemL,
  DismissablePaddingInlineStart: theme.SpaceRemM,

  CautionBackgroundColor: theme.ColorCautionLight,
  DangerBackgroundColor: theme.ColorDangerLight,
  InfoBackgroundColor: theme.ColorPrimaryLight,
  SuccessBackgroundColor: theme.ColorSuccessLight,
});
