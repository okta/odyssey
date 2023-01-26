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

import type { ThemeOptions } from "@mui/material/styles";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@okta/odyssey-react-mui";

export const datePickerTheme: ThemeOptions = {
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingBottom: theme.spacing(5),
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),
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
        showDaysOutsideCurrentMonth: true,
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
        root: ({ theme }) => ({
          border: "none",
          borderRadius: "0.428571428571429rem",
          flexBasis: theme.spacing(6),
          flexShrink: 0,
          fontSize: theme.typography.body1.fontSize,
          height: theme.spacing(6),
          width: theme.spacing(6),

          "&:focus": {
            backgroundColor: theme.palette.grey[100],
          },
          "&:hover": {
            backgroundColor: theme.palette.grey[100],
          },

          "&:not(.Mui-selected)": {
            border: "none",
          },

          "&.Mui-selected, &.Mui-selected:focus": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
          },

          "&.MuiPickersDay-today": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
          },
          "&.MuiPickersDay-today::after": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
            content: '" "',
            height: `${(2 / 16) * (16 / 14)}rem`,
            position: "absolute",
            bottom: theme.spacing(1),
            width: `${(2 / 16) * (16 / 14)}rem`,
            transform: "translateY(-50%)",
          },
          "&.MuiPickersDay-today.Mui-selected:hover": {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
          },

          "&.Mui-disabled:focus, &.Mui-disabled:hover": {
            backgroundColor: "transparent",
            color: theme.palette.grey[300],
          },
        }),
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
        root: () => ({
          flexDirection: "column",
          flexWrap: "nowrap",
          maxHeight: `${(284 / 16) * (16 / 14)}rem`,
        }),
      },
    },
    PrivatePickersYear: {
      styleOverrides: {
        button: ({ theme }) => ({
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginBottom: 0,
          marginTop: 0,
          position: "relative",

          "&:focus": {
            backgroundColor: theme.palette.grey[100],
          },
          "&:hover": {
            backgroundColor: theme.palette.grey[100],
          },

          "&[aria-current='date']": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
          },
          "&[aria-current='date']::after": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
            content: '" "',
            height: `${(2 / 16) * (16 / 14)}rem`,
            position: "absolute",
            bottom: theme.spacing(1),
            width: `${(2 / 16) * (16 / 14)}rem`,
            transform: "translateY(-50%)",
          },
        }),
        root: () => ({
          display: "block",
        }),
        selected: ({ theme }) => ({
          "&.Mui-selected, &.Mui-selected:focus": {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
          },

          "&[aria-current='date']": {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.primary.main,
          },
        }),
      },
    },
  },
};
