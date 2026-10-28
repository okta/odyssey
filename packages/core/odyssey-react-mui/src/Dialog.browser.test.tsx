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

import { backdropClasses } from "@mui/material/Backdrop";
import { dialogClasses } from "@mui/material/Dialog";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { Button } from "./Buttons/Button.js";
import { Dialog } from "./Dialog.js";
import { Drawer } from "./Drawer.js";
import { translate as odysseyTranslate } from "./i18n.generated/i18n.js";
import { OdysseyProvider } from "./OdysseyProvider.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";
import { ROOMY_HEIGHT, ROOMY_WIDTH } from "./test-utils/viewportTestSizes.js";
import {
  COMPACT_MAX_HEIGHT,
  COMPACT_MAX_WIDTH,
} from "./theme/useMediaQuery.js";

const TRANSPARENT_COLOR = "rgba(0, 0, 0, 0)";

// No backdrop has a role or a name, and the double darkening is only visible in its paint, so this reads the painted color of each one.
const getBackdropColors = () =>
  Array.from(document.querySelectorAll(`.${backdropClasses.root}`)).map(
    (backdropElement) => getComputedStyle(backdropElement).backgroundColor,
  );

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

  test("dialog has role='dialog' with accessible name from the title prop", async () => {
    const onClose = vi.fn();
    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Reset password">
        Are you sure?
      </Dialog>,
    );
    // Resolves through aria-labelledby → referenced element's text.
    await expect
      .element(page.getByRole("dialog", { name: "Reset password" }))
      .toBeVisible();
  });

  test("dialog's aria-labelledby points to an element containing the title text", async () => {
    const onClose = vi.fn();
    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Confirm action">
        Body.
      </Dialog>,
    );
    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    const labelledBy = dialog.element().getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    const labelEl = document.getElementById(labelledBy!);
    expect(labelEl?.textContent).toBe("Confirm action");
  });

  test("close button has no heading ancestor", async () => {
    // Bug regression: the close button must not be a descendant of any heading element, otherwise screen readers announce it as "heading level N, Close, button".
    const onClose = vi.fn();
    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Dialog title">
        Dialog content.
      </Dialog>,
    );
    const closeButton = page.getByRole("button", {
      name: odysseyTranslate("close.text"),
    });
    await expect.element(closeButton).toBeVisible();
    const hasHeadingAncestor = Boolean(
      closeButton.element().closest("h1, h2, h3, h4, h5, h6"),
    );
    expect(hasHeadingAncestor).toBe(false);
  });

  test("dialog's aria-labelledby id remains stable across re-renders with the same title", async () => {
    // Locks in id stability so future refactors don't accidentally regenerate ids on each render, that would force ATs to re-announce the dialog as the labelledby target changes.
    const onClose = vi.fn();
    const { rerender } = await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Reset">
        Body.
      </Dialog>,
    );
    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    const labelledByBefore = dialog.element().getAttribute("aria-labelledby");
    rerender(
      <Dialog isOpen onClose={onClose} title="Reset">
        Body changed.
      </Dialog>,
    );
    const labelledByAfter = dialog.element().getAttribute("aria-labelledby");
    expect(labelledByAfter).toBe(labelledByBefore);
  });

  test("viewport narrowed to the compact width threshold", async () => {
    await page.viewport(COMPACT_MAX_WIDTH, ROOMY_HEIGHT);
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Dialog title">
        Dialog content.
      </Dialog>,
    );

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    const paper = dialog.element();
    expect(paper.classList.contains(dialogClasses.paperFullScreen)).toBe(true);

    const container = paper.closest(`.${dialogClasses.container}`);
    expect(container?.classList.contains(dialogClasses.scrollBody)).toBe(true);

    await expect.element(dialog).toBeAccessible();
  });

  test("viewport shortened to the compact height threshold", async () => {
    await page.viewport(ROOMY_WIDTH, COMPACT_MAX_HEIGHT);
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Dialog title">
        Dialog content.
      </Dialog>,
    );

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    const paper = dialog.element();
    expect(paper.classList.contains(dialogClasses.paperFullScreen)).toBe(true);

    const container = paper.closest(`.${dialogClasses.container}`);
    expect(container?.classList.contains(dialogClasses.scrollBody)).toBe(true);

    await expect.element(dialog).toBeAccessible();
  });

  test("viewport larger than the compact threshold in both dimensions", async () => {
    await page.viewport(ROOMY_WIDTH, ROOMY_HEIGHT);
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Dialog isOpen onClose={onClose} title="Dialog title">
        Dialog content.
      </Dialog>,
    );

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    const paper = dialog.element();
    expect(paper.classList.contains(dialogClasses.paperFullScreen)).toBe(false);

    const container = paper.closest(`.${dialogClasses.container}`);
    expect(container?.classList.contains(dialogClasses.scrollPaper)).toBe(true);

    await expect.element(dialog).toBeAccessible();
  });

  test("dialog opened over a drawer", async () => {
    const onClose = vi.fn();

    const { rerender } = await renderWithOdysseyProvider(
      <>
        <Drawer
          hasDividers={false}
          isOpen
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
        <Dialog isOpen={false} onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
      </>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Drawer title" }))
      .toBeVisible();
    const drawerBackdropColor = getBackdropColors()[0];
    expect(drawerBackdropColor).not.toBe(TRANSPARENT_COLOR);

    await rerender(
      <>
        <Drawer
          hasDividers={false}
          isOpen
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
        <Dialog isOpen onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
      </>,
    );

    await expect.element(page.getByRole("dialog")).toBeVisible();
    await expect
      .poll(getBackdropColors)
      .toStrictEqual([TRANSPARENT_COLOR, drawerBackdropColor]);
    await expect.element(page.getByRole("dialog")).toBeAccessible();

    await rerender(
      <>
        <Drawer
          hasDividers={false}
          isOpen
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
        <Dialog isOpen={false} onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
      </>,
    );

    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.poll(getBackdropColors).toStrictEqual([drawerBackdropColor]);
  });

  test("drawer opened while a dialog is open", async () => {
    const onClose = vi.fn();

    const { rerender } = await renderWithOdysseyProvider(
      <>
        <Dialog isOpen onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
        <Drawer
          hasDividers={false}
          isOpen={false}
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
      </>,
    );

    await expect.element(page.getByRole("dialog")).toBeVisible();
    const dialogBackdropColor = getBackdropColors()[0];
    expect(dialogBackdropColor).not.toBe(TRANSPARENT_COLOR);

    await rerender(
      <>
        <Dialog isOpen onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
        <Drawer
          hasDividers={false}
          isOpen
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
      </>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Drawer title" }))
      .toBeInTheDocument();
    await expect
      .poll(getBackdropColors)
      .toStrictEqual([dialogBackdropColor, TRANSPARENT_COLOR]);
  });

  test("dialog opened while a drawer fades out", async () => {
    const onClose = vi.fn();

    // Transitions stay on here, because the drawer's backdrop is only stale while its fade-out runs.
    const { rerender } = await render(
      <OdysseyProvider>
        <Drawer
          hasDividers={false}
          isOpen
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
        <Dialog isOpen={false} onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
      </OdysseyProvider>,
    );

    await expect
      .element(page.getByRole("heading", { name: "Drawer title" }))
      .toBeVisible();
    const drawerBackdropColor = getBackdropColors()[0];
    expect(drawerBackdropColor).not.toBe(TRANSPARENT_COLOR);

    await rerender(
      <OdysseyProvider>
        <Drawer
          hasDividers={false}
          isOpen={false}
          onClose={onClose}
          title="Drawer title"
        >
          Drawer content.
        </Drawer>
        <Dialog isOpen onClose={onClose} title="Dialog title">
          Dialog content.
        </Dialog>
      </OdysseyProvider>,
    );

    expect(getBackdropColors()).toStrictEqual([
      TRANSPARENT_COLOR,
      drawerBackdropColor,
    ]);
    await expect.element(page.getByRole("dialog")).toBeVisible();
  });
});
