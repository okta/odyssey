/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  render,
  fireEvent,
  screen,
  waitFor,
  getByText,
} from "@testing-library/react";
import { Autocomplete } from "./Autocomplete";

describe("Autocomplete", () => {
  it("renders an autocomplete box and shows options", () => {
    render(
      <Autocomplete hint="hint" label="label" options={[{ label: "test" }]} />
    );

    const input = screen.getByRole("combobox");
    fireEvent.click(input);
    expect(screen.queryByRole("listbox")).toBeNull();

    fireEvent.mouseDown(input);
    expect(screen.queryByRole("listbox")).toBeDefined();

    fireEvent.change(input, { target: { value: "a" } });
    expect(screen.queryByRole("listbox")).toBeNull();

    fireEvent.change(input, { target: { value: "t" } });
    expect(screen.queryByRole("listbox")).toBeDefined();
  });

  it("test when isDisabled is set the textbox is disabled", () => {
    render(
      <Autocomplete
        hint="hint"
        label="label"
        options={[{ label: "test" }]}
        isDisabled={true}
      />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("disabled");
  });

  it("test when isReadOnly is set the textbox is readonly", () => {
    render(
      <Autocomplete
        hint="hint"
        label="label"
        options={[{ label: "test" }]}
        isReadOnly={true}
      />
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("readonly");
  });

  it("test when input is changed onChange/onInputChange is called", async () => {
    const handleChange = jest.fn();
    const handleInputChange = jest.fn();

    render(
      <Autocomplete
        hint="hint"
        label="label"
        options={[{ label: "test" }]}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "test" } });
    await waitFor(() => expect(handleInputChange).toBeCalled());
    await waitFor(() => expect(handleChange).not.toBeCalled());

    fireEvent.click(getByText(screen.getByRole("listbox"), "test"));
    await waitFor(() => expect(handleChange).toBeCalled());
  });
});
