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

import { CSSInterpolation, Theme, ThemeOptions } from "@mui/material/styles";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@okta/odyssey-react-mui";

const popupSpacingValue = 5;

type ThemeStyles = ({
  theme,
}: {
  theme: Omit<Theme, "components">;
}) => CSSInterpolation;

type StateStyles = Record<string, ThemeStyles>;

const dateStyles: StateStyles = {
  default: ({ theme }) => ({
    color: theme.palette.text.primary,
  }),
  disabled: ({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.text.disabled,
  }),
  hover: ({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
  }),
  hoverSelected: ({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  }),
  outsideOfMonth: ({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  }),
  selected: ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }),
  today: ({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
  }),
};

const todayDotStyles: StateStyles = {
  default: ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    content: '" "',
    height: `${(2 / 16) * (16 / 14)}rem`,
    position: "absolute",
    bottom: theme.spacing(1),
    width: `${(2 / 16) * (16 / 14)}rem`,
    transform: "translateY(-50%)",
  }),
  hover: ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }),
  selected: ({ theme }) => ({
    backgroundColor: theme.palette.primary.contrastText,
  }),
};

export const datePickerTheme: ThemeOptions = {
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBottom: theme.spacing(popupSpacingValue),
          paddingLeft: theme.spacing(popupSpacingValue),
          paddingRight: theme.spacing(popupSpacingValue),
          paddingTop: theme.spacing(4),
          width: "100%",

          "&, &::before, &::after": {
            boxSizing: "border-box", // TEMP. Remove this when scoped CSS is added.
          },
        }),
      },
    },
    MuiCalendarOrClockPicker: {
      styleOverrides: {
        root: () => ({
          "& > div": {
            width: `${(296 / 16) * (16 / 14)}rem`,
          },
        }),
      },
      defaultProps: {
        components: {
          LeftArrowIcon: ArrowLeftIcon,
          RightArrowIcon: ArrowRightIcon,
          SwitchViewIcon: ChevronDownIcon,
        },
      },
    },
    MuiDesktopDatePicker: {
      defaultProps: {
        components: {
          OpenPickerIcon: CalendarIcon,
        },
      },
    },
    MuiDayPicker: {
      styleOverrides: {
        header: ({ theme }) => ({
          gap: theme.spacing(1),
          justifyContent: "space-between",
        }),
        slideTransition: () => ({
          minHeight: `${(214 / 16) * (16 / 14)}rem`,
        }),
        weekContainer: ({ theme }) => ({
          gap: theme.spacing(1),
          justifyContent: "space-between",
          marginBottom: theme.spacing(1),
          marginLeft: 0,
          marginRight: 0,

          "&:last-child": {
            marginBottom: 0,
          },
        }),
        weekDayLabel: ({ theme }) => ({
          color: theme.palette.grey[900],
          flexBasis: theme.spacing(6),
          flexShrink: 0,
          fontSize: theme.typography.subtitle1.fontSize,
          fontWeight: theme.typography.fontWeightBold,
          height: theme.spacing(6),
          marginBottom: theme.spacing(2),
          marginLeft: 0,
          marginRight: 0,
          width: theme.spacing(6),
        }),
      },
    },
    MuiDatePicker: {
      defaultProps: {
        PopperProps: {
          popperOptions: {
            placement: "auto-start",
          },
        },
        showDaysOutsideCurrentMonth: true,
        views: ["year", "month", "day"],
      },
    },
    MuiMonthPicker: {
      styleOverrides: {
        root: () => ({
          display: "block",
        }),
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        label: ({ theme }) => ({
          fontSize: theme.typography.h6.fontSize,
          fontWeight: theme.typography.fontWeightBold,
        }),
        root: ({ theme }) => ({
          marginBottom: theme.spacing(1),
          marginTop: 0,
          paddingLeft: theme.spacing(2),
          paddingRight: 0,
          width: "auto",
        }),
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        dayWithMargin: () => ({
          marginLeft: 0,
          marginRight: 0,
        }),
        root: ({ theme }) => [
          dateStyles.default({ theme }),
          {
            border: "none",
            borderRadius: `${(6 / 16) * (16 / 14)}rem`,
            flexBasis: theme.spacing(6),
            flexShrink: 0,
            fontSize: theme.typography.body1.fontSize,
            height: theme.spacing(6),
            width: theme.spacing(6),

            "&.MuiPickersDay-today": [
              dateStyles.today({ theme }),
              {
                fontWeight: theme.typography.fontWeightBold,
              },
            ],

            "&.MuiPickersDay-today::after": todayDotStyles.default({ theme }),
            "&.MuiPickersDay-today.Mui-selected::after":
              todayDotStyles.selected({ theme }),
            "&:hover": dateStyles.hover({ theme }),

            "&:not(.Mui-selected)": {
              border: "none",
            },

            "&.Mui-selected, &.Mui-selected:focus": dateStyles.selected({
              theme,
            }),
            "&.Mui-selected:hover": dateStyles.hoverSelected({ theme }),
            "&.MuiPickersDay-dayOutsideMonth": dateStyles.outsideOfMonth({
              theme,
            }),
            "&.Mui-disabled": dateStyles.disabled({ theme }),
          },
        ],
      },
    },
    MuiPickersPopper: {
      styleOverrides: {
        paper: ({ theme }) => ({
          boxShadow: `0 ${(1 / 16) * (16 / 14)}rem ${
            (4 / 16) * (16 / 14)
          }rem rgba(29, 29, 33, 0.08), 0 ${(4 / 16) * (16 / 14)}rem ${
            (10 / 16) * (16 / 14)
          }rem rgba(29, 29, 33, 0.08), 0 ${(8 / 16) * (16 / 14)}rem ${
            (30 / 16) * (16 / 14)
          }rem rgba(29, 29, 33, 0.1)`,
          marginTop: theme.spacing(1),
        }),
      },
    },
    MuiYearPicker: {
      styleOverrides: {
        root: ({ theme }) => ({
          flexDirection: "column",
          flexWrap: "nowrap",
          maxHeight: `${(284 / 16) * (16 / 14)}rem`,
          marginBottom: `-${theme.spacing(popupSpacingValue)}`,
          marginInlineEnd: `-${theme.spacing(popupSpacingValue)}`,
        }),
      },
    },
    PrivatePickersMonth: {
      styleOverrides: {
        root: ({ theme }) => [
          dateStyles.default({ theme }),
          {
            alignItems: "center",
            borderRadius: `${(6 / 16) * (16 / 14)}rem`,
            display: "flex",
            justifyContent: "center",
            marginBottom: 0,
            marginTop: 0,
            position: "relative",

            "&[aria-current='date']": [
              dateStyles.today({ theme }),
              {
                fontWeight: theme.typography.fontWeightBold,
              },
            ],

            "&[aria-current='date']::after": todayDotStyles.default({ theme }),
            "&:hover": dateStyles.hover({ theme }),

            "&:not(.Mui-selected)": {
              border: "none",
            },

            "&.Mui-disabled": dateStyles.disabled({ theme }),

            "&.Mui-selected[aria-current='date']::after":
              todayDotStyles.selected({ theme }),
            "&.Mui-selected, &.Mui-selected:focus": dateStyles.selected({
              theme,
            }),
            "&.Mui-selected:hover": dateStyles.hoverSelected({ theme }),
          },
        ],
      },
    },
    PrivatePickersYear: {
      styleOverrides: {
        button: ({ theme }) => [
          dateStyles.default({ theme }),
          {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginBottom: 0,
            marginTop: 0,
            position: "relative",

            "&[aria-current='date']": [
              dateStyles.today({ theme }),
              {
                fontWeight: theme.typography.fontWeightBold,
              },
            ],

            "&[aria-current='date']::after": todayDotStyles.default({ theme }),
            "&:hover": dateStyles.hover({ theme }),

            "&:not(.Mui-selected)": {
              border: "none",
            },

            "&.Mui-disabled": dateStyles.disabled({ theme }),
          },
        ],
        root: () => ({
          display: "block",
        }),
        selected: ({ theme }) => ({
          "&[aria-current='date']::after": todayDotStyles.selected({ theme }),
          "&:focus": dateStyles.selected({ theme }),
          "&:hover": dateStyles.hoverSelected({ theme }),
        }),
      },
    },
  },
};
