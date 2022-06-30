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
import { render, screen } from "@testing-library/react";
import { SearchInput } from ".";

const searchBox = "searchbox";
const label = "Destination";

describe("SearchInput", () => {
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
    render(<SearchInput label={label} />);

    expect(screen.getByRole(searchBox)).toBeVisible();
  });

  it("clears the search input when the clear button is clicked", () => {
    render(
      <SearchInput label={label} defaultValue="Default uncontrolled value" />
    );
    const inputElement = screen.getByRole(searchBox);
    expect(inputElement).toHaveValue("Default uncontrolled value");
    inputElement.focus();
    const clearButton = screen.getByRole("button");
    clearButton.click();
    expect(screen.getByRole(searchBox)).toHaveValue("");
  });

  it("There is a clear button when the value is controlled and non empty", () => {
    render(<SearchInput label={label} value="controlled value" />);
    const inputElement = screen.getByRole(searchBox);
    expect(inputElement).toHaveValue("controlled value");
    inputElement.focus();
    expect(screen.queryByRole("button")).toBeInTheDocument();
  });

  it("calls onchange with empty value when clear button is clicked", () => {
    const onChange = jest.fn();
    render(
      <SearchInput label={label} defaultValue="a value" onChange={onChange} />
    );
    const inputElement = screen.getByRole(searchBox);
    expect(inputElement).toHaveValue("a value");
    inputElement.focus();
    const clearButton = screen.getByRole("button");
    clearButton.click();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: "change" }),
      ""
    );
  });

  a11yCheck(() => render(<SearchInput label="foo" />));
});
