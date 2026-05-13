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

import { ChevronDownIcon } from "../../icons.generated/index.js";

export const selectComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiSelect"
> => ({
  MuiSelect: {
    defaultProps: {
      variant: "standard",
      IconComponent: ChevronDownIcon,
      MenuProps: {
        PaperProps: {
          elevation: 1,
        },
      },
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState?.inputProps?.readOnly
          ? {
              "&.MuiInputBase-root": {
                backgroundColor: odysseyTokens.HueNeutral50,
                borderColor: odysseyTokens.HueNeutral200,
                "&:hover": {
                  backgroundColor: odysseyTokens.HueNeutral50,
                },
                "&.Mui-focused": {
                  borderColor: odysseyTokens.PalettePrimaryMain,
                },
              },
            }
          : {}),
        "& .MuiSelect-icon": {
          right: "unset",
          insetInlineEnd: odysseyTokens.Spacing3,
          color: odysseyTokens.TypographyColorSubordinate,
        },
      }),
      select: ({ ownerState }) => ({
        height: "auto",
        // We're subtracting a pixel so the total height, including borders, is 40px
        paddingBlock: `calc(${odysseyTokens.Spacing3} - ${odysseyTokens.BorderWidthMain})`,
        paddingInline: odysseyTokens.Spacing3,
        // Setting min-height to the line-height here to avoid the select shrinking in size when the value is an empty string
        minHeight: `${odysseyTokens.TypographyLineHeightUi}em`,

        "&:focus": {
          backgroundColor: "transparent",
        },

        "& .MuiBox-root": {
          display: "flex",
          flexWrap: "wrap",
          gap: odysseyTokens.Spacing1,
          marginBlock: `-${odysseyTokens.Spacing2}`,
          marginInlineStart: `-${odysseyTokens.Spacing2}`,
        },

        ["& .MuiListItemSecondaryAction-root"]: {
          display: "none",
        },

        ...(ownerState?.inputProps?.readOnly
          ? {
              color: odysseyTokens.HueNeutral700,
              cursor: "default",
              "&:focus": {
                backgroundColor: "transparent",
                borderColor: odysseyTokens.PalettePrimaryMain,
              },
            }
          : {}),
      }),
    },
  },
});
