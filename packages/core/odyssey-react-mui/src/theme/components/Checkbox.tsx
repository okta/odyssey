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

import { formControlLabelClasses } from "@mui/material/FormControlLabel";
import { svgIconClasses } from "@mui/material/SvgIcon";

import type { GetComponentsProps } from "./types.js";

import { CheckIcon, SubtractIcon } from "../../icons.generated/index.js";

export const checkboxComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiCheckbox"
> => ({
  MuiCheckbox: {
    defaultProps: {
      checkedIcon: <CheckIcon />,
      icon: <></>,
      indeterminateIcon: <SubtractIcon />,
      size: "small",
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const isReadOnly = ownerState?.inputProps?.readOnly;

        return {
          width: `${odysseyTokens.TypographyLineHeightUi}em`,
          minWidth: `${odysseyTokens.TypographyLineHeightUi}em`,
          height: `${odysseyTokens.TypographyLineHeightUi}em`,
          borderRadius: odysseyTokens.BorderRadiusTight,
          border: `1px solid ${odysseyTokens.HueNeutral500}`,
          padding: 0,
          boxShadow: `0 0 0 0 transparent`,
          transition: theme.transitions.create(
            ["border-color", "background-color", "box-shadow"],
            {
              duration: odysseyTokens.TransitionDurationMain,
            },
          ),

          [`.${svgIconClasses.root}`]: {
            color: odysseyTokens.HueNeutralWhite,
            transition: theme.transitions.create(["color"], {
              duration: odysseyTokens.TransitionDurationMain,
            }),
          },

          "&.Mui-checked, &.MuiCheckbox-indeterminate": {
            backgroundColor: odysseyTokens.PalettePrimaryMain,
            borderColor: odysseyTokens.PalettePrimaryMain,

            [`.${formControlLabelClasses.root}:hover > &`]: {
              backgroundColor: odysseyTokens.PalettePrimaryDark,
              borderColor: odysseyTokens.PalettePrimaryDark,
            },
          },

          [`.${formControlLabelClasses.root}:hover > &`]: {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.HueNeutral900,
          },

          ".Mui-error:not(.Mui-valid):hover > &": {
            borderColor: odysseyTokens.BorderColorDangerDark,

            "&.Mui-checked": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
              borderColor: odysseyTokens.BorderColorDangerDark,
            },
          },
          ".Mui-error:not(.Mui-valid) > &": {
            borderColor: odysseyTokens.BorderColorDangerControl,

            "&.Mui-checked": {
              backgroundColor: odysseyTokens.PaletteDangerMain,
              borderColor: odysseyTokens.BorderColorDangerControl,
            },

            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PaletteDangerMain}`,
            },
          },
          "&.Mui-focusVisible": {
            borderColor: odysseyTokens.HueNeutral900,
            boxShadow: `0 0 0 2px ${odysseyTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyTokens.PalettePrimaryMain}`,
            outline: "2px solid transparent",
            outlineOffset: "1px",
          },
          "&.Mui-disabled": {
            backgroundColor: odysseyTokens.HueNeutral50,
            borderColor: odysseyTokens.HueNeutral300,

            ".Mui-error:not(.Mui-valid) > &": {
              backgroundColor: odysseyTokens.HueNeutral50,
              borderColor: odysseyTokens.HueNeutral300,
            },

            [`.${svgIconClasses.root}`]: {
              color: odysseyTokens.HueNeutral300,
            },
          },

          ...(isReadOnly && {
            // Override default styles
            backgroundColor: odysseyTokens.HueNeutral100,
            border: `1px solid ${odysseyTokens.HueNeutral300}`,
            cursor: "default",

            // Override checked/indeterminate styles
            "&.Mui-checked, &.MuiCheckbox-indeterminate": {
              backgroundColor: odysseyTokens.HueNeutral100,
              borderColor: odysseyTokens.HueNeutral300,

              [`.${formControlLabelClasses.root}:hover > &`]: {
                backgroundColor: odysseyTokens.HueNeutral100,
                borderColor: odysseyTokens.HueNeutral300,
              },
            },
            [`.${formControlLabelClasses.root}:hover > &`]: {
              backgroundColor: odysseyTokens.HueNeutral100,
              borderColor: odysseyTokens.HueNeutral300,
            },
            // ReadOnly styles for SVG check icon
            [`.${svgIconClasses.root}`]: {
              color: odysseyTokens.HueNeutral700,
            },
          }),
        };
      },
    },
  },
});
