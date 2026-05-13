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

import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";

import type { GetComponentsProps } from "./types.js";

export const accordionComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiAccordion" | "MuiAccordionSummary" | "MuiAccordionDetails"
> => ({
  MuiAccordion: {
    styleOverrides: {
      root: () => ({
        backgroundColor: odysseyTokens.HueNeutralWhite,
        border: 0,
        borderBottomColor: odysseyTokens.BorderColorDisplay,
        borderBottomStyle: "solid",
        borderBottomWidth: odysseyTokens.BorderWidthMain,
        borderRadius: 0,
        boxShadow: "none",

        "&.MuiPaper-root.MuiAccordion-root[data-ods-variant='borderless']": {
          border: "none",

          "&::before": {
            display: "none",
          },
        },

        "&.Mui-disabled": {
          backgroundColor: odysseyTokens.HueNeutralWhite,
          color: odysseyTokens.TypographyColorDisabled,
          cursor: "default",

          "& .MuiAccordionSummary-content": {
            color: odysseyTokens.TypographyColorDisabled,
          },
        },

        "&:first-of-type": {
          borderRadius: 0,
          borderTopColor: odysseyTokens.BorderColorDisplay,
          borderTopStyle: "solid",
          borderTopWidth: odysseyTokens.BorderWidthMain,
        },

        "&:last-of-type": {
          borderRadius: 0,
          borderBottomColor: odysseyTokens.BorderColorDisplay,
          borderBottomStyle: "solid",
          borderBottomWidth: odysseyTokens.BorderWidthMain,
        },
        "&.nav-accordion": {
          border: "0 !important",
          width: "100%",
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: () => ({
        paddingBlock: odysseyTokens.Spacing4,
        paddingInline: odysseyTokens.Spacing3,

        "&:hover": {
          backgroundColor: odysseyTokens.HueNeutral50,
        },

        "&:focus-visible": {
          backgroundColor: odysseyTokens.HueNeutral50,
          outlineColor: odysseyTokens.PalettePrimaryMain,
          outlineWidth: 2,
          outlineStyle: "solid",
          zIndex: 1,
        },
        [`.${svgIconClasses.root}`]: {
          fontSize: "1.2em",
          height: "1em",
          position: "relative",
          insetBlockStart: "-0.0625em",
          verticalAlign: "middle",
          width: "1em",
        },
      }),
      content: () => ({
        marginBlock: 0,

        [`& > .${typographyClasses.root}`]: {
          marginBlockEnd: 0,
          fontWeight: odysseyTokens.TypographyWeightBodyBold,
        },
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: () => ({
        paddingInline: odysseyTokens.Spacing3,
        paddingBlock: odysseyTokens.Spacing4,
        "&.nav-accordion-details": {
          padding: 0,
        },
      }),
    },
  },
});
