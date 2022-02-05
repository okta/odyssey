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
import { render, screen, fireEvent } from "@testing-library/react";
import type { EventType } from "@testing-library/dom";
import { TextArea } from ".";

const textBox = "textbox";
const label = "Destination";

describe("TextArea", () => {
  it("renders into the document", () => {
    render(<TextArea label={label} />);

    expect(screen.getByRole(textBox)).toBeVisible();
  });

  it("accepts and spreads omitted rest props to the textarea", () => {
    render(<TextArea label={label} data-testid="foo" />);

    expect(screen.getByTestId("foo")).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("renders a provided id associating the input and label", () => {
    render(<TextArea label={label} id="foo" />);

    expect(screen.getByRole(textBox)).toHaveAttribute("id", "foo");
    expect(screen.getByText(label).parentElement).toHaveAttribute("for", "foo");
  });

  it("renders a generated id associating the input and label", () => {
    render(<TextArea label={label} required />);

    expect(screen.getByRole(textBox, { name: label })).toBeVisible();
  });

  it("renders a max length for the text area", () => {
    render(<TextArea label={label} name="bar" maxLength={5} />);

    expect(screen.getByRole(textBox)).toHaveAttribute("maxLength", "5");
  });

  it("renders a provided name for the input", () => {
    render(<TextArea label={label} name="bar" />);

    expect(screen.getByRole(textBox)).toHaveAttribute("name", "bar");
  });

  it("renders a provided hint", () => {
    const hint = "Look here";

    render(<TextArea label={label} hint={hint} />);

    expect(screen.getByText(hint)).toBeVisible();
  });

  it.each([["disabled"], ["readonly"], ["required"]])(
    "renders %s attribute",
    (attr: string) => {
      render(<TextArea label={label} {...{ [attr]: true }} />);

      expect(screen.getByRole(textBox)).toHaveAttribute(attr);
    }
  );

  it("invokes onChange with expected args when change input event fires", () => {
    const handle = jest.fn();

    render(<TextArea onChange={handle} label={label} />);

    fireEvent.change(screen.getByRole(textBox), { target: { value: "new" } });

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

      render(<TextArea {...{ [prop]: handle }} label={label} />);

      fireEvent[type].call(fireEvent, screen.getByRole(textBox));

      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle).toHaveBeenLastCalledWith(
        expect.objectContaining({ type })
      );
    }
  );

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(<TextArea ref={ref} label={label} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(screen.getByRole(textBox));
  });

  a11yCheck(() => render(<TextArea label="foo" />));
});
