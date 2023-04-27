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
//import radioClasses from "@mui/material";
import { buttonClasses } from "@mui/material/Button";
import { chipClasses } from "@mui/material/Chip";
import { dialogActionsClasses } from "@mui/material/DialogActions";
import { dividerClasses } from "@mui/material/Divider";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { menuItemClasses } from "@mui/material/MenuItem";
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

export const components: ThemeOptions["components"] = {
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
        padding: theme.spacing(4),
        gap: theme.spacing(4),
        color: theme.palette.text.primary,
        ...(ownerState.severity && {
          backgroundColor: theme.palette[ownerState.severity].lighter,
          borderColor: theme.palette[ownerState.severity].light,
        }),
        ...(ownerState.variant === "banner" && {
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0,
          borderRadius: 0,
        }),
        ...(ownerState.variant === "infobox" && {
          borderStyle: theme.mixins.borderStyle,
          borderWidth: theme.mixins.borderWidth,
          borderRadius: theme.mixins.borderRadius,
          "&:not(:last-child)": {
            marginBottom: theme.spacing(4),
          },
        }),
        ...(ownerState.variant === "toast" && {
          maxWidth: theme.mixins.maxWidth,
          borderStyle: theme.mixins.borderStyle,
          borderWidth: theme.mixins.borderWidth,
          borderRadius: theme.mixins.borderRadius,
          position: "relative",
          alignItems: "center",
        }),
      }),
      action: ({ ownerState, theme }) => ({
        ...(ownerState.variant === "banner" && {
          padding: 0,
          marginInlineEnd: 0,
          top: "50%",
          right: theme.spacing(4),
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
        fontSize: "inherit",
        opacity: 1,
        ...(ownerState.severity && {
          color: theme.palette[ownerState.severity].main,
        }),
        ...(ownerState.severity === "warning" && {
          color: theme.palette[ownerState.severity].dark,
        }),

        [`& .${svgIconClasses.root}`]: {
          fontSize: "1.429rem",
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
      root: ({ theme }) => ({
        marginTop: 0,
        marginBottom: theme.spacing(1),
        lineHeight: theme.typography.h6.lineHeight,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightBold,

        "&:last-child": {
          marginBlockEnd: 0,
        },
      }),
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
        top: `calc(${theme.spacing(2)} - ${theme.mixins.borderWidth})`,
        right: theme.spacing(2),
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
        paddingBlock: theme.spacing(3),
        paddingInline: theme.spacing(4),
      }),
      popupIndicator: ({ theme }) => ({
        padding: theme.spacing(1),
        marginRight: "unset",
      }),
      inputRoot: ({ theme, ownerState }) => ({
        ...(ownerState.readOnly === true && {
          backgroundColor: theme.palette.grey[50],

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
          backgroundColor: theme.palette.primary.main,

          "&:hover, &:focus-visible": {
            backgroundColor: theme.palette.primary.dark,
          },

          "&:active": {
            backgroundColor: theme.palette.primary.main,
          },

          "&:disabled": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
      {
        props: { variant: "secondary" },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.grey[50],
          borderColor: theme.palette.grey[200],
          color: theme.palette.text.primary,
          "&:hover, &:focus-visible": {
            backgroundColor: theme.palette.primary.lighter,
            borderColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },

          "&:active": {
            borderColor: theme.palette.primary.main,
          },

          "&:disabled": {
            borderColor: theme.palette.grey[100],
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey[500],
          },
        }),
      },
      {
        props: { variant: "danger" },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.error.main,
          color: theme.palette.common.white,
          borderColor: "transparent",

          "&:hover": {
            backgroundColor: theme.palette.error.dark,
          },

          "&:focus-visible": {
            boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.error.main}`,
            backgroundColor: theme.palette.error.dark,
          },

          "&:active": {
            backgroundColor: theme.palette.error.main,
          },

          "&:disabled": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.error.light,
          },
        }),
      },
      {
        props: { variant: "floating" },
        style: ({ theme }) => ({
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
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
            color: theme.palette.text.secondary,
            borderColor: "transparent",
          },
        }),
      },
      {
        props: { size: "small" },
        style: ({ theme }) => ({
          paddingBlock: `calc(${theme.spacing(2)} - 1px)`,
          paddingInline: `calc(${theme.spacing(2)} - 1px)`,
          fontSize: "1rem",
        }),
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
        padding: `calc(${theme.spacing(3)} - 1px) ${theme.spacing(3)}`,
        display: "inline-flex",
        position: "relative",
        marginBlock: "0",
        marginInline: "0",
        transitionProperty: "color, background-color, border-color, box-shadow",
        transitionDuration: "100ms",
        transitionTimingFunction: "linear",
        borderWidth: theme.mixins.borderWidth,
        borderStyle: theme.mixins.borderStyle,
        borderRadius: theme.mixins.borderRadius,
        fontSize: theme.typography.body1.fontSize,
        lineHeight: theme.typography.ui.lineHeight,
        whiteSpace: "nowrap",

        ".MuiButton-root + &": {
          marginInlineStart: theme.spacing(2),
        },

        "&:focus-visible": {
          boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.primary.main}`,
          outline: "2px solid transparent",
          outlineOffset: "1px",
        },

        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "inherit", // in order to have cursor: not-allowed, must change pointer-events from "none"
        },

        [`.${buttonClasses.startIcon}, .${buttonClasses.endIcon}`]: {
          "& > *:nth-of-type(1)": {
            fontSize: `${theme.typography.ui.lineHeight}em`,
          },
        },
      }),

      endIcon: ({ theme, ownerState }) => ({
        display: "inline-flex",
        margin: 0,
        marginInlineStart: theme.spacing(2),

        ...(ownerState.children === undefined && {
          marginInlineStart: 0,
        }),
      }),

      startIcon: ({ theme, ownerState }) => ({
        display: "inline-flex",
        margin: 0,
        marginInlineEnd: theme.spacing(2),

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
        width: `${theme.typography.ui.lineHeight}em`,
        height: `${theme.typography.ui.lineHeight}em`,
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
          width: "0.5em",
          height: "0.5em",
          transition: theme.transitions.create(["color"], {
            duration: theme.transitions.duration.short,
          }),
        },

        "&.Mui-checked": {
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,

          ".MuiFormControlLabel-root:hover > &": {
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
          },
        },

        ".MuiFormControlLabel-root:hover > &": {
          backgroundColor: "transparent",
          borderColor: theme.palette.grey[900],
        },
        ".Mui-error:hover > &": {
          borderColor: theme.palette.error.dark,

          "&.Mui-checked": {
            backgroundColor: theme.palette.error.dark,
            borderColor: theme.palette.error.dark,
          },
        },
        ".Mui-error > &": {
          borderColor: theme.palette.error.main,

          "&.Mui-checked": {
            backgroundColor: theme.palette.error.main,
            borderColor: theme.palette.error.main,
          },

          "&.Mui-focusVisible": {
            boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.error.main}`,
          },
        },
        "&.Mui-focusVisible": {
          borderColor: theme.palette.grey[900],
          boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.primary.main}`,
          outline: "2px solid transparent",
          outlineOffset: "1px",
        },
        "&.Mui-disabled": {
          backgroundColor: theme.palette.grey[50],
          borderColor: theme.palette.grey[300],

          ".Mui-error > &": {
            backgroundColor: theme.palette.grey[50],
            borderColor: theme.palette.grey[300],
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
      root: ({ theme, ownerState }) => ({
        height: "auto",
        paddingBlock: theme.spacing(2),
        paddingInline: theme.spacing(3),
        fontSize: theme.typography.body1.fontSize,
        lineHeight: theme.typography.ui.lineHeight,
        borderRadius: "1.5em",
        backgroundColor: theme.palette.grey[100],

        ...(ownerState.onDelete && {
          paddingInlineEnd: theme.spacing(2),
        }),

        [`&.${chipClasses.disabled}`]: {
          opacity: 1,
          pointerEvents: "none",
          backgroundColor: theme.palette.grey[50],
          color: theme.palette.text.secondary,
        },

        ...(ownerState.clickable && {
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
          [`&.${chipClasses.focusVisible}`]: {
            backgroundColor: theme.palette.grey[200],
            outlineColor: theme.palette.primary.main,
            outlineOffset: "2px",
            outlineStyle: "solid",
            outlineWidth: "2px",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: theme.palette.grey[300],
          },
        }),

        ...(ownerState.variant === "status" && {
          paddingBlock: 0,
          paddingInline: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
          color: theme.palette.text.primary,

          "&::before": {
            content: "''",
            width: ".57em",
            height: ".57em",
            marginInlineEnd: theme.spacing(2),
            borderRadius: "100%",
            backgroundColor: theme.palette.text.secondary,
          },

          [`&.${chipClasses.colorError}`]: {
            "&::before": {
              backgroundColor: theme.palette.error.main,
            },
          },

          [`&.${chipClasses.colorSuccess}`]: {
            "&::before": {
              backgroundColor: theme.palette.success.main,
            },
          },

          [`&.${chipClasses.colorWarning}`]: {
            "&::before": {
              backgroundColor: theme.palette.warning.main,
            },
          },
        }),

        [`.${inputBaseClasses.root}.${inputBaseClasses.disabled} &`]: {
          backgroundColor: theme.palette.grey[200],
        },
      }),

      label: {
        padding: 0,
      },

      deleteIcon: ({ theme }) => ({
        WebkitTapHighlightColor: "transparent",
        color: theme.palette.text.secondary,
        fontSize: "1em",
        cursor: "pointer",
        margin: "0",
        marginInlineStart: theme.spacing(2),

        "&:hover": {
          color: theme.palette.text.primary,
        },

        [`.${inputBaseClasses.root}.${inputBaseClasses.disabled} &`]: {
          display: "none",
        },
      }),
    },
  },
  MuiCircularProgress: {
    defaultProps: {
      // TODO: defaultProps cannot take a theme object; matches theme.typography.ui.lineHeight
      size: "1.14285714rem",
      thickness: 8,
      color: "primary",
      disableShrink: false,
      variant: "indeterminate",
    },
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        ...(ownerState.color !== "inherit" && {
          color: theme.palette.primary.dark,
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
          paddingInlineStart: theme.spacing(2),
          paddingInlineEnd: 0,
          borderInlineStartWidth: "3px",
          borderInlineStartStyle: "solid",
          borderInlineStartColor: theme.palette.grey[200],

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
          fontSize: theme.typography.body1.fontSize,
        },

        dfn: {
          fontStyle: "italic",
        },

        dl: {
          display: "grid",
          gridGap: `${theme.spacing(2)} ${theme.spacing(4)}`,
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
          gridGap: theme.spacing(2),
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
          color: theme.palette.text.secondary,
          fontSize: theme.typography.body1.fontSize,
        },

        hr: {
          marginBlock: theme.spacing(2),
          marginInline: 0,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: theme.palette.grey[200],
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
          borderColor: theme.palette.grey[200],
          backgroundColor: theme.palette.grey[50],
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
          marginBlockEnd: theme.spacing(2),
          paddingInlineStart: theme.spacing(1),

          "ul, ol": {
            marginBlockStart: theme.spacing(2),
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
          backgroundColor: theme.palette.grey[50],
          boxShadow: `0 1px 0 ${theme.palette.grey[50]}`,
          fontSize: theme.typography.body1.fontSize,

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
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.fontWeightBold,
          cursor: "default",

          "&:focus-visible": {
            outlineColor: theme.palette.primary.main,
            outlineOffset: "2px",
            outlineStyle: "solid",
            outlineWidth: "2px",
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
        maxWidth: `calc(${theme.mixins.maxWidth} + (${theme.spacing(6)} * 2))`,
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
        maxWidth: "32rem",
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
        gap: theme.spacing(2),
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
          marginBottom: theme.spacing(2),
        },
        "&.Mui-disabled": {
          pointerEvents: "none",
        },
        //[`&:hover ${radioClasses.root}:not(${radioClasses.checked})`]: {
        //color: theme.palette.text.primary,
        //},
        "&:hover .MuiRadio-root, &:hover .MuiCheckbox-root": {
          color: theme.palette.text.primary,
        },
        "&:hover .MuiRadio-root.Mui-checked, &:hover .MuiCheckbox-root.Mui-checked":
          {
            color: theme.palette.primary.dark,
          },
        "&.Mui-error:hover .MuiRadio-root, &.Mui-error:hover .MuiCheckbox-root":
          {
            color: theme.palette.error.dark,
          },
        "&.Mui-error:hover .MuiRadio-root.Mui-checked, &.Mui-error:hover .MuiCheckbox-root.Mui-checked":
          {
            color: theme.palette.error.dark,
          },
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
        marginBlockStart: theme.spacing(2),
        ".MuiFormLabel-root + &": {
          marginBlockStart: `-${theme.spacing(1)}`,
          color: theme.palette.text.secondary,
        },
        marginBlockEnd: theme.spacing(2),
        "&:last-child": {
          marginBlockEnd: 0,
        },
        textAlign: "start",
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        lineHeight: theme.typography.ui.lineHeight,
        fontSize: "1rem",
        fontWeight: 600,
        marginBottom: theme.spacing(2),
        "&.Mui-focused, &.Mui-error, &.Mui-disabled": {
          color: theme.palette.text.primary,
        },
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      edgeEnd: ({ theme }) => ({
        marginInlineEnd: theme.spacing(1),
      }),
      root: ({ theme }) => ({
        padding: theme.spacing(1),
        fontSize: theme.typography.body1.fontSize,
        backgroundColor: "transparent",
        color: theme.palette.text.primary,
        borderColor: "transparent",
        borderRadius: theme.mixins.borderRadius,

        "&:hover, &:focus-visible": {
          backgroundColor: "rgba(29, 29, 33, 0.1)",
          borderColor: "transparent",
        },
        "&:focus-visible": {
          outlineColor: theme.palette.primary.main,
        },
        "&:active": {
          backgroundColor: "rgba(29, 29, 33, 0.2)",
          borderColor: "transparent",
        },
        "&:disabled": {
          backgroundColor: "rgba(235, 235, 237, 0.6)",
          color: theme.palette.text.secondary,
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
          marginInlineStart: theme.spacing(2),
        }),
        ...(ownerState.position === "end" && {
          marginInlineEnd: theme.spacing(2),
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
        color: theme.palette.text.primary,
        lineHeight: theme.typography.ui.lineHeight,
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
          backgroundColor: theme.palette.grey[50],
        }),

        [`&:hover`]: {
          borderColor: theme.palette.grey[900],
        },

        [`&.${inputBaseClasses.focused}`]: {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
          outline: "2px solid transparent",
          outlineOffset: "1px",
        },

        [`&.${inputBaseClasses.error}`]: {
          borderColor: theme.palette.error.main,
        },

        [`&.${inputBaseClasses.error}:hover`]: {
          borderColor: theme.palette.error.dark,
        },

        [`&.${inputBaseClasses.error}.${inputBaseClasses.focused}`]: {
          borderColor: theme.palette.error.main,
          boxShadow: `0 0 0 1px ${theme.palette.error.main}`,
        },

        [`&.${inputBaseClasses.disabled}`]: {
          color: theme.palette.text.disabled,
          borderColor: theme.palette.action.disabled,
          pointerEvents: "auto",
          backgroundColor: theme.palette.grey[50],
          cursor: "not-allowed",
        },
      }),
      input: ({ theme }) => ({
        boxSizing: "border-box",
        height: "auto",
        paddingBlock: `calc(${theme.spacing(3)} - ${theme.mixins.borderWidth})`,
        paddingInline: theme.spacing(3),
        boxShadow: "none",

        [`.${inputBaseClasses.disabled} &`]: {
          pointerEvents: "auto",
          cursor: "not-allowed",
        },

        [`.${inputAdornmentClasses.root} + &`]: {
          paddingInlineStart: theme.spacing(2),
        },

        [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
          "&::placeholder": {
            color: theme.palette.text.secondary,
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
      }),
    },
  },
  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        textDecoration: "underline",

        "&:hover": {
          color: theme.palette.primary.dark,
          textDecoration: "underline",
        },

        "&:focus-visible": {
          outlineColor: theme.palette.primary.main,
          outlineOffset: "2px",
          outlineStyle: "solid",
          outlineWidth: "1px",
        },

        "&:visited": {
          color: theme.palette.primary.main,
        },

        ".Link-indicator, .Link-icon": {
          display: "inline-block",
          height: "1em",
          lineHeight: 1,
        },

        ".Link-indicator": {
          marginInlineStart: theme.spacing(2),
        },

        ".Link-icon": {
          marginInlineEnd: theme.spacing(2),
        },
        svg: {
          fontSize: "1rem",
          height: "1em",
          position: "relative",
          top: "-0.0625em",
          verticalAlign: "middle",
          width: "1em",
        },
      }),
    },
    variants: [
      {
        props: { variant: "monochrome" },
        style: ({ theme }) => ({
          color: theme.palette.text.primary,
          textDecoration: "underline",

          "&:hover": {
            color: theme.palette.text.secondary,
          },

          "&:focus-visible": {
            outlineColor: theme.palette.primary.main,
            outlineOffset: "2px",
            outlineStyle: "solid",
            outlineWidth: "1px",
          },

          "&:visited": {
            color: theme.palette.text.primary,
          },
        }),
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
        paddingBlock: theme.spacing(2),
        paddingInline: theme.spacing(4),
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: theme.typography.caption.lineHeight,
        color: theme.palette.text.secondary,
        textTransform: "uppercase",
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        gap: theme.spacing(2),
        minHeight: "unset",
        paddingBlock: theme.spacing(3),

        "&:hover": {
          textDecoration: "none",
          backgroundColor: theme.palette.grey[100],

          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
        },

        [`&.${menuItemClasses.root}-destructive`]: {
          color: theme.palette.error.main,
        },

        [`&.${menuItemClasses.selected}`]: {
          backgroundColor: "transparent",
          color: theme.palette.primary.main,

          "&:hover": {
            backgroundColor: theme.palette.primary.lighter,

            "@media (hover: none)": {
              backgroundColor: `rgba(${theme.palette.primary.main} / ${theme.palette.action.selectedOpacity})`,
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
      icon: ({ theme }) => ({
        insetInlineEnd: theme.spacing(3),
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: ({ theme }) => ({
        marginBlockStart: theme.spacing(1),
        borderWidth: theme.mixins.borderWidth,
        borderStyle: theme.mixins.borderStyle,
        borderColor: theme.palette.grey[200],
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
        width: `${theme.typography.ui.lineHeight}em`,
        height: `${theme.typography.ui.lineHeight}em`,
        borderRadius: `${theme.typography.ui.lineHeight}em`,
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
          borderColor: theme.palette.error.dark,
          "&::before": {
            backgroundColor: theme.palette.error.dark,
          },
        },
        ".Mui-error > &": {
          borderColor: theme.palette.error.main,
          "&::before": {
            backgroundColor: theme.palette.error.main,
          },

          "&.Mui-focusVisible": {
            boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.error.main}`,
          },
        },
        "&.Mui-focusVisible": {
          borderColor: theme.palette.grey[900],
          boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.primary.main}`,
          outline: "2px solid transparent",
          outlineOffset: "1px",
        },
        "&.Mui-checked": {
          position: "relative",

          "&::before": {
            backgroundColor: theme.palette.primary.main,
          },
        },
        ".Mui-error > &.Mui-checked::before": {
          backgroundColor: theme.palette.error.main,
        },
        "&.Mui-disabled": {
          backgroundColor: theme.palette.grey[50],
          borderColor: theme.palette.grey[300],

          "&.Mui-checked::before": {
            backgroundColor: theme.palette.grey[300],
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
  },
  MuiSelect: {
    defaultProps: {
      variant: "standard",
      IconComponent: ChevronDownIcon,
    },
    styleOverrides: {
      select: ({ theme }) => ({
        paddingBlock: `calc(${theme.spacing(3)} - ${theme.mixins.borderWidth})`,
        paddingInline: theme.spacing(3),

        "&:focus": {
          backgroundColor: "transparent",
        },

        ".MuiBox-root": {
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing(1),
          marginBlock: `-${theme.spacing(2)}`,
          marginInline: `-${theme.spacing(2)}`,
        },
      }),
      icon: ({ theme }) => ({
        insetInlineEnd: theme.spacing(3),
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiSvgIcon: {
    defaultProps: {
      fontSize: "inherit",
      color: "inherit",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: `${theme.typography.ui.lineHeight}rem`,
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
          color: theme.palette.text.primary,
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
          color: theme.palette.primary.main,
        },
        "&:focus-visible::before, &.Mui-focusVisible::before": {
          content: "''",
          position: "absolute",
          top: theme.spacing(4),
          right: `calc(-1 * ${theme.spacing(2)})`,
          bottom: theme.spacing(4),
          left: `calc(-1 * ${theme.spacing(2)})`,
          borderWidth: theme.mixins.borderWidth,
          borderStyle: theme.mixins.borderStyle,
          borderColor: theme.palette.primary.main,
          borderRadius: theme.mixins.borderRadius,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          fontWeight: theme.typography.fontWeightBold,
          "&:hover": {
            color: theme.palette.primary.main,
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
        border: `${theme.mixins.borderWidth} ${theme.mixins.borderStyle} ${theme.palette.grey[100]}`,
        borderRadius: theme.mixins.borderRadius,
        marginBlock: theme.spacing(0),
        marginInline: theme.spacing(0),
        lineHeight: theme.typography.ui.lineHeight,

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
        borderBottom: `${theme.mixins.borderWidth} ${theme.mixins.borderStyle} ${theme.palette.grey[100]}`,
        textAlign: "start",
        verticalAlign: "baseline",
        padding: "unset",
        paddingBlock: theme.spacing(4),
        paddingInline: theme.spacing(4),
        overflowWrap: "break-word",

        [`.${tableRowClasses.root}:hover &[rowspan]`]: {
          backgroundColor: theme.palette.common.white,
        },

        [`.${tableBodyClasses.root} .${tableRowClasses.root}:last-of-type &`]: {
          borderBottom: 0,
        },

        [`.${tableRowClasses.selected} &`]: {
          borderBottomColor: theme.palette.primary.light,
        },

        [`.${tableRowClasses.selected}:hover &`]: {
          borderBottomColor: theme.palette.primary.main,
        },

        ...(ownerState.variant === "action" && {
          paddingBlock: 0,
        }),

        ...(ownerState.variant === "body" && {
          color: theme.palette.text.primary,
        }),

        ...(ownerState.variant === "date" && {
          whiteSpace: "nowrap",
        }),

        ...(ownerState.variant === "footer" && {
          color: theme.palette.text.secondary,
          lineHeight: theme.typography.body1.lineHeight,
          fontSize: theme.typography.body1.fontSize,
        }),

        [`.${tableHeadClasses.root} &`]: {
          color: theme.palette.text.secondary,
          lineHeight: theme.typography.body1.lineHeight,
          fontWeight: theme.typography.fontWeightBold,
          backgroundColor: theme.palette.grey[50],
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
          backgroundColor: theme.palette.grey[50],
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
          color: theme.palette.text.primary,
          outlineOffset: theme.spacing(4),
          outlineStyle: "solid",
          outlineWidth: "2px",
          outlineColor: theme.palette.primary.main,
        },
        "&:hover": {
          color: theme.palette.text.primary,
          [`& .${tableSortLabelClasses.icon}`]: {
            opacity: 1,
          },
        },
        [`&.${tableSortLabelClasses.active}`]: {
          color: theme.palette.text.secondary,
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
          marginInlineEnd: theme.spacing(2),
        },

        [`.${tableCellClasses.alignLeft} &`]: {
          marginInlineStart: theme.spacing(2),
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
        paddingBlock: theme.spacing(2),
        paddingInline: theme.spacing(3),
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        fontSize: theme.typography.subtitle1.fontSize,
        lineHeight: theme.typography.subtitle1.lineHeight,
        ...(ownerState.touch === true && {
          paddingBlock: theme.spacing(2),
          paddingInline: theme.spacing(3),
          fontSize: theme.typography.subtitle1.fontSize,
          lineHeight: theme.typography.subtitle1.lineHeight,
          fontWeight: theme.typography.fontWeightRegular,
        }),
        [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
          transformOrigin: "right center",
          ...(ownerState.isRtl
            ? {
                marginInlineStart: theme.spacing(3),
                ...(ownerState.touch === true && {
                  marginInlineStart: theme.spacing(4),
                }),
              }
            : {
                marginInlineEnd: theme.spacing(3),
                ...(ownerState.touch === true && {
                  marginInlineEnd: theme.spacing(4),
                }),
              }),
        },
        [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
          transformOrigin: "left center",
          ...(ownerState.isRtl
            ? {
                marginInlineEnd: theme.spacing(3),
                ...(ownerState.touch === true && {
                  marginInlineEnd: theme.spacing(4),
                }),
              }
            : {
                marginInlineStart: theme.spacing(3),
                ...(ownerState.touch === true && {
                  marginInlineStart: theme.spacing(4),
                }),
              }),
        },
        [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
          transformOrigin: "center bottom",
          marginBottom: theme.spacing(3),
          ...(ownerState.touch === true && {
            marginBottom: theme.spacing(4),
          }),
        },
        [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
          transformOrigin: "center top",
          marginTop: theme.spacing(3),
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

        [`.${tooltipClasses.popper}[data-popper-placement*="top"] &::before`]: {
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
        "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
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
      paragraph: ({ theme }) => ({
        marginBottom: theme.spacing(4),
      }),
    },
  },
};
