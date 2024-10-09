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

// import { CSSInterpolation } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { ThemeOptions } from "@mui/material";

import { datePickerTheme, dateStyles } from "./datePickerTheme";
// import { createOdysseyMuiTheme } from "../../theme";

// import * as odysseyTokens from "@okta/odyssey-design-tokens";

// const odysseyTheme = createOdysseyMuiTheme({ odysseyTokens });

// type ThemeStyles = ({
//   theme,
// }: {
//   theme: typeof odysseyTheme;
// }) => CSSInterpolation;

const theme: ThemeOptions = {
  components: {
    MuiPickersLayout: {
      styleOverrides: {
        contentWrapper: ({ theme }) => ({
          paddingInline: theme.spacing(2),
          gridTemplateColumns: "1fr 16px auto",

          "@media (pointer: fine)": {
            paddingBlock: theme.spacing(3),
            paddingInline: theme.spacing(3),
          },
        }),
      },
    },
    MuiMultiSectionDigitalClockSection: {
      styleOverrides: {
        root: {
          width: "auto",
        },
        item: ({ theme }) => [
          dateStyles.default({ theme }),
          {
            margin: 0,
            marginInline: theme.spacing(1),
            "& + &": {
              marginBlockStart: theme.spacing(1),
            },
            "&:hover": dateStyles.hover({ theme }),
            "&:focus": dateStyles.focus({ theme }),

            "&.Mui-selected, &.Mui-selected:focus": dateStyles.selected({
              theme,
            }),
            "&.Mui-selected:hover": dateStyles.hoverSelected({ theme }),

            "&.Mui-disabled": dateStyles.disabled({ theme }),
          },
        ],
      },
    },
  },
};
export const dateTimePickerTheme = deepmerge(datePickerTheme, theme);
