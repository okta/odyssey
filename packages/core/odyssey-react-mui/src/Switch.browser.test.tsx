/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { ComponentProps } from "react";

import { render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { useState } from "react";

import { OdysseyProvider } from "./OdysseyProvider.js";
import { Switch } from "./Switch.js";

describe("Switch", () => {
  const Template = (props: Partial<ComponentProps<typeof Switch>>) => {
    const [checked, setChecked] = useState(false);

    return (
      <OdysseyProvider>
        <Switch
          isChecked={checked}
          label="Notifications"
          onChange={({ checked }) => setChecked(checked)}
          value="notifications"
          {...props}
        />
      </OdysseyProvider>
    );
  };

  test("toggling when clicked", async () => {
    render(<Template />);

    const checkbox = (await screen.findByRole(
      "checkbox",
    )) satisfies HTMLInputElement;
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
