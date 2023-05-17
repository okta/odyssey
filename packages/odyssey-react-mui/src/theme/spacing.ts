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
import * as Tokens from "@okta/odyssey-design-tokens";
import { TokenOverrideOptions } from ".";
import { deepmerge } from "@mui/utils";

export const spacing = (
  tokenOverrides?: TokenOverrideOptions
): ThemeOptions["spacing"] => {
  const odysseyTokens = deepmerge(Tokens, tokenOverrides);
  return [
    0,
    odysseyTokens.SpaceScale0,
    odysseyTokens.SpaceScale1,
    odysseyTokens.SpaceScale2,
    odysseyTokens.SpaceScale3,
    odysseyTokens.SpaceScale4,
    odysseyTokens.SpaceScale5,
    odysseyTokens.SpaceScale6,
    odysseyTokens.SpaceScale7,
    odysseyTokens.SpaceScale8,
  ];
};
