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

import type { ThemeOptions } from "@mui/material";
import { DesignTokensOverride } from ".";
import * as Tokens from "@okta/odyssey-design-tokens";

export const spacing = (
  odysseyTokens: DesignTokensOverride
): ThemeOptions["spacing"] => {
  return [
    odysseyTokens.Spacing0 ?? Tokens.Spacing0,
    odysseyTokens.Spacing1 ?? Tokens.Spacing1,
    odysseyTokens.Spacing2 ?? Tokens.Spacing2,
    odysseyTokens.Spacing3 ?? Tokens.Spacing3,
    odysseyTokens.Spacing4 ?? Tokens.Spacing4,
    odysseyTokens.Spacing5 ?? Tokens.Spacing5,
    odysseyTokens.Spacing6 ?? Tokens.Spacing6,
    odysseyTokens.Spacing7 ?? Tokens.Spacing7,
    odysseyTokens.Spacing8 ?? Tokens.Spacing8,
    odysseyTokens.Spacing9 ?? Tokens.Spacing9,
  ];
};
