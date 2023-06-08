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
import { chipClasses } from "@mui/material/Chip";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { dividerClasses } from "@mui/material/Divider";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { menuItemClasses } from "@mui/material/MenuItem";
import { stackClasses } from "@mui/material/Stack";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { tableBodyClasses } from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import { tableHeadClasses } from "@mui/material/TableHead";
import { tableRowClasses } from "@mui/material/TableRow";
import { tableSortLabelClasses } from "@mui/material/TableSortLabel";
import { tooltipClasses } from "@mui/material/Tooltip";

import {
  AlertTriangleFilledIcon,
  ArrowDownIcon,
  CheckIcon,
  CheckCircleFilledIcon,
  ChevronDownIcon,
  CloseCircleFilledIcon,
  CloseIcon,
  InformationCircleFilledIcon,
  SubtractIcon,
} from "../iconDictionary";
import { DesignTokens } from "./theme";

export const components = (
  odysseyTokens: DesignTokens
): ThemeOptions["components"] => {
  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          error: <AlertTriangleFilledIcon />,
          info: <InformationCircleFilledIcon />,
          success: <CheckCircleFilledIcon />,
          warning: <AlertTriangleFilledIcon />,
        },
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          padding: odysseyTokens.Spacing4,
          gap: odysseyTokens.Spacing4,
          color: odysseyTokens.TypographyColorBody,
          border: 0,
          ...(ownerState.severity === "success" && {
            backgroundColor: odysseyTokens.HueGreen100,

            [`& .${alertTitleClasses.root}`]: {
              color: odysseyTokens.PaletteSuccessHeading,
            },
          }),
          ...(ownerState.severity === "info" && {
            backgroundColor: odysseyTokens.HueBlue100,

            [`& .${alertTitleClasses.root}`]: {
              color: odysseyTokens.PalettePrimaryHeading,
            },
          }),
          ...(ownerState.severity === "error" && {
            backgroundColor: odysseyTokens.HueRed100,

            [`& .${alertTitleClasses.root}`]: {
              color: odysseyTokens.PaletteDangerHeading,
            },
          }),
          ...(ownerState.severity === "warning" && {
            backgroundColor: odysseyTokens.HueYellow100,

            [`& .${alertTitleClasses.root}`]: {
              color: odysseyTokens.PaletteWarningHeading,
            },
          }),
          ...(ownerState.variant === "banner" && {
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }),
          ...(ownerState.variant === "infobox" && {
            borderRadius: odysseyTokens.BorderRadiusOuter,
            "&:not(:last-child)": {
              marginBottom: theme.spacing(4),
            },

            [`& .${alertTitleClasses.root}`]: {
              marginBlockEnd: odysseyTokens.Spacing2,

              [`&:last-child`]: {
                marginBlockEnd: 0,
              },
            },
          }),
          ...(ownerState.variant === "toast" && {
            maxWidth: theme.mixins.maxWidth,
            borderRadius: odysseyTokens.BorderRadiusOuter,
            position: "relative",
            alignItems: "center",
          }),
        }),
        action: ({ ownerState }) => ({
          ...(ownerState.variant === "banner" && {
            padding: 0,
            marginInlineEnd: 0,
            top: "50%",
            right: odysseyTokens.Spacing2,
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
        message: ({ ownerState, theme }) => ({
          padding: 0,
          lineHeight: theme.typography.body1.lineHeight,
          overflow: "visible",
          ...(ownerState.variant === "banner" && {
            display: "flex",
            justifyContent: "space-between",
            gap: theme.spacing(4),
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
          marginBlock: 0,
          lineHeight: odysseyTokens.TypographyLineHeightHeading6,
          fontSize: odysseyTokens.TypographySizeHeading6,
          fontWeight: odysseyTokens.TypographyWeightHeading,
          fontFamily: odysseyTokens.TypographyFamilyHeading,
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
        clearIndicator: ({ theme }) => ({
          marginRight: "unset",
          padding: theme.spacing(1),
        }),
        endAdornment: ({ theme, ownerState }) => ({
          display: "flex",
          gap: theme.spacing(1),
          top: `calc(${odysseyTokens.Spacing2} - ${theme.mixins.borderWidth})`,
          right: odysseyTokens.Spacing2,
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
        loading: ({ theme }) => ({
          paddingBlock: odysseyTokens.Spacing3,
          paddingInline: theme.spacing(4),
        }),
        popupIndicator: ({ theme }) => ({
          padding: theme.spacing(1),
          marginRight: "unset",
        }),
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
            fontWeight: 600,
            color: theme.palette.common.white,
            borderColor: "transparent",
            backgroundColor: odysseyTokens.PalettePrimaryMain,

            "&:hover, &:focus-visible": {
              backgroundColor: theme.palette.primary.dark,
            },

            "&:active": {
              backgroundColor: odysseyTokens.PalettePrimaryMain,
            },

            "&:disabled": {
              color: theme.palette.common.white,
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
              backgroundColor: theme.palette.primary.lighter,
              borderColor: theme.palette.primary.light,
              color: odysseyTokens.TypographyColorAction,
            },

            "&:active": {
              borderColor: odysseyTokens.PalettePrimaryMain,
            },

            "&:disabled": {
              borderColor: odysseyTokens.HueNeutral100,
              backgroundColor: odysseyTokens.HueNeutral100,
              color: theme.palette.grey[500],
            },
          }),
        },
        {
          props: { variant: "danger" },
          style: ({ theme }) => ({
            backgroundColor: odysseyTokens.PaletteDangerMain,
            color: theme.palette.common.white,
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
              color: theme.palette.common.white,
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
            paddingBlock: `calc(${odysseyTokens.Spacing2} - 1px)`,
            paddingInline: `calc(${odysseyTokens.Spacing2} - 1px)`,
            fontSize: "1rem",
          },
        },
        {
          props: { size: "large" },
          style: ({ theme }) => ({
            paddingBlock: `calc(${theme.spacing(4)} - 1px)`,
            paddingInline: `calc(${theme.spacing(4)} - 1px)`,
          }),
        },
        {
          props: { fullWidth: true },
          style: ({ theme }) => ({
            display: "block",
            width: "100%",
            marginBlock: "0",
            marginInline: "0",

            "&:not(:last-child)": {
              marginBlockEnd: theme.spacing(4),
            },
          }),
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
        root: ({ theme }) => ({
          fontWeight: 600,
          minWidth: "unset",
          padding: `calc(${odysseyTokens.Spacing3} - 1px) ${odysseyTokens.Spacing3}`,
          display: "inline-flex",
          position: "relative",
          marginBlock: "0",
          marginInline: "0",
          transitionProperty:
            "color, background-color, border-color, box-shadow",
          transitionDuration: "100ms",
          transitionTimingFunction: "linear",
          borderWidth: theme.mixins.borderWidth,
          borderStyle: theme.mixins.borderStyle,
          borderRadius: theme.mixins.borderRadius,
          fontSize: odysseyTokens.TypographySizeBody,
          lineHeight: odysseyTokens.TypographyLineHeightUi,
          whiteSpace: "nowrap",

          ".MuiButton-root + &": {
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
        }),

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
          borderRadius: theme.mixins.borderRadius,
          borderWidth: theme.mixins.borderWidth,
          borderStyle: theme.mixins.borderStyle,
          borderColor: theme.palette.grey[500],
          padding: 0,
          boxShadow: `0 0 0 0 transparent`,
          transition: theme.transitions.create(
            ["border-color", "background-color", "box-shadow"],
            {
              duration: theme.transitions.duration.short,
            }
          ),

          ".MuiSvgIcon-root": {
            color: theme.palette.common.white,
            transition: theme.transitions.create(["color"], {
              duration: theme.transitions.duration.short,
            }),
          },

          "&.Mui-checked": {
            backgroundColor: odysseyTokens.PalettePrimaryMain,
            borderColor: odysseyTokens.PalettePrimaryMain,

            ".MuiFormControlLabel-root:hover > &": {
              backgroundColor: theme.palette.primary.dark,
              borderColor: theme.palette.primary.dark,
            },
          },

          ".MuiFormControlLabel-root:hover > &": {
            backgroundColor: "transparent",
            borderColor: theme.palette.grey[900],
          },
          ".Mui-error:not(.Mui-valid):hover > &": {
            borderColor: odysseyTokens.PaletteDangerDark,

            "&.Mui-checked": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
              borderColor: odysseyTokens.PaletteDangerDark,
            },
          },
          ".Mui-error:not(.Mui-valid) > &": {
            borderColor: odysseyTokens.PaletteDangerMain,

            "&.Mui-checked": {
              backgroundColor: odysseyTokens.PaletteDangerMain,
              borderColor: odysseyTokens.PaletteDangerMain,
            },

            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PaletteDangerMain}`,
            },
          },
          "&.Mui-focusVisible": {
            borderColor: theme.palette.grey[900],
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

            ".MuiSvgIcon-root": {
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
          paddingBlock: odysseyTokens.Spacing2,
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
            maxWidth: theme.mixins.maxWidth,
            marginBlockStart: 0,
            marginBlockEnd: theme.spacing(4),
            marginInline: 0,

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          blockquote: {
            maxWidth: theme.mixins.maxWidth,
            marginBlockStart: 0,
            marginBlockEnd: theme.spacing(4),
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
            gridGap: `${odysseyTokens.Spacing2} ${theme.spacing(4)}`,
            gridTemplateColumns: "repeat(2, minmax(min-content, max-content))",
            maxWidth: theme.mixins.maxWidth,
            marginBlockStart: 0,
            marginBlockEnd: theme.spacing(4),
            marginInline: 0,
            padding: 0,

            "&:last-child": {
              marginBlockEnd: 0,
            },

            dt: {
              gridColumn: 1,
              fontWeight: 600,
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
            marginBlockEnd: theme.spacing(4),
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
            borderStyle: theme.mixins.borderStyle,
            borderWidth: theme.mixins.borderWidth,
            borderRadius: theme.mixins.borderRadius,
            borderColor: odysseyTokens.HueNeutral200,
            backgroundColor: odysseyTokens.HueNeutral50,
            padding: `calc(${theme.spacing(1)} / 2) ${theme.spacing(1)}`,
            fontFamily:
              "'Inconsolata', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', monospace",
            fontSize: theme.typography.subtitle1.fontSize,
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
            maxWidth: theme.mixins.maxWidth,
            marginBlockStart: 0,
            marginBlockEnd: theme.spacing(4),

            "&:last-child": {
              marginBlockEnd: 0,
            },
          },

          pre: {
            marginInline: 0,
            marginBlockStart: 0,
            marginBlockEnd: theme.spacing(4),
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
            maxWidth: theme.mixins.maxWidth,
            marginBlockStart: 0,
            marginBlockEnd: theme.spacing(4),
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
            paddingInlineStart: theme.spacing(1),

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
              background: theme.palette.common.white,
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
          maxWidth: `calc(${theme.mixins.maxWidth} + (${theme.spacing(
            6
          )} * 2))`,
          boxShadow: "none",
          filter:
            "drop-shadow(0px 1px 4px rgba(29, 29, 33, 0.08)) drop-shadow(0px 4px 10px rgba(29, 29, 33, 0.08)) drop-shadow(0px 8px 30px rgba(29, 29, 33, 0.1))",
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBlockStart: theme.spacing(4),
          paddingBlockEnd: theme.spacing(6),
          paddingInline: theme.spacing(6),
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          padding: 0,
          paddingBlock: theme.spacing(4),
          paddingInline: theme.spacing(6),

          "&:last-child": {
            paddingBlockEnd: theme.spacing(6),
          },

          ...(ownerState.dividers === false && {
            [`& + .${dialogActionsClasses.root}`]: {
              paddingBlockStart: theme.spacing(4),
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
          paddingBlockEnd: theme.spacing(4),
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
          maxWidth: theme.mixins.maxWidth,
          ...(ownerState.margin === "normal" && {
            marginTop: 0,
            marginBottom: theme.spacing(5),
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
          //[`&:hover ${radioClasses.root}:not(${radioClasses.checked})`]: {
          //color: odysseyTokens.TypographyColorBody,
          //},
          "&:hover .MuiRadio-root, &:hover .MuiCheckbox-root": {
            color: odysseyTokens.TypographyColorBody,
          },
          "&:hover .MuiRadio-root.Mui-checked, &:hover .MuiCheckbox-root.Mui-checked":
            {
              color: theme.palette.primary.dark,
            },
          "&.Mui-error:hover .MuiRadio-root, &.Mui-error:hover .MuiCheckbox-root":
            {
              color: odysseyTokens.PaletteDangerDark,
            },
          "&.Mui-error:hover .MuiRadio-root.Mui-checked, &.Mui-error:hover .MuiCheckbox-root.Mui-checked":
            {
              color: odysseyTokens.PaletteDangerDark,
            },
        }),
        label: {
          "&:not(:first-child)": {
            marginInlineStart: odysseyTokens.Spacing2,
          },
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
        root: ({ theme }) => ({
          fontSize: theme.typography.subtitle1.fontSize,
          lineHeight: "1.33333333",
          marginBlockStart: odysseyTokens.Spacing2,
          ".MuiFormLabel-root + &": {
            marginBlockStart: `-${theme.spacing(1)}`,
            color: odysseyTokens.TypographyColorSub,
          },
          marginBlockEnd: odysseyTokens.Spacing2,
          "&:last-child": {
            marginBlockEnd: 0,
          },
          textAlign: "start",
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: odysseyTokens.TypographyColorBody,
          lineHeight: odysseyTokens.TypographyLineHeightUi,
          fontSize: "1rem",
          fontWeight: 600,
          marginBottom: odysseyTokens.Spacing2,
          "&.Mui-focused, &.Mui-error, &.Mui-disabled": {
            color: odysseyTokens.TypographyColorBody,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        edgeEnd: ({ theme }) => ({
          marginInlineEnd: theme.spacing(1),
        }),
        root: ({ theme }) => ({
          padding: theme.spacing(1),
          fontSize: odysseyTokens.TypographySizeBody,
          backgroundColor: "transparent",
          color: odysseyTokens.TypographyColorBody,
          borderColor: "transparent",
          borderRadius: theme.mixins.borderRadius,

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
        }),
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
          borderWidth: theme.mixins.borderWidth,
          borderStyle: theme.mixins.borderStyle,
          borderRadius: theme.mixins.borderRadius,
          borderColor: theme.palette.grey[500],
          boxShadow: `0 0 0 0 transparent`,
          backgroundColor: theme.palette.common.white,
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
            borderColor: theme.palette.grey[900],
          },

          [`&.${inputBaseClasses.focused}`]: {
            borderColor: odysseyTokens.PalettePrimaryMain,
            boxShadow: `0 0 0 1px ${odysseyTokens.PalettePrimaryMain}`,
            outline: "2px solid transparent",
            outlineOffset: "1px",
          },

          [`&.${inputBaseClasses.error}`]: {
            borderColor: odysseyTokens.PaletteDangerMain,
          },

          [`&.${inputBaseClasses.error}:hover`]: {
            borderColor: odysseyTokens.PaletteDangerDark,
          },

          [`&.${inputBaseClasses.error}.${inputBaseClasses.focused}`]: {
            borderColor: odysseyTokens.PaletteDangerMain,
            boxShadow: `0 0 0 1px ${odysseyTokens.PaletteDangerMain}`,
          },

          [`&.${inputBaseClasses.disabled}`]: {
            color: theme.palette.text.disabled,
            borderColor: theme.palette.action.disabled,
            pointerEvents: "auto",
            backgroundColor: odysseyTokens.HueNeutral50,
            cursor: "not-allowed",
          },
        }),
        input: ({ theme }) => ({
          boxSizing: "border-box",
          height: "auto",
          paddingBlock: `calc(${odysseyTokens.Spacing3} - ${theme.mixins.borderWidth})`,
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
        }),
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
          "& > .MuiTypography-root": {
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
            top: "-0.0625em",
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
          paddingInline: theme.spacing(4),
          fontSize: theme.typography.caption.fontSize,
          fontWeight: theme.typography.fontWeightBold,
          lineHeight: theme.typography.caption.lineHeight,
          color: odysseyTokens.TypographyColorSub,
          textTransform: "uppercase",
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          gap: odysseyTokens.Spacing2,
          minHeight: "unset",
          paddingBlock: odysseyTokens.Spacing3,

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
              backgroundColor: theme.palette.primary.lighter,

              "@media (hover: none)": {
                backgroundColor: `rgba(${odysseyTokens.PalettePrimaryMain} / ${theme.palette.action.selectedOpacity})`,
              },
            },
          },

          ...(!ownerState.disableGutters && {
            paddingInline: theme.spacing(4),
          }),

          ...(ownerState.divider && {
            borderBlockEnd: `1px solid ${theme.palette.divider}`,
          }),

          [`&.${menuItemClasses.disabled}`]: {
            opacity: 1,
            color: theme.palette.text.disabled,
          },

          [`& + .${dividerClasses.root}`]: {
            marginBlock: theme.spacing(1),
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
          insetInlineEnd: odysseyTokens.Spacing3,
          color: odysseyTokens.TypographyColorBody,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          marginBlockStart: theme.spacing(1),
          borderWidth: theme.mixins.borderWidth,
          borderStyle: theme.mixins.borderStyle,
          borderColor: odysseyTokens.HueNeutral200,
        }),
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
          borderWidth: theme.mixins.borderWidth,
          borderStyle: theme.mixins.borderStyle,
          borderColor: theme.palette.grey[500],
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

          ".MuiFormControlLabel-root:hover > &": {
            backgroundColor: "transparent",
            borderColor: theme.palette.grey[900],
          },
          ".Mui-error:hover > &": {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.PaletteDangerDark,
            "&::before": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
            },
          },
          ".Mui-error > &": {
            borderColor: odysseyTokens.PaletteDangerMain,

            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PaletteDangerMain}`,
            },
          },
          "&.Mui-focusVisible": {
            borderColor: theme.palette.grey[900],
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
        select: ({ theme }) => ({
          paddingBlock: `calc(${odysseyTokens.Spacing3} - ${theme.mixins.borderWidth})`,
          paddingInline: odysseyTokens.Spacing3,

          "&:focus": {
            backgroundColor: "transparent",
          },

          ".MuiBox-root": {
            display: "flex",
            flexWrap: "wrap",
            gap: theme.spacing(1),
            marginBlock: `-${odysseyTokens.Spacing2}`,
            marginInline: `-${odysseyTokens.Spacing2}`,
          },
        }),
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
          maxWidth: `calc(${theme.mixins.maxWidth} / 2)`,
          minWidth: "unset",
          minHeight: "unset",
          padding: `${theme.spacing(4)} 0`,
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
            fontSize: theme.typography.subtitle1.fontSize,
            lineHeight: theme.typography.subtitle1.lineHeight,
          }),
          "&:hover": {
            color: odysseyTokens.TypographyColorAction,
          },
          "&:focus-visible::before, &.Mui-focusVisible::before": {
            content: "''",
            position: "absolute",
            top: theme.spacing(4),
            right: `calc(-1 * ${odysseyTokens.Spacing2})`,
            bottom: theme.spacing(4),
            left: `calc(-1 * ${odysseyTokens.Spacing2})`,
            borderWidth: theme.mixins.borderWidth,
            borderStyle: theme.mixins.borderStyle,
            borderColor: odysseyTokens.PalettePrimaryMain,
            borderRadius: theme.mixins.borderRadius,
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
              color: theme.palette.text.disabled,
            },
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
          border: `${theme.mixins.borderWidth} ${theme.mixins.borderStyle} ${odysseyTokens.HueNeutral100}`,
          borderRadius: theme.mixins.borderRadius,
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
          maxWidth: theme.mixins.maxWidth,
          borderBottom: `${theme.mixins.borderWidth} ${theme.mixins.borderStyle} ${odysseyTokens.HueNeutral100}`,
          textAlign: "start",
          verticalAlign: "baseline",
          padding: "unset",
          paddingBlock: theme.spacing(4),
          paddingInline: theme.spacing(4),
          overflowWrap: "break-word",

          [`.${tableRowClasses.root}:hover &[rowspan]`]: {
            backgroundColor: theme.palette.common.white,
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
            color: odysseyTokens.TypographyColorSub,
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
          marginBlockEnd: theme.spacing(4),
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
        root: ({ theme }) => ({
          verticalAlign: "unset",
          [`&.${tableRowClasses.root}:hover`]: {
            backgroundColor: odysseyTokens.HueNeutral50,
          },
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: theme.palette.primary.lighter,
            "&:hover": {
              backgroundColor: theme.palette.primary.lighter,
            },
          },
        }),
      },
    },
    MuiTableSortLabel: {
      defaultProps: {
        IconComponent: ArrowDownIcon,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          cursor: "pointer",
          display: "inline-flex",
          justifyContent: "flex-start",
          flexDirection: "inherit",
          alignItems: "center",
          "&:focus-visible": {
            color: odysseyTokens.TypographyColorBody,
            outlineOffset: theme.spacing(4),
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
        }),
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
          borderBottom: `${theme.mixins.borderWidth} ${theme.mixins.borderStyle} ${theme.palette.divider}`,
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
          maxWidth: `calc(${theme.mixins.maxWidth} / 2)`,
          paddingBlock: odysseyTokens.Spacing2,
          paddingInline: odysseyTokens.Spacing3,
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
          fontSize: theme.typography.subtitle1.fontSize,
          lineHeight: theme.typography.subtitle1.lineHeight,
          ...(ownerState.touch === true && {
            paddingBlock: odysseyTokens.Spacing2,
            paddingInline: odysseyTokens.Spacing3,
            fontSize: theme.typography.subtitle1.fontSize,
            lineHeight: theme.typography.subtitle1.lineHeight,
            fontWeight: theme.typography.fontWeightRegular,
          }),
          [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
            transformOrigin: "right center",
            ...(ownerState.isRtl
              ? {
                  marginInlineStart: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineStart: theme.spacing(4),
                  }),
                }
              : {
                  marginInlineEnd: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineEnd: theme.spacing(4),
                  }),
                }),
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
            transformOrigin: "left center",
            ...(ownerState.isRtl
              ? {
                  marginInlineEnd: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineEnd: theme.spacing(4),
                  }),
                }
              : {
                  marginInlineStart: odysseyTokens.Spacing3,
                  ...(ownerState.touch === true && {
                    marginInlineStart: theme.spacing(4),
                  }),
                }),
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
            transformOrigin: "center bottom",
            marginBottom: odysseyTokens.Spacing3,
            ...(ownerState.touch === true && {
              marginBottom: theme.spacing(4),
            }),
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
            transformOrigin: "center top",
            marginTop: odysseyTokens.Spacing3,
            ...(ownerState.touch === true && {
              marginTop: theme.spacing(4),
            }),
          },
        }),
        arrow: ({ theme }) => ({
          color: theme.palette.grey[900],
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
        }),
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
