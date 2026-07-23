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

import { translate as odysseyTranslate } from "./i18n.generated/i18n.js";
import { PasswordField } from "./PasswordField.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(PasswordField.displayName!, () => {
  test("password visibility toggled on and off", async () => {
    const { container } = await renderWithOdysseyProvider(
      <PasswordField
        autoCompleteType="current-password"
        hasShowPassword
        label="Password"
        value="password"
      />,
    );
    await expect(container).toBeAccessible();

    const fieldElement = page.getByRole("textbox", { name: "Password" });
    await expect.element(fieldElement).toHaveAttribute("type", "password");

    // The toggle keeps a stable accessible name; its pressed state is what
    // conveys show/hide, following the ARIA toggle-button pattern.
    const toggleButton = page.getByRole("button", {
      name: odysseyTranslate("passwordfield.icon.label.show"),
    });
    await expect.element(toggleButton).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(toggleButton);
    await userEvent.tab();
    await expect(container).toBeAccessible();

    await expect.element(fieldElement).toHaveAttribute("type", "text");
    await expect.element(toggleButton).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(toggleButton);

    await expect.element(fieldElement).toHaveAttribute("type", "password");
    await expect.element(toggleButton).toHaveAttribute("aria-pressed", "false");
  });

  test("toggle accessible name stays stable across show and hide", async () => {
    await renderWithOdysseyProvider(
      <PasswordField label="Password" value="password" />,
    );

    const toggleButton = page.getByRole("button", {
      name: odysseyTranslate("passwordfield.icon.label.show"),
    });
    await expect.element(toggleButton).toBeVisible();

    await userEvent.click(toggleButton);

    // Name must not change on toggle — only aria-pressed reflects the state.
    await expect.element(toggleButton).toBeVisible();
    await expect.element(toggleButton).toHaveAttribute("aria-pressed", "true");
  });

  test("custom aria label distinguishes two password fields", async () => {
    const { container } = await renderWithOdysseyProvider(
      <>
        <PasswordField
          label="Password"
          showPasswordToggleAriaLabel="Show entered password"
        />
        <PasswordField
          label="Re-enter password"
          showPasswordToggleAriaLabel="Show re-entered password"
        />
      </>,
    );
    await expect(container).toBeAccessible();

    const firstToggle = page.getByRole("button", {
      name: "Show entered password",
    });
    const secondToggle = page.getByRole("button", {
      name: "Show re-entered password",
    });
    await expect.element(firstToggle).toBeVisible();
    await expect.element(secondToggle).toBeVisible();

    await userEvent.click(firstToggle);

    // The revealed toggle keeps its distinct name; only aria-pressed changes.
    await expect.element(firstToggle).toHaveAttribute("aria-pressed", "true");
    await expect.element(secondToggle).toHaveAttribute("aria-pressed", "false");
    await expect(container).toBeAccessible();
  });
});
