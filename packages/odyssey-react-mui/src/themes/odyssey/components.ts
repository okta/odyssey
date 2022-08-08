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

import { grid2Classes, ThemeOptions } from "@mui/material";
//import radioClasses from "@mui/material";

export const components: ThemeOptions["components"] = {
  MuiAlert: {
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
        }),
        ...(ownerState.variant === "infobox" && {
          borderStyle: "solid",
          borderWidth: 1,
          "&:not(:last-child)": {
            marginBottom: theme.spacing(4),
          },
        }),
        ...(ownerState.variant === "toast" && {
          maxWidth: theme.mixins.maxWidth,
          borderStyle: "solid",
          borderWidth: 1,
          position: "relative",
          alignItems: "start",
        }),
      }),
      action: ({ ownerState, theme }) => ({
        ...(ownerState.variant === "banner" && {
          padding: 0,
          marginRight: 0,
          top: "50%",
          right: theme.spacing(4),
          position: "absolute",
          transform: "translateY(-50%)",
        }),
        ...(ownerState.variant === "toast" && {
          position: "absolute",
          top: `calc(${theme.spacing(4)} - ${theme.spacing(1)} + ${
            theme.mixins.borderWidth
          })`,
          right: `calc(${theme.spacing(4)} - ${theme.spacing(1)} + ${
            theme.mixins.borderWidth
          })`,
          padding: 0,
          marginLeft: 0,
          marginRight: 0,
        }),
      }),
      icon: ({ ownerState, theme }) => ({
        marginRight: 0,
        padding: 0,
        fontSize: "1.429rem",
        opacity: 1,
        ...(ownerState.severity && {
          color: theme.palette[ownerState.severity].main,
        }),
        ...(ownerState.severity === "warning" && {
          color: theme.palette[ownerState.severity].dark,
        }),
      }),
      message: ({ ownerState, theme }) => ({
        padding: 0,
        lineHeight: theme.typography.body.lineHeight,
        ...(ownerState.variant === "banner" && {
          display: "flex",
          justifyContent: "space-between",
          gap: theme.spacing(4),
        }),
        ...(ownerState.variant === "toast" && {
          flexGrow: 1,
          paddingRight: `calc((${theme.spacing(1)} * 2) + ${
            theme.typography.body.fontSize
          } + ${theme.spacing(4)})`,
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
      }),
    },
  },
  MuiButton: {
    defaultProps: {
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
          "&:hover": {
            background: theme.palette.primary.lighter,
            borderColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },

          "&:focus-visible": {
            backgroundColor: theme.palette.primary.main,
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
            outlineColor: theme.palette.error.light,
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
          backgroundColor: theme.palette.common.white,
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
            backgroundColor: "rgba(235, 235, 237, 0.6)",
            color: theme.palette.text.secondary,
            borderColor: "transparent",
          },
        }),
      },
      {
        props: { size: "s" },
        style: ({ theme }) => ({
          paddingBlock: `calc(${theme.spacing(2)} - 1px)`,
          paddingInline: `calc(${theme.spacing(3)} - 1px)`,
          fontSize: "1rem",
        }),
      },
      {
        props: { size: "l" },
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

          ".MuiButton-startIcon": {
            margin: "0",
          },
        },
      },
    ],
    styleOverrides: {
      root: ({ theme }) => ({
        fontWeight: 600,
        padding: `calc(${theme.spacing(3)} - 1px) ${theme.spacing(3)}`,
        display: "inline-block",
        position: "relative",
        marginBlock: "0",
        marginInline: "0",
        transitionProperty:
          "color, background-color, border-color, outline-offset, outline-color",
        transitionDuration: "100ms",
        transitionTimingFunction: "linear",
        borderWidth: "1px",
        borderStyle: "solid",
        outlineColor: "transparent",
        outlineOffset: "0",
        fontSize: "1rem",
        lineHeight: "1.14285714",
        whiteSpace: "nowrap",

        "& + &": {
          marginInlineStart: theme.spacing(2),
        },

        "&:focus-visible": {
          outlineOffset: "2px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },

        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "inherit", // in order to have cursor: not-allowed, must change pointer-events from "none"
        },

        ".MuiButton-startIcon > *:nth-of-type(1)": {
          fontSize: "inherit",
        },
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      boxSizing: "border-box",
      fontFeatureSettings: "'lnum','pnum'",
      fontVariant: "normal",
    },
  },
  MuiCheckbox: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "transparent",
        },
        padding: 0,
        ".Mui-error > &": {
          color: theme.palette.error.main,
          "&:hover": {
            color: theme.palette.error.dark,
          },
        },
        ".Mui-error > &.Mui-checked": {
          "&:hover": {
            color: theme.palette.error.dark,
          },
        },
        "&.Mui-focusVisible": {
          outlineColor: theme.palette.primary.main,
          outlineOffset: 0,
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
      }),
    },
  },
  MuiCircularProgress: {
    defaultProps: {
      // TODO: defaultProps cannot take a theme object; needs workaround
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
  MuiFormControl: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        width: "100%",
        maxWidth: "32rem",
        ...(ownerState.margin === "normal" && {
          marginTop: 0,
          marginBottom: theme.spacing(4),
        }),
        ...(ownerState.margin === "dense" && {
          marginTop: 0,
          marginBottom: theme.spacing(4),
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
        marginLeft: 0,
        marginRight: 0, // used for row presentation of radio/checkbox
        ...(ownerState.labelPlacement === "start" && {
          marginLeft: 0, // used for row presentation of radio/checkbox
          marginRight: 0,
        }),
        ...(ownerState.labelPlacement === "top" && {
          marginLeft: 0,
        }),
        ...(ownerState.labelPlacement === "bottom" && {
          marginLeft: 0,
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
        lineHeight: "1.33333333",
        marginTop: theme.spacing(2),
        ".MuiFormLabel-root + &": {
          marginTop: `-${theme.spacing(1)}`,
          color: theme.palette.text.secondary,
        },
        marginBottom: theme.spacing(2),
        "&:last-child": {
          marginBottom: 0,
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        lineHeight: "1.14285714",
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
      root: ({ theme }) => ({
        padding: theme.spacing(1),
        fontSize: theme.typography.body.fontSize,
      }),
    },
  },
  MuiInputAdornment: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        display: "flex",
        ...(ownerState.position === "start" && {
          marginRight: 0,
        }),
        ...(ownerState.position === "end" && {
          marginLeft: 0,
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        lineHeight: "1.14285714",
      },
      input: {
        boxSizing: "border-box",
        height: "auto",
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
        textDecoration: "none",

        "&:hover": {
          color: theme.palette.primary.main,
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
  MuiNativeSelect: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      icon: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiOutlinedInput: {
    defaultProps: {
      notched: false,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        "&.Mui-disabled": {
          pointerEvents: "none",
        },
        ...(ownerState.startAdornment && {
          paddingLeft: theme.spacing(3),
        }),
        ...(ownerState.endAdornment && {
          paddingRight: theme.spacing(3),
        }),
      }),
      input: ({ theme }) => ({
        padding: `calc(${theme.spacing(3)} - 1px) ${theme.spacing(3)}`,
        border: "1px solid transparent",
      }),
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.grey[500],
        ".MuiOutlinedInput-root:hover &": {
          borderColor: theme.palette.primary.main,
        },
        ".MuiOutlinedInput-root.Mui-error:hover &": {
          borderColor: theme.palette.error.dark,
        },
      }),
    },
  },
  MuiRadio: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        "&:hover": {
          backgroundColor: "transparent",
        },
        padding: 0,
        ".Mui-error > &": {
          color: theme.palette.error.main,
          "&:hover": {
            color: theme.palette.error.dark,
          },
        },
        "&.Mui-focusVisible": {
          outlineColor: theme.palette.primary.main,
          outlineOffset: 0,
          outlineStyle: "solid",
          outlineWidth: "2px",
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
  MuiTypography: {
    defaultProps: {
      fontFamily:
        "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    },
    styleOverrides: {
      paragraph: ({ theme }) => ({
        marginBottom: theme.spacing(4),
      }),
    },
  },
};
