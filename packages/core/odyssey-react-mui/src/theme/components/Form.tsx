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

import { checkboxClasses } from "@mui/material/Checkbox";
import { formControlLabelClasses } from "@mui/material/FormControlLabel";
import { formGroupClasses } from "@mui/material/FormGroup";
import { formLabelClasses } from "@mui/material/FormLabel";
import { radioClasses } from "@mui/material/Radio";
import { typographyClasses } from "@mui/material/Typography";

import type { GetComponentsProps } from "./types.js";

export const formComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  | "MuiFormControl"
  | "MuiFormControlLabel"
  | "MuiFormHelperText"
  | "MuiFormLabel"
> => ({
  MuiFormControl: {
    defaultProps: {
      margin: "normal",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        width: "100%",
        maxWidth: odysseyTokens.TypographyLineLengthMax,
        ...(ownerState.margin === "normal" && {
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing4,
          "&:last-child": {
            marginBlockEnd: 0,
          },
        }),
        ...(ownerState.margin === "dense" && {
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing5,
          "&:last-child": {
            marginBlockEnd: 0,
          },
        }),
        ...(ownerState.fullWidth && {
          maxWidth: "100%",
        }),
        [`& .${formGroupClasses.root}`]: {
          marginBlockStart: odysseyTokens.Spacing1,
        },
        [`&:has(+ [data-file-preview-container])`]: {
          marginBlockEnd: 0,
        },

        ".MuiChip-root": {
          // using 55ch - 24px to account for the 24px of padding on the right side of the container.
          // Ensures chip does not enlarge the container
          maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} - ${odysseyTokens.Spacing6})`,
        },
      }),
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        gap: odysseyTokens.Spacing2,
        marginInlineStart: 0,
        marginInlineEnd: 0, // used for row presentation of radio/checkbox
        ...(ownerState.labelPlacement === "start" && {
          marginInlineStart: 0, // used for row presentation of radio/checkbox
          marginInlineEnd: 0,
        }),
        ...(ownerState.labelPlacement === "top" && {
          marginInlineStart: 0,
        }),
        ...(ownerState.labelPlacement === "bottom" && {
          marginInlineStart: 0,
        }),
        "&:not(:last-child)": {
          marginBottom: odysseyTokens.Spacing2,
        },
        "&.Mui-disabled": {
          pointerEvents: "none",
          [`& .${formControlLabelClasses.label}`]: {
            color: odysseyTokens.TypographyColorDisabled,
            [`& .${typographyClasses.root}`]: {
              color: "inherit",
            },
          },
        },
        [`:has(> .${radioClasses.root})`]: {
          alignItems: "flex-start",
        },
        [`&:hover .${radioClasses.root}, &:hover .${checkboxClasses.root}`]: {
          color: odysseyTokens.TypographyColorBody,
        },
        [`&:hover .${radioClasses.root}.Mui-checked, &:hover .${checkboxClasses.root}.Mui-checked`]:
          {
            color: odysseyTokens.PalettePrimaryDark,
          },
        [`&.Mui-error:hover .${radioClasses.root}, &.Mui-error:hover .${checkboxClasses.root}`]:
          {
            color: odysseyTokens.PaletteDangerDark,
          },
        [`&.Mui-error:hover .${radioClasses.root}.Mui-checked, &.Mui-error:hover .${checkboxClasses.root}.Mui-checked`]:
          {
            color: odysseyTokens.PaletteDangerDark,
          },
      }),
      label: () => ({
        gap: odysseyTokens.Spacing1,
        lineHeight: odysseyTokens.TypographyLineHeightUi,
      }),
      asterisk: () => ({
        display: "none",
      }),
    },
  },
  MuiFormHelperText: {
    defaultProps: {
      variant: "standard",
    },
    styleOverrides: {
      root: {
        fontSize: odysseyTokens.TypographySizeSubordinate,
        lineHeight: odysseyTokens.TypographyLineHeightBody,
        marginBlockEnd: odysseyTokens.Spacing2,
        marginBlockStart: odysseyTokens.Spacing1,
        textAlign: "start",

        [`.${formLabelClasses.root} + &`]: {
          marginBlockStart: `-${odysseyTokens.Spacing1}`,
          color: odysseyTokens.TypographyColorSubordinate,
        },

        "&:last-child": {
          marginBlockEnd: 0,
        },

        ".Mui-disabled &": {
          color: odysseyTokens.TypographyColorDisabled,

          a: {
            color: odysseyTokens.TypographyColorDisabled,
          },
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        alignItems: "center",
        color: odysseyTokens.TypographyColorBody,
        display: "inline-flex",
        lineHeight: odysseyTokens.TypographyLineHeightUi,
        fontSize: odysseyTokens.TypographySizeBody,
        fontWeight: odysseyTokens.TypographyWeightBodyBold,
        marginBottom: odysseyTokens.Spacing2,
        "&.Mui-focused, &.Mui-error, &.Mui-disabled": {
          color: odysseyTokens.TypographyColorBody,
        },
        "& > .MuiTypography-root": {
          margin: "reset",
          marginInlineStart: odysseyTokens.Spacing1,
        },
      },
    },
  },
});
