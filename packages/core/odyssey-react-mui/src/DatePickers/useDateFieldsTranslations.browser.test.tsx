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

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { renderHookWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { DateTime } from "luxon";

import { useDateFieldsTranslations } from "./useDateFieldsTranslations.js";

const adapter = new AdapterLuxon({ locale: "en-US" });
const sampleTime = DateTime.fromISO("2024-07-21T03:04:05", { zone: "UTC" });

const renderTranslations = async () => {
  const { result } = await renderHookWithOdysseyProvider(() =>
    useDateFieldsTranslations(),
  );
  return result.current;
};

describe(useDateFieldsTranslations.name, () => {
  test("view switching label depends on the current view", async () => {
    const translations = await renderTranslations();

    expect([
      translations.calendarViewSwitchingButtonAriaLabel("year"),
      translations.calendarViewSwitchingButtonAriaLabel("day"),
    ]).toStrictEqual([
      "year view is open, switch to calendar view",
      "calendar view is open, switch to year view",
    ]);
  });

  test("clock label with and without a time", async () => {
    const translations = await renderTranslations();

    expect([
      translations.clockLabelText("hours", null, adapter),
      translations.clockLabelText("hours", sampleTime, adapter),
    ]).toStrictEqual([
      "Select hours. No time selected",
      `Select hours. Selected time is ${adapter.format(sampleTime, "fullTime")}`,
    ]);
  });

  test("open dialogue labels with and without a valid value", async () => {
    const translations = await renderTranslations();
    const invalidTime = DateTime.invalid("test");

    expect([
      translations.openDatePickerDialogue(null, adapter),
      translations.openDatePickerDialogue(invalidTime, adapter),
      translations.openDatePickerDialogue(sampleTime, adapter),
      translations.openTimePickerDialogue(null, adapter),
      translations.openTimePickerDialogue(invalidTime, adapter),
      translations.openTimePickerDialogue(sampleTime, adapter),
    ]).toStrictEqual([
      "Choose date",
      "Choose date",
      `Choose date, Selected date is ${adapter.format(sampleTime, "fullDate")}`,
      "Choose time",
      "Choose time",
      `Choose time, selected time is ${adapter.format(sampleTime, "fullTime")}`,
    ]);
  });
});
