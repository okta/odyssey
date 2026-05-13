/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import type { GetComponentsProps } from "./types.js";

export const svgIconComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiSvgIcon"
> => ({
  MuiSvgIcon: {
    defaultProps: {
      fontSize: "inherit",
      color: "inherit",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        fontSize: `${odysseyTokens.TypographyLineHeightUi}rem`,

        ...(ownerState.fontSize === "small" && {
          fontSize: `${Number(odysseyTokens.TypographyLineHeightUi) * 0.75}rem`,
        }),

        ...(ownerState.fontSize === "large" && {
          fontSize: `${Number(odysseyTokens.TypographyLineHeightUi) * 1.25}rem`,
        }),
      }),
    },
  },
});
