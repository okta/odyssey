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
import { PasswordInput } from ".";

const label = "Password";
const tooltipOnLabel = "Show password";
const tooltipOffLabel = "Hide password";

describe("PasswordInput", () => {
  it("renders into the document", () => {
    render(<PasswordInput label={label} tooltipLabel={tooltipOnLabel} />);
    expect(screen.getByLabelText(label)).toBeVisible();
  });

  it("has a button that changes the type when clicked", () => {
    const tooltipLabel = (isHidden: boolean) => {
      return isHidden ? tooltipOnLabel : tooltipOffLabel;
    };
    render(
      <PasswordInput
        label={label}
        tooltipLabel={tooltipLabel}
        defaultValue="Imma password"
      />
    );
    const inputElement = screen.getByLabelText(label);
    expect(inputElement).toHaveValue("Imma password");
    expect(inputElement).toHaveAttribute("type", "password");
    const eyeButton = screen.getByRole("button");
    expect(eyeButton).toBeInTheDocument();
    eyeButton.click();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  a11yCheck(() =>
    render(<PasswordInput label="input label" tooltipLabel="tooltip label" />)
  );
});
