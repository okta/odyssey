/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page, userEvent } from "vitest/browser";

import { Checkbox } from "./Checkbox.js";
import { CheckboxGroup } from "./CheckboxGroup.js";

describe(CheckboxGroup.displayName!, () => {
  test("labelled group with hint and error", async () => {
    const { container } = await renderWithOdysseyProvider(
      <CheckboxGroup
        errorMessage="Pick at least one"
        hint="Any of these"
        id="toppings"
        isRequired
        label="Toppings"
      >
        <Checkbox label="Cheese" />
        <Checkbox label="Ham" />
      </CheckboxGroup>,
    );

    await expect(container).toBeAccessible();

    await expect
      .element(page.getByRole("group", { name: "Toppings" }))
      .toBeVisible();

    // The fieldset carries the group role and name; the description wiring sits on the inner form group, which has no role, so it is found by its id.
    const formGroup = document.getElementById("toppings");
    if (formGroup === null) {
      throw new Error("Form group not rendered.");
    }
    const group = page.elementLocator(formGroup);
    await expect
      .element(group)
      .toHaveAttribute("aria-describedby", "toppings-hint toppings-error");
    await expect
      .element(group)
      .toHaveAccessibleDescription("Any of these Error: Pick at least one");
  });

  test("disabled and read-only group ignores a click on its checkbox", async () => {
    await renderWithOdysseyProvider(
      <CheckboxGroup isDisabled isReadOnly label="Toppings">
        <Checkbox label="Cheese" />
      </CheckboxGroup>,
    );

    const checkbox = page.getByRole("checkbox", { name: "Cheese" });
    // A disabled checkbox fails Playwright's actionability check, so the click is forced to prove the group's state blocks it.
    await userEvent.click(checkbox, { force: true });

    await expect.element(checkbox).not.toBeChecked();
    await expect.element(checkbox).toBeDisabled();
  });
});
