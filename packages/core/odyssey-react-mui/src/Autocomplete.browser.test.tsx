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

import { page, userEvent } from "vitest/browser";

import { Autocomplete } from "./Autocomplete.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

type Option = { label: string };
const options: Option[] = [
  { label: "Option 1" },
  { label: "Option 2" },
  { label: "Option 3" },
];

describe(Autocomplete.displayName!, () => {
  test("does not crash when hasMultipleChoices changes from undefined to true", async () => {
    const { rerender } = await renderWithOdysseyProvider(
      <Autocomplete label="Test" options={options} />,
    );

    // without the key fix, MUI's internal null value causes a null.length crash here
    await rerender(
      <Autocomplete hasMultipleChoices label="Test" options={options} />,
    );

    await expect.element(page.getByRole("combobox")).toBeVisible();
  });

  test("single select with filtered option selection", async () => {
    await renderWithOdysseyProvider(
      <Autocomplete label="Destination" options={options} />,
    );

    const combobox = page.getByRole("combobox");

    await userEvent.tab();
    await userEvent.click(combobox);
    const listbox = page.getByRole("listbox");
    await expect.element(listbox).toBeVisible();
    await expect.element(listbox).toBeAccessible();

    await userEvent.fill(combobox, "Option 1");
    await userEvent.click(page.getByRole("option", { name: "Option 1" }));
    await expect.element(combobox).toHaveValue("Option 1");

    const clearButton = page.getByTitle("Clear");
    await userEvent.click(clearButton);
    await expect.element(combobox).toHaveValue("");
  });

  test("multi-select with multiple option selections", async () => {
    await renderWithOdysseyProvider(
      <Autocomplete hasMultipleChoices label="Destination" options={options} />,
    );

    const combobox = page.getByRole("combobox");

    await userEvent.tab();
    await userEvent.click(combobox);
    const listbox = page.getByRole("listbox");
    await expect.element(listbox).toBeVisible();
    await expect.element(listbox).toBeAccessible();

    await userEvent.fill(combobox, "Option 1");
    await userEvent.click(page.getByRole("option", { name: "Option 1" }));

    await userEvent.fill(combobox, "Option 2");
    await userEvent.click(page.getByRole("option", { name: "Option 2" }));

    const clearButton = page.getByTitle("Clear");
    await userEvent.click(clearButton);
    await expect.element(combobox).toHaveValue("");
  });
});
