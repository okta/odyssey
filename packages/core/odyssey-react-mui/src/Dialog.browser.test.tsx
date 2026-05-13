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

import { Button } from "./Buttons/Button.js";
import { Dialog } from "./Dialog.js";
import { translate as odysseyTranslate } from "./i18n.generated/i18n.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(Dialog.displayName!, () => {
  test("open dialog with heading and content", async () => {
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Dialog
        isOpen
        onClose={onClose}
        primaryCallToActionComponent={
          <Button label="Confirm" variant="primary" />
        }
        title="Dialog title"
      >
        Dialog content.
      </Dialog>,
    );

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    await expect
      .element(page.getByRole("heading", { name: "Dialog title" }))
      .toBeVisible();

    await expect.element(dialog).toBeAccessible();
  });

  test("dialog closed via close button", async () => {
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Dialog title">
        Dialog content.
      </Dialog>,
    );

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    await expect(dialog).toBeAccessible();

    const closeButton = page.getByRole("button", {
      name: odysseyTranslate("close.text"),
    });
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(expect.anything(), "closeButtonClick");
  });
});
