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
import { page, userEvent } from "vitest/browser";

import { TimeZonePicker } from "./TimeZonePicker.js";

const timeZoneOptions = [
  { label: "Eastern Time", value: "America/New_York" },
  { label: "Tokyo Time", value: "Asia/Tokyo" },
];

describe(TimeZonePicker.displayName!, () => {
  test("selected value shown and a new zone chosen", async () => {
    const onTimeZoneChange = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <TimeZonePicker
        label="Time zone"
        onTimeZoneChange={onTimeZoneChange}
        timeZoneOptions={timeZoneOptions}
        value="America/New_York"
      />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByLabelText("Time zone"))
      .toHaveValue("Eastern Time");

    await userEvent.click(page.getByLabelText("Time zone"));
    await userEvent.click(page.getByRole("option", { name: "Tokyo Time" }));

    expect(onTimeZoneChange).toHaveBeenCalledWith("Asia/Tokyo");
  });

  test("selection cleared", async () => {
    const onTimeZoneChange = vi.fn();
    await renderWithOdysseyProvider(
      <TimeZonePicker
        label="Time zone"
        onTimeZoneChange={onTimeZoneChange}
        timeZoneOptions={timeZoneOptions}
        value="Asia/Tokyo"
      />,
    );

    // MUI Autocomplete hides its clear button with `visibility: hidden` until the field is hovered or focused, so the click needs the hover first.
    await userEvent.hover(page.getByLabelText("Time zone"));
    await userEvent.click(page.getByRole("button", { name: "Clear" }));

    expect(onTimeZoneChange).toHaveBeenLastCalledWith(undefined);
  });
});
