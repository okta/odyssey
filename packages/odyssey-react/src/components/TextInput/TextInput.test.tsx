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

import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import type { EventType } from "@testing-library/dom";
import { TextInput } from ".";
import type { TextInputProps } from ".";

const textBox = "textbox";
const label = "Destination";

describe("TextInput", () => {
  beforeEach(() => {
    jest
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback): number => {
        callback(0);
        return 0;
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders into the document", () => {
    render(<TextInput label={label} />);

    expect(screen.getByRole(textBox)).toBeVisible();
  });

  it("accepts and spreads omitted rest props to the input element", () => {
    render(<TextInput label={label} data-testid="foo" />);

    expect(screen.getByTestId("foo")).toBeInstanceOf(HTMLInputElement);
  });

  it("renders a provided id associating the input and label", () => {
    render(<TextInput label={label} id="foo" />);

    expect(screen.getByRole(textBox)).toHaveAttribute("id", "foo");
    expect(screen.getByText(label).parentElement).toHaveAttribute("for", "foo");
  });

  it("renders a generated id associating the input and label", () => {
    render(<TextInput label={label} required />);

    expect(screen.getByRole(textBox, { name: label })).toBeVisible();
  });

  it("renders an aria-describedby attribute when an error is present", () => {
    const error = "oops";
    render(<TextInput label={label} error={error} />);

    const errorEl = screen.getByText(error);
    expect(screen.getByRole(textBox, { name: label })).toHaveAttribute(
      "aria-describedby",
      errorEl.id
    );
  });

  it("does not render an aria-describedby attribute when no error is present", () => {
    render(<TextInput label={label} />);
    expect(screen.getByRole(textBox, { name: label })).not.toHaveAttribute(
      "aria-describedby"
    );
  });

  it("renders a provided name for the input", () => {
    render(<TextInput label={label} name="bar" />);

    expect(screen.getByRole(textBox)).toHaveAttribute("name", "bar");
  });

  it("renders the optionalLabel when input is not required", () => {
    const optionalLabel = "Optional";

    const { container } = render(
      <TextInput label={label} optionalLabel={optionalLabel} required={false} />
    );

    expect(
      within(container.querySelector("label") as HTMLElement).getByText(
        optionalLabel
      )
    ).toBeVisible();
  });

  it.each([["disabled"], ["readonly"], ["required"]])(
    "renders %s attribute",
    (attr: string) => {
      const { getByRole } = render(
        <TextInput label={label} {...{ [attr]: true }} />
      );

      expect(getByRole(textBox)).toHaveAttribute(attr);
    }
  );

  it.each<[TextInputProps["type"]]>([
    [undefined],
    ["text"],
    ["email"],
    ["url"],
    ["tel"],
    ["search"],
    ["password"],
  ])("renders %s input type", (type) => {
    render(<TextInput label={label} type={type} required />);

    expect(screen.getByLabelText(label)).toHaveAttribute(
      "type",
      type ?? "text"
    );
  });

  it("invokes onChange with expected args when change input event fires", () => {
    const handle = jest.fn();

    const { getByRole } = render(<TextInput onChange={handle} label={label} />);

    fireEvent.change(getByRole(textBox), { target: { value: "new" } });

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change" }),
      "new"
    );
  });

  it.each<[string, EventType]>([
    ["onBlur", "blur"],
    ["onFocus", "focus"],
  ])(
    "invokes %s with expected args when %s input event fires",
    (prop, type) => {
      const handle = jest.fn();

      render(<TextInput {...{ [prop]: handle }} label={label} />);

      fireEvent[type].call(fireEvent, screen.getByRole(textBox));

      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle).toHaveBeenLastCalledWith(
        expect.objectContaining({ type })
      );
    }
  );

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<TextInput ref={ref} label={label} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole(textBox));
  });

  it("renders the prefix", () => {
    render(<TextInput label={label} prefix="test prefix" />);
    const prefixElement = screen.getByText("test prefix");
    expect(prefixElement).toBeInTheDocument();
    expect(prefixElement.className).toContain("prefix");
  });

  it("renders the suffix", () => {
    render(<TextInput label={label} suffix="test suffix" />);
    const suffixElement = screen.getByText("test suffix");
    expect(suffixElement).toBeInTheDocument();
    expect(suffixElement.className).toContain("suffix");
  });

  it("gives the input focus when prefix is clicked", () => {
    render(<TextInput label={label} prefix="test prefix" />);
    const prefixElement = screen.getByText("test prefix");
    prefixElement.click();
    const inputElement = screen.getByRole(textBox);
    expect(inputElement).toHaveFocus();
  });

  it("gives the  input focus when suffix is clicked", () => {
    render(<TextInput label={label} suffix="test suffix" />);
    const prefixElement = screen.getByText("test suffix");
    prefixElement.click();
    const inputElement = screen.getByRole(textBox);
    expect(inputElement).toHaveFocus();
  });

  it("clears the input when the clear button is clicked for uncontrolled value", () => {
    render(
      <TextInput
        label={label}
        type="search"
        defaultValue="Default uncontrolled value"
      />
    );
    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toHaveValue("Default uncontrolled value");
    inputElement.focus();
    const clearButton = screen.getByRole("button");
    clearButton.click();
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("calls onchange with empty value when clear button is clicked", () => {
    const onChange = jest.fn();
    render(
      <TextInput
        label={label}
        type="search"
        value="controlled value"
        onChange={onChange}
      />
    );
    const inputElement = screen.getByRole("searchbox");
    expect(inputElement).toHaveValue("controlled value");
    inputElement.focus();
    const clearButton = screen.getByRole("button");
    clearButton.click();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change" }),
      ""
    );
  });

  a11yCheck(() => render(<TextInput label="foo" />));
});
