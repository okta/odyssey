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

import { chipClasses } from "@mui/material/Chip";
import { inputBaseClasses } from "@mui/material/InputBase";
import { CSSProperties } from "react";

import type { GetComponentsProps } from "./types.js";

import { CloseCircleFilledIcon } from "../../icons.generated/index.js";

export const chipComponents = ({
  odysseyTokens,
  contrastMode,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiChip"
> => ({
  MuiChip: {
    defaultProps: {
      deleteIcon: <CloseCircleFilledIcon />,
    },
    styleOverrides: {
      root: ({ ownerState }) => {
        return {
          height: "auto",
          paddingBlock: `calc(${odysseyTokens.Spacing2} - ${odysseyTokens.BorderWidthMain})`,
          paddingInline: odysseyTokens.Spacing3,
          fontSize: odysseyTokens.TypographySizeBody,
          lineHeight: odysseyTokens.TypographyLineHeightUi,
          borderRadius: odysseyTokens.BorderRadiusRound,
          backgroundColor: odysseyTokens.HueNeutral100,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderColor: odysseyTokens.HueNeutral200,
          borderStyle: odysseyTokens.BorderStyleMain,
          color: odysseyTokens.HueNeutral700,

          ...(ownerState.onDelete && {
            paddingInlineEnd: odysseyTokens.Spacing2,
          }),

          [`&.${chipClasses.disabled}`]: {
            opacity: 1,
            pointerEvents: "none",
            borderColor: odysseyTokens.BorderColorDisabled,
            color: odysseyTokens.TypographyColorDisabled,

            [`& .${chipClasses.deleteIcon}`]: {
              color: odysseyTokens.HueNeutral300,
            },
            [`& .${chipClasses.icon}`]: {
              color: odysseyTokens.HueNeutral300,
            },
          },

          [`&.${chipClasses.focusVisible}`]: {
            backgroundColor: odysseyTokens.HueNeutral200,
            outlineColor: odysseyTokens.FocusOutlineColorPrimary,
            outlineOffset: odysseyTokens.FocusOutlineOffsetTight,
            outlineStyle: odysseyTokens.FocusOutlineStyle,
            outlineWidth: odysseyTokens.FocusOutlineWidthMain,
          },

          ...(ownerState.clickable && {
            "&:hover": {
              backgroundColor: odysseyTokens.HueNeutral200,
            },
            "&:active": {
              boxShadow: "none",
              backgroundColor: odysseyTokens.HueNeutral300,
            },
          }),

          [`& .${chipClasses.icon}`]: {
            margin: 0,
            marginInlineEnd: odysseyTokens.Spacing1,
          },

          ...(ownerState.variant === "lamp" && {
            paddingBlock: 0,
            paddingInline: 0,
            borderRadius: 0,
            border: 0,
            backgroundColor: "transparent",
            color: odysseyTokens.TypographyColorBody,

            "&::before": {
              content: "''",
              width: odysseyTokens.Spacing2,
              height: odysseyTokens.Spacing2,
              marginInlineEnd: odysseyTokens.Spacing2,
              borderRadius: "100%",
              backgroundColor: odysseyTokens.HueNeutral600,
            },

            [`&.${chipClasses.colorError}`]: {
              "&::before": {
                border: 0,
                backgroundColor: odysseyTokens.PaletteDangerMain,
              },
            },

            [`&.${chipClasses.colorInfo}`]: {
              "&::before": {
                border: 0,
                backgroundColor: odysseyTokens.PalettePrimaryMain,
              },
            },

            [`&.${chipClasses.colorSuccess}`]: {
              "&::before": {
                border: 0,
                backgroundColor: odysseyTokens.PaletteSuccessMain,
              },
            },

            [`&.${chipClasses.colorWarning}`]: {
              "&::before": {
                border: 0,
                backgroundColor: odysseyTokens.HueYellow200,
              },
            },
          }),

          ...(ownerState.variant === "pill" && {
            paddingBlock: odysseyTokens.Spacing1,
            paddingInline: odysseyTokens.Spacing2,
            borderRadius: odysseyTokens.BorderRadiusMain,
            border: 0,
            fontWeight: odysseyTokens.TypographyWeightHeadingBold,
            lineHeight: odysseyTokens.TypographyLineHeightOverline,
            fontSize: "0.71428571rem",
            textTransform: "uppercase",

            ...(contrastMode === "highContrast" && {
              backgroundColor: odysseyTokens.HueNeutral200,
              color: odysseyTokens.HueNeutral700,
            }),
            ...(contrastMode === "lowContrast" && {
              backgroundColor: odysseyTokens.HueNeutral50,
              color: odysseyTokens.TypographyColorSubordinate,
            }),

            [`&.${chipClasses.colorError}`]: {
              ...(contrastMode === "highContrast" && {
                backgroundColor: odysseyTokens.HueRed100,
                color: odysseyTokens.HueRed700,
              }),
              ...(contrastMode === "lowContrast" && {
                backgroundColor: odysseyTokens.PaletteDangerLighter,
                color: odysseyTokens.TypographyColorDanger,
              }),
            },

            [`&.${chipClasses.colorInfo}`]: {
              ...(contrastMode === "highContrast" && {
                backgroundColor: odysseyTokens.HueBlue100,
                color: odysseyTokens.HueBlue700,
              }),
              ...(contrastMode === "lowContrast" && {
                backgroundColor: odysseyTokens.PalettePrimaryLighter,
                color: odysseyTokens.PalettePrimaryText,
              }),
            },

            [`&.${chipClasses.colorSuccess}`]: {
              ...(contrastMode === "highContrast" && {
                backgroundColor: odysseyTokens.HueGreen200,
                color: odysseyTokens.HueGreen700,
              }),
              ...(contrastMode === "lowContrast" && {
                backgroundColor: odysseyTokens.PaletteSuccessLighter,
                color: odysseyTokens.TypographyColorSuccess,
              }),
            },

            [`&.${chipClasses.colorWarning}`]: {
              ...(contrastMode === "highContrast" && {
                backgroundColor: odysseyTokens.HueYellow100,
                color: odysseyTokens.HueYellow700,
              }),
              ...(contrastMode === "lowContrast" && {
                backgroundColor: odysseyTokens.PaletteWarningLighter,
                color: odysseyTokens.TypographyColorWarning,
              }),
            },
          }),

          [`.${inputBaseClasses.root}.${inputBaseClasses.disabled} &`]: {
            backgroundColor: odysseyTokens.HueNeutral200,
          },
        };
      },

      label: {
        padding: 0,
        flex: 1,

        [`.${inputBaseClasses.root}.${inputBaseClasses.disabled} &`]: {
          color: odysseyTokens.TypographyColorDisabled,
          WebkitTextFillColor: odysseyTokens.TypographyColorDisabled,
        } satisfies CSSProperties,
      },

      deleteIcon: {
        WebkitTapHighlightColor: "transparent",
        color: odysseyTokens.HueNeutral500,
        fontSize: "1em",
        cursor: "pointer",
        margin: "0",
        marginInlineStart: odysseyTokens.Spacing2,

        "&:hover": {
          color: odysseyTokens.HueNeutral600,
        },

        [`.${inputBaseClasses.root}.${inputBaseClasses.disabled} &`]: {
          display: "none",
        },
      },
    },
  },
});
