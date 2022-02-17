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

  PaddingBlock: theme.Space2,
  PaddingInline: theme.Space4,

  IconMarginInlineEnd: theme.Space2,
  IconSize: theme.FontSizeHeading5,

  HeadingMarginInlineEnd: theme.Space1,

  ContentMarginInlineEnd: theme.Space4,

  DismissButtonInsetInlineEnd: theme.Space4,
  DismissButtonMarginInlineStart: theme.Space4,

  DismissablePaddingBlock: theme.Space2,
  DismissablePaddingInlineEnd: theme.Space7,
  DismissablePaddingInlineStart: theme.Space4,

  CautionBackgroundColor: theme.ColorCautionLight,
  DangerBackgroundColor: theme.ColorDangerLight,
  InfoBackgroundColor: theme.ColorPrimaryLight,
  SuccessBackgroundColor: theme.ColorSuccessLight,
});
