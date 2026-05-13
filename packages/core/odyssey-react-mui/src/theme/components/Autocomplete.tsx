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

import { autocompleteClasses } from "@mui/material/Autocomplete";

import type { GetComponentsProps } from "./types.js";

import { ChevronDownIcon, CloseIcon } from "../../icons.generated/index.js";

export const autocompleteComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiAutocomplete"
> => ({
  MuiAutocomplete: {
    defaultProps: {
      autoHighlight: true,
      autoSelect: false,
      blurOnSelect: false,
      clearIcon: <CloseIcon />,
      clearOnEscape: true,
      disableClearable: false,
      disabledItemsFocusable: false,
      disableListWrap: false,
      disablePortal: false,
      filterSelectedOptions: false,
      fullWidth: false,
      handleHomeEndKeys: true,
      includeInputInList: true,
      limitTags: -1,
      openOnFocus: false,
      popupIcon: <ChevronDownIcon />,
      selectOnFocus: true,
      slotProps: {
        paper: {
          elevation: 1,
        },
      },
    },
    styleOverrides: {
      root: {
        // MUI wraps Autocomplete in an outer div, making the inner MuiFormControl
        // always :last-child of that wrapper (so its margin is always 0). Move
        // the spacing responsibility here so :last-child works against form siblings.
        marginBlockEnd: odysseyTokens.Spacing4,
        "&:last-child": {
          marginBlockEnd: 0,
        },
      },
      clearIndicator: {
        marginRight: "unset",
        padding: odysseyTokens.Spacing1,
      },
      endAdornment: ({ ownerState }) => ({
        display: "flex",
        gap: odysseyTokens.Spacing1,
        top: "unset",
        right: "unset",
        insetBlockStart: odysseyTokens.Spacing2,
        insetInlineEnd: odysseyTokens.Spacing2,
        maxHeight: "unset",
        alignItems: "center",
        whiteSpace: "nowrap",
        color: odysseyTokens.TypographyColorSubordinate,
        transform: "none",

        ...(ownerState.disabled === true && {
          display: "none",
        }),

        ...(ownerState.readOnly === true && {
          display: "none",
        }),
      }),
      listbox: ({ theme }) => ({
        borderWidth: odysseyTokens.BorderWidthMain,
        borderStyle: odysseyTokens.BorderStyleMain,
        borderColor: odysseyTokens.HueNeutral200,
        paddingBlock: odysseyTokens.Spacing2,
        paddingInline: odysseyTokens.Spacing2,
        borderRadius: odysseyTokens.BorderRadiusMain,

        [`& .${autocompleteClasses.option}`]: {
          minHeight: "unset",
          paddingBlock: odysseyTokens.Spacing3,
          paddingInline: odysseyTokens.Spacing4,
          borderRadius: odysseyTokens.BorderRadiusTight,

          [`&:hover`]: {
            backgroundColor: odysseyTokens.HueNeutral100,
          },

          [`&.${autocompleteClasses.focused}`]: {
            backgroundColor: odysseyTokens.HueNeutral100,
          },

          [`&.${autocompleteClasses.focusVisible}`]: {
            backgroundColor: "transparent",
            boxShadow: theme.mixins.insetFocusRing,

            [`&:hover`]: {
              backgroundColor: odysseyTokens.HueNeutral100,
            },
          },

          [`&[aria-selected="true"]`]: {
            backgroundColor: "transparent",
            color: odysseyTokens.TypographyColorAction,

            [`&:hover`]: {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,
            },

            [`&.${autocompleteClasses.focused}`]: {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,
            },
          },
        },
        "& > ul": {
          position: "relative",
          paddingInlineStart: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
        },
      }),
      loading: {
        paddingBlock: odysseyTokens.Spacing3,
        paddingInline: odysseyTokens.Spacing4,
        borderWidth: odysseyTokens.BorderWidthMain,
        borderStyle: odysseyTokens.BorderStyleMain,
        borderColor: odysseyTokens.HueNeutral200,
        borderRadius: odysseyTokens.BorderRadiusMain,
      },
      popupIndicator: {
        padding: odysseyTokens.Spacing1,
        marginRight: "unset",
      },
      popper: ({ ownerState }) => ({
        background: "transparent",
        paddingBlockStart: odysseyTokens.Spacing1,
        ...(ownerState.ListboxComponent !== undefined && {
          maxHeight: "40vh",
        }),
      }),
      paper: ({ ownerState }) => ({
        /**
         * ListboxComponent is used when `isVirtualized` prop is true.
         * This style is needed to render the virtualized window. It renders out a parent div
         * that needs a height to be set, otherwise the height is 0 and nothing appears.
         */
        ...(ownerState.ListboxComponent !== undefined && {
          height: "100%",
        }),
      }),
      inputRoot: ({ ownerState }) => ({
        ...(ownerState.readOnly === true && {
          backgroundColor: odysseyTokens.HueNeutral50,

          [`&:not(:hover)`]: {
            borderColor: "transparent",
          },
        }),

        ".MuiChip-root": {
          // using 55ch - (48px(padding + clear button) + 4px) for spacing between chip and clear button to account for the 24px of padding on the right side of the container and the width of the clear button.
          // Ensures chip does not enlarge the container or overlap the clear button
          maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} - (${odysseyTokens.Spacing6} + ${odysseyTokens.Spacing6} + ${odysseyTokens.Spacing1}))`,
        },
      }),
    },
  },
});
