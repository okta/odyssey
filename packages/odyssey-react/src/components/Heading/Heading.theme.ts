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
  TextColor: theme.ColorTextHeading,
  /* eslint-disable @okta/odyssey/no-invalid-theme-properties */
  Level1FontSize: theme.FontSizeHeading1,
  Level2FontSize: theme.FontSizeHeading2,
  Level3FontSize: theme.FontSizeHeading3,
  Level4FontSize: theme.FontSizeHeading4,
  Level5FontSize: theme.FontSizeHeading5,
  Level6FontSize: theme.FontSizeHeading6,
  /* eslint-enable @okta/odyssey/no-invalid-theme-properties */
  FontFamily: theme.FontFamilyBase,
  FontSize: theme.FontSizeBody,
  LineHeight: theme.FontLineHeightHeading,
  // eslint-disable-next-line @okta/odyssey/no-invalid-theme-properties
  Heading: theme.FontLineHeightHeading,
});
