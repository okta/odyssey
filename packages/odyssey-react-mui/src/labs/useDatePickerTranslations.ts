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
//   csCZ,
//   daDK,
//   deDE,
//   elGR,
//   enUS,
//   esES,
//   fiFI,
//   frFR,
//   huHU,
//   itIT,
//   jaJP,
//   koKR,
//   nbNO,
//   nlNL,
//   plPL,
//   ptBR,
//   roRO,
//   ruRU,
//   svSE,
//   trTR,
//   ukUA,
//   viVN,
//   zhCN,
// } from "@mui/x-date-pickers/locales";

// import { DefaultSupportedLanguages } from "../OdysseyTranslationProvider.types";
import {
  PickersLocaleText
} from "@mui/x-date-pickers";
import { TFunction } from "i18next";
import { DateTime } from "luxon";

// const localeKeyMap = new Map<string, any>([
//   ["cs", csCZ],
//   ["da", daDK],
//   ["de", deDE],
//   ["el", elGR],
//   ["en", enUS],
//   ["es", esES],
//   ["fi", fiFI],
//   ["fr", frFR],
//   ["hu", huHU],
//   ["it", itIT],
//   ["ja", jaJP],
//   ["ko", koKR],
//   ["nb", nbNO],
//   ["nl_NL", nlNL],
//   ["pl", plPL],
//   ["pt_BR", ptBR],
//   ["ro", roRO],
//   ["ru", ruRU],
//   ["sv", svSE],
//   ["tr", trTR],
//   ["uk", ukUA],
//   ["vi", viVN],
//   ["zh_CN", zhCN],
// ]);

// export const unsupportedLanguages = ["id", "ms", "th", "zh_TW"]; // Indonesian, Malay, Thai, Chinese (traditional)

// export const useDatePickerTranslations = (
//   languageCode: DefaultSupportedLanguages,
// ) => {
//   const langFromMap = localeKeyMap.get(languageCode);

//   return langFromMap
//     ? langFromMap.components.MuiLocalizationProvider.defaultProps.localeText
//     : undefined;
// };


export const useDatePickerTranslations = (
  t: TFunction,
  ): Partial<PickersLocaleText<DateTime>> => ({
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === "year"
      ? `${t("datepicker.navigation.year")}`
      : `${t("datepicker.navigation.calendar")}`,
  datePickerToolbarTitle: `${t("datepicker.toolbar.title")}`,
  fieldDayPlaceholder: () => `${t("datepicker.placeholder.day")}`,
  fieldMonthPlaceholder: () => `${t("datepicker.placeholder.month")}`,
  fieldYearPlaceholder: (params) =>
    `${t("datepicker.placeholder.year")}`.repeat(params.digitAmount),
  nextMonth: `${t("datepicker.navigation.nextmonth")}`,
  previousMonth: `${t("datepicker.navigation.previousmonth")}`,
});
  // const langFromMap = localeKeyMap.get(languageCode);

  // return langFromMap
  //   ? langFromMap.components.MuiLocalizationProvider.defaultProps.localeText
  //   : undefined;
// import { PickersLocaleText } from "./utils/pickersLocaleTextApi";
// import { getPickersLocalization } from "./utils/getPickersLocalization";

// // This object is not Partial<PickersLocaleText> because it is the default values

// const enUSPickers: PickersLocaleText<any> = {
//   // Calendar navigation
//   previousMonth: "Previous month",
//   nextMonth: "Next month",

//   // View navigation
//   openPreviousView: "Open previous view",
//   openNextView: "Open next view",
//   calendarViewSwitchingButtonAriaLabel: (view) =>
//     view === "year"
//       ? "year view is open, switch to calendar view"
//       : "calendar view is open, switch to year view",

//   // DateRange labels
//   start: "Start",
//   end: "End",
//   startDate: "Start date",
//   startTime: "Start time",
//   endDate: "End date",
//   endTime: "End time",

//   // Action bar
//   cancelButtonLabel: "Cancel",
//   clearButtonLabel: "Clear",
//   okButtonLabel: "OK",
//   todayButtonLabel: "Today",

//   // Toolbar titles
//   datePickerToolbarTitle: "Select date",
//   dateTimePickerToolbarTitle: "Select date & time",
//   timePickerToolbarTitle: "Select time",
//   dateRangePickerToolbarTitle: "Select date range",

//   // Clock labels
//   clockLabelText: (view, time, adapter) =>
//     `Select ${view}. ${
//       time === null
//         ? "No time selected"
//         : `Selected time is ${adapter.format(time, "fullTime")}`
//     }`,
//   hoursClockNumberText: (hours) => `${hours} hours`,
//   minutesClockNumberText: (minutes) => `${minutes} minutes`,
//   secondsClockNumberText: (seconds) => `${seconds} seconds`,

//   // Digital clock labels
//   selectViewText: (view) => `Select ${view}`,

//   // Calendar labels
//   calendarWeekNumberHeaderLabel: "Week number",
//   calendarWeekNumberHeaderText: "#",
//   calendarWeekNumberAriaLabelText: (weekNumber) => `Week ${weekNumber}`,
//   calendarWeekNumberText: (weekNumber) => `${weekNumber}`,

//   // Open picker labels
//   openDatePickerDialogue: (value, utils) =>
//     value !== null && utils.isValid(value)
//       ? `Choose date, selected date is ${utils.format(value, "fullDate")}`
//       : "Choose date",
//   openTimePickerDialogue: (value, utils) =>
//     value !== null && utils.isValid(value)
//       ? `Choose time, selected time is ${utils.format(value, "fullTime")}`
//       : "Choose time",

//   fieldClearLabel: "Clear value",

//   // Table labels
//   timeTableLabel: "pick time",
//   dateTableLabel: "pick date",

//   // Field section placeholders
//   fieldYearPlaceholder: (params) => "Y".repeat(params.digitAmount),
//   fieldMonthPlaceholder: (params) =>
//     params.contentType === "letter" ? "MMMM" : "MM",
//   fieldDayPlaceholder: () => "DD",
//   fieldWeekDayPlaceholder: (params) =>
//     params.contentType === "letter" ? "EEEE" : "EE",
//   fieldHoursPlaceholder: () => "hh",
//   fieldMinutesPlaceholder: () => "mm",
//   fieldSecondsPlaceholder: () => "ss",
//   fieldMeridiemPlaceholder: () => "aa",

//   // View names
//   year: "Year",
//   month: "Month",
//   day: "Day",
//   weekDay: "Week day",
//   hours: "Hours",
//   minutes: "Minutes",
//   seconds: "Seconds",
//   meridiem: "Meridiem",

//   // Common
//   empty: "Empty",
// };

// export const DEFAULT_LOCALE = enUSPickers;

// export const enUS = getPickersLocalization(enUSPickers);
