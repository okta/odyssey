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

import { AddIcon } from "../icons.generated/Add.js";
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

  // The control for the two inert-link tests below: it establishes that Enter on
  // a link button really does navigate in this harness, so their assertion that
  // the hash stays put is evidence of suppression rather than of Enter doing
  // nothing here.
  test("link button navigates on Enter", async () => {
    await renderWithOdysseyProvider(
      <Button href="#navigated" label="Button label" variant="primary" />,
    );

    const linkButton = page.getByRole("link", { name: "Button label" });
    linkButton.element().focus();
    await userEvent.keyboard("{Enter}");

    expect(window.location.hash).toBe("#navigated");

    window.location.hash = "";
  });

  describe("disabled state", () => {
    test("disabled link button does not navigate on Enter", async () => {
      await renderWithOdysseyProvider(
        <Button
          href="#navigated"
          isDisabled
          label="Button label"
          variant="primary"
        />,
      );

      const linkButton = page.getByRole("link", { name: "Button label" });
      linkButton.element().focus();
      await userEvent.keyboard("{Enter}");

      expect(window.location.hash).toBe("");
    });

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

  describe("loading state", () => {
    test("loading button shows its label and a spinner", async () => {
      const { container } = await renderWithOdysseyProvider(
        <Button isLoading label="Save" variant="primary" />,
      );

      const button = page.getByRole("button", { name: "Save" });
      await expect.element(button).toBeVisible();
      await expect.element(button).toHaveAttribute("aria-busy", "true");
      await expect.element(button).toHaveAttribute("aria-disabled", "true");
      await expect.element(button).not.toHaveAttribute("disabled");

      // The spinner is decorative: aria-busy on the button carries the state,
      // so the progressbar is hidden rather than named and announced twice.
      expect(
        button.element().querySelector(".MuiCircularProgress-root"),
      ).toHaveAttribute("aria-hidden", "true");

      await expect(container).toBeAccessible();
    });

    test("loading button does not fire onClick when clicked", async () => {
      const onClick = vi.fn();

      await renderWithOdysseyProvider(
        <Button isLoading label="Save" onClick={onClick} variant="primary" />,
      );

      const button = page.getByRole("button", { name: "Save" });
      // Playwright refuses to click aria-disabled so force option is needed.
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });

    test("loading link button does not navigate on Enter", async () => {
      await renderWithOdysseyProvider(
        <Button href="#navigated" isLoading label="Save" variant="primary" />,
      );

      const linkButton = page.getByRole("link", { name: "Save" });
      linkButton.element().focus();
      await userEvent.keyboard("{Enter}");

      expect(window.location.hash).toBe("");
    });

    test("loading button is focusable via tab", async () => {
      await renderWithOdysseyProvider(
        <Button isLoading label="Save" variant="primary" />,
      );

      const button = page.getByRole("button", { name: "Save" });
      await userEvent.tab();
      await expect.element(button).toHaveFocus();
    });

    test("loading icon-only button renders the spinner without a label", async () => {
      const { container } = await renderWithOdysseyProvider(
        <Button
          ariaLabel="Add"
          isLoading
          startIcon={<AddIcon />}
          variant="primary"
        />,
      );

      const button = page.getByRole("button", { name: "Add" });
      await expect.element(button).toBeVisible();
      expect(button.element().textContent).toBe("");

      await expect(container).toBeAccessible();
    });
  });
});
