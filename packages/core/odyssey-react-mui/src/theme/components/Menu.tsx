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

import { dividerClasses } from "@mui/material/Divider";
import { formControlLabelClasses } from "@mui/material/FormControlLabel";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { menuItemClasses } from "@mui/material/MenuItem";
import { typographyClasses } from "@mui/material/Typography";

import type { GetComponentsProps } from "./types.js";

export const menuComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiMenu" | "MuiMenuItem"
> => ({
  MuiMenu: {
    defaultProps: {
      elevation: 2,
    },
    styleOverrides: {
      list: {
        paddingBlock: odysseyTokens.Spacing2,
        paddingInline: `${odysseyTokens.Spacing2} !important`,
        borderRadius: odysseyTokens.BorderRadiusMain,
      },
      root: {
        "& hr": {
          borderStyle: "solid none none",
          borderWidth: odysseyTokens.BorderWidthMain,
          borderColor: odysseyTokens.BorderColorDisplay,
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        gap: odysseyTokens.Spacing2,
        minHeight: "unset",
        maxWidth: `calc(55ch - ${odysseyTokens.Spacing4})`,
        paddingBlock: odysseyTokens.Spacing3,
        paddingInline: odysseyTokens.Spacing4,
        borderRadius: odysseyTokens.BorderRadiusMain,
        whiteSpace: "normal",

        [`& .${formControlLabelClasses.root}`]: {
          gap: "unset",
        },

        "&:hover": {
          textDecoration: "none",
          backgroundColor: odysseyTokens.HueNeutral100,

          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
        },

        [`:focus-visible`]: {
          backgroundColor: odysseyTokens.HueNeutral100,
        },

        [`&.${menuItemClasses.root}-destructive`]: {
          color: odysseyTokens.TypographyColorDanger,

          [`.${typographyClasses.root}`]: {
            color: "inherit",
          },
        },

        "&.isVisiblySelected": {
          backgroundColor: `${odysseyTokens.PalettePrimaryLighter} !important`,

          [`& .${typographyClasses.root}`]: {
            color: odysseyTokens.HueBlue600,
          },
        },

        [`&.${menuItemClasses.selected}`]: {
          backgroundColor: "transparent",
          color: odysseyTokens.TypographyColorAction,
          fontWeight: odysseyTokens.TypographyWeightBodyBold,

          "&:hover": {
            backgroundColor: odysseyTokens.PalettePrimaryLighter,

            "@media (hover: none)": {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,
            },
          },

          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: odysseyTokens.PalettePrimaryLighter,
            color: odysseyTokens.TypographyColorAction,

            "&:hover": {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,

              "@media (hover: none)": {
                backgroundColor: odysseyTokens.PalettePrimaryLighter,
              },
            },
          },
        },

        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: "transparent",
          boxShadow: theme.mixins.insetFocusRing,

          "&:hover": {
            backgroundColor: odysseyTokens.HueNeutral100,

            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: "transparent",
            },
          },
        },

        "&[data-empty='true']": {
          "&:after": {
            content: "'&nbsp;'",
            visibility: "hidden",
          },
        },

        ...(!ownerState.disableGutters && {
          paddingInline: odysseyTokens.Spacing4,
        }),

        ...(ownerState.divider && {
          borderBlockEnd: `1px solid ${odysseyTokens.BorderColorDisplay}`,
        }),

        [`&.${menuItemClasses.disabled}`]: {
          opacity: 1,
          color: odysseyTokens.TypographyColorDisabled,

          [`.${typographyClasses.root}`]: {
            color: "inherit",
          },
        },

        [`& + .${dividerClasses.root}`]: {
          marginBlock: odysseyTokens.Spacing1,
        },

        [`& .${listItemTextClasses.root}`]: {
          marginBlock: 0,
        },

        [`& .${listItemIconClasses.root}`]: {
          minWidth: "unset",
        },
      }),
    },
  },
});
