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
  // eslint-disable-next-line @okta/odyssey/no-invalid-theme-properties
  MaxLineLength: theme.FontLineLengthMax,
  PaddingBlock: theme.SpaceScale4,
  PaddingInline: theme.SpaceScale4,
  MarginBlockEnd: theme.SpaceScale4,
  BorderRadius: theme.BorderRadiusBase,
  ColumnGap: theme.SpaceScale3,

  IconSize: theme.FontSizeHeading5,
  IconLineHeight: theme.FontLineHeightHeading5,

  ContentMarginBlockEnd: theme.SpaceScale3,

  // Variants
  CautionBackgroundColor: theme.ColorBackgroundCautionLight,
  DangerBackgroundColor: theme.ColorBackgroundDangerLight,
  InfoBackgroundColor: theme.ColorBackgroundPrimaryLight,
  SuccessBackgroundColor: theme.ColorBackgroundSuccessLight,
});
