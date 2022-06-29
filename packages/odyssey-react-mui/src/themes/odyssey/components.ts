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

import type { ThemeOptions } from "@mui/material";
//import radioClasses from "@mui/material";

export const components: ThemeOptions["components"] = {
  MuiAlert: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        padding: theme.spacing(4),
        color: theme.palette.text.primary,
        ...(ownerState.severity && {
          backgroundColor: theme.palette[ownerState.severity].lighter,
          borderColor: theme.palette[ownerState.severity].light,
        }),
        ...(ownerState.variant === "infobox" && {
          borderStyle: "solid",
          borderWidth: 1,
          "&:not(:last-child)": {
            marginBottom: theme.spacing(4),
          },
        }),
        ...(ownerState.variant === "banner" && {
          borderWidth: 0,
        }),
      }),
      icon: ({ ownerState, theme }) => ({
        marginRight: theme.spacing(4),
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
      message: ({ theme }) => ({
        padding: 0,
        lineHeight: theme.typography.body.lineHeight,
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
        style: {
          fontWeight: 600,
          color: "#ffffff",
          borderColor: "transparent",
          backgroundColor: "#1662dd",

          "&:hover, &:focus-visible": {
            backgroundColor: "#00297a",
          },

          "&:active": {
            backgroundColor: "#1662dd",
          },

          "&:disabled": {
            color: "#ffffff",
            backgroundColor: "#a7b5ec",
          },
        },
      },
      {
        props: { variant: "secondary" },
        style: {
          backgroundColor: "#f5f5f6",
          borderColor: "#d7d7dc",
          color: "#1d1d21",
          "&:hover": {
            background: "#f2f5ff",
            borderColor: "#a7b5ec",
            color: "#1662dd",
          },

          "&:focus-visible": {
            backgroundColor: "#1662dd",
            color: "#1662dd",
          },

          "&:active": {
            borderColor: "#1662dd",
          },

          "&:disabled": {
            borderColor: "#ebebed",
            backgroundColor: "#ebebed",
            color: "#8c8c96",
          },
        },
      },
      {
        props: { variant: "danger" },
        style: {
          backgroundColor: "#da372c",
          color: "#ffffff",
          "&:hover": {
            borderColor: "transparent",
            backgroundColor: "#640019",
          },

          "&:focus-visible": {
            outlineColor: "#f88c90",
            backgroundColor: "#640019",
          },

          "&:active": {
            borderColor: "transparent",
            backgroundColor: "#da372c",
          },

          "&:disabled": {
            color: "#ffffff",
            borderColor: "#f88c90",
            backgroundColor: "#f88c90",
          },
        },
      },
      {
        props: { variant: "floating" },
        style: {
          backgroundColor: "#ffffff",
          color: "#1d1d21",
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
            color: "#6e6e78",
            borderColor: "transparent",
          },
        },
      },
      {
        props: { size: "s" },
        style: {
          paddingBlock: "calc(0.57142857rem - 1px)",
          paddingInline: "calc(0.85714286rem - - 1px)",
          fontSize: "1rem",
        },
      },
      {
        props: { size: "l" },
        style: {
          paddingBlock: "calc(1.14285714rem - 1px)",
          paddingInline: "calc(1.14285714rem - 1px)",
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
            marginBlockEnd: "1.14285714rem",
          },
        },
      },
    ],
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...ownerState,
        fontWeight: 600,
        paddingBlock: "0.85714286rem",
        paddingInline: "0.85714286rem",
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
          marginInlineStart: "0.57142857rem",
        },

        "&:focus-visible": {
          outlineOffset: "2px",
          outlineStyle: "solid",
          outlineWidth: "2px",
        },

        "&:disabled": {
          cursor: "not-allowed",
          pointerEvents: "inherit", // in order to have cursor: not-allowed, must change pointer-events from 'none'
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
      root: {
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "transparent",
        },
        padding: 0,
        ".Mui-error > &": {
          color: "#da372c",
          "&:hover": {
            color: "#640019",
          },
        },
        ".Mui-error > &.Mui-checked": {
          "&:hover": {
            color: "#640019",
          },
        },
        "&.Mui-focusVisible": {
          outlineColor: "#1662dd",
          outlineOffset: 0,
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
      },
    },
  },
  MuiCircularProgress: {
    defaultProps: {
      size: "1.14285714rem",
      thickness: 8,
      color: "primary",
      disableShrink: false,
      variant: "indeterminate",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.color !== "inherit" && {
          color: "#00297a",
        }),
      }),
      circle: ({ ownerState }) => ({
        ...(ownerState.variant === "indeterminate" && {
          strokeDasharray: "160%, 360%",
        }),
      }),
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        gap: "0.57142857rem",
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
          marginBottom: "0.57142857rem",
        },
        "&.Mui-disabled": {
          pointerEvents: "none",
        },
        //[`&:hover ${radioClasses.root}:not(${radioClasses.checked})`]: {
        //color: "#1d1d21",
        //},
        "&:hover .MuiRadio-root, &:hover .MuiCheckbox-root": {
          color: "#1d1d21",
        },
        "&:hover .MuiRadio-root.Mui-checked, &:hover .MuiCheckbox-root.Mui-checked":
          {
            color: "#00297a",
          },
        "&.Mui-error:hover .MuiRadio-root, &.Mui-error:hover .MuiCheckbox-root":
          {
            color: "#640019",
          },
        "&.Mui-error:hover .MuiRadio-root.Mui-checked, &.Mui-error:hover .MuiCheckbox-root.Mui-checked":
          {
            color: "#640019",
          },
      }),
    },
  },
  MuiFormHelperText: {
    defaultProps: {
      variant: "standard",
    },
    styleOverrides: {
      root: {
        lineHeight: "1.33333333",
        marginTop: "0.57142857rem",
        ".MuiFormLabel-root + &": {
          marginTop: "-0.28571429rem",
          color: "#6e6e78",
        },
        marginBottom: "0.57142857rem",
        "&:last-child": {
          marginBottom: 0,
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: "#1d1d21",
        lineHeight: "1.14285714",
        fontSize: "1rem",
        fontWeight: 600,
        marginBottom: "0.57142857rem",
        "&.Mui-focused, &.Mui-error, &.Mui-disabled": {
          color: "#1d1d21",
        },
      },
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
  MuiLink: {
    styleOverrides: {
      root: {
        color: "#1662dd",
        textDecoration: "none",

        "&:hover": {
          color: "#1662dd",
          textDecoration: "underline",
        },

        "&:focus-visible": {
          outlineColor: "#1662dd",
          outlineOffset: "2px",
          outlineStyle: "solid",
          outlineWidth: "1px",
        },

        "&:visited": {
          color: "#1662dd",
        },

        ".Link-indicator, .Link-icon": {
          display: "inline-block",
          height: "1em",
          lineHeight: 1,
        },

        ".Link-indicator": {
          marginInlineStart: "0.57142857rem",
        },

        ".Link-icon": {
          marginInlineEnd: "0.57142857rem",
        },
        svg: {
          fontSize: "1rem",
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
          color: "#1d1d21",
          textDecoration: "underline",

          "&:hover": {
            color: "#6e6e78",
          },

          "&:focus-visible": {
            outlineColor: "#1662dd",
            outlineOffset: "2px",
            outlineStyle: "solid",
            outlineWidth: "1px",
          },

          "&:visited": {
            color: "#1d1d21",
          },
        },
      },
    ],
  },
  MuiRadio: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: "transparent",
        },
        padding: 0,
        ".Mui-error > &": {
          color: "#da372c",
          "&:hover": {
            color: "#640019",
          },
        },
        "&.Mui-focusVisible": {
          outlineColor: "#1662dd",
          outlineOffset: 0,
          outlineStyle: "solid",
          outlineWidth: "2px",
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      fontFamily:
        "'Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Noto Sans Arabic', sans-serif",
    },
    styleOverrides: {
      paragraph: {
        marginBottom: "1.14285714rem",
      },
    },
  },
};
