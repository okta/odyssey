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

import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { checkboxClasses } from "@mui/material/Checkbox";
import { dividerClasses } from "@mui/material/Divider";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { tableBodyClasses } from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import { tableHeadClasses } from "@mui/material/TableHead";
import { tableRowClasses } from "@mui/material/TableRow";

import type { GetComponentsProps } from "./types.js";

export const tableComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  | "MuiTable"
  | "MuiTableCell"
  | "MuiTableContainer"
  | "MuiTableRow"
  | "MuiTableSortLabel"
> => ({
  MuiTable: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        display: "table",
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        marginBlock: odysseyTokens.Spacing0,
        marginInline: odysseyTokens.Spacing0,
        lineHeight: odysseyTokens.TypographyLineHeightUi,

        "&.narrow": {
          width: "100%",
          tableLayout: "fixed",
        },

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
        textAlign: "start",
        verticalAlign: "baseline",
        padding: `0 ${odysseyTokens.Spacing3} !important`,
        overflow: "visible !important",
        position: "relative",
        overflowWrap: "break-word",

        [`&.${tableCellClasses.root}`]: {
          borderTop: `none !important`,
          borderBottom: `none !important`,
          borderLeft: `none !important`,
        },

        ["&::after"]: {
          background: "transparent !important",
        },

        [`.${tableBodyClasses.root} &.${tableCellClasses.root}`]: {
          borderRight: `none !important`,
        },

        [`&.${tableCellClasses.root}.isResizing::after`]: {
          borderRightColor: odysseyTokens.BorderColorPrimaryControl,
          borderRightStyle: odysseyTokens.BorderStyleMain,
          borderRightWidth: 2,
          content: '""',
          position: "absolute",
          right: 0,
        },

        [`.MuiTable-root.narrow &:last-child`]: {
          width: "auto",
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
          color: odysseyTokens.TypographyColorSubordinate,
          lineHeight: odysseyTokens.TypographyLineHeightBody,
          fontSize: odysseyTokens.TypographySizeBody,
        }),

        [`.${tableHeadClasses.root} &`]: {
          color: odysseyTokens.TypographyColorHeading,
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
          textTransform: "uppercase",
          backgroundColor: odysseyTokens.HueNeutral50,
          borderBottom: 0,
          height: `${odysseyTokens.Spacing7} !important`,
          paddingBlock: `${odysseyTokens.Spacing3} !important`,
          fontSize: odysseyTokens.TypographySizeOverline,
          lineHeight: odysseyTokens.TypographyLineHeightBody,
          letterSpacing: 1.3,
        },

        [`.${tableHeadClasses.root} &:first-of-type`]: {
          borderTopLeftRadius: odysseyTokens.Spacing2,
          borderBottomLeftRadius: odysseyTokens.Spacing2,
        },

        [`.${tableHeadClasses.root} &:last-of-type`]: {
          borderTopRightRadius: odysseyTokens.Spacing2,
          borderBottomRightRadius: odysseyTokens.Spacing2,
        },

        [`.${tableHeadClasses.root} .ods-actions-cell + &:last-of-type, .${tableBodyClasses.root} .ods-actions-cell + &:last-of-type`]:
          {
            flexGrow: 0,
            // When a table has an actions column, we need to 0 the padding on the final (spacing-related) column otherwise
            // the last column is too wide
            padding: "0 !important",
            // The last column needs to be the same width as the border-radius of the thead row to ensure the border-radius isn't
            // cut off
            width: odysseyTokens.Spacing2,
          },
        [`.ods-hide-spacer-column .${tableHeadClasses.root} &:last-of-type, .ods-hide-spacer-column .${tableBodyClasses.root} &:last-of-type`]:
          {
            display: "none",
          },

        [`.ods-hide-spacer-column .${tableHeadClasses.root} &:nth-last-of-type(2), .ods-hide-spacer-column .${tableBodyClasses.root} &:nth-last-of-type(2)`]:
          {
            borderTopRightRadius: odysseyTokens.Spacing2,
            borderBottomRightRadius: odysseyTokens.Spacing2,

            [`& .Mui-TableHeadCell-ResizeHandle-Wrapper`]: {
              display: "none",
            },
          },

        [`.ods-column-grow .${tableHeadClasses.root} &:nth-last-of-type(2), .ods-column-grow .${tableBodyClasses.root} &:nth-last-of-type(2)`]:
          {
            flexGrow: 1,
          },

        ...(ownerState.variant === "number" && {
          textAlign: "end",
          fontFeatureSettings: '"lnum", "tnum"',
        }),

        ...(ownerState.padding === "checkbox" && {
          width: 48, // prevent the checkbox column from growing
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

        [`& .${checkboxClasses.root}`]: {
          width: `${odysseyTokens.TypographyLineHeightUi}rem`,
          height: `${odysseyTokens.TypographyLineHeightUi}rem`,
          margin: 0,
        },

        [`& .Mui-TableHeadCell-ResizeHandle-Wrapper`]: {
          marginInlineEnd: `-${odysseyTokens.Spacing3}`,

          [`&:active .${dividerClasses.vertical}`]: {
            display: "none",
          },
        },

        [`& .Mui-TableHeadCell-Content-Wrapper`]: {
          flexShrink: 0,
        },

        [`& .${dividerClasses.vertical}`]: {
          borderStyle: "none none none solid",
          borderWidth: 1,
          borderRadius: 0,
          marginRight: 2,
          borderColor: odysseyTokens.HueNeutral400,
          height: 18,
        },

        [`.ods-drag-handle .${svgIconClasses.root}`]: {
          color: odysseyTokens.HueNeutral500,
        },

        [`& .${buttonBaseClasses.root}`]: {
          marginBlock: `-${odysseyTokens.Spacing2}`,
        },
      }),
    },
  },
  MuiTableContainer: {
    defaultProps: {
      component: "figure",
    },
    styleOverrides: {
      root: {
        width: "unset",
        maxWidth: "100%",
        marginBlockStart: odysseyTokens.Spacing0,
        marginBlockEnd: odysseyTokens.Spacing4,
        marginInline: 0,
        overflowX: "auto",
        display: "block !important",

        "&:last-child": {
          marginBlock: 0,
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: () => ({
        borderTop: `${odysseyTokens.BorderWidthMain} ${odysseyTokens.BorderStyleMain} ${odysseyTokens.HueNeutral100}`,
        transition: "none !important",
        verticalAlign: "unset",

        [`&:hover`]: {
          backgroundColor: `${odysseyTokens.HueNeutral50} !important`,
        },

        [`&:first-of-type`]: {
          borderTopColor: odysseyTokens.HueNeutralWhite,
        },

        [`&.${tableRowClasses.selected}`]: {
          backgroundColor: `${odysseyTokens.PalettePrimaryLighter} !important`,

          "&:hover": {
            backgroundColor: `${odysseyTokens.PalettePrimaryLighter} !important`,
          },

          [`&:hover + .${tableRowClasses.root}`]: {
            borderTopColor: odysseyTokens.PalettePrimaryMain,
          },
        },
        [`.${tableRowClasses.selected} + &`]: {
          borderTopColor: odysseyTokens.PalettePrimaryLight,
        },
        [`&.${tableRowClasses.head}`]: {
          boxShadow: "none !important",
          borderBottom: 0,

          "&:hover, &:focus-within": {
            backgroundColor: "transparent !important",
          },
        },

        [`.${tableBodyClasses.root} &`]: {
          // Target is 48px height
          paddingBlock: odysseyTokens.Spacing3,

          [`& .${tableCellClasses.root}::after`]: {
            top: `-${odysseyTokens.Spacing3} !important`,
            bottom: `-${odysseyTokens.Spacing3} !important`,
          },
        },

        [`.${tableBodyClasses.root}.MuiTableBody-compact &`]: {
          // Target is 36px height
          paddingBlock: odysseyTokens.Spacing2,

          [`& .${tableCellClasses.root}::after`]: {
            top: `-${odysseyTokens.Spacing2} !important`,
            bottom: `-${odysseyTokens.Spacing2} !important`,
          },
        },

        [`.${tableBodyClasses.root}.MuiTableBody-spacious &`]: {
          // Target is 56px height
          paddingBlock: odysseyTokens.Spacing4,

          [`& .${tableCellClasses.root}::after`]: {
            top: `-${odysseyTokens.Spacing4} !important`,
            bottom: `-${odysseyTokens.Spacing4} !important`,
          },
        },

        "&.isDragTarget": {
          opacity: 1,
          position: "relative",
          backgroundColor: odysseyTokens.PalettePrimaryMain,
          borderRadius: odysseyTokens.BorderRadiusOuter,

          [`& td.${tableCellClasses.root}`]: {
            borderTop: "0 !important",
            borderRight: "0 !important",
            borderBottom: "0 !important",
            borderLeft: "0 !important",
          },

          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderColor: odysseyTokens.PalettePrimaryLight,
            borderStyle: "dashed",
            borderWidth: 2,
            borderRadius: odysseyTokens.BorderRadiusOuter,
          },
        },

        "&.isDragging": {
          borderRadius: odysseyTokens.BorderRadiusOuter,
        },

        "&.isDragging::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderColor: odysseyTokens.HueNeutral200,
          borderStyle: "dashed",
          borderWidth: 2,
          borderRadius: odysseyTokens.BorderRadiusOuter,
        },

        "&.isDragging, &.isDragging.isDragTarget": {
          position: "relative",
          opacity: 1,
          backgroundColor: "transparent",
        },

        "&.isDragging.isDragTarget::after": {
          borderColor: odysseyTokens.PalettePrimaryLight,
          left: 0,
          right: 0,
        },

        [`&.isDragging + .${tableRowClasses.root}, &.isDragTarget + .${tableRowClasses.root}`]:
          {
            borderTopColor: "transparent",
          },
      }),
    },
  },
  MuiTableSortLabel: {
    styleOverrides: {
      root: {
        cursor: "pointer",
        display: "inline-flex",
        justifyContent: "flex-start",
        flexDirection: "inherit",
        alignItems: "center",
        marginInlineEnd: odysseyTokens.Spacing3,
        "&:focus-visible": {
          color: odysseyTokens.TypographyColorBody,
          outlineOffset: odysseyTokens.Spacing4,
          outlineStyle: odysseyTokens.FocusOutlineStyle,
          outlineWidth: odysseyTokens.FocusOutlineWidthMain,
          outlineColor: odysseyTokens.FocusOutlineColorPrimary,
        },
        "&:hover": {
          color: odysseyTokens.TypographyColorBody,
        },
      },
      icon: ({ ownerState }) => ({
        ...(ownerState.direction === "asc" && {
          transform: "rotate(180deg) !important",
        }),

        ".isUnsorted &": {
          opacity: "0 !important",
        },

        ".isUnsorted:hover &, .isUnsorted:focus &": {
          opacity: "0.5 !important",

          "&:hover, &:focus": {
            opacity: "1 !important",
          },
        },

        ".isSorted &": {
          opacity: 1,
        },
      }),
    },
  },
});
