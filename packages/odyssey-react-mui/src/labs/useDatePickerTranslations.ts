/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// import {
//   PickersLocaleText,
// } from "@mui/x-date-pickers";
import {
  DEFAULT_LOCALE,
  csCZ,
  daDK,
  deDE,
  elGR,
  enUS,
  esES,
  fiFI,
  frFR,
  huHU,
  itIT,
  jaJP,
  koKR,
  nbNO,
  nlNL,
  plPL,
  ptBR,
  roRO,
  ruRU,
  svSE,
  trTR,
  ukUA,
  viVN,
  zhCN,
} from "@mui/x-date-pickers/locales";
// import { useTranslation } from "react-i18next";

import { DefaultSupportedLanguages } from "../OdysseyTranslationProvider.types";

// const useCustomTranslations = () => {
//   const formattedTranslations: Partial<PickersLocaleText<any>> = {
//     // Calendar navigation
//     // previousMonth: t("datePicker.previousMonth"),
//     // nextMonth: t("datePicker.nextMonth"),

//     // View navigation
//     // openPreviousView: "Open previous view",
//     // openNextView: "Open next view",
//     calendarViewSwitchingButtonAriaLabel: (view) =>
//       view === "year"
//         ? "year view is open, switch to calendar view"
//         : "calendar view is open, switch to year view",

//     // DateRange labels
//     // start: "Start",
//     // end: "End",
//     // startDate: "Start date",
//     // startTime: "Start time",
//     // endDate: "End date",
//     // endTime: "End time",

//     // Action bar
//     // cancelButtonLabel: "Cancel",
//     // clearButtonLabel: "Clear",
//     // okButtonLabel: "OK",
//     // todayButtonLabel: "Today",

//     // // Toolbar titles
//     // datePickerToolbarTitle: "Select date",
//     // dateTimePickerToolbarTitle: "Select date & time",
//     // timePickerToolbarTitle: "Select time",
//     // dateRangePickerToolbarTitle: "Select date range",

//     // Clock labels
//     // clockLabelText: (view, time, adapter) =>
//     //   `Select ${view}. ${
//     //     time === null
//     //       ? "No time selected"
//     //       : `Selected time is ${adapter.format(time, "fullTime")}`
//     //   }`,
//     // hoursClockNumberText: (hours) => `${hours} hours`,
//     // minutesClockNumberText: (minutes) => `${minutes} minutes`,
//     // secondsClockNumberText: (seconds) => `${seconds} seconds`,

//     // Digital clock labels
//     // selectViewText: (view) => `Select ${view}`,

//     // Calendar labels
//     // calendarWeekNumberHeaderLabel: "Week number",
//     // calendarWeekNumberHeaderText: "#",
//     // calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
//     // calendarWeekNumberText: (weekNumber) => `${weekNumber}`,

//     // Open picker labels
//     openDatePickerDialogue: (value, utils) =>
//       value !== null && utils.isValid(value)
//         ? `Choose date, selected date is ${utils.format(value, "fullDate")}`
//         : "Choose date",
//     // openTimePickerDialogue: (value, utils) =>
//     //   value !== null && utils.isValid(value)
//     //     ? `Choose time, selected time is ${utils.format(value, "fullTime")}`
//     //     : "Choose time",

//     fieldClearLabel: "Clear value",

//     // Table labels
//     // timeTableLabel: "pick time",
//     // dateTableLabel: "pick date",

//     // Field section placeholders
//     // fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
//     // fieldMonthPlaceholder: (params) =>
//     //   params.contentType === "letter" ? "MMMM" : "MM",
//     // fieldDayPlaceholder: () => "DD",
//     // fieldWeekDayPlaceholder: (params) =>
//     //   params.contentType === "letter" ? "EEEE" : "EE",
//     // fieldHoursPlaceholder: () => "hh",
//     // fieldMinutesPlaceholder: () => "mm",
//     // fieldSecondsPlaceholder: () => "ss",
//     // fieldMeridiemPlaceholder: () => "aa",

//     // View names
//     // year: "Year",
//     // month: "Month",
//     // day: "Day",
//     // weekDay: "Week day",
//     // hours: "Hours",
//     // minutes: "Minutes",
//     // seconds: "Seconds",
//     // meridiem: "Meridiem",

//     // Common
//     // empty: "Empty",
//   };

//   return formattedTranslations
// }

const localeKeyMap = new Map<string, any>([
  ["default", DEFAULT_LOCALE],
  ["cs", csCZ],
  ["da", daDK],
  ["de", deDE],
  ["el", elGR],
  ["en", enUS],
  ["es", esES],
  ["fi", fiFI],
  ["fr", frFR],
  ["hu", huHU],
  // Indonesian not supported
  ["it", itIT],
  ["ja", jaJP],
  ["ko", koKR],
  // Malay not supported
  ["nb", nbNO],
  ["nl_NL", nlNL],
  ["pl", plPL],
  ["pt_BR", ptBR],
  ["ro", roRO],
  ["ru", ruRU],
  ["sv", svSE],
  // Thai not supported
  ["tr", trTR],
  ["uk", ukUA],
  ["vi", viVN],
  ["zh_CN", zhCN],
  // Chinese (traditional) not supported
]);

export const unsupportedLanguages = ["id", "ms", "th", "zh_TW"];

export const useDatePickerTranslations = (languageCode: DefaultSupportedLanguages |  "default") => {
    if (unsupportedLanguages.includes(languageCode)) {
      return 
    }

    if (languageCode === "default") {
      return localeKeyMap.get(languageCode);
    } else {
      return languageCode
        ? localeKeyMap.get(languageCode).components.MuiLocalizationProvider.defaultProps.localeText
        : undefined;
    }

  // console.log(locales.DEFAULT_LOCALE)
  // const muiLocale = Object.entries(locales).find((locale) => {
  //   const [ localeCode ] = locale;
  //   // console.log({ localeCode }, { localeKey });
  //   // if (localeCode == "enUS") {
  //   //   console.log({locale})
  //   // }
  //   return localeCode === localeKey;
  //   // if (key === localeKey) {
  //   //   setLocaleText(
  //   //     // @ts-ignore
  //   //     value.components.MuiLocalizationProvider.defaultProps.localeText,
  //   //   );
  //   //   return;
  //   // }
  // });
  // console.log({ muiLocale })
};
