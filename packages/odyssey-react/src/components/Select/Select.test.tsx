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
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from ".";

const listboxRole = "listbox";
const multipleInputRole = "textbox";
const optionRole = "option";
const label = "Select speed";
const name = "speed";
const warpValue = "Warp speed";

const tree = (props: Record<string, unknown> = {}) => (
  <Select {...props} label={label} name={name}>
    <Select.Option children="Lightspeed" />
    <Select.Option children="Warp speed" />
    <Select.Option children="Ludicrous speed" />
  </Select>
);

const getSelectViaQuery = () =>
  window.document.querySelector("select") as HTMLSelectElement;

describe("Select", () => {
  it("renders hidden select UI into the document", () => {
    render(tree());

    const select = getSelectViaQuery();
    expect(select).toBeInTheDocument();
    expect(select).not.toBeVisible();
  });

  it("renders visible listbox UI into the document", () => {
    expect.assertions(4);
    render(tree());

    const listbox = screen.getAllByRole(listboxRole).pop() as HTMLDivElement;
    expect(listbox).toBeVisible();

    const options = within(listbox).getAllByRole(optionRole);
    options.forEach((option) => {
      expect(option).toBeVisible();
    });
  });

  it("renders controlled when provided with a value", () => {
    const lightValue = "Lightspeed";
    render(tree({ value: warpValue }));

    const select = getSelectViaQuery();
    expect(select).toHaveValue(warpValue);

    // attempt to change via user interaction
    const listbox = screen.getAllByRole(listboxRole)[0];
    fireEvent.mouseDown(listbox);
    const option = screen.getByText(lightValue, {
      selector: `div[data-value=${lightValue}]`,
    });
    fireEvent.mouseDown(option);

    // no change as input value is controlled
    expect(select).toHaveValue(warpValue);
  });

  it("renders uncontrolled when not provided with a value", () => {
    render(tree());

    const select = getSelectViaQuery();
    expect(select).toHaveValue(undefined);

    const listbox = screen.getAllByRole(listboxRole)[0];
    fireEvent.mouseDown(listbox);
    const option = screen.getByText(warpValue, {
      selector: `div[data-value="${warpValue}"]`,
    });
    fireEvent.mouseDown(option);

    expect(select).toHaveValue(warpValue);
  });

  it("renders hint text when provided", () => {
    const hint = "Time is relative";
    render(tree({ hint }));

    const hintElement = screen.getByText(hint);
    expect(hintElement).toBeVisible();
  });

  it("invokes ref with expected args after render", () => {
    const ref = jest.fn();

    render(tree({ ref }));

    const select = getSelectViaQuery();

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenLastCalledWith(select);
  });

  it("invokes onChange with expected args when change event fires", () => {
    const onChange = jest.fn();
    render(tree({ onChange }));

    const listbox = screen.getAllByRole(listboxRole)[0];
    fireEvent.mouseDown(listbox);
    const option = screen.getByText(warpValue, {
      selector: `div[data-value="${warpValue}"]`,
    });
    fireEvent.mouseDown(option);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change" }),
      warpValue
    );
  });

  it("restricts multiple and noChoicesText via types", () => {
    // @ts-expect-error requires multiple prop with noChoicesText prop
    <Select
      label={label}
      name={name}
      children={<div />}
      noChoicesText="oops"
    />;

    <Select
      label={label}
      name={name}
      children={<div />}
      multiple
      noChoicesText="yay"
    />;
  });

  /**
   * WIP
   */
  it("passes search text to onSearch if defined for multiple", async () => {
    const myQuery = "my q";
    let expectedSubstringEnd = 1;

    const onSearch = async (searchText: string) => {
      // Called in sequence
      expect(searchText).toEqual(searchText.substring(0, expectedSubstringEnd));
      expectedSubstringEnd += 1;
      return expectedSubstringEnd === myQuery.length + 1;
    };

    render(tree({ onSearch: onSearch, multiple: true }));

    const input = screen.getByRole(multipleInputRole) as HTMLInputElement;

    await userEvent.type(input, myQuery, {
      delay: 1,
    });

    // Called for every character
    expect(expectedSubstringEnd).toEqual(myQuery.length + 1);
    // List box not shown because showOptions was not invoked
    expect(screen.getByText("Lightspeed")).not.toBeVisible();
  });

  /**
   * WIP
   */
  it("Displays dropdown on search when showOptions is called", async () => {
    const myQuery = "abc";
    const loadingText = "Please wait...";

    let searchIndex = 0;

    const onSearch = async (_searchText: string, showOptions: () => void) => {
      searchIndex += 1;
      showOptions();
      return searchIndex === myQuery.length;
    };

    render(
      tree({ onSearch: onSearch, multiple: true, loadingText: loadingText })
    );

    const input = screen.getByRole(multipleInputRole) as HTMLInputElement;
    await userEvent.type(input, myQuery, {
      delay: 1,
    });
    expect(screen.getByRole(listboxRole)).toBeTruthy();
  });

  a11yCheck(() => render(tree()));
});
