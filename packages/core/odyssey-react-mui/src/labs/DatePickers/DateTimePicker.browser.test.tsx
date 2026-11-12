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

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { translate as odysseyTranslate } from "../../i18n.generated/i18n.js";
import { DateTimePicker } from "./DateTimePicker.js";

const timeZoneOptions = [
  { label: "Eastern Time", value: "America/New_York" },
  { label: "Tokyo Time", value: "Asia/Tokyo" },
];

describe(DateTimePicker.displayName!, () => {
  test("displays the correct date and time when a value is passed in ", async () => {
    await renderWithOdysseyProvider(
      <DateTimePicker
        label="date time picker label"
        timeZone="America/New_York"
        value="2024-07-11T03:00:00.000Z"
      />,
    );

    const input = page.getByLabelText("date time picker label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue("07/10/2024 11:00 PM");
  });

  test("displays the correct date and time when timezone is changed", async () => {
    await renderWithOdysseyProvider(
      <DateTimePicker
        label="date time picker label"
        timeZone="America/Los_Angeles"
        value="2024-07-11T03:00:00.000Z"
      />,
    );

    const input = page.getByLabelText("date time picker label");
    expect(input).toHaveDisplayValue("07/10/2024 08:00 PM");
  });

  test("controlled date time picker with calendar date selected", async () => {
    const ControlledDateTimePicker = () => {
      const [value, setValue] = useState("2024-07-11T12:00:00.000Z");

      return (
        <DateTimePicker
          hint="Select a date."
          label="DateTime picker label"
          onCalendarDateChange={({ value: newValue }) =>
            setValue(newValue ?? "")
          }
          timeZone="UTC"
          value={value}
        />
      );
    };

    await renderWithOdysseyProvider(<ControlledDateTimePicker />);

    const calendarButton = page.getByLabelText(
      odysseyTranslate("picker.labels.date.choose"),
    );
    await userEvent.click(calendarButton);

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeAccessible();

    const dateButton = dialog.getByText("26");
    await userEvent.click(dateButton);

    await expect
      .element(page.getByRole("textbox"))
      .toHaveValue("07/26/2024 12:00 PM");
  });

  test("time zone chosen from the time zone picker", async () => {
    await renderWithOdysseyProvider(
      <DateTimePicker
        label="Date time"
        timeZone="America/New_York"
        timeZoneOptions={timeZoneOptions}
        timeZonePickerLabel="Time zone"
        value="2024-07-21T03:00:00.000Z"
      />,
    );

    await expect
      .element(page.getByLabelText("Date time"))
      .toHaveValue("07/20/2024 11:00 PM");

    await userEvent.click(page.getByLabelText("Time zone"));
    await userEvent.click(page.getByRole("option", { name: "Tokyo Time" }));

    await expect
      .element(page.getByLabelText("Date time"))
      .toHaveValue("07/21/2024 12:00 PM");
  });

  test("read-only picker keeps the time zone picker read-only", async () => {
    await renderWithOdysseyProvider(
      <DateTimePicker
        isReadOnly
        label="Date time"
        timeZone="UTC"
        timeZoneOptions={timeZoneOptions}
        timeZonePickerLabel="Time zone"
        value="2024-07-21T03:00:00.000Z"
      />,
    );

    await expect
      .element(page.getByLabelText("Date time"))
      .toHaveAttribute("readonly");
    await expect
      .element(page.getByRole("combobox", { name: "Time zone" }))
      .toHaveAttribute("readonly");
  });

  test("touch device selection is reported after Apply", async () => {
    const realMatchMedia = window.matchMedia.bind(window);
    // MUI picks the mobile layout from the `pointer: fine` media query, which a desktop test browser can't switch off any other way.
    const matchMediaSpy = vi
      .spyOn(window, "matchMedia")
      .mockImplementation((query) =>
        realMatchMedia(query.includes("pointer: fine") ? "not all" : query),
      );
    onTestFinished(() => matchMediaSpy.mockRestore());

    const onCalendarDateChange = vi.fn();
    await renderWithOdysseyProvider(
      <DateTimePicker
        defaultValue="2024-07-15T10:00:00.000Z"
        label="Date time"
        onCalendarDateChange={onCalendarDateChange}
        timeZone="UTC"
      />,
    );

    await userEvent.click(page.getByRole("button", { name: "Choose date" }));

    const dialog = page.getByRole("dialog");
    await userEvent.click(dialog.getByText("26"));
    await userEvent.click(dialog.getByRole("button", { name: "Apply" }));

    await expect
      .poll(() => onCalendarDateChange.mock.lastCall)
      .toStrictEqual([{ timeZone: "UTC", value: "2024-07-26T10:00:00.000Z" }]);
  });

  test("calendar selection reports the zone and value", async () => {
    const onCalendarDateChange = vi.fn();

    await renderWithOdysseyProvider(
      <DateTimePicker
        defaultValue="2024-07-15T10:00:00.000Z"
        label="Date time"
        onCalendarDateChange={onCalendarDateChange}
        timeZone="UTC"
      />,
    );

    await userEvent.click(page.getByRole("button", { name: "Choose date" }));
    await userEvent.click(page.getByRole("dialog").getByText("18"));

    await expect
      .poll(() => onCalendarDateChange.mock.lastCall)
      .toStrictEqual([{ timeZone: "UTC", value: "2024-07-18T10:00:00.000Z" }]);
  });
});
