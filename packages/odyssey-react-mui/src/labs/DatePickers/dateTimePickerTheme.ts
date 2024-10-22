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

const theme: ThemeOptions = {
  components: {
    // MuiClock: {
    //   styleOverrides: {
    //     clock: ({ theme }) => ({
    //       width: `calc(${theme.spacing(9)} * 4)`,
    //       height: `calc(${theme.spacing(9)} * 4)`,
    //     }),
    //     pin: ({ theme }) => ({
    //       backgroundColor: theme.palette.primary.light,
    //     }),
    //   },
    // },
    // MuiClockPointer: {
    //   styleOverrides: {
    //     root: ({ theme }) => ({
    //       backgroundColor: theme.palette.primary.light,
    //     }),
    //     thumb: ({ theme }) => ({
    //       borderColor: theme.palette.primary.light,
    //     }),
    //   },
    // },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          display: "block",
          width: "100%",
        },
      },
    },
    // MuiPickersCalendarHeader: {
    //   styleOverrides: {
    //     switchViewButton: {
    //       margin: "0 20px 0 20px",
    //       color: "red"
    //     },
    //   },
    // },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: ({ theme }) => ({
          display: "flex",
          margin: 0,
          padding: theme.spacing(2),
          color: theme.typography.body1.color,

          "& + &": {
            marginInlineStart: theme.spacing(2),
          },

          svg: {
            display: "flex",
          },
        }),
        spacer: ({ theme }) => ({
          width: theme.spacing(1),
        }),
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        contentWrapper: ({ theme }) => ({
          padding: theme.spacing(3),
          paddingBlockStart: 0,
          gridTemplateColumns: "1fr 16px auto",
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
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
        }),
        dateContainer: ({ theme }) => ({
          flexDirection: "row-reverse",

          button: {
            "+ button": {
              marginInlineEnd: theme.spacing(2),
            },
          },
        }),
        timeDigitsContainer: {
          alignItems: "center",
        },
        ampmSelection: ({ theme }) => ({
          margin: 0,
          marginInlineStart: theme.spacing(3),

          button: {
            padding: theme.spacing(2),

            "&:has(.Mui-selected)": {
              backgroundColor: theme.palette.primary.main,

              ".Mui-selected": {
                color: theme.palette.common.white,
                "&::after": {
                  display: "none",
                },
              },
            },
          },
        }),
        separator: ({ theme }) => ({
          ...theme.typography.h5,
          marginBlock: 0,
          marginInline: theme.spacing(1),
        }),
      },
    },
    MuiPickersToolbarButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: "auto",
          padding: 0,
          margin: 0,
          border: 0,
          borderRadius: theme.mixins.borderRadius,
          backgroundColor: "transparent",
          color: theme.typography.subtitle1.color,

          "&:hover": {
            backgroundColor: "transparent",
          },

          "& + &": {
            marginInlineStart: 0,
          },
        }),
      },
    },
    MuiPickersToolbarText: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.h5,
          position: "relative",
          margin: 0,
          lineHeight: 1,
          color: "inherit",

          "&::after": {
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 2,
            backgroundColor: "currentColor",
            opacity: 0,
            content: "''",
            transition: "opacity 100ms, transform 200ms",
          },

          "&.Mui-selected": {
            color: theme.typography.body1.color,

            "&::after": {
              transform: "translateY(2px)",
              opacity: 1,
            },
          },
        }),
      },
    },
    MuiTimeClock: {
      styleOverrides: {
        arrowSwitcher: {
          top: 0,
          right: 0,
        },
      },
    },
  },
};
export const dateTimePickerTheme = deepmerge(datePickerTheme, theme);
