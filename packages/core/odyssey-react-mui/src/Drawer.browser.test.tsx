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

import { Drawer } from "./Drawer.js";
import { translate as odysseyTranslate } from "./i18n.generated/i18n.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(Drawer.displayName!, () => {
  test("drawer opened with heading visible", async () => {
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Drawer hasDividers={false} isOpen onClose={onClose} title="Drawer title">
        Drawer content.
      </Drawer>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Drawer title" }))
      .toBeVisible();

    await userEvent.tab();
    await expect(document.body).toBeAccessible();
  });

  test("close button exposes the localized accessible name", async () => {
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Drawer hasDividers={false} isOpen onClose={onClose} title="Drawer title">
        Drawer content.
      </Drawer>,
    );

    const closeButton = page.getByRole("button", {
      name: odysseyTranslate("close.text"),
    });
    await expect.element(closeButton).toBeVisible();

    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(expect.anything(), "closeButtonClick");
  });
});
