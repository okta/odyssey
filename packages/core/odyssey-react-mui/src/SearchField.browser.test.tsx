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

import { SearchField } from "./SearchField.js";

describe(SearchField.displayName!, () => {
  test("clearing a default value", async () => {
    const onClear = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <SearchField defaultValue="abc" label="Search" onClear={onClear} />,
    );

    await expect(container).toBeAccessible();

    await userEvent.click(page.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  test("controlled empty value has no clear button", async () => {
    await renderWithOdysseyProvider(
      <SearchField isDisabled label="Search" value="" />,
    );

    await expect.element(page.getByRole("button")).not.toBeInTheDocument();
  });

  test("controlled value", async () => {
    await renderWithOdysseyProvider(<SearchField label="Search" value="abc" />);

    await expect
      .element(page.getByRole("button", { name: "Clear" }))
      .toBeVisible();
  });
});
