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

import { CSSInterpolation } from "@mui/material/styles";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
  createOdysseyMuiTheme,
} from "@okta/odyssey-react-mui";
import { ThemeOptions } from "@mui/material";
import * as Tokens from "@okta/odyssey-design-tokens";

const popupSpacingValue = 5;

const odysseyTheme = createOdysseyMuiTheme(Tokens);

type ThemeStyles = ({
  theme,
}: {
  theme: typeof odysseyTheme;
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
    bottom: theme.spacing(1),
    content: '" "',
    height: `${2 / theme.typography.fontSize}em`,
    position: "absolute",
    transform: "translateY(-50%)",
    width: `${2 / theme.typography.fontSize}em`,
  }),
  hover: ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }),
  selected: ({ theme }) => ({
    backgroundColor: theme.palette.primary.contrastText,
  }),
};

const yearStyles: StateStyles = {
  default: ({ theme }) => ({
    backgroundColor: "transparent",
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
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.main,
  }),
  outsideOfMonth: ({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  }),
  selected: ({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  }),
};

const yearCheckStyles: StateStyles = {
  default: ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    content: '""',
    height: theme.typography.h6.fontSize,
    maskImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M14.3536 4.35355L6.35355 12.3536C6.15829 12.5488 5.84171 12.5488 5.64645 12.3536L1.64645 8.35355L2.35355 7.64645L6 11.2929L13.6464 3.64645L14.3536 4.35355Z' fill='currentColor' /%3E%3C/svg%3E%0A\")",
    maskPosition: "50% 50%",
    maskRepeat: "no-repeat",
    position: "absolute",
    right: theme.spacing(4),
    width: theme.typography.h6.fontSize,
  }),
};

export const datePickerTheme: ThemeOptions = {
  components: {
    MuiCalendarPicker: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
          borderStyle: theme.mixins.borderStyle,
          borderWidth: theme.mixins.borderWidth,
          borderRadius: theme.mixins.borderRadius,
          paddingBottom: theme.spacing(popupSpacingValue),
          paddingTop: theme.spacing(4),
          width: "100%",
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
          paddingLeft: theme.spacing(popupSpacingValue),
          paddingRight: theme.spacing(popupSpacingValue),
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
          paddingLeft: theme.spacing(popupSpacingValue),
          paddingRight: theme.spacing(popupSpacingValue),

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
        views: ["year", "day"],
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
          paddingLeft: `calc(${theme.spacing(
            popupSpacingValue
          )} + ${theme.spacing(2)})`,
          paddingRight: theme.spacing(popupSpacingValue),
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
            borderRadius: theme.mixins.borderRadius,
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
            "&.MuiPickersDay-dayOutsideMonth": dateStyles.outsideOfMonth({
              theme,
            }),
            "&:hover": dateStyles.hover({ theme }),

            "&:not(.Mui-selected)": {
              border: "none",
            },

            "&.Mui-selected, &.Mui-selected:focus": dateStyles.selected({
              theme,
            }),
            "&.Mui-selected:hover": dateStyles.hoverSelected({ theme }),
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
          alignItems: "flex-start",
          flexDirection: "column",
          flexWrap: "nowrap",
          marginBottom: `-${theme.spacing(popupSpacingValue)}`,
          marginInlineEnd: 0,
          maxHeight: `${(284 / 16) * (16 / 14)}rem`,
          paddingLeft: 0,
          paddingRight: 0,
        }),
      },
    },
    PrivatePickersYear: {
      styleOverrides: {
        button: ({ theme }) => [
          yearStyles.default({ theme }),
          {
            alignItems: "center",
            borderRadius: 0,
            display: "flex",
            fontSize: theme.typography.body1.fontSize,
            justifyContent: "flex-start",
            marginBottom: 0,
            marginTop: 0,
            paddingLeft: theme.spacing(7),
            position: "relative",
            width: "100%",

            "&:hover": yearStyles.hover({ theme }),

            "&:not(.Mui-selected)": {
              border: "none",
            },

            "&.Mui-disabled": yearStyles.disabled({ theme }),
          },
        ],
        root: () => ({
          width: "100%",
        }),
        selected: ({ theme }) => ({
          "&, &:focus": yearStyles.selected({ theme }),
          "&:hover": yearStyles.hoverSelected({ theme }),
          "&::after": yearCheckStyles.default({ theme }),
        }),
      },
    },
  },
};
