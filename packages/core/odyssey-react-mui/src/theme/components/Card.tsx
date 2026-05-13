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

import { typographyClasses } from "@mui/material/Typography";

import type { GetComponentsProps } from "./types.js";

export const cardComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiCard" | "MuiCardActionArea" | "MuiCardActions"
> => ({
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: odysseyTokens.HueNeutralWhite,
        borderRadius: odysseyTokens.BorderRadiusOuter,
        boxShadow: odysseyTokens.DepthMedium,
        padding: odysseyTokens.Spacing5,
        marginBlockEnd: odysseyTokens.Spacing5,
        position: "relative",
        transition: theme.transitions.create("all", {
          duration: odysseyTokens.TransitionDurationMain,
          easing: odysseyTokens.TransitionTimingMain,
        }),

        "& img": {
          maxHeight: "100%",
          height: "auto",
          alignSelf: "flex-start",
        },

        "&.hasAccessory": {
          paddingLeft: odysseyTokens.Spacing4,
        },

        "&.isClickable:hover": {
          boxShadow: odysseyTokens.DepthHigh,
        },

        [`& .${typographyClasses.h5}`]: {
          lineHeight: odysseyTokens.TypographyLineHeightHeading5,
          marginBottom: odysseyTokens.Spacing3,
        },

        [`& .${typographyClasses.subtitle2}`]: {
          marginBottom: odysseyTokens.Spacing1,
          textTransform: "uppercase",
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
          fontSize: odysseyTokens.TypographySizeOverline,
          lineHeight: odysseyTokens.TypographyLineHeightOverline,
          color: odysseyTokens.TypographyColorSubordinate,
          letterSpacing: 1.3,
        },

        [`& .${typographyClasses.body1}`]: {
          fontSize: odysseyTokens.TypographySizeSubordinate,
          lineHeight: odysseyTokens.TypographyLineHeightBody,
        },
      }),
    },
  },
  MuiCardActionArea: {
    styleOverrides: {
      root: () => ({
        margin: `-${odysseyTokens.Spacing5}`,
        padding: odysseyTokens.Spacing5,
        width: `calc(100% + (${odysseyTokens.Spacing5} * 2))`,

        "&:hover": {
          "& .MuiCardActionArea-focusHighlight": {
            display: "none",
          },
        },
      }),
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: () => ({
        marginBlockStart: odysseyTokens.Spacing5,
        padding: 0,
      }),
    },
  },
});
