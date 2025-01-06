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
import { DatePicker } from "./DatePicker";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: jest.fn((str) => str),
      i18n: {
        language: "en",
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

describe("DateTimePicker", () => {
  it("displays the DateTimePicker", async () => {
    render(<DatePicker label="date time picker label" />);

    const input = await screen.getByLabelText("date time picker label");
    expect(input).toBeInTheDocument();
  });

  it("displays the correct date when a value is passed in ", async () => {
    render(
      <DatePicker
        label="date time picker label"
        value="2024-07-21T03:00:00.000Z"
        timeZone="America/New_York"
      />,
    );

    const input = await screen.getByLabelText("date time picker label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue("07/20/2024");
  });

  it("displays the correct date when timezone is changed", async () => {
    render(
      <DatePicker
        label="date time picker label"
        value="2024-07-21T03:00:00.000Z"
        timeZone="Asia/Hong_Kong"
      />,
    );

    const input = screen.getByLabelText("date time picker label");
    expect(input).toHaveDisplayValue("07/21/2024");
  });
});
