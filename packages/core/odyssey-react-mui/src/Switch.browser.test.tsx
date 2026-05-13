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

import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { Switch } from "./Switch.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe("Switch", () => {
  const Template = (props: Partial<ComponentProps<typeof Switch>>) => {
    const [checked, setChecked] = useState(false);

    return (
      <Switch
        isChecked={checked}
        label="Notifications"
        onChange={({ checked }) => setChecked(checked)}
        value="notifications"
        {...props}
      />
    );
  };

  test("toggling when clicked", async () => {
    const { container } = await renderWithOdysseyProvider(<Template />);

    await expect(container).toBeAccessible();

    const checkbox = page.getByRole("checkbox");
    await expect.element(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect.element(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    await expect.element(checkbox).not.toBeChecked();
  });

  test("uncontrolled switch starts checked when isDefaultChecked is true", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Switch isDefaultChecked label="Notifications" value="notifications" />,
    );

    await expect(container).toBeAccessible();

    await expect.element(page.getByRole("checkbox")).toBeChecked();
  });

  test("does not toggle when isReadOnly is true", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Template isReadOnly />,
    );

    await expect(container).toBeAccessible();

    const checkbox = page.getByRole("checkbox");
    await expect.element(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect.element(checkbox).not.toBeChecked();
  });
});
