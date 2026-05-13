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

import type {} from "@mui/lab/themeAugmentation";
import type { ThemeOptions } from "@mui/material";

import { svgIconClasses } from "@mui/material/SvgIcon";

import type { GetComponentsProps } from "./types.js";

export const tabsComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiTab" | "MuiTabPanel" | "MuiTabs"
> => ({
  MuiTab: {
    defaultProps: {
      iconPosition: "start",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} / 2)`,
        minWidth: "unset",
        minHeight: odysseyTokens.Spacing9,
        padding: `${odysseyTokens.Spacing4} ${odysseyTokens.Spacing1}`,
        fontSize: odysseyTokens.TypographySizeHeading6,
        fontFamily: odysseyTokens.TypographyFamilyHeading,
        lineHeight: odysseyTokens.TypographyLineHeightUi,
        overflow: "visible",
        color: odysseyTokens.HueNeutral600,
        opacity: 1,

        ...(ownerState.selected == true && {
          color: odysseyTokens.TypographyColorAction,
          fontWeight: odysseyTokens.TypographyWeightHeading,
        }),

        ...(ownerState.disabled && {
          color: odysseyTokens.TypographyColorDisabled,
          // !important used to override more specific .Mui-Disabled class selector
          opacity: "1 !important",
        }),

        ...(ownerState.wrapped && {
          fontSize: odysseyTokens.TypographySizeSubordinate,
          lineHeight: odysseyTokens.TypographyLineHeightBody,
        }),

        "&:hover": {
          color: odysseyTokens.TypographyColorAction,
        },

        "&:focus-visible::before, &.Mui-focusVisible::before": {
          content: "''",
          position: "absolute",
          insetBlockStart: odysseyTokens.Spacing4,
          insetInlineEnd: `calc(-1 * ${odysseyTokens.Spacing2})`,
          insetBlockEnd: odysseyTokens.Spacing4,
          insetInlineStart: `calc(-1 * ${odysseyTokens.Spacing2})`,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderColor: odysseyTokens.PalettePrimaryMain,
          borderRadius: odysseyTokens.BorderRadiusMain,
        },

        "& .MuiTab-iconWrapper": {
          marginInlineEnd: odysseyTokens.Spacing1,
        },
      }),
    },
  },
  MuiTabPanel: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiTabs: {
    defaultProps: {
      textColor: "inherit",
    },
    styleOverrides: {
      root: {
        minHeight: "unset",
        marginBottom: odysseyTokens.Spacing5,
      },

      scroller: {
        borderBottom: `${odysseyTokens.BorderWidthMain} ${odysseyTokens.BorderStyleMain} ${odysseyTokens.BorderColorDisplay}`,
      },

      flexContainer: {
        gap: odysseyTokens.Spacing5,
      },

      scrollButtons: ({ theme }) => ({
        zIndex: 1,
        transition: theme.transitions.create("opacity", {
          duration: odysseyTokens.TransitionDurationMain,
          easing: odysseyTokens.TransitionTimingMain,
        }),

        [`& .${svgIconClasses.root}`]: {
          width: odysseyTokens.Spacing4,
          height: odysseyTokens.Spacing4,
          color: odysseyTokens.PaletteNeutralDark,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          width: odysseyTokens.Spacing3,
        },
        "&:first-of-type::after": {
          right: `-${odysseyTokens.Spacing3}`,
          background:
            "linear-gradient(90deg, #FFF 0%, #FFF 72.49%, rgba(255, 255, 255, 0.70) 86.5%, rgba(255, 255, 255, 0.00) 100%)",
        },
        "&:last-of-type::after": {
          left: `-${odysseyTokens.Spacing3}`,
          background:
            "linear-gradient(-90deg, #FFF 0%, #FFF 72.49%, rgba(255, 255, 255, 0.70) 86.5%, rgba(255, 255, 255, 0.00) 100%)",
        },
      }),
    },
  },
});
