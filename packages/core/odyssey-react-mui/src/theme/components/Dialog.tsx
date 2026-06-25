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

export const dialogComponents = ({
  odysseyTokens,
  shadowDomElement,
  shadowRootElement,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  | "MuiDialog"
  | "MuiDialogActions"
  | "MuiDialogContent"
  | "MuiDialogContentText"
  | "MuiDialogTitle"
> => ({
  MuiDialog: {
    defaultProps: {
      container: shadowRootElement || shadowDomElement,
      scroll: "paper",
    },
    styleOverrides: {
      paper: {
        maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} + (${odysseyTokens.Spacing6} * 2))`,
        borderRadius: odysseyTokens.BorderRadiusOuter,
        boxShadow: "none",
        filter:
          "drop-shadow(0px 1px 4px rgba(29, 29, 33, 0.08)) drop-shadow(0px 4px 10px rgba(29, 29, 33, 0.08)) drop-shadow(0px 8px 30px rgba(29, 29, 33, 0.1))",
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        flexWrap: "wrap",
        gap: odysseyTokens.Spacing2,
        paddingBlockStart: odysseyTokens.Spacing5,
        paddingBlockEnd: odysseyTokens.Spacing5,
        paddingInline: odysseyTokens.Spacing6,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        paddingBlock: 0,
        paddingInline: odysseyTokens.Spacing6,

        ...(ownerState.dividers === true && {
          paddingBlock: odysseyTokens.Spacing6,
          color: odysseyTokens.HueNeutral600,
        }),

        ["&:last-child"]: {
          paddingBlockEnd: odysseyTokens.Spacing6,
        },
      }),
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        marginBlockEnd: odysseyTokens.Spacing5,
        color: odysseyTokens.HueNeutral700,

        "&:last-child": {
          marginBlockEnd: "0",
        },
      },
    },
  },
  MuiDialogTitle: {
    defaultProps: {
      component: "h1",
      variant: "h5",
    },
    styleOverrides: {
      root: {
        marginBlockEnd: 0,
        padding: 0,
        minWidth: 0,
        flex: "1 1 auto",
      },
    },
  },
});
