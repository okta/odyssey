/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import { renderWithOdysseyProvider } from "../../test-utils/renderWithOdysseyProvider.js";
import {
  type BaseRenderOptionProps,
  ComposablePicker,
} from "./ComposablePicker.js";

type Option = { label: string; value: string };
const options: Option[] = [
  { label: "Alpha", value: "alpha" },
  { label: "Beta", value: "beta" },
];

describe("ComposablePicker", () => {
  test("displays the ComposablePicker", async () => {
    const { container } = await renderWithOdysseyProvider(
      <ComposablePicker
        label="picker label"
        options={[]}
        renderOption={() => <></>}
      />,
    );

    await expect(container).toBeAccessible();

    await expect.element(page.getByLabelText("picker label")).toBeVisible();
  });

  test("filterOptions overrides the default label-based filtering", async () => {
    await renderWithOdysseyProvider(
      <ComposablePicker
        filterOptions={(unfilteredOptions) => unfilteredOptions}
        label="picker label"
        options={options}
        renderOption={(
          { key, ...muiProps }: BaseRenderOptionProps,
          option: Option,
        ) => (
          <li {...muiProps} key={key}>
            {option.label}
          </li>
        )}
      />,
    );

    const combobox = page.getByRole("combobox");
    await userEvent.click(combobox);
    await userEvent.fill(combobox, "does not match either label");

    await expect
      .element(page.getByRole("option", { name: "Alpha" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("option", { name: "Beta" }))
      .toBeVisible();
  });
});
