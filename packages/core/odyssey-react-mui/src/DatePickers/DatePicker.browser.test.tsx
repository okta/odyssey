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

import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { DatePicker } from "./DatePicker.js";

describe(DatePicker.displayName!, () => {
  test("displays the DatePicker", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DatePicker label="date time picker label" />,
    );

    await expect(container).toBeAccessible();

    await expect
      .element(page.getByLabelText("date time picker label"))
      .toBeInTheDocument();
  });

  test("displays the correct date when a value is passed in", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DatePicker
        label="date time picker label"
        timeZone="America/New_York"
        value="2024-07-21T03:00:00.000Z"
      />,
    );

    await expect(container).toBeAccessible();

    await expect
      .element(page.getByLabelText("date time picker label"))
      .toHaveValue("07/20/2024");
  });

  test("displays the correct date when timezone is changed", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DatePicker
        label="date time picker label"
        timeZone="Asia/Hong_Kong"
        value="2024-07-21T03:00:00.000Z"
      />,
    );

    await expect(container).toBeAccessible();

    await expect
      .element(page.getByLabelText("date time picker label"))
      .toHaveValue("07/21/2024");
  });

  test("controlled date picker — calendar accessibility", async () => {
    const ControlledDatePicker = () => {
      const [value, setValue] = useState("2024-07-11T03:00:00.000Z");

      return (
        <DatePicker
          hint="Select a date."
          label="Date picker label"
          onCalendarDateChange={({ value: newValue }) =>
            setValue(newValue ?? "")
          }
          value={value}
        />
      );
    };

    await renderWithOdysseyProvider(<ControlledDatePicker />);

    const calendarButton = page.getByLabelText(
      odysseyTranslate("picker.labels.date.choose"),
    );
    await userEvent.click(calendarButton);

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    // color-contrast disabled due to axe checking cells individually causing timeout in CI
    await expect
      .element(dialog)
      .toBeAccessible({ disabledRules: ["color-contrast"] });
  });

  test("controlled date picker — closes calendar on Escape", async () => {
    const ControlledDatePicker = () => {
      const [value, setValue] = useState("2024-07-11T03:00:00.000Z");

      return (
        <DatePicker
          hint="Select a date."
          label="Date picker label"
          onCalendarDateChange={({ value: newValue }) =>
            setValue(newValue ?? "")
          }
          value={value}
        />
      );
    };

    await renderWithOdysseyProvider(<ControlledDatePicker />);

    const calendarButton = page.getByLabelText(
      odysseyTranslate("picker.labels.date.choose"),
    );
    await userEvent.click(calendarButton);

    await expect.element(page.getByRole("dialog")).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });

  test("controlled date picker with calendar date selected", async () => {
    const ControlledDatePicker = () => {
      const [value, setValue] = useState("2024-07-11T03:00:00.000Z");

      return (
        <DatePicker
          hint="Select a date."
          label="Date picker label"
          onCalendarDateChange={({ value: newValue }) =>
            setValue(newValue ?? "")
          }
          value={value}
        />
      );
    };

    const { container } = await renderWithOdysseyProvider(
      <ControlledDatePicker />,
    );

    const calendarButton = page.getByLabelText(
      odysseyTranslate("picker.labels.date.choose"),
    );
    await userEvent.click(calendarButton);

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    const dateButton = dialog.getByText("26");
    await userEvent.click(dateButton);

    await expect(container).toBeAccessible();

    await expect.element(page.getByRole("textbox")).toHaveValue("07/26/2024");
  });
});
