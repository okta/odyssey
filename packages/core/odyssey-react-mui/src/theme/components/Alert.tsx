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

import { alertTitleClasses } from "@mui/material/AlertTitle";
import { buttonClasses } from "@mui/material/Button";
import { svgIconClasses } from "@mui/material/SvgIcon";

import type { GetComponentsProps } from "./types.js";

import {
  CheckCircleFilledIcon,
  DangerDiamondFilledIcon,
  InformationCircleFilledIcon,
  WarningFilledIcon,
} from "../../icons.generated/index.js";

export const alertComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiAlert" | "MuiAlertTitle"
> => ({
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        error: <DangerDiamondFilledIcon />,
        info: <InformationCircleFilledIcon />,
        success: <CheckCircleFilledIcon />,
        warning: <WarningFilledIcon />,
      },
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        padding: odysseyTokens.Spacing4,
        gap: odysseyTokens.Spacing4,
        color: odysseyTokens.TypographyColorBody,
        border: "1px solid",

        // Severity color variation
        ...(ownerState.severity === "success" && {
          backgroundColor: odysseyTokens.HueGreen50,
          borderColor: odysseyTokens.HueGreen200,

          ...(ownerState.variant === "toast" && {
            backgroundColor: odysseyTokens.HueGreen50.concat(
              odysseyTokens.PaletteAlphaSemi,
            ),
          }),
        }),
        ...(ownerState.severity === "info" && {
          backgroundColor: odysseyTokens.HueBlue50,
          borderColor: odysseyTokens.HueBlue200,

          ...(ownerState.variant === "toast" && {
            backgroundColor: odysseyTokens.HueBlue50.concat(
              odysseyTokens.PaletteAlphaSemi,
            ),
          }),
        }),
        ...(ownerState.severity === "error" && {
          backgroundColor: odysseyTokens.HueRed50,
          borderColor: odysseyTokens.HueRed200,

          ...(ownerState.variant === "toast" && {
            backgroundColor: odysseyTokens.HueRed50.concat(
              odysseyTokens.PaletteAlphaSemi,
            ),
          }),
        }),
        ...(ownerState.severity === "warning" && {
          backgroundColor: odysseyTokens.HueYellow50,
          borderColor: odysseyTokens.HueYellow500,

          ...(ownerState.variant === "toast" && {
            backgroundColor: odysseyTokens.HueYellow50.concat(
              odysseyTokens.PaletteAlphaSemi,
            ),
          }),
        }),

        // Alert title variation
        [`& .${alertTitleClasses.root}`]: {
          ...(ownerState.severity === "success" && {
            color: odysseyTokens.PaletteSuccessHeading,
          }),
          ...(ownerState.severity === "info" && {
            color: odysseyTokens.PalettePrimaryHeading,
          }),
          ...(ownerState.severity === "error" && {
            color: odysseyTokens.PaletteDangerHeading,
          }),
          ...(ownerState.severity === "warning" && {
            color: odysseyTokens.PaletteWarningHeading,
          }),
          ...(ownerState.variant === "banner" && {
            marginBlockEnd: 0,
          }),
          ...(ownerState.variant === "callout" && {
            fontSize: odysseyTokens.TypographySizeHeading5,
            lineHeight: odysseyTokens.TypographyLineHeightHeading5,
          }),
        },

        // Alert variant styling
        ...(ownerState.variant === "banner" && {
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
          borderWidth: 0,
          borderBottomWidth: "1px",

          ...(ownerState.onClose !== undefined && {
            paddingInline: odysseyTokens.Spacing6,
          }),
        }),
        ...(ownerState.variant === "callout" && {
          borderRadius: odysseyTokens.BorderRadiusMain,
          padding: odysseyTokens.Spacing5,
          "&:not(:last-child)": {
            marginBottom: odysseyTokens.Spacing6,
          },
        }),
        ...(ownerState.variant === "toast" && {
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          borderRadius: odysseyTokens.BorderRadiusOuter,
          position: "relative",
          paddingInlineStart: odysseyTokens.Spacing5,
          paddingInlineEnd: odysseyTokens.Spacing4,
          paddingBlock: odysseyTokens.Spacing3,
          alignItems: "flex-start",
          backdropFilter: "blur(10px)",
        }),
      }),
      action: ({ ownerState }) => ({
        ...(ownerState.variant === "banner" && {
          padding: 0,
          marginInlineEnd: 0,
          insetBlockStart: "50%",
          insetInlineEnd: odysseyTokens.Spacing2,
          position: "absolute",
          transform: "translateY(-50%)",
        }),
        ...(ownerState.variant === "toast" && {
          padding: 0,
          marginInline: 0,
          marginBlock: 1,

          [`& .${buttonClasses.root}`]: {
            "&:hover, &:focus": {
              backgroundColor: odysseyTokens.PaletteNeutralDark.concat("11"),
            },

            "&:active": {
              backgroundColor: odysseyTokens.PaletteNeutralDark.concat("22"),
            },
          },
        }),
      }),
      icon: ({ ownerState }) => ({
        marginInlineEnd: 0,
        padding: 0,
        height: `calc(${odysseyTokens.TypographySizeHeading6} * ${odysseyTokens.TypographyLineHeightHeading6})`,
        opacity: 1,
        ...(ownerState.severity === "info" && {
          color: odysseyTokens.PalettePrimaryMain,
        }),
        ...(ownerState.severity === "error" && {
          color: odysseyTokens.PaletteDangerMain,
        }),
        ...(ownerState.severity === "success" && {
          color: odysseyTokens.PaletteSuccessMain,
        }),
        ...(ownerState.severity === "warning" && {
          color: odysseyTokens.HueYellow400,
        }),

        ...(ownerState.variant === "toast" && {
          marginBlock: odysseyTokens.Spacing2,
        }),

        ...(ownerState.variant === "callout" && {
          marginBlock: 1.5,
        }),

        [`& .${svgIconClasses.root}`]: {
          alignSelf: "center",
          fontSize: odysseyTokens.TypographySizeHeading6,
        },
      }),
      message: ({ ownerState }) => ({
        padding: 0,
        overflow: "visible",
        ...(ownerState.variant === "banner" && {
          display: "flex",
          justifyContent: "space-between",
          gap: odysseyTokens.Spacing4,
        }),
        ...(ownerState.variant === "toast" && {
          flexGrow: 1,
          marginBlock: odysseyTokens.Spacing2,
        }),
      }),
    },
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        marginBlockStart: 0,
        marginBlockEnd: odysseyTokens.Spacing2,
        lineHeight: odysseyTokens.TypographyLineHeightHeading6,
        fontSize: odysseyTokens.TypographySizeHeading6,
        fontWeight: odysseyTokens.TypographyWeightHeading,
        fontFamily: odysseyTokens.TypographyFamilyHeading,

        ...(ownerState.severity === "info" && {
          color: odysseyTokens.PalettePrimaryDark,
        }),

        ...(ownerState.severity === "error" && {
          color: odysseyTokens.PaletteDangerDarker,
        }),

        ...(ownerState.severity === "success" && {
          color: odysseyTokens.PaletteSuccessDarker,
        }),

        ...(ownerState.severity === "warning" && {
          color: odysseyTokens.PaletteWarningDarker,
        }),

        [`&:last-child`]: {
          marginBlockEnd: 0,
        },
      }),
    },
  },
});
