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

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { DateTime } from "luxon";
import { createRef, type ReactNode } from "react";
import { page, userEvent } from "vitest/browser";

import { DateTimeField } from "./DateTimeField.js";

const withLuxon = (children: ReactNode) => (
  <LocalizationProvider dateAdapter={AdapterLuxon}>
    {children}
  </LocalizationProvider>
);

const utc = (isoString: string) => DateTime.fromISO(isoString, { zone: "utc" });

const MIN_DATE_MESSAGE =
  "Date entered is earlier than allowed dates. Select a date from the range available in the calendar.";
const MAX_DATE_MESSAGE =
  "Date entered is later than the allowed dates. Select a date from the range available in the calendar.";

describe(DateTimeField.displayName!, () => {
  test("a value before minDate shows the min date error", async () => {
    await renderWithOdysseyProvider(
      withLuxon(
        <DateTimeField
          label="When"
          minDate={utc("2026-03-01T00:00:00")}
          timezone="UTC"
          value={utc("2026-02-01T00:00:00")}
        />,
      ),
    );

    await expect.element(page.getByText(MIN_DATE_MESSAGE)).toBeVisible();
  });

  test("typing a valid date reports it as a UTC ISO string", async () => {
    const onChange = vi.fn();

    await renderWithOdysseyProvider(
      withLuxon(
        <DateTimeField label="When" onChange={onChange} timezone="UTC" />,
      ),
    );

    await userEvent.fill(
      page.getByRole("textbox", { name: "When" }),
      "03/04/2026 05:06 AM",
    );

    await expect
      .poll(() => onChange.mock.lastCall)
      .toStrictEqual(["2026-03-04T05:06:00.000Z"]);
  });

  test("typing a date outside the range shows an error and skips onChange", async () => {
    const onChange = vi.fn();

    await renderWithOdysseyProvider(
      withLuxon(
        <DateTimeField
          label="When"
          maxDate={utc("2026-03-01T00:00:00")}
          minDate={utc("2026-02-01T00:00:00")}
          onChange={onChange}
          timezone="UTC"
        />,
      ),
    );

    const input = page.getByRole("textbox", { name: "When" });

    await userEvent.fill(input, "04/04/2026 05:06 AM");
    await expect.element(page.getByText(MAX_DATE_MESSAGE)).toBeVisible();

    await userEvent.fill(input, "01/04/2026 05:06 AM");
    await expect.element(page.getByText(MIN_DATE_MESSAGE)).toBeVisible();

    expect(onChange).not.toHaveBeenCalled();
  });

  test("leaving the field calls onBlur", async () => {
    const onBlur = vi.fn();

    await renderWithOdysseyProvider(
      withLuxon(
        <>
          <DateTimeField label="When" onBlur={onBlur} timezone="UTC" />
          <button type="button">Elsewhere</button>
        </>,
      ),
    );

    await userEvent.click(page.getByRole("textbox", { name: "When" }));
    await userEvent.click(page.getByRole("button", { name: "Elsewhere" }));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("the input ref can focus the field", async () => {
    const inputRef = createRef<HTMLInputElement>();

    await renderWithOdysseyProvider(
      withLuxon(
        <DateTimeField inputRef={inputRef} label="When" timezone="UTC" />,
      ),
    );

    inputRef.current?.focus();

    await expect
      .element(page.getByRole("textbox", { name: "When" }))
      .toHaveFocus();
  });

  test("read-only and disabled fields hide the end adornment", async () => {
    await renderWithOdysseyProvider(
      withLuxon(
        <>
          <DateTimeField
            endAdornment={<span>Read-only adornment</span>}
            isReadOnly
            label="Read only"
            timezone="UTC"
          />
          <DateTimeField
            endAdornment={<span>Disabled adornment</span>}
            isDisabled
            label="Disabled"
            timezone="UTC"
          />
          <DateTimeField
            endAdornment={<span>Editable adornment</span>}
            label="Editable"
            timezone="UTC"
          />
        </>,
      ),
    );

    await expect.element(page.getByText("Editable adornment")).toBeVisible();
    await expect
      .element(page.getByText("Read-only adornment"))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByText("Disabled adornment"))
      .not.toBeInTheDocument();
  });
});
