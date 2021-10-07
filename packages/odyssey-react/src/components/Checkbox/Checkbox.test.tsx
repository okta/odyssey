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

import { render, fireEvent, screen } from "@testing-library/react";
import type { EventType } from "@testing-library/dom";
import Checkbox from ".";

const checkbox = "checkbox";
const label = `${checkbox}_label`;
const value = `${checkbox}_value`;
const name = `${checkbox}_name`;

describe("Checkbox", () => {
  it("renders visibly into the document", () => {
    render(<Checkbox label={label} name={name} value={value} />);

    expect(screen.getByRole(checkbox)).toBeVisible();
  });

  it("restricts children via types and does not render them", () => {
    render(
      // @ts-expect-error never type for children
      <Checkbox label={label} children="child" />
    );

    expect(screen.queryByText("child")).toBeNull;
  });

  it("renders value attributed as expected for input", () => {
    render(<Checkbox label={label} name={name} value={value} />);

    expect(screen.getByRole(checkbox)).toHaveAttribute("value", value);
  });

  it("renders name attribute as expected for input", () => {
    render(<Checkbox label={label} name={name} value={value} />);

    expect(screen.getByRole(checkbox)).toHaveAttribute("name", name);
  });

  it("renders a provided id associating the input and label", () => {
    const { getByRole, getByText } = render(
      <Checkbox label={label} name={name} value={value} id="foo" />
    );

    expect(getByRole(checkbox)).toHaveAttribute("id", "foo");
    expect(getByText(label)).toHaveAttribute("for", "foo");
  });

  it("renders a generated id associating the input and label", () => {
    render(<Checkbox label={label} name={name} value={value} />);

    const result = screen.getByLabelText(label);
    expect(result).toBeInstanceOf(HTMLInputElement);
    expect(result).toHaveAttribute("name", name);
  });

  it.each([["disabled"], ["checked"], ["required"]])(
    "renders %s attribute",
    (attr: string) => {
      render(
        <Checkbox
          label={label}
          value={value}
          name={name}
          {...{ [attr]: true }}
        />
      );

      expect(screen.getByRole(checkbox)).toHaveAttribute(attr);
    }
  );

  it("renders indeterminate", () => {
    render(<Checkbox label={label} name={name} value={value} indeterminate />);
    expect(screen.getByRole(checkbox)).toBePartiallyChecked();
  });

  it("invokes onChange with expected args when change input event fires", () => {
    const handle = jest.fn();

    render(
      <Checkbox onChange={handle} label={label} value={value} name={name} />
    );

    const target = screen.getByRole(checkbox);
    fireEvent.click(target);

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change", target }),
      value
    );
  });

  it.each<[string, EventType]>([
    ["onBlur", "blur"],
    ["onFocus", "focus"],
  ])(
    "invokes %s with expected args when %s input event fires",
    (prop, type) => {
      const handle = jest.fn();

      render(
        <Checkbox
          {...{ [prop]: handle }}
          label={label}
          value={value}
          name={name}
        />
      );

      const target = screen.getByRole(checkbox);
      fireEvent[type].call(fireEvent, target);

      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle).toHaveBeenLastCalledWith(
        expect.objectContaining({ type, target })
      );
    }
  );

  it("invokes ref with expected args after render", () => {
    const handle = jest.fn();

    render(<Checkbox ref={handle} label={label} value={value} name={name} />);

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(screen.getByRole(checkbox));
  });

  a11yCheck(() => render(<Checkbox label={label} value={value} name={name} />));
});
