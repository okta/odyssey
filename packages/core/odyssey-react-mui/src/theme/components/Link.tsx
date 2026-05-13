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

export const linkComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiLink"
> => ({
  MuiLink: {
    styleOverrides: {
      root: {
        color: odysseyTokens.TypographyColorAction,
        textDecoration: "none",
        cursor: "pointer",

        "&:visited": {
          color: odysseyTokens.TypographyColorAction,
        },

        "&:hover": {
          color: odysseyTokens.PalettePrimaryDark,
          textDecoration: "underline",
        },

        "&:focus-visible": {
          borderRadius: odysseyTokens.BorderRadiusTight,
          outlineColor: odysseyTokens.FocusOutlineColorPrimary,
          outlineOffset: odysseyTokens.FocusOutlineOffsetMain,
          outlineStyle: odysseyTokens.FocusOutlineStyle,
          outlineWidth: odysseyTokens.FocusOutlineWidthMain,
          textDecoration: "none",
        },

        ".Link-indicator, .Link-icon": {
          display: "inline-block",
          height: "1em",
          lineHeight: 1,
          [`& .${svgIconClasses.root}`]: {
            fontSize: "1em",
          },
        },

        ".Link-indicator": {
          marginInlineStart: odysseyTokens.Spacing1,
        },

        ".Link-icon": {
          marginInlineEnd: odysseyTokens.Spacing1,
        },

        [`.${svgIconClasses.root}`]: {
          fontSize: "1.2em",
          height: "1em",
          position: "relative",
          insetBlockStart: "-0.0625em",
          verticalAlign: "middle",
          width: "1em",
        },
      },
    },
    variants: [
      {
        props: { variant: "monochrome" },
        style: {
          color: odysseyTokens.TypographyColorBody,
          textDecoration: "underline",

          "&:visited": {
            color: odysseyTokens.TypographyColorBody,
          },

          "&:hover": {
            color: odysseyTokens.TypographyColorSubordinate,
          },
        },
      },
    ],
  },
});
