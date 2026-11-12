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

import { Picker } from "./Picker.js";

describe(Picker.displayName!, () => {
  test("option chosen from the open list", async () => {
    const onChange = vi.fn();

    await renderWithOdysseyProvider(
      <Picker
        label="Pick one"
        onChange={onChange}
        options={[
          { label: "Plain", value: "plain" },
          { description: "About me", label: "Described", value: "described" },
        ]}
      />,
    );

    await userEvent.click(page.getByRole("combobox"));
    await userEvent.click(page.getByRole("option", { name: /Described/ }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("virtualized list with many options", async () => {
    await renderWithOdysseyProvider(
      <Picker
        isVirtualized
        label="Pick many"
        // The virtualized list sizes itself to 9999px once it has more than its 8 overscan rows, so only a list taller than that leaves rows unrendered.
        options={Array.from({ length: 500 }, (_, index) => ({
          label: `Option ${index}`,
          value: index,
        }))}
      />,
    );

    await userEvent.click(page.getByRole("combobox"));

    await expect
      .element(page.getByRole("option", { name: "Option 0" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("option", { name: "Option 499" }))
      .not.toBeInTheDocument();
  });

  test("virtualized grouped options render a heading per group", async () => {
    await renderWithOdysseyProvider(
      <Picker
        groupOptionsBy={(option) => option.group ?? ""}
        isVirtualized
        label="Pick grouped"
        options={[
          { group: "Fruit", label: "Apple", value: 1 },
          { group: "Fruit", label: "Pear", value: 2 },
          { group: "Veg", label: "Leek", value: 3 },
        ]}
      />,
    );

    await userEvent.click(page.getByRole("combobox"));

    await expect.element(page.getByText("Fruit")).toBeVisible();
    await expect.element(page.getByText("Veg")).toBeVisible();
    await expect
      .element(page.getByRole("option", { name: "Leek" }))
      .toBeVisible();
  });
});
