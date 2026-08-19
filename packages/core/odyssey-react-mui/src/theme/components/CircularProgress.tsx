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

// MUI draws the ring inside a fixed 44-unit viewBox and passes `thickness`
// straight through as the SVG `stroke-width`, so the rendered stroke works out
// to `thickness * size / 44`. Design specifies the same 1:12 stroke-to-diameter
// ratio the icons use, which holds at every size when thickness is 44 / 12:
// 2px at the default 24px, and 1.33px where Button renders it at 16px.
const STROKE_WIDTH_FOR_ONE_TO_TWELVE_RATIO = 44 / 12;

export const circularProgressComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiCircularProgress"
> => ({
  MuiCircularProgress: {
    defaultProps: {
      size: odysseyTokens.Spacing5,
      thickness: STROKE_WIDTH_FOR_ONE_TO_TWELVE_RATIO,
      color: "primary",
      disableShrink: false,
      variant: "indeterminate",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.color !== "inherit" && {
          color: odysseyTokens.PalettePrimaryMain,
        }),
      }),
      circle: ({ ownerState }) => ({
        ...(ownerState.variant === "indeterminate" && {
          strokeDasharray: "160%, 360%",
        }),
      }),
    },
  },
});
