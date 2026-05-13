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

import { tooltipClasses } from "@mui/material/Tooltip";

import type { GetComponentsProps } from "./types.js";

export const tooltipComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiTooltip"
> => ({
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      enterDelay: 500,
      enterNextDelay: 250,
      placement: "top",
    },
    styleOverrides: {
      tooltip: ({ ownerState }) => ({
        maxWidth: `calc(${odysseyTokens.TypographyLineLengthMax} / 2)`,
        paddingBlock: odysseyTokens.Spacing2,
        paddingInline: odysseyTokens.Spacing3,
        backgroundColor: odysseyTokens.HueNeutral900,
        color: odysseyTokens.HueNeutralWhite,
        fontSize: odysseyTokens.TypographySizeSubordinate,
        lineHeight: odysseyTokens.TypographyLineHeightBody,
        ...(ownerState.touch === true && {
          paddingBlock: odysseyTokens.Spacing2,
          paddingInline: odysseyTokens.Spacing3,
          fontSize: odysseyTokens.TypographySizeSubordinate,
          lineHeight: odysseyTokens.TypographyLineHeightBody,
          fontWeight: odysseyTokens.TypographyWeightBody,
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
      },
    },
  },
});
