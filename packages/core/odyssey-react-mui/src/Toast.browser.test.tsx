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

import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";
import { Toast } from "./Toast.js";
import { ToastStack } from "./ToastStack.js";

describe(Toast.displayName!, () => {
  test("all severity toasts visible in stack", async () => {
    await renderWithOdysseyProvider(
      <ToastStack>
        <Toast
          isVisible
          role="status"
          severity="success"
          text="Success toast text."
        />
        <Toast
          isVisible
          role="status"
          severity="info"
          text="Info toast text."
        />
        <Toast
          isVisible
          role="status"
          severity="warning"
          text="Warning toast text."
        />
        <Toast
          isVisible
          role="alert"
          severity="error"
          text="Error toast text."
        />
      </ToastStack>,
    );

    const alertToast = page.getByRole("alert");
    await expect.element(alertToast).toBeVisible();
    await expect.element(page.getByRole("status").first()).toBeVisible();
    // Multiple toasts portal individually — no single wrapper role to scope to
    await expect(document.body).toBeAccessible();
  });

  test("dismissible toast with link dismissed", async () => {
    const onHide = vi.fn();

    await renderWithOdysseyProvider(
      <ToastStack>
        <Toast
          autoHideDuration={10000}
          isDismissable
          isVisible
          linkText="View report"
          linkUrl="#"
          onHide={onHide}
          role="status"
          severity="info"
          text="Info toast text."
        />
      </ToastStack>,
    );

    const statusToast = page.getByRole("status");
    await expect.element(statusToast).toBeVisible();
    await userEvent.tab();
    await expect.element(statusToast).toBeAccessible();

    const toastLink = page.getByText("View report");
    await expect.element(toastLink).toHaveAttribute("href", "#");

    const dismissButton = page.getByRole("button", { name: "Close" });
    await userEvent.click(dismissButton);

    await expect.element(page.getByRole("status")).not.toBeInTheDocument();
  });
});
