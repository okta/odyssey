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

import { svgIconClasses } from "@mui/material/SvgIcon";

import type { GetComponentsProps } from "./types.js";

export const breadcrumbsComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiBreadcrumbs"
> => ({
  MuiBreadcrumbs: {
    styleOverrides: {
      li: ({ theme }) => ({
        fontSize: odysseyTokens.TypographySizeSubordinate,

        [`& .${svgIconClasses.root}`]: {
          width: odysseyTokens.Spacing3,
        },

        "& > p": {
          paddingInline: odysseyTokens.Spacing1,
        },

        "& > a, & > button": {
          borderRadius: odysseyTokens.BorderRadiusTight,
          color: odysseyTokens.TypographyColorSubordinate,
          display: "flex",
          gap: odysseyTokens.Spacing1,
          paddingInline: odysseyTokens.Spacing1,
          paddingBlock: 2,
          transition: theme.transitions.create(["color", "background-color"], {
            duration: odysseyTokens.TransitionDurationMain,
            easing: odysseyTokens.TransitionTimingMain,
          }),

          "&:hover": {
            backgroundColor: odysseyTokens.HueNeutral100,
            color: odysseyTokens.TypographyColorBody,
          },

          "&:focus-visible": {
            outlineWidth: 2,
            outlineStyle: "solid",
            outlineColor: odysseyTokens.PalettePrimaryMain,
            outlineOffset: -2,
          },
        },
      }),
      separator: {
        color: odysseyTokens.BorderColorDisplay,
        fontSize: odysseyTokens.TypographySizeSubordinate,
        fontWeight: odysseyTokens.TypographyWeightBodyBold,
        marginInlineStart: 6,
        marginInlineEnd: 4,
      },
    },
  },
});
