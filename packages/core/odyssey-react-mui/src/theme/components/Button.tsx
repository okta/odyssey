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

import { buttonClasses } from "@mui/material/Button";

import type { GetComponentsProps } from "./types.js";

export const buttonComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiButton" | "MuiButtonBase"
> => ({
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      variant: "primary",
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        return {
          minWidth: "unset",
          paddingBlock: odysseyTokens.Spacing3,
          paddingInline: odysseyTokens.Spacing4,
          display: "inline-flex",
          height: odysseyTokens.Spacing7,
          position: "relative",
          marginBlock: "0",
          marginInline: "0",
          transition: theme.transitions.create(
            ["color", "background-color", "border-color", "box-shadow"],
            {
              duration: odysseyTokens.TransitionDurationMain,
              easing: odysseyTokens.TransitionTimingMain,
            },
          ),
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderRadius: odysseyTokens.BorderRadiusMain,
          borderColor: "transparent",
          fontSize: odysseyTokens.TypographySizeBody,
          fontWeight: odysseyTokens.TypographyWeightHeading,
          fontFamily: odysseyTokens.TypographyFamilyButton,
          lineHeight: odysseyTokens.TypographyLineHeightUi,
          whiteSpace: "nowrap",

          [`.${buttonClasses.root} + &`]: {
            marginInlineStart: odysseyTokens.Spacing2,
          },

          "&:focus-visible": {
            boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PalettePrimaryMain}`,
            outline: "2px solid transparent",
            outlineOffset: "1px",
          },

          "&&[aria-disabled='true']": {
            pointerEvents: "none",
            cursor: "default",
          },

          [`.${buttonClasses.startIcon}, .${buttonClasses.endIcon}`]: {
            "& > *:nth-of-type(1)": {
              fontSize: `${odysseyTokens.TypographyLineHeightUi}em`,
            },
          },

          ...(ownerState.size === "small" && {
            height: odysseyTokens.Spacing6,
            paddingBlock: odysseyTokens.Spacing2,
            paddingInline: odysseyTokens.Spacing3,
            fontSize: odysseyTokens.TypographySizeBody,
          }),

          ...(ownerState.size === "large" && {
            height: odysseyTokens.Spacing8,
            paddingBlock: odysseyTokens.Spacing4,
            paddingInline: odysseyTokens.Spacing4,
          }),

          ...(ownerState.fullWidth === true && {
            width: "100%",
            marginBlock: "0",
            marginInline: "0",

            "&:not(:last-child)": {
              marginBlockEnd: odysseyTokens.Spacing4,
            },
          }),

          ...(ownerState.variant === "primary" && {
            color: odysseyTokens.HueNeutralWhite,
            backgroundColor: odysseyTokens.PalettePrimaryMain,

            "&:hover:not([aria-disabled='true'])": {
              backgroundColor: odysseyTokens.PalettePrimaryDark,
            },

            "&:active:not([aria-disabled='true']), &[aria-expanded='true']:not([aria-disabled='true'])":
              {
                backgroundColor: odysseyTokens.PalettePrimaryDarker,
              },

            "&[aria-disabled='true']": {
              color: odysseyTokens.PalettePrimaryLight,
              backgroundColor: odysseyTokens.HueBlue100,
            },
          }),

          ...(ownerState.variant === "secondary" && {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.HueNeutral300,
            color: odysseyTokens.TypographyColorBody,

            "&:hover:not([aria-disabled='true'])": {
              backgroundColor: odysseyTokens.HueNeutral200,
              borderColor: odysseyTokens.HueNeutral400,
            },

            "&:active:not([aria-disabled='true']), &[aria-expanded='true']:not([aria-disabled='true'])":
              {
                backgroundColor: "transparent",
                borderColor: odysseyTokens.BorderColorPrimaryControl,
                color: odysseyTokens.TypographyColorAction,
              },

            "&[aria-disabled='true']": {
              backgroundColor: odysseyTokens.HueNeutral200,
              borderColor: "transparent",
              color: odysseyTokens.TypographyColorDisabled,
            },
          }),

          ...(ownerState.variant === "danger" && {
            backgroundColor: odysseyTokens.PaletteDangerMain,
            color: odysseyTokens.HueNeutralWhite,

            "&:hover:not([aria-disabled='true'])": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
            },

            "&:active:not([aria-disabled='true']), &[aria-expanded='true']:not([aria-disabled='true'])":
              {
                backgroundColor: odysseyTokens.PaletteDangerDarker,
              },

            "&[aria-disabled='true']": {
              color: odysseyTokens.PaletteDangerLight,
              backgroundColor: odysseyTokens.HueRed100,
            },
          }),

          ...(ownerState.variant === "dangerSecondary" && {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.HueNeutral300,
            color: odysseyTokens.PaletteDangerMain,

            "&:hover:not([aria-disabled='true'])": {
              backgroundColor: odysseyTokens.HueNeutral200,
              borderColor: odysseyTokens.HueNeutral400,
              color: odysseyTokens.PaletteDangerMain,
            },

            "&:active:not([aria-disabled='true']), &[aria-expanded='true']:not([aria-disabled='true'])":
              {
                backgroundColor: "transparent",
                borderColor: odysseyTokens.PaletteDangerMain,
                color: odysseyTokens.PaletteDangerMain,
              },

            "&[aria-disabled='true']": {
              backgroundColor: odysseyTokens.PaletteDangerHighlight,
              borderColor: "transparent",
              color: odysseyTokens.PaletteDangerLight,
            },
          }),

          ...(ownerState.variant === "floating" && {
            backgroundColor: "transparent",
            color: odysseyTokens.TypographyColorBody,

            "&:hover:not([aria-disabled='true'])": {
              backgroundColor: odysseyTokens.HueNeutral200,
            },

            "&:active:not([aria-disabled='true']), &[aria-expanded='true']:not([aria-disabled='true'])":
              {
                backgroundColor: "transparent",
                color: odysseyTokens.HueBlue600,
                borderColor: odysseyTokens.HueBlue600,
              },

            "&[aria-disabled='true']": {
              backgroundColor: "transparent",
              color: odysseyTokens.TypographyColorDisabled,
            },
          }),

          ...(ownerState.variant === "floatingAction" && {
            backgroundColor: "transparent",
            color: odysseyTokens.TypographyColorAction,

            "&:hover:not([aria-disabled='true'])": {
              backgroundColor: odysseyTokens.HueNeutral200,
            },

            "&:active:not([aria-disabled='true']), &[aria-expanded='true']:not([aria-disabled='true'])":
              {
                backgroundColor: "transparent",
                borderColor: odysseyTokens.HueBlue600,
              },

            "&[aria-disabled='true']": {
              backgroundColor: "transparent",
              color: odysseyTokens.TypographyColorDisabled,
            },
          }),

          ...(ownerState.children === "" && {
            minWidth: "auto",
            padding: odysseyTokens.Spacing3,

            [`.${buttonClasses.endIcon}, .${buttonClasses.startIcon}`]: {
              margin: "0",
            },

            ...(ownerState.size === "large" && {
              padding: odysseyTokens.Spacing4,
            }),

            ...(ownerState.size === "small" && {
              padding: odysseyTokens.Spacing2,
            }),

            ...(ownerState.size === "large" && {
              padding: odysseyTokens.Spacing4,
            }),
          }),
        };
      },

      endIcon: ({ ownerState }) => {
        const hasNoChildren =
          ownerState.children === "" ||
          ownerState.children === undefined ||
          ownerState.children === null;

        return {
          display: "inline-flex",
          margin: 0,
          marginInlineStart: odysseyTokens.Spacing2,

          ...(hasNoChildren && {
            marginInlineStart: 0,
          }),
        };
      },

      startIcon: ({ ownerState }) => {
        const hasNoChildren =
          ownerState.children === "" ||
          ownerState.children === undefined ||
          ownerState.children === null;

        return {
          display: "inline-flex",
          margin: 0,
          marginInlineEnd: odysseyTokens.Spacing2,

          ...(hasNoChildren && {
            marginInlineEnd: 0,
          }),
        };
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
});
