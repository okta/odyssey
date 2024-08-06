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

import { PickersLocaleText } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

export type DateFieldsTranslations = PickersLocaleText<DateTime>;

export const useDateFieldsTranslations = (): DateFieldsTranslations => {
  const { t } = useTranslation();

  return {
    calendarViewSwitchingButtonAriaLabel: (view) =>
      view === "year"
        ? `${t("picker.view.navigation.switch.calendarview")}`
        : `${t("picker.view.navigation.switch.yearview")}`,
    // not translated because we aren't using it
    calendarWeekNumberHeaderLabel: "",
    calendarWeekNumberHeaderText: "",
    calendarWeekNumberAriaLabelText: () => "",
    calendarWeekNumberText: () => "",

    cancelButtonLabel: `${t("picker.labels.action.cancel")}`,
    clearButtonLabel: `${t("clear.text")}`,
    clockLabelText: (view, time, adapter) =>
      `${t("picker.labels.select")} ${view}. ${
        time === null
          ? `${t("picker.labels.clock.empty")}`
          : `${t("picker.labels.clock.selected")} ${adapter.format(time, "fullTime")}`
      }`,
    datePickerToolbarTitle: `${t("picker.date.toolbar.title")}`,
    dateRangePickerToolbarTitle: `${t("picker.daterange.toolbar.title")}`,
    dateTableLabel: `${t("picker.labels.table.date")}`,
    dateTimePickerToolbarTitle: `${t("picker.datetime.toolbar.title")}`,
    day: `${t("picker.view.name.day")}`,
    empty: `${t("picker.labels.empty")}`,
    end: `${t("picker.labels.range.end")}`,
    endDate: `${t("picker.labels.range.enddate")}`,
    endTime: `${t("picker.labels.range.endTime")}`,
    fieldClearLabel: `${t("picker.labels.field.clear")}`,
    fieldDayPlaceholder: () => `${t("picker.field.placeholder.day")}`,
    fieldMonthPlaceholder: () => `${t("picker.field.placeholder.month")}`,
    fieldYearPlaceholder: () => `${t("picker.field.placeholder.year")}`,
    fieldHoursPlaceholder: () => `${t("picker.field.placeholder.hours")}`,
    fieldMinutesPlaceholder: () => `${t("picker.field.placeholder.minutes")}`,
    fieldSecondsPlaceholder: () => `${t("picker.field.placeholder.seconds")}`,
    fieldMeridiemPlaceholder: () => `${t("picker.field.placeholder.meridiem")}`,
    // not translated because we aren't using it
    fieldWeekDayPlaceholder: () => "",
    hours: `${t("picker.view.name.hours")}`,
    hoursClockNumberText: (hours) =>
      `${hours} ${t("picker.labels.clock.hours")}`,
    meridiem: `${t("picker.view.name.meridiem")}`,
    minutes: `${t("picker.view.name.minutes")}`,
    minutesClockNumberText: (minutes) =>
      `${minutes} ${t("picker.labels.clock.minutes")}`,
    month: `${t("picker.view.name.month")}`,
    nextMonth: `${t("picker.calendar.navigation.nextmonth")}`,
    okButtonLabel: `${t("picker.labels.action.apply")}`,
    openDatePickerDialogue: (value, utils) =>
      value !== null && utils.isValid(value)
        ? `${t("picker.labels.date.choose")}, ${t("picker.labels.date.selected")} ${utils.format(value, "fullDate")}`
        : `${t("picker.labels.date.choose")}`,
    openNextView: `${t("picker.view.navigation.open.nextview")}`,
    openPreviousView: `${t("picker.view.navigation.open.previousview")}`,
    openTimePickerDialogue: (value, utils) =>
      value !== null && utils.isValid(value)
        ? `${t("picker.labels.time.choose")}, ${t("picker.labels.time.selected")} ${utils.format(value, "fullTime")}`
        : `${t("picker.labels.time.choose")}`,
    previousMonth: `${t("picker.calendar.navigation.previousmonth")}`,
    seconds: `${t("picker.view.name.seconds")}`,
    secondsClockNumberText: (seconds) =>
      `${seconds} ${t("picker.labels.clock.seconds")}`,
    selectViewText: (view) => `${t("picker.labels.select")} ${view}`,
    start: `${t("picker.labels.range.start")}`,
    startDate: `${t("picker.labels.range.startdate")}`,
    startTime: `${t("picker.labels.range.starttime")}`,
    todayButtonLabel: `${t("picker.labels.action.today")}`,
    timePickerToolbarTitle: `${t("picker.time.toolbar.title")}`,
    timeTableLabel: `${t("picker.labels.table.time")}`,
    weekDay: `${t("picker.view.name.weekday")}`,
    year: `${t("picker.view.name.year")}`,
  };
};
