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
  MarginBlockEnd: theme.SpaceEmXs,
  ColorHeading: theme.ColorTextHeading,
  SizeTitle1: theme.FontSizeHeading1,
  SizeTitle2: theme.FontSizeHeading2,
  SizeTitle3: theme.FontSizeHeading3,
  SizeTitle4: theme.FontSizeHeading4,
  SizeTitle5: theme.FontSizeHeading5,
  SizeTitle6: theme.FontSizeHeading6,
  LineHeightTitle: theme.FontLineHeightTitle,
  LineHeightBase: theme.FontLineHeightTitle,
});
