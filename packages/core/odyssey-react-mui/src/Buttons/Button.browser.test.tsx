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
import { Button } from "./Button.js";

const variants = ["primary", "secondary", "danger", "floating"] as const;

describe(Button.displayName!, () => {
  variants.forEach((variant) => {
    test(`${variant} variant focused and clicked`, async () => {
      const onClick = vi.fn();

      const { container } = await renderWithOdysseyProvider(
        <Button label="Button label" onClick={onClick} variant={variant} />,
      );

      await expect(container).toBeAccessible();

      const button = page.getByRole("button", { name: "Button label" });
      await userEvent.hover(button);
      await userEvent.tab();
      await expect(container).toBeAccessible();
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  test("floatingAction variant focused and clicked", async () => {
    const onClick = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <Button
        label="Button label"
        onClick={onClick}
        variant="floatingAction"
      />,
    );

    await expect(container).toBeAccessible();

    const button = page.getByRole("button", { name: "Button label" });
    await userEvent.hover(button);
    await userEvent.tab();
    // TODO floatingAction :hover is HueBlue600 text (#4c64e1) on HueNeutral200 bg (#e1e1e1) — 3.76:1, fails WCAG AA 4.5:1.
    await expect(container).toBeAccessible({
      disabledRules: ["color-contrast"],
    });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("disabled state", () => {
    test("disabled button is focusable via tab", async () => {
      const { container } = await renderWithOdysseyProvider(
        <Button isDisabled label="Button label" variant="primary" />,
      );

      const button = page.getByRole("button", { name: "Button label" });
      await expect.element(button).toHaveAttribute("aria-disabled", "true");
      await expect.element(button).not.toHaveAttribute("disabled");

      await expect(container).toBeAccessible();

      await userEvent.tab();
      await expect.element(button).toHaveFocus();
    });

    test("disabled button does not fire onClick when clicked", async () => {
      const onClick = vi.fn();

      await renderWithOdysseyProvider(
        <Button
          isDisabled
          label="Button label"
          onClick={onClick}
          variant="primary"
        />,
      );

      const button = page.getByRole("button", { name: "Button label" });
      // Playwright refuses to click aria-disabled so force option is needed.
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
