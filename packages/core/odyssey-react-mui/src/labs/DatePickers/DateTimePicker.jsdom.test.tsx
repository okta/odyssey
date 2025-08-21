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

import { render, screen } from "@testing-library/react";

import { DateTimePicker } from "./DateTimePicker.js";
import "../../i18n.js";

describe("DateTimePicker", () => {
  test("displays the DateTimePicker", () => {
    render(<DateTimePicker label="date time picker label" />);

    const input = screen.getByLabelText("date time picker label");
    expect(input).toBeInTheDocument();
  });

  test("displays the correct date and time when a value is passed in ", () => {
    render(
      <DateTimePicker
        label="date time picker label"
        value="2024-07-11T03:00:00.000Z"
        timeZone="America/New_York"
      />,
    );

    const input = screen.getByLabelText("date time picker label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue("07/10/2024 11:00 PM");
  });

  test("displays the correct date and time when timezone is changed", () => {
    render(
      <DateTimePicker
        label="date time picker label"
        value="2024-07-11T03:00:00.000Z"
        timeZone="America/Los_Angeles"
      />,
    );

    const input = screen.getByLabelText("date time picker label");
    expect(input).toHaveDisplayValue("07/10/2024 08:00 PM");
  });
});
