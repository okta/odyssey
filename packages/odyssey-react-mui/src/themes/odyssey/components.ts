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

export const components: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      boxSizing: "border-box",
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
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: "#1d1d21",
        lineHeight: "1.42857143",
        fontSize: "1rem",
        fontWeight: 600,
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
  MuiTypography: {
    styleOverrides: {
      paragraph: {
        marginBottom: "1.14285714rem",
      },
    },
  },
};
