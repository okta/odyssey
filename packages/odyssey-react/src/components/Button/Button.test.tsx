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

import { render, fireEvent } from "@testing-library/react";
import Button from ".";

const button = "button";
const buttonLabel = "Button Label";

describe("Button", () => {
  it("render the button", () => {
    const { getByText } = render(<Button children={buttonLabel} />);

    expect(getByText(buttonLabel)).toBeInTheDocument();
  });

  it("renders aria attrs via omit rest props", () => {
    const { getByRole } = render(
      <Button aria-describedby="foo" children="bar" />
    );

    expect(getByRole(button)).toHaveAttribute("aria-describedby", "foo");
  });

  it("should be disabled", () => {
    const { getByRole } = render(
      <Button disabled={true}>{buttonLabel}</Button>
    );

    expect(getByRole("button")).toHaveAttribute("disabled");
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} children="foo" />
    );

    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  a11yCheck(() => render(<Button children="baz" />));
});
