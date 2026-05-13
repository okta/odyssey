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

import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { MenuButton } from "./MenuButton.js";
import { MenuItem } from "./MenuItem.js";

describe(MenuButton.displayName!, () => {
  test("menu opened with item selected", async () => {
    const onClick = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <MenuButton buttonLabel="Actions" buttonVariant="secondary">
        <MenuItem onClick={onClick}>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem variant="destructive">Delete</MenuItem>
      </MenuButton>,
    );
    await expect(container).toBeAccessible();

    const button = page.getByRole("button", { name: "Actions" });
    await userEvent.tab();
    await userEvent.click(button);
    const menu = page.getByRole("menu");
    await expect.element(menu).toBeVisible();

    await expect.element(menu).toBeAccessible();

    const editItem = page.getByText("Edit");
    await userEvent.click(editItem);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("disabled menu button is focusable and does not open menu when clicked", async () => {
    const { container } = await renderWithOdysseyProvider(
      <MenuButton buttonLabel="Actions" buttonVariant="secondary" isDisabled>
        <MenuItem>Edit</MenuItem>
      </MenuButton>,
    );

    await expect(container).toBeAccessible();

    const button = page.getByRole("button", { name: "Actions" });
    await userEvent.tab();
    await expect.element(button).toHaveFocus();
    // Playwright refuses to click aria-disabled so force option is needed.
    await userEvent.click(button, { force: true });

    await expect.element(page.getByRole("menu")).not.toBeInTheDocument();
  });
});
