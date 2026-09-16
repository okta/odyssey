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

import { useCallback, useState } from "react";
import { page, userEvent } from "vitest/browser";

import { Button } from "../Buttons/Button.js";
import { translate as odysseyTranslate } from "../i18n.generated/i18n.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { DatePicker } from "./DatePicker.js";

// Every prop but `value` is memoized so `value` is the only one whose identity
// changes between renders. `DatePicker` is a `React.memo` wrapper, so this is
// the render path a memoizing consumer actually takes, and it is the path where
// a picker that stopped following `value` would go unnoticed.
const DatePickerWithOutsideWrites = ({
  initialValue,
  nextValue,
}: {
  initialValue?: string;
  nextValue: string;
}) => {
  const [value, setValue] = useState(initialValue);

  const onCalendarDateChange = useCallback(
    ({ value: selectedValue }: { value?: string }) => setValue(selectedValue),
    [],
  );

  const onWriteClick = useCallback(() => setValue(nextValue), [nextValue]);

  const onClearClick = useCallback(() => setValue(""), []);

  return (
    <>
      <DatePicker
        label="Date picker label"
        onCalendarDateChange={onCalendarDateChange}
        onInputChange={setValue}
        timeZone="UTC"
        value={value}
      />
      <Button label="write" onClick={onWriteClick} variant="primary" />
      <Button label="clear" onClick={onClearClick} variant="secondary" />
    </>
  );
};

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

  // The calendar popup used to render at a hardcoded viewport-wide width and
  // overflow narrow parents, clipping the last (Saturday) column.
  test("calendar popup in a narrow container shows every column", async () => {
    const { container } = await renderWithOdysseyProvider(
      <div style={{ width: "320px" }}>
        <DatePicker
          label="Date picker label"
          value="2024-07-11T03:00:00.000Z"
        />
      </div>,
    );

    const calendarButton = page.getByLabelText(
      odysseyTranslate("picker.labels.date.choose"),
    );
    await userEvent.click(calendarButton);

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    // No accessible query distinguishes the day-grid row container, so reach for
    // the MUI class to assert the seven columns are not horizontally clipped.
    const weekRow = dialog
      .element()
      .querySelector(".MuiDayCalendar-weekContainer")!;
    expect(weekRow.scrollWidth).toBeLessThanOrEqual(weekRow.clientWidth);

    // color-contrast disabled due to axe checking cells individually causing timeout in CI
    await expect
      .element(dialog)
      .toBeAccessible({ disabledRules: ["color-contrast"] });

    await expect(container).toBeAccessible();
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

  test("value replaced from outside a controlled field", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DatePickerWithOutsideWrites
        initialValue="2024-07-15T00:00:00.000Z"
        nextValue="2025-01-02T00:00:00.000Z"
      />,
    );

    await expect(container).toBeAccessible();
    await expect.element(page.getByRole("textbox")).toHaveValue("07/15/2024");

    await userEvent.click(page.getByRole("button", { name: "write" }));

    await expect.element(page.getByRole("textbox")).toHaveValue("01/02/2025");
    await expect(container).toBeAccessible();
  });

  test("value written from outside a field that mounted empty", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DatePickerWithOutsideWrites nextValue="2025-01-02T00:00:00.000Z" />,
    );

    await expect(container).toBeAccessible();
    await expect.element(page.getByRole("textbox")).toHaveValue("");

    await userEvent.click(page.getByRole("button", { name: "write" }));

    await expect.element(page.getByRole("textbox")).toHaveValue("01/02/2025");
    await expect(container).toBeAccessible();
  });

  test("controlled value cleared from outside", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DatePickerWithOutsideWrites
        initialValue="2024-07-15T00:00:00.000Z"
        nextValue="2025-01-02T00:00:00.000Z"
      />,
    );

    await expect.element(page.getByRole("textbox")).toHaveValue("07/15/2024");

    await userEvent.click(page.getByRole("button", { name: "clear" }));

    await expect.element(page.getByRole("textbox")).toHaveValue("");
    await expect(container).toBeAccessible();
  });

  test("typing into an uncontrolled field", async () => {
    await renderWithOdysseyProvider(
      <DatePicker
        defaultValue="2024-07-15T00:00:00.000Z"
        label="Date picker label"
        timeZone="UTC"
      />,
    );

    const dateInput = page.getByRole("textbox");
    await expect.element(dateInput).toHaveValue("07/15/2024");

    await userEvent.fill(dateInput, "");
    await userEvent.type(dateInput, "12252025");

    await expect.element(dateInput).toHaveValue("12/25/2025");
  });

  test("selecting a calendar date in an uncontrolled field", async () => {
    await renderWithOdysseyProvider(
      <DatePicker
        defaultValue="2024-07-15T00:00:00.000Z"
        label="Date picker label"
        timeZone="UTC"
      />,
    );

    await userEvent.click(
      page.getByLabelText(odysseyTranslate("picker.labels.date.choose")),
    );

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    await userEvent.click(dialog.getByText("26"));

    await expect.element(page.getByRole("textbox")).toHaveValue("07/26/2024");
  });

  test("typing into a controlled field", async () => {
    await renderWithOdysseyProvider(
      <DatePickerWithOutsideWrites
        initialValue="2024-07-15T00:00:00.000Z"
        nextValue="2025-01-02T00:00:00.000Z"
      />,
    );

    const dateInput = page.getByRole("textbox");
    await expect.element(dateInput).toHaveValue("07/15/2024");

    await userEvent.fill(dateInput, "");
    await userEvent.type(dateInput, "12252025");

    await expect.element(dateInput).toHaveValue("12/25/2025");
  });
});
