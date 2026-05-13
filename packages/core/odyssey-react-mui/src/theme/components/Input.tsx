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

import { CSSObject } from "@emotion/react";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { CSSProperties } from "react";

import type { GetComponentsProps } from "./types.js";

export const inputComponents = ({
  odysseyTokens,
  contrastMode,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiInput" | "MuiInputAdornment" | "MuiInputBase" | "MuiInputLabel"
> => ({
  MuiInput: {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        "label + &": {
          marginTop: 0,
        },
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        display: "flex",
        minWidth: "1.25em",
        maxHeight: "unset",
        margin: 0,
        alignItems: "center",
        whiteSpace: "nowrap",
        color: odysseyTokens.TypographyColorSubordinate,
        ...(ownerState.position === "start" && {
          marginInlineStart: odysseyTokens.Spacing3,
        }),
        ...(ownerState.position === "end" && {
          marginInlineEnd: odysseyTokens.Spacing2,
        }),
        ...(ownerState.disablePointerEvents === true && {
          pointerEvents: "none",
        }),
      }),
    },
  },
  MuiInputBase: {
    defaultProps: {
      minRows: 3,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...theme.typography.body1,
        flex: "1",
        width: "auto",
        color: odysseyTokens.TypographyColorBody,
        lineHeight: odysseyTokens.TypographyLineHeightUi,
        borderWidth: odysseyTokens.BorderWidthMain,
        borderStyle: odysseyTokens.BorderStyleMain,
        borderRadius: odysseyTokens.BorderRadiusMain,
        borderColor: odysseyTokens.HueNeutral500,
        boxShadow: `0 0 0 0 transparent`,
        backgroundColor: odysseyTokens.HueNeutralWhite,
        transition: theme.transitions.create(
          ["border-color", "background-color", "box-shadow"],
          {
            duration: odysseyTokens.TransitionDurationMain,
          },
        ),

        ["&[data-ods-type='search']"]: {
          borderColor: odysseyTokens.HueNeutral400,

          ...(contrastMode === "highContrast" && {
            border: "none",
          }),

          [`& .${inputBaseClasses.input}::placeholder`]: {
            color: odysseyTokens.TypographyColorSupport,
            opacity: 1,
          },
        },

        ["&[data-ods-variant='filled']"]: {
          backgroundColor: odysseyTokens.HueNeutral50,
          borderColor: odysseyTokens.HueNeutral50,

          [`&:hover`]: {
            borderColor: odysseyTokens.HueNeutral400,
          },

          [`&.${inputBaseClasses.focused}`]: {
            borderColor: odysseyTokens.FocusOutlineColorPrimary,
            boxShadow: `0 0 0 1px ${odysseyTokens.FocusOutlineColorPrimary}`,
          },
        },

        ...(ownerState.fullWidth && {
          width: "100%",
        }),

        ...(ownerState.readOnly === true && {
          borderColor: "transparent",
          backgroundColor: odysseyTokens.HueNeutral50,
        }),

        [`&:hover`]: {
          borderColor: odysseyTokens.HueNeutral900,
        },

        [`&.${inputBaseClasses.focused}`]: {
          borderColor: odysseyTokens.FocusOutlineColorPrimary,
          boxShadow: `0 0 0 1px ${odysseyTokens.FocusOutlineColorPrimary}`,
          outline: `${odysseyTokens.FocusOutlineWidthMain} ${odysseyTokens.FocusOutlineStyle} transparent`,
          outlineOffset: odysseyTokens.FocusOutlineOffsetTight,
        },

        [`&.${inputBaseClasses.error}`]: {
          borderColor: odysseyTokens.BorderColorDangerControl,
        },

        [`&.${inputBaseClasses.error}:hover`]: {
          borderColor: odysseyTokens.HueNeutral900,
        },

        [`&.${inputBaseClasses.error}.${inputBaseClasses.focused}`]: {
          borderColor: odysseyTokens.FocusOutlineColorPrimary,
          boxShadow: `0 0 0 1px ${odysseyTokens.FocusOutlineColorPrimary}`,
        },

        [`&.${inputBaseClasses.disabled}`]: {
          color: odysseyTokens.TypographyColorDisabled,
          borderColor: odysseyTokens.BorderColorDisabled,
          pointerEvents: "auto",
          backgroundColor: odysseyTokens.HueNeutral50,
          cursor: "not-allowed",
        },
      }),
      input: {
        height: "auto",
        // We're subtracting a pixel so the total height, including borders, is 40px
        paddingBlock: `calc(${odysseyTokens.Spacing3} - ${odysseyTokens.BorderWidthMain})`,
        paddingInline: odysseyTokens.Spacing3,
        boxShadow: "none",

        [`.${inputBaseClasses.disabled} &`]: {
          pointerEvents: "auto",
          cursor: "not-allowed",
        },

        [`.${inputAdornmentClasses.root} + &`]: {
          paddingInlineStart: odysseyTokens.Spacing2,
        },

        [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
          "&::placeholder": {
            color: odysseyTokens.TypographyColorSupport,
            opacity: "1 !important",
          },
        },

        [`&::-webkit-search-cancel-button`]: {
          display: "none",
          MozAppearance: "none",
          WebkitAppearance: "none",
        } satisfies CSSProperties,

        [`&::-ms-clear`]: {
          display: "none",
        },

        // Chrome, Edge, and Safari (Blink/WebKit) reset border-radius on autofilled
        // inputs, causing corners to appear square.
        [`&:-webkit-autofill,
          &:-webkit-autofill:hover,
          &:-webkit-autofill:focus,
          &:-webkit-autofill:active`]: {
          borderRadius: odysseyTokens.BorderRadiusMain,
        },
      },
    },
  },
  MuiInputLabel: {
    defaultProps: {
      disableAnimation: true,
      shrink: false,
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        display: "flex",
        justifyContent: "space-between",
        overflow: "unset",
        whiteSpace: "unset",
        ...(ownerState.formControl
          ? {
              position: "initial",
              transform: "none",
            }
          : {}),
        ...(ownerState.variant === "outlined" && {
          pointerEvents: "initial",
          transform: "none",
          maxWidth: "100%",
          ...(ownerState.size === "small" && {
            transform: "none",
          }),
        }),
        [`& > .MuiTypography-root`]: {
          lineHeight: "unset",
        } satisfies CSSObject,
      }),
    },
  },
});
