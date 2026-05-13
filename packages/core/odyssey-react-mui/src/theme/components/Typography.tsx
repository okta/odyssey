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

export const typographyComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiTypography"
> => ({
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        h5: "h5",
        h6: "h6",
        subtitle1: "p",
        body1: "p",
        inherit: "p",
        legend: "legend",
        overline: "p",
      },
    },
    styleOverrides: {
      paragraph: {
        marginBlockEnd: odysseyTokens.Spacing4,

        [`&:last-child`]: {
          marginBlockEnd: 0,
        },
      },
      overline: {
        fontSize: odysseyTokens.TypographySizeOverline,
        fontWeight: odysseyTokens.TypographyWeightBodyBold,
        lineHeight: odysseyTokens.TypographyLineHeightOverline,
        letterSpacing: odysseyTokens.TypographyLetterSpacingOverline,
        textTransform: "none",

        ":is(:lang(en-*), :lang(en))": {
          textTransform: "uppercase",
        },
      },
    },
  },
});
