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

import type { GetComponentsProps } from "./types.js";

export const radioComponents = ({
  odysseyTokens,
}: GetComponentsProps): Pick<
  NonNullable<ThemeOptions["components"]>,
  "MuiRadio"
> => ({
  MuiRadio: {
    defaultProps: {
      size: "small",
      icon: <></>,
      checkedIcon: <></>,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const isReadOnly = ownerState?.inputProps?.readOnly;

        return {
          position: "relative",
          insetBlockStart: `${2 / theme.typography.fontSize}rem`,
          width: `${odysseyTokens.TypographyLineHeightUi}em`,
          minWidth: `${odysseyTokens.TypographyLineHeightUi}em`,
          height: `${odysseyTokens.TypographyLineHeightUi}em`,
          borderRadius: `${odysseyTokens.TypographyLineHeightUi}em`,
          borderWidth: odysseyTokens.BorderWidthMain,
          borderStyle: odysseyTokens.BorderStyleMain,
          borderColor: odysseyTokens.HueNeutral500,
          padding: 0,
          boxShadow: `0 0 0 0 transparent`,
          transition: theme.transitions.create(
            ["border-color", "background-color", "box-shadow"],
            {
              duration: odysseyTokens.TransitionDurationMain,
            },
          ),
          "&::before": {
            content: "''",
            position: "absolute",
            width: odysseyTokens.Spacing2,
            height: odysseyTokens.Spacing2,
            borderRadius: "50%",
            backgroundColor: "transparent",
            transition: theme.transitions.create(["background-color"], {
              duration: odysseyTokens.TransitionDurationMain,
            }),
          },
          [`.${formControlLabelClasses.root}:hover > &`]: {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.HueNeutral900,
          },
          ".Mui-error:hover > &": {
            backgroundColor: "transparent",
            borderColor: odysseyTokens.BorderColorDangerDark,
            "&::before": {
              backgroundColor: odysseyTokens.PaletteDangerDark,
            },
          },
          ".Mui-error > &": {
            borderColor: odysseyTokens.BorderColorDangerControl,
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
          "&.Mui-checked": {
            position: "relative",
            "&::before": {
              backgroundColor: odysseyTokens.PalettePrimaryMain,
            },
          },
          ".Mui-error > &.Mui-checked::before": {
            backgroundColor: odysseyTokens.PaletteDangerMain,
          },
          "&.Mui-disabled": {
            backgroundColor: odysseyTokens.HueNeutral50,
            borderColor: odysseyTokens.BorderColorDisabled,
            "&.Mui-checked::before": {
              backgroundColor: odysseyTokens.BorderColorDisabled,
            },
          },
          ...(isReadOnly && {
            backgroundColor: odysseyTokens.HueNeutral100,
            borderColor: odysseyTokens.HueNeutral300,
            cursor: "default",
            "&::before": {
              content: "''",
              position: "absolute",
              width: odysseyTokens.Spacing2,
              height: odysseyTokens.Spacing2,
              borderRadius: "50%",
              backgroundColor: "transparent",
              transition: theme.transitions.create(["background-color"], {
                duration: odysseyTokens.TransitionDurationMain,
              }),
            },
            "&.Mui-checked::before": {
              backgroundColor: odysseyTokens.HueNeutral700,
            },
            [`.${formControlLabelClasses.root}:hover > &`]: {
              backgroundColor: odysseyTokens.HueNeutral100,
              borderColor: odysseyTokens.HueNeutral300,
            },
          }),
        };
      },
    },
  },
});
