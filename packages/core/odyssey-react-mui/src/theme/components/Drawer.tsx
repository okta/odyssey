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

const drawerSizes = {
  persistent: "25.714rem", //~360px
  temporary: "28.571rem", //~400px
};

export const drawerComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiDrawer"
> => ({
  MuiDrawer: {
    styleOverrides: {
      root: {},
      paper: ({ ownerState }) => ({
        width:
          ownerState.variant === "temporary"
            ? drawerSizes.temporary
            : drawerSizes.persistent, //Temporary = overlay drawer, Persistent = inline drawer
        display: "flex",
        overflowY: "auto",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "stretch",
        alignContent: "flex-end",
        color: odysseyTokens.HueNeutral700,
        ...(ownerState.variant === "persistent" && {
          position: "static",
          borderRadius: odysseyTokens.BorderRadiusOuter,
          border: "0",
        }),
        ...(ownerState.variant === "temporary" && {
          boxShadow: odysseyTokens.ShadowScale1,
        }),
      }),
    },
  },
});
