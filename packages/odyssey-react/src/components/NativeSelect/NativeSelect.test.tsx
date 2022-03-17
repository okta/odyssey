/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NativeSelect } from "./NativeSelect";

import type { EventType } from "@testing-library/dom";

const name = "test-select";
const label = "Test Select";
const warpValue = "Warp speed";

const tree = (props: Record<string, unknown> = {}) => (
  <NativeSelect {...props} label={label} name={name}>
    <NativeSelect.Option children="Lightspeed" />
    <NativeSelect.Option children="Warp speed" />
    <NativeSelect.Option children="Ludicrous speed" />
  </NativeSelect>
);

describe("NativeSelect", () => {
  it("renders visibly into the document", () => {
    render(tree());

    expect(screen.getByRole("combobox")).toBeVisible();
  });

  it("accepts and spreads rest props to the input element", () => {
    render(tree({ ["data-testid"]: "foo" }));

    expect(screen.getByTestId("foo")).toBeInstanceOf(HTMLSelectElement);
  });

  it("renders a provided id associating the input and label", () => {
    render(tree({ label: label, id: "foo" }));

    expect(screen.getByRole("combobox")).toHaveAttribute("id", "foo");
    expect(screen.getByText(label).parentElement).toHaveAttribute("for", "foo");
  });

  it("renders a generated id associating the input and label", () => {
    render(tree({ label: label }));

    expect(screen.getByRole("combobox", { name: label })).toBeVisible();
  });

  it("renders a provided name for the input", () => {
    render(tree({ label: label, name: name }));

    expect(screen.getByRole("combobox")).toHaveAttribute("name", name);
  });

  it("accepts the disabled prop", () => {
    render(tree({ disabled: true }));

    expect(screen.getByRole("combobox")).toHaveAttribute("disabled");
  });

  it("renders controlled when provided with a value", () => {
    render(tree({ value: warpValue }));

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue(warpValue);

    // attempt to change via user interaction
    userEvent.selectOptions(select, "Lightspeed");

    // no change as input value is controlled
    expect(select).toHaveValue(warpValue);
  });

  it("renders uncontrolled when not provided with a value", () => {
    render(tree());

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue(undefined);

    userEvent.selectOptions(select, warpValue);

    expect(select).toHaveValue(warpValue);
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(tree({ ref }));

    const select = screen.getByRole("combobox");

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(select);
  });

  it("invokes onChange with expected args when change event fires", () => {
    const onChange = jest.fn();
    render(tree({ onChange }));

    const select = screen.getByRole("combobox");
    userEvent.selectOptions(select, warpValue);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change" }),
      warpValue
    );
  });

  it.each<[string, EventType]>([
    ["onBlur", "blur"],
    ["onFocus", "focus"],
  ])(
    "invokes %s with expected args when %s input event fires",
    (prop, type) => {
      const handle = jest.fn();

      render(tree({ [prop]: handle }));

      fireEvent[type].call(fireEvent, screen.getByRole("combobox"));

      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle).toHaveBeenLastCalledWith(
        expect.objectContaining({ type })
      );
    }
  );

  a11yCheck(() => render(tree()));
});
