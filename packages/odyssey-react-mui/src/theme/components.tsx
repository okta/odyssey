/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ThemeOptions } from "@mui/material";
import type {} from "@mui/lab/themeAugmentation";
import { alertTitleClasses } from "@mui/material/AlertTitle";
import { buttonClasses } from "@mui/material/Button";
import { checkboxClasses } from "@mui/material/Checkbox";
import { chipClasses } from "@mui/material/Chip";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { dividerClasses } from "@mui/material/Divider";
import { formControlLabelClasses } from "@mui/material/FormControlLabel";
import { formLabelClasses } from "@mui/material/FormLabel";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { menuItemClasses } from "@mui/material/MenuItem";
import { radioClasses } from "@mui/material/Radio";
import { stackClasses } from "@mui/material/Stack";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { tableBodyClasses } from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import { tableHeadClasses } from "@mui/material/TableHead";
import { tableRowClasses } from "@mui/material/TableRow";
import { tableSortLabelClasses } from "@mui/material/TableSortLabel";
import { tooltipClasses } from "@mui/material/Tooltip";
import { typographyClasses } from "@mui/material/Typography";

import {
  ArrowDownIcon,
  CheckCircleFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseCircleFilledIcon,
  CloseIcon,
  DangerDiamondFilledIcon,
  InformationCircleFilledIcon,
  SubtractIcon,
  WarningFilledIcon,
} from "../icons";
import { DesignTokens } from "./theme";

export const components = (
  odysseyTokens: DesignTokens
): ThemeOptions["components"] => {
  return {
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
          border: 0,

          // Severity color variation
          ...(ownerState.severity === "success" && {
            backgroundColor: odysseyTokens.HueGreen100,

            ...(ownerState.variant === "toast" && {
              backgroundColor: odysseyTokens.HueGreen100.concat(
                odysseyTokens.PaletteAlphaSemi
              ),
            }),
          }),
          ...(ownerState.severity === "info" && {
            backgroundColor: odysseyTokens.HueBlue100,

            ...(ownerState.variant === "toast" && {
              backgroundColor: odysseyTokens.HueBlue100.concat(
                odysseyTokens.PaletteAlphaSemi
              ),
            }),
          }),
          ...(ownerState.severity === "error" && {
            backgroundColor: odysseyTokens.HueRed100,

            ...(ownerState.variant === "toast" && {
              backgroundColor: odysseyTokens.HueRed100.concat(
                odysseyTokens.PaletteAlphaSemi
              ),
            }),
          }),
          ...(ownerState.severity === "warning" && {
            backgroundColor: odysseyTokens.HueYellow100,

            ...(ownerState.variant === "toast" && {
              backgroundColor: odysseyTokens.HueYellow100.concat(
                odysseyTokens.PaletteAlphaSemi
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
          },

          // Alert variant styling
          ...(ownerState.variant === "banner" && {
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,

            ...(ownerState.onClose !== undefined && {
              paddingInline: odysseyTokens.Spacing6,
            }),
          }),
          ...(ownerState.variant === "infobox" && {
            borderRadius: odysseyTokens.BorderRadiusMain,
            "&:not(:last-child)": {
              marginBottom: odysseyTokens.Spacing6,
            },
          }),
          ...(ownerState.variant === "toast" && {
            maxWidth: odysseyTokens.TypographyLineLengthMax,
            borderRadius: odysseyTokens.BorderRadiusOuter,
            position: "relative",
            alignItems: "center",
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
            marginInlineStart: 0,
            marginInlineEnd: 0,
          }),
        }),
        icon: ({ ownerState, theme }) => ({
          marginInlineEnd: 0,
          padding: 0,
          height: `calc(${odysseyTokens.TypographySizeHeading6} * ${odysseyTokens.TypographyLineHeightHeading6})`,
          opacity: 1,
          ...(ownerState.severity && {
            color: theme.palette[ownerState.severity].main,
          }),
          ...(ownerState.severity === "warning" && {
            color: theme.palette[ownerState.severity].dark,
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
          }),
        }),
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          marginBlockStart: 0,
          marginBlockEnd: odysseyTokens.Spacing2,
          lineHeight: odysseyTokens.TypographyLineHeightHeading6,
          fontSize: odysseyTokens.TypographySizeHeading6,
          fontWeight: odysseyTokens.TypographyWeightHeading,
          fontFamily: odysseyTokens.TypographyFamilyHeading,

          [`&:last-child`]: {
            marginBlockEnd: 0,
          },
        },
      },
    },
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
      },
      styleOverrides: {
        clearIndicator: {
          marginRight: "unset",
          padding: odysseyTokens.Spacing1,
        },
        endAdornment: ({ theme, ownerState }) => ({
          display: "flex",
          gap: odysseyTokens.Spacing1,
          top: "unset",
          right: "unset",
          insetBlockStart: odysseyTokens.Spacing2,
          insetInlineEnd: odysseyTokens.Spacing2,
          maxHeight: "unset",
          alignItems: "center",
          whiteSpace: "nowrap",
          color: theme.palette.action.active,

          ...(ownerState.disabled === true && {
            display: "none",
          }),

          ...(ownerState.readOnly === true && {
            display: "none",
          }),
        }),
        listbox: {
          paddingBlock: odysseyTokens.Spacing2,
          paddingInline: odysseyTokens.Spacing2,
          borderRadius: odysseyTokens.BorderRadiusMain,
        },
        loading: {
          paddingBlock: odysseyTokens.Spacing3,
          paddingInline: odysseyTokens.Spacing4,
        },
        option: {
          paddingBlock: odysseyTokens.Spacing3,
          borderRadius: odysseyTokens.BorderRadiusTight,
        },
        popupIndicator: {
          padding: odysseyTokens.Spacing1,
          marginRight: "unset",
        },
        inputRoot: ({ ownerState }) => ({
          ...(ownerState.readOnly === true && {
            backgroundColor: odysseyTokens.HueNeutral50,

            [`&:not(:hover)`]: {
              borderColor: "transparent",
            },
          }),
        }),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: "rgba(29,29,33,0.75)",

          ...(ownerState.invisible === true && {
            backgroundColor: "transparent",
          }),
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "primary",
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: "primary" },
          style: ({ theme }) => ({
            fontWeight: odysseyTokens.TypographyWeightBodyBold,
            color: odysseyTokens.HueNeutralWhite,
            borderColor: "transparent",
            backgroundColor: odysseyTokens.PalettePrimaryMain,

            "&:hover, &:focus-visible": {
              backgroundColor: theme.palette.primary.dark,
            },

            "&:active": {
              backgroundColor: odysseyTokens.PalettePrimaryMain,
            },

            "&:disabled": {
              color: odysseyTokens.HueNeutralWhite,
              backgroundColor: theme.palette.primary.light,
              pointerEvents: "initial",
            },
          }),
        },
        {
          props: { variant: "secondary" },
          style: ({ theme }) => ({
            backgroundColor: odysseyTokens.HueNeutral50,
            borderColor: odysseyTokens.HueNeutral200,
            color: odysseyTokens.TypographyColorBody,
            "&:hover, &:focus-visible": {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,
              borderColor: theme.palette.primary.light,
              color: odysseyTokens.TypographyColorAction,
            },

            "&:active": {
              borderColor: odysseyTokens.PalettePrimaryMain,
            },

            "&:disabled": {
              borderColor: odysseyTokens.HueNeutral100,
              backgroundColor: odysseyTokens.HueNeutral100,
              color: odysseyTokens.HueNeutral500,
            },
          }),
        },
        {
          props: { variant: "danger" },
          style: ({ theme }) => ({
            backgroundColor: odysseyTokens.PaletteDangerMain,
            color: odysseyTokens.HueNeutralWhite,
            borderColor: "transparent",

            "&:hover": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
            },

            "&:focus-visible": {
              boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PaletteDangerMain}`,
              backgroundColor: odysseyTokens.PaletteDangerDark,
            },

            "&:active": {
              backgroundColor: odysseyTokens.PaletteDangerMain,
            },

            "&:disabled": {
              color: odysseyTokens.HueNeutralWhite,
              backgroundColor: theme.palette.error.light,
            },
          }),
        },
        {
          props: { variant: "floating" },
          style: {
            backgroundColor: "transparent",
            color: odysseyTokens.TypographyColorBody,
            borderColor: "transparent",

            "&:hover, &:focus-visible": {
              backgroundColor: "rgba(29, 29, 33, 0.1)",
              borderColor: "transparent",
            },
            "&:active": {
              backgroundColor: "rgba(29, 29, 33, 0.2)",
              borderColor: "transparent",
            },
            "&:disabled": {
              backgroundColor: "transparent",
              color: odysseyTokens.TypographyColorSub,
              borderColor: "transparent",
            },
          },
        },
        {
          props: { size: "small" },
          style: {
            paddingBlock: odysseyTokens.Spacing2,
            paddingInline: odysseyTokens.Spacing2,
            fontSize: odysseyTokens.TypographySizeBody,
          },
        },
        {
          props: { size: "large" },
          style: {
            paddingBlock: odysseyTokens.Spacing4,
            paddingInline: odysseyTokens.Spacing4,
          },
        },
        {
          props: { fullWidth: true },
          style: {
            display: "block",
            width: "100%",
            marginBlock: "0",
            marginInline: "0",

            "&:not(:last-child)": {
              marginBlockEnd: odysseyTokens.Spacing4,
            },
          },
        },
        {
          // icon only
          props: { children: "" },
          style: {
            minWidth: "auto",

            [`.${buttonClasses.endIcon}, .${buttonClasses.startIcon}`]: {
              margin: "0",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
          minWidth: "unset",
          padding: odysseyTokens.Spacing3,
          display: "inline-flex",
          position: "relative",
          marginBlock: "0",
          marginInline: "0",
          transitionProperty:
            "color, background-color, border-color, box-shadow",
          transitionDuration: "100ms",
          transitionTimingFunction: "linear",
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderRadius: odysseyTokens.BorderRadiusMain,
          fontSize: odysseyTokens.TypographySizeBody,
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

          "&:disabled": {
            cursor: "not-allowed",
            pointerEvents: "initial",
          },

          "&:disabled:active": {
            pointerEvents: "none",
          },

          [`.${buttonClasses.startIcon}, .${buttonClasses.endIcon}`]: {
            "& > *:nth-of-type(1)": {
              fontSize: `${odysseyTokens.TypographyLineHeightUi}em`,
            },
          },
        },

        endIcon: ({ ownerState }) => ({
          display: "inline-flex",
          margin: 0,
          marginInlineStart: odysseyTokens.Spacing2,

          ...(ownerState.children === undefined && {
            marginInlineStart: 0,
          }),
        }),

        startIcon: ({ ownerState }) => ({
          display: "inline-flex",
          margin: 0,
          marginInlineEnd: odysseyTokens.Spacing2,

          ...(ownerState.children === undefined && {
            marginInlineEnd: 0,
          }),
        }),
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
        icon: <></>,
        checkedIcon: <CheckIcon />,
        indeterminateIcon: <SubtractIcon />,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          width: `${odysseyTokens.TypographyLineHeightUi}em`,
          height: `${odysseyTokens.TypographyLineHeightUi}em`,
          borderRadius: odysseyTokens.BorderRadiusTight,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderColor: odysseyTokens.HueNeutral500,
          padding: 0,
          boxShadow: `0 0 0 0 transparent`,
          transition: theme.transitions.create(
            ["border-color", "background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),

          [`.${svgIconClasses.root}`]: {
            color: odysseyTokens.HueNeutralWhite,
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.short,
            }),
          },

          "&.Mui-checked": {
            backgroundColor: odysseyTokens.PalettePrimaryMain,
            borderColor: odysseyTokens.PalettePrimaryMain,

            [`.${formControlLabelClasses.root}:hover > &`]: {
              backgroundColor: theme.palette.primary.dark,
              borderColor: theme.palette.primary.dark,
            },
          },

          [`.${formControlLabelClasses.root}:hover > &`]: {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.HueNeutral900,
          },
          ".Mui-error:not(.Mui-valid):hover > &": {
            borderColor: odysseyTokens.BorderColorDangerDark,

            "&.Mui-checked": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
              borderColor: odysseyTokens.BorderColorDangerDark,
            },
          },
          ".Mui-error:not(.Mui-valid) > &": {
            borderColor: odysseyTokens.BorderColorDangerMain,

            "&.Mui-checked": {
              backgroundColor: odysseyTokens.PaletteDangerMain,
              borderColor: odysseyTokens.BorderColorDangerMain,
            },

            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PaletteDangerMain}`,
            },
          },
          "&.Mui-focusVisible": {
            borderColor: odysseyTokens.HueNeutral900,
            boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PalettePrimaryMain}`,
            outline: "2px solid transparent",
            outlineOffset: "1px",
          },
          "&.Mui-disabled": {
            backgroundColor: odysseyTokens.HueNeutral50,
            borderColor: odysseyTokens.HueNeutral300,

            ".Mui-error:not(.Mui-valid) > &": {
              backgroundColor: odysseyTokens.HueNeutral50,
              borderColor: odysseyTokens.HueNeutral300,
            },

            [`.${svgIconClasses.root}`]: {
              color: theme.palette.common.black,
            },
          },
        }),
      },
    },
    MuiChip: {
      defaultProps: {
        deleteIcon: <CloseCircleFilledIcon />,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
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
            backgroundColor: odysseyTokens.HueNeutral50,
            color: odysseyTokens.TypographyColorDisabled,
          },

          ...(ownerState.clickable && {
            "&:hover": {
              backgroundColor: odysseyTokens.HueNeutral200,
            },
            [`&.${chipClasses.focusVisible}`]: {
              backgroundColor: odysseyTokens.HueNeutral200,
              outlineColor: odysseyTokens.FocusOutlineColorPrimary,
              outlineOffset: odysseyTokens.FocusOutlineOffsetTight,
              outlineStyle: odysseyTokens.FocusOutlineStyle,
              outlineWidth: odysseyTokens.FocusOutlineWidthMain,
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
              width: ".64em",
              height: ".64em",
              marginInlineEnd: odysseyTokens.Spacing2,
              borderRadius: "100%",
              backgroundColor: "transparent",
              borderColor: odysseyTokens.TypographyColorBody,
              borderWidth: odysseyTokens.BorderWidthHeavy,
              borderStyle: odysseyTokens.BorderStyleMain,
            },

            [`&.${chipClasses.colorError}`]: {
              "&::before": {
                border: 0,
                backgroundColor: odysseyTokens.PaletteDangerMain,
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
            backgroundColor: odysseyTokens.HueNeutral50,
            color: odysseyTokens.TypographyColorSub,
            fontSize: odysseyTokens.TypographySizeCaption,

            "&::before": {
              content: "''",
              width: ".64em",
              height: ".64em",
              marginInlineEnd: odysseyTokens.Spacing1,
              borderRadius: "100%",
              backgroundColor: odysseyTokens.HueNeutral600,
            },

            [`&.${chipClasses.colorError}`]: {
              backgroundColor: odysseyTokens.PaletteDangerLighter,
              color: odysseyTokens.TypographyColorDanger,

              "&::before": {
                backgroundColor: odysseyTokens.PaletteDangerMain,
              },
            },

            [`&.${chipClasses.colorSuccess}`]: {
              backgroundColor: odysseyTokens.PaletteSuccessLighter,
              color: odysseyTokens.TypographyColorSuccess,

              "&::before": {
                backgroundColor: odysseyTokens.PaletteSuccessMain,
              },
            },

            [`&.${chipClasses.colorWarning}`]: {
              backgroundColor: odysseyTokens.PaletteWarningLighter,
              color: odysseyTokens.TypographyColorWarning,

              "&::before": {
                backgroundColor: odysseyTokens.HueYellow200,
              },
            },
          }),

          [`.${inputBaseClasses.root}.${inputBaseClasses.disabled} &`]: {
            backgroundColor: odysseyTokens.HueNeutral200,
          },
        }),

        label: {
          padding: 0,
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
    MuiCircularProgress: {
      defaultProps: {
        size: odysseyTokens.TypographyScale2,
        thickness: 8,
        color: "primary",
        disableShrink: false,
        variant: "indeterminate",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color !== "inherit" && {
            color: odysseyTokens.PalettePrimaryDark,
          }),
        }),
        circle: ({ ownerState }) => ({
          ...(ownerState.variant === "indeterminate" && {
            strokeDasharray: "160%, 360%",
          }),
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
      html {
        font-size: calc((${themeParam.typography.fontSize} / 16) * 100%);
      }
    `,
    },
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: ({ theme }) => ({
          abbr: {
            borderBottomWidth: "1px",
            borderBottomStyle: "dashed",
            borderBottomColor: theme.palette.primary.dark,
            textDecoration: "none",
          },

          address: {
            maxWidth: odysseyTokens.TypographyLineLengthMax,
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,
            marginInline: 0,

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          blockquote: {
            maxWidth: odysseyTokens.TypographyLineLengthMax,
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,
            marginInline: 0,
            paddingBlock: 0,
            paddingInlineStart: odysseyTokens.Spacing2,
            paddingInlineEnd: 0,
            borderInlineStartWidth: "3px",
            borderInlineStartStyle: "solid",
            borderInlineStartColor: odysseyTokens.HueNeutral200,

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          cite: {
            fontStyle: "italic",
          },

          code: {
            fontFamily:
              "'Inconsolata', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace",
          },

          del: {
            display: "inline-block",
            backgroundColor: theme.palette.error.light,

            "&::before, &::after": {
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
              height: "1px",
              overflow: "hidden",
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            },

            "&::before": {
              content: "attr(data-a11y-start)",
            },

            "&::after": {
              content: "attr(data-a11y-end)",
            },
          },

          details: {
            fontSize: odysseyTokens.TypographySizeBody,
          },

          dfn: {
            fontStyle: "italic",
          },

          dl: {
            display: "grid",
            gridGap: `${odysseyTokens.Spacing2} ${odysseyTokens.Spacing4}`,
            gridTemplateColumns: "repeat(2, minmax(min-content, max-content))",
            maxWidth: odysseyTokens.TypographyLineLengthMax,
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,
            marginInline: 0,
            padding: 0,

            "&:last-child": {
              marginBlockEnd: 0,
            },

            dt: {
              gridColumn: 1,
              fontWeight: odysseyTokens.TypographyWeightBodyBold,
            },

            dd: {
              gridColumn: 2,
              fontWeight: 400,
            },
          },

          em: {
            fontStyle: "italic",

            "& > em": {
              textDecoration: "underline",
            },
          },

          figure: {
            display: "grid",
            gridGap: odysseyTokens.Spacing2,
            gridTemplateColumns: "minmax(min-content, max-content)",
            justifyContent: "start",
            justifyItems: "start",
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,
            marginInline: 0,

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          "figcaption:not([class])": {
            color: odysseyTokens.TypographyColorSub,
            fontSize: odysseyTokens.TypographySizeBody,
          },

          hr: {
            marginBlock: odysseyTokens.Spacing2,
            marginInline: 0,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: odysseyTokens.HueNeutral200,
          },

          ins: {
            display: "inline-block",
            backgroundColor: theme.palette.success.light,

            "&::before, &::after": {
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
              height: "1px",
              overflow: "hidden",
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            },

            "&::before": {
              content: "attr(data-a11y-start)",
            },

            "&::after": {
              content: "attr(data-a11y-end)",
            },
          },

          kbd: {
            display: "inline-block",
            minWidth: `calc(${theme.typography.subtitle1.fontSize} * ${theme.typography.h5.lineHeight})`,
            borderStyle: odysseyTokens.BorderStyleMain,
            borderWidth: odysseyTokens.BorderWidthMain,
            borderRadius: odysseyTokens.BorderRadiusMain,
            borderColor: odysseyTokens.HueNeutral200,
            backgroundColor: odysseyTokens.HueNeutral50,
            padding: `calc(${odysseyTokens.Spacing1} / 2) ${odysseyTokens.Spacing1}`,
            fontFamily:
              "'Inconsolata', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace",
            fontSize: odysseyTokens.TypographySizeCaption,
            fontWeight: theme.typography.fontWeightRegular,
            lineHeight: theme.typography.h5.lineHeight,
            boxShadow: `0 1px 1px 0 hsla(240, 6%, 12%, 0.05)`,
          },

          mark: {
            backgroundColor: theme.palette.warning.light,

            "&::before, &::after": {
              clip: "rect(0 0 0 0)",
              clipPath: "inset(50%)",
              height: "1px",
              overflow: "hidden",
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            },

            "&::before": {
              content: "attr(data-a11y-start)",
            },

            "&::after": {
              content: "attr(data-a11y-end)",
            },
          },

          "p:not([class])": {
            maxWidth: odysseyTokens.TypographyLineLengthMax,
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          pre: {
            marginInline: 0,
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,
            fontFamily:
              "'Inconsolata', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace",
            whiteSpace: "pre-wrap",
            tabSize: 2,

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          ul: {
            [`&.${stackClasses.root}`]: {
              padding: 0,
              margin: 0,
            },
          },

          "ul:not([class]), ol:not([class])": {
            maxWidth: odysseyTokens.TypographyLineLengthMax,
            marginBlockStart: 0,
            marginBlockEnd: odysseyTokens.Spacing4,
            // Unique padding to get desire appearance with "outside" position
            paddingInlineStart: "2ch",

            ol: {
              listStyleType: "lower-alpha",

              ol: {
                listStyleType: "lower-roman",
              },
            },

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          "li:not([class])": {
            marginBlockEnd: odysseyTokens.Spacing2,
            paddingInlineStart: odysseyTokens.Spacing1,

            "ul, ol": {
              marginBlockStart: odysseyTokens.Spacing2,
              marginInlineStart: `calc(${theme.spacing(6)} - 2ch)`,
            },
          },

          q: {
            quotes: `'"' '"' "'" "'"`,

            "&::before": {
              content: "open-quote",
            },

            "&::after": {
              content: "close-quote",
            },
          },

          s: {
            textDecoration: "line-through",
          },

          samp: {
            padding: "0 0.5ch",
            backgroundColor: odysseyTokens.HueNeutral50,
            boxShadow: `0 1px 0 ${odysseyTokens.HueNeutral50}`,
            fontSize: odysseyTokens.TypographySizeBody,

            kbd: {
              background: odysseyTokens.HueNeutralWhite,
            },
          },

          small: {
            fontSize: theme.typography.caption.fontSize,
          },

          sub: {
            fontSize: theme.typography.caption.fontSize,
            lineHeight: 1,
            verticalAlign: "sub",
          },

          summary: {
            fontSize: odysseyTokens.TypographySizeBody,
            fontWeight: theme.typography.fontWeightBold,
            cursor: "default",

            "&:focus-visible": {
              outlineColor: odysseyTokens.FocusOutlineColorPrimary,
              outlineOffset: odysseyTokens.FocusOutlineOffsetMain,
              outlineStyle: odysseyTokens.FocusOutlineStyle,
              outlineWidth: odysseyTokens.FocusOutlineWidthMain,
            },
          },

          sup: {
            fontSize: theme.typography.caption.fontSize,
            lineHeight: 1,
            verticalAlign: "super",
          },

          var: {
            fontStyle: "italic",
            fontWeight: theme.typography.fontWeightBold,
          },
        }),
      },
    },
    MuiDialog: {
      defaultProps: {
        scroll: "paper",
      },
      styleOverrides: {
        paper: ({ theme }) => ({
          maxWidth: `calc(${
            odysseyTokens.TypographyLineLengthMax
          } + (${theme.spacing(6)} * 2))`,
          boxShadow: "none",
          filter:
            "drop-shadow(0px 1px 4px rgba(29, 29, 33, 0.08)) drop-shadow(0px 4px 10px rgba(29, 29, 33, 0.08)) drop-shadow(0px 8px 30px rgba(29, 29, 33, 0.1))",
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          flexWrap: "wrap",
          gap: odysseyTokens.Spacing2,
          paddingBlockStart: odysseyTokens.Spacing4,
          paddingBlockEnd: odysseyTokens.Spacing6,
          paddingInline: odysseyTokens.Spacing6,

          "& > .${ buttonClasses.root }": {
            margin: "0 !important",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          padding: 0,
          paddingBlock: odysseyTokens.Spacing4,
          paddingInline: theme.spacing(6),

          "&:last-child": {
            paddingBlockEnd: theme.spacing(6),
          },

          ...(ownerState.dividers === false && {
            [`& + .${dialogActionsClasses.root}`]: {
              paddingBlockStart: odysseyTokens.Spacing4,
            },
          }),
        }),
      },
    },
    MuiDialogContentText: {
      defaultProps: {
        color: "text.primary",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          marginBlockEnd: theme.spacing(5),

          "&:last-child": {
            marginBlockEnd: "0",
          },
        }),
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        component: "h1",
        variant: "h5",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBlockEnd: 0,
          padding: 0,
          paddingBlockStart: theme.spacing(5),
          paddingBlockEnd: odysseyTokens.Spacing4,
          paddingInline: theme.spacing(6),
        }),
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "normal",
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          width: "100%",
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          ...(ownerState.margin === "normal" && {
            marginTop: 0,
            marginBottom: theme.spacing(4),
            "&:last-child": {
              marginBottom: 0,
            },
          }),
          ...(ownerState.margin === "dense" && {
            marginTop: 0,
            marginBottom: theme.spacing(5),
            "&:last-child": {
              marginBottom: 0,
            },
          }),
          ...(ownerState.fullWidth && {
            maxWidth: "100%",
          }),
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
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
          },
          [`&:hover .${radioClasses.root}, &:hover .${checkboxClasses.root}`]: {
            color: odysseyTokens.TypographyColorBody,
          },
          [`&:hover .${radioClasses.root}.Mui-checked, &:hover .${checkboxClasses.root}.Mui-checked`]:
            {
              color: theme.palette.primary.dark,
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
        label: {
          gap: odysseyTokens.Spacing1,
        },
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
          fontSize: odysseyTokens.TypographySizeCaption,
          lineHeight: odysseyTokens.TypographyLineHeightBody,
          marginBlockStart: odysseyTokens.Spacing2,
          [`.${formLabelClasses.root} + &`]: {
            marginBlockStart: `-${odysseyTokens.Spacing1}`,
            color: odysseyTokens.TypographyColorSub,
          },
          marginBlockEnd: odysseyTokens.Spacing2,
          "&:last-child": {
            marginBlockEnd: 0,
          },
          textAlign: "start",
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
    MuiIconButton: {
      styleOverrides: {
        edgeEnd: {
          marginInlineEnd: odysseyTokens.Spacing1,
        },
        root: {
          padding: odysseyTokens.Spacing1,
          fontSize: odysseyTokens.TypographySizeBody,
          backgroundColor: "transparent",
          color: odysseyTokens.TypographyColorBody,
          borderColor: "transparent",
          borderRadius: odysseyTokens.BorderRadiusMain,

          "&:hover, &:focus-visible": {
            backgroundColor: "rgba(29, 29, 33, 0.1)",
            borderColor: "transparent",
          },
          "&:focus-visible": {
            outlineColor: odysseyTokens.FocusOutlineColorPrimary,
          },
          "&:active": {
            backgroundColor: "rgba(29, 29, 33, 0.2)",
            borderColor: "transparent",
          },
          "&:disabled": {
            backgroundColor: "rgba(235, 235, 237, 0.6)",
            color: odysseyTokens.TypographyColorSub,
            borderColor: "transparent",
          },
        },
      },
    },
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
        root: ({ theme, ownerState }) => ({
          display: "flex",
          minWidth: "1.25em",
          maxHeight: "unset",
          margin: 0,
          alignItems: "center",
          whiteSpace: "nowrap",
          color: theme.palette.action.active,
          ...(ownerState.position === "start" && {
            marginInlineStart: odysseyTokens.Spacing2,
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
        required: true,
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
              duration: theme.transitions.duration.short,
            }
          ),

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
            borderColor: odysseyTokens.BorderColorDangerMain,
          },

          [`&.${inputBaseClasses.error}:hover`]: {
            borderColor: odysseyTokens.BorderColorDangerDark,
          },

          [`&.${inputBaseClasses.error}.${inputBaseClasses.focused}`]: {
            borderColor: odysseyTokens.BorderColorDangerMain,
            boxShadow: `0 0 0 1px ${odysseyTokens.PaletteDangerMain}`,
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
          boxSizing: "border-box",
          height: "auto",
          paddingBlock: odysseyTokens.Spacing3,
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
              color: odysseyTokens.TypographyColorSub,
              opacity: "1 !important",
            },
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
          // @ts-expect-error: Incorrect typing in MUI
          ...(ownerState.formControl && {
            position: "initial",
            transform: "none",
          }),
          ...(ownerState.variant === "outlined" && {
            pointerEvents: "initial",
            transform: "none",
            maxWidth: "100%",
            ...(ownerState.size === "small" && {
              transform: "none",
            }),
          }),
          [`& > .${typographyClasses.root}`]: {
            lineHeight: "unset",
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: odysseyTokens.TypographyColorAction,
          textDecoration: "underline",
          cursor: "pointer",

          "&:visited": {
            color: odysseyTokens.TypographyColorAction,
          },

          "&:hover": {
            color: odysseyTokens.PalettePrimaryDark,
            textDecoration: "underline",
          },

          "&:focus-visible": {
            borderRadius: odysseyTokens.BorderRadiusMain,
            outlineColor: odysseyTokens.FocusOutlineColorPrimary,
            outlineOffset: odysseyTokens.FocusOutlineOffsetMain,
            outlineStyle: odysseyTokens.FocusOutlineStyle,
            outlineWidth: odysseyTokens.FocusOutlineWidthTight,
            textDecoration: "none",
          },

          ".Link-indicator, .Link-icon": {
            display: "inline-block",
            height: "1em",
            lineHeight: 1,
          },

          ".Link-indicator": {
            marginInlineStart: odysseyTokens.Spacing2,
          },

          ".Link-icon": {
            marginInlineEnd: odysseyTokens.Spacing2,
          },
          svg: {
            fontSize: "1em",
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
              color: odysseyTokens.TypographyColorSub,
            },
          },
        },
      ],
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          textAlign: "start",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBlock: odysseyTokens.Spacing2,
          paddingInline: odysseyTokens.Spacing4,
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: theme.typography.caption.lineHeight,
          color: odysseyTokens.TypographyColorSub,
          textTransform: "uppercase",
        }),
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          paddingBlock: odysseyTokens.Spacing2,
          paddingInline: odysseyTokens.Spacing2,
          borderRadius: odysseyTokens.BorderRadiusMain,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          gap: odysseyTokens.Spacing2,
          minHeight: "unset",
          paddingBlock: odysseyTokens.Spacing3,
          borderRadius: odysseyTokens.BorderRadiusTight,

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

          [`&.${menuItemClasses.root}-destructive`]: {
            color: odysseyTokens.TypographyColorDanger,
          },

          [`&.${menuItemClasses.selected}`]: {
            backgroundColor: "transparent",
            color: odysseyTokens.TypographyColorAction,

            "&:hover": {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,

              "@media (hover: none)": {
                backgroundColor: `rgba(${odysseyTokens.PalettePrimaryMain} / ${theme.palette.action.selectedOpacity})`,
              },
            },
          },

          ...(!ownerState.disableGutters && {
            paddingInline: odysseyTokens.Spacing4,
          }),

          ...(ownerState.divider && {
            borderBlockEnd: `1px solid ${theme.palette.divider}`,
          }),

          [`&.${menuItemClasses.disabled}`]: {
            opacity: 1,
            color: odysseyTokens.TypographyColorDisabled,
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
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "unset",
          color: "inherit",
        },
      },
    },
    MuiNativeSelect: {
      defaultProps: {
        variant: "standard",
      },
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
        icon: {
          right: "unset",
          insetInlineEnd: odysseyTokens.Spacing3,
          color: odysseyTokens.TypographyColorBody,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginBlockStart: odysseyTokens.Spacing1,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderColor: odysseyTokens.HueNeutral200,
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
        icon: <></>,
        checkedIcon: <></>,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          width: `${odysseyTokens.TypographyLineHeightUi}em`,
          height: `${odysseyTokens.TypographyLineHeightUi}em`,
          borderRadius: `${odysseyTokens.TypographyLineHeightUi}em`,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderColor: odysseyTokens.HueNeutral500,
          padding: 0,
          boxShadow: `0 0 0 0 transparent`,
          transition: theme.transitions.create(
            ["border-color", "background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),

          "&::before": {
            content: "''",
            position: "absolute",
            width: "0.5em",
            height: "0.5em",
            borderRadius: "50%",
            backgroundColor: "transparent",
            transition: theme.transitions.create(["background-color"], {
              duration: theme.transitions.duration.short,
            }),
          },

          [`.${formControlLabelClasses.root}:hover > &`]: {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.HueNeutral900,
          },
          ".Mui-error:hover > &": {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.BorderColorDangerDark,
            "&::before": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
            },
          },
          ".Mui-error > &": {
            borderColor: odysseyTokens.BorderColorDangerMain,

            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PaletteDangerMain}`,
            },
          },
          "&.Mui-focusVisible": {
            borderColor: odysseyTokens.HueNeutral900,
            boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PalettePrimaryMain}`,
            outline: "2px solid transparent",
            outlineOffset: "1px",
          },
          "&.Mui-checked": {
            position: "relative",

            "&::before": {
              backgroundColor: odysseyTokens.PalettePrimaryMain,
            },
          },
          ".Mui-error > &.Mui-checked::before": {
            backgroundColor: odysseyTokens.PaletteDangerMain,
          },
          "&.Mui-disabled": {
            backgroundColor: odysseyTokens.HueNeutral50,
            borderColor: odysseyTokens.HueNeutral300,

            "&.Mui-checked::before": {
              backgroundColor: odysseyTokens.HueNeutral300,
            },
          },
        }),
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      },
      styleOverrides: {
        root: {
          "&.Toast": {
            position: "static",
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "standard",
        IconComponent: ChevronDownIcon,
      },
      styleOverrides: {
        select: {
          paddingBlock: odysseyTokens.Spacing3,
          paddingInline: odysseyTokens.Spacing3,

          "&:focus": {
            backgroundColor: "transparent",
          },

          ".MuiBox-root": {
            display: "flex",
            flexWrap: "wrap",
            gap: odysseyTokens.Spacing1,
            marginBlock: `-${odysseyTokens.Spacing2}`,
            marginInline: `-${odysseyTokens.Spacing2}`,
          },
        },
        icon: {
          right: "unset",
          insetInlineEnd: odysseyTokens.Spacing3,
          color: odysseyTokens.TypographyColorBody,
        },
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: "inherit",
        color: "inherit",
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontSize: `${odysseyTokens.TypographyLineHeightUi}rem`,

          ...(ownerState.fontSize === "small" && {
            fontSize: `${
              Number(odysseyTokens.TypographyLineHeightUi) * 0.75
            }rem`,
          }),

          ...(ownerState.fontSize === "large" && {
            fontSize: `${
              Number(odysseyTokens.TypographyLineHeightUi) * 1.25
            }rem`,
          }),
        }),
      },
    },
    MuiTab: {
      defaultProps: {
        iconPosition: "start",
      },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} / 2)`,
          minWidth: "unset",
          minHeight: "unset",
          padding: `${odysseyTokens.Spacing4} 0`,
          lineHeight: theme.typography.body1.lineHeight,
          overflow: "visible",
          ...(ownerState.selected == true && {
            color: odysseyTokens.TypographyColorBody,
          }),
          ...(ownerState.textColor === "inherit" && {
            color: "inherit",
            opacity: 1,
          }),
          ...(ownerState.wrapped && {
            fontSize: odysseyTokens.TypographySizeCaption,
            lineHeight: theme.typography.subtitle1.lineHeight,
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
          "&.Mui-selected": {
            color: odysseyTokens.TypographyColorBody,
            fontWeight: theme.typography.fontWeightBold,
            "&:hover": {
              color: odysseyTokens.TypographyColorAction,
            },
          },
          "&.Mui-disabled": {
            cursor: "not-allowed",
            pointerEvents: "unset",
            "&:hover": {
              color: odysseyTokens.TypographyColorDisabled,
            },
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
    MuiTable: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          display: "table",
          width: "auto",
          borderCollapse: "separate",
          borderSpacing: 0,
          border: `${odysseyTokens.BorderWidthMain} ${odysseyTokens.BorderStyleMain} ${odysseyTokens.HueNeutral100}`,
          borderRadius: odysseyTokens.BorderRadiusMain,
          marginBlock: theme.spacing(0),
          marginInline: theme.spacing(0),
          lineHeight: odysseyTokens.TypographyLineHeightUi,

          "&:only-child": {
            marginBlockEnd: 0,
          },

          ...(ownerState.stickyHeader && {
            borderCollapse: "separate",
          }),

          caption: {
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: "1px",
            overflow: "hidden",
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...theme.typography.body1,
          maxWidth: odysseyTokens.TypographyLineLengthMax,
          borderBottom: `${odysseyTokens.BorderWidthMain} ${odysseyTokens.BorderStyleMain} ${odysseyTokens.HueNeutral100}`,
          textAlign: "start",
          verticalAlign: "baseline",
          padding: "unset",
          paddingBlock: odysseyTokens.Spacing4,
          paddingInline: odysseyTokens.Spacing4,
          overflowWrap: "break-word",

          [`.${tableRowClasses.root}:hover &[rowspan]`]: {
            backgroundColor: odysseyTokens.HueNeutralWhite,
          },

          [`.${tableBodyClasses.root} .${tableRowClasses.root}:last-of-type &`]:
            {
              borderBottom: 0,
            },

          [`.${tableRowClasses.selected} &`]: {
            borderBottomColor: theme.palette.primary.light,
          },

          [`.${tableRowClasses.selected}:hover &`]: {
            borderBottomColor: odysseyTokens.PalettePrimaryMain,
          },

          ...(ownerState.variant === "action" && {
            paddingBlock: 0,
          }),

          ...(ownerState.variant === "body" && {
            color: odysseyTokens.TypographyColorBody,
          }),

          ...(ownerState.variant === "date" && {
            whiteSpace: "nowrap",
          }),

          ...(ownerState.variant === "footer" && {
            color: odysseyTokens.TypographyColorSub,
            lineHeight: theme.typography.body1.lineHeight,
            fontSize: odysseyTokens.TypographySizeBody,
          }),

          [`.${tableHeadClasses.root} &`]: {
            color: odysseyTokens.TypographyColorBody,
            lineHeight: theme.typography.body1.lineHeight,
            fontWeight: theme.typography.fontWeightBold,
            backgroundColor: odysseyTokens.HueNeutral50,
          },

          ...(ownerState.variant === "head" && {
            lineHeight: theme.typography.body1.lineHeight,
            fontWeight: theme.typography.fontWeightBold,
          }),

          ...(ownerState.variant === "number" && {
            textAlign: "end",
            fontFeatureSettings: '"lnum", "tnum"',
          }),

          ...(ownerState.padding === "checkbox" && {
            width: 48, // prevent the checkbox column from growing
            padding: "0 0 0 4px",
          }),

          ...(ownerState.padding === "none" && {
            padding: 0,
          }),

          ...(ownerState.align === "left" && {
            textAlign: "start",
          }),

          ...(ownerState.align === "center" && {
            textAlign: "center",
          }),

          ...(ownerState.align === "right" && {
            textAlign: "end",
            flexDirection: "row-reverse",
          }),

          ...(ownerState.align === "justify" && {
            textAlign: "justify",
          }),
        }),
      },
    },
    MuiTableContainer: {
      defaultProps: {
        // @ts-expect-error valid prop and value; MUI TS bug
        component: "figure",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          width: "unset",
          maxWidth: "100%",
          marginBlockStart: theme.spacing(0),
          marginBlockEnd: odysseyTokens.Spacing4,
          marginInline: 0,
          overflowX: "auto",

          "&:last-child": {
            marginBlock: 0,
          },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          verticalAlign: "unset",
          [`&.${tableRowClasses.root}:hover`]: {
            backgroundColor: odysseyTokens.HueNeutral50,
          },
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: odysseyTokens.PalettePrimaryLighter,
            "&:hover": {
              backgroundColor: odysseyTokens.PalettePrimaryLighter,
            },
          },
        },
      },
    },
    MuiTableSortLabel: {
      defaultProps: {
        IconComponent: ArrowDownIcon,
      },
      styleOverrides: {
        root: {
          cursor: "pointer",
          display: "inline-flex",
          justifyContent: "flex-start",
          flexDirection: "inherit",
          alignItems: "center",
          "&:focus-visible": {
            color: odysseyTokens.TypographyColorBody,
            outlineOffset: odysseyTokens.Spacing4,
            outlineStyle: odysseyTokens.FocusOutlineStyle,
            outlineWidth: odysseyTokens.FocusOutlineWidthMain,
            outlineColor: odysseyTokens.FocusOutlineColorPrimary,
          },
          "&:hover": {
            color: odysseyTokens.TypographyColorBody,
            [`& .${tableSortLabelClasses.icon}`]: {
              opacity: 1,
            },
          },
          [`&.${tableSortLabelClasses.active}`]: {
            color: odysseyTokens.TypographyColorSub,
            [`& .${tableSortLabelClasses.icon}`]: {
              opacity: 1,
              color: "inherit",
            },
          },
        },
        icon: ({ theme, ownerState }) => ({
          fontSize: "inherit",
          marginInlineEnd: 0,
          marginInlineStart: 0,
          opacity: 0,
          color: "inherit",
          transition: theme.transitions.create(["opacity", "transform"], {
            duration: theme.transitions.duration.shorter,
          }),
          userSelect: "none",

          [`.${tableCellClasses.alignRight} &`]: {
            marginInlineEnd: odysseyTokens.Spacing2,
          },

          [`.${tableCellClasses.alignLeft} &`]: {
            marginInlineStart: odysseyTokens.Spacing2,
          },

          ...(ownerState.direction === "desc" && {
            transform: "rotate(0deg)",
          }),
          ...(ownerState.direction === "asc" && {
            transform: "rotate(180deg)",
          }),
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: "unset",
          marginBottom: theme.spacing(5),
        }),
        flexContainer: ({ theme }) => ({
          gap: theme.spacing(5),
          borderBottom: `${odysseyTokens.BorderWidthMain} ${odysseyTokens.BorderStyleMain} ${theme.palette.divider}`,
        }),
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        enterDelay: 500,
        enterNextDelay: 250,
        placement: "top",
      },
      styleOverrides: {
        tooltip: ({ theme, ownerState }) => ({
          maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} / 2)`,
          paddingBlock: odysseyTokens.Spacing2,
          paddingInline: odysseyTokens.Spacing3,
          backgroundColor: odysseyTokens.HueNeutral900,
          color: odysseyTokens.HueNeutralWhite,
          fontSize: odysseyTokens.TypographySizeCaption,
          lineHeight: theme.typography.subtitle1.lineHeight,
          ...(ownerState.touch === true && {
            paddingBlock: odysseyTokens.Spacing2,
            paddingInline: odysseyTokens.Spacing3,
            fontSize: odysseyTokens.TypographySizeCaption,
            lineHeight: theme.typography.subtitle1.lineHeight,
            fontWeight: theme.typography.fontWeightRegular,
          }),
          [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
            transformOrigin: "right center",
            ...(ownerState.isRtl
              ? {
                  marginInlineStart: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineStart: odysseyTokens.Spacing4,
                  }),
                }
              : {
                  marginInlineEnd: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineEnd: odysseyTokens.Spacing4,
                  }),
                }),
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
            transformOrigin: "left center",
            ...(ownerState.isRtl
              ? {
                  marginInlineEnd: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineEnd: odysseyTokens.Spacing4,
                  }),
                }
              : {
                  marginInlineStart: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineStart: odysseyTokens.Spacing4,
                  }),
                }),
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
            transformOrigin: "center bottom",
            marginBottom: odysseyTokens.Spacing3,
            ...(ownerState.touch === true && {
              marginBottom: odysseyTokens.Spacing4,
            }),
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
            transformOrigin: "center top",
            marginTop: odysseyTokens.Spacing3,
            ...(ownerState.touch === true && {
              marginTop: odysseyTokens.Spacing4,
            }),
          },
        }),
        arrow: {
          color: odysseyTokens.HueNeutral900,
          "&::before": {
            borderRadius: "0",
          },

          [`.${tooltipClasses.popper}[data-popper-placement*="top"] &::before`]:
            {
              borderRadius: `0 0 3px 0`,
            },

          [`.${tooltipClasses.popper}[data-popper-placement*="right"] &::before`]:
            {
              borderRadius: `0 0 0 3px`,
            },

          [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &::before`]:
            {
              borderRadius: `3px 0 0 0`,
            },

          [`.${tooltipClasses.popper}[data-popper-placement*="left"] &::before`]:
            {
              borderRadius: `0 3px 0 0`,
            },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily:
          "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "p",
          body1: "p",
          inherit: "p",
          legend: "legend",
        },
      },
      styleOverrides: {
        paragraph: {
          marginBlockEnd: odysseyTokens.Spacing4,

          [`&:last-child`]: {
            marginBlockEnd: 0,
          },
        },
      },
    },
  };
};
