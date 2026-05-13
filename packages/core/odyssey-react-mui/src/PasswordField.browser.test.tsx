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

    const toggleButton = page.getByRole("button", {
      name: odysseyTranslate("passwordfield.icon.label.show"),
    });

    await userEvent.click(toggleButton);
    await userEvent.tab();
    await expect(container).toBeAccessible();

    await expect.element(fieldElement).toHaveAttribute("type", "text");
    await expect.element(toggleButton).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(toggleButton);

    await expect.element(fieldElement).toHaveAttribute("type", "password");
    await expect.element(toggleButton).toHaveAttribute("aria-pressed", "false");
  });
});
