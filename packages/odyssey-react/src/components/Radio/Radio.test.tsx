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
import { render, fireEvent, screen, within } from "@testing-library/react";
import { Radio } from ".";

const radioRole = "radio";
const groupRole = "group";
const label = "Select speed";
const name = "speed";

const warpLabel = "Warp speed";
const warpValue = "warp";

const tree = (props: Record<string, unknown> = {}) => (
  <Radio.Group {...props} label={label} name={name}>
    <Radio.Button label="Lightspeed" value="light" />
    <Radio.Button label="Warp speed" value="warp" />
    <Radio.Button label="Ludicrous speed" value="ludicrous" />
  </Radio.Group>
);

describe("Radio", () => {
  it("renders visibly into the document", () => {
    expect.assertions(4);
    render(tree());

    const group = screen.getByRole(groupRole, { name: label });
    expect(group).toBeVisible();

    const radios = within(group).getAllByRole(radioRole);
    radios.forEach((radio) => {
      expect(radio).toBeVisible();
    });
  });

  it("renders through children that are not expected Radio.Button", () => {
    render(
      // @ts-expect-error Radio.Group does not accept text as children
      <Radio.Group label={label} name={name}>
        oops
      </Radio.Group>
    );

    expect(screen.getByRole(groupRole)).toContainHTML("oops");
  });

  it("renders a controlled checked input when provided with a valid value", () => {
    render(tree({ value: warpValue }));

    const radio = screen.getByLabelText(warpLabel);
    expect(radio).toBeChecked();
  });

  it("renders a uncontrolled checked input when a Radio.Button is checked", () => {
    render(tree());

    const radio = screen.getByLabelText(warpLabel);

    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it("renders hint text when provided", () => {
    const hint = "Time is relative";
    render(tree({ hint }));

    const hintElement = screen.getByText(hint);
    expect(hintElement).toBeVisible();
  });

  it("invokes onChange with expected args when change input event fires", () => {
    const onChange = jest.fn();
    render(tree({ onChange }));

    const radio = screen.getByLabelText(warpLabel);
    fireEvent.click(radio);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change" }),
      warpValue
    );
  });

  describe("propagation to Radio.Button children", () => {
    it.each([
      ["name", name],
      ["disabled", undefined],
      ["required", undefined],
    ])(
      "renders %s attribute as expected",
      (attr: string, attrValue: string | undefined) => {
        expect.assertions(3);
        render(tree({ [attr]: attrValue ?? true }));

        const radios = screen.getAllByRole(radioRole);

        radios.forEach((radio) => {
          expect(radio).toHaveAttribute(attr, attrValue);
        });
      }
    );
  });

  a11yCheck(() => render(tree()));
});
