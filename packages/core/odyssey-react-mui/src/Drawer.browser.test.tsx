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

import { drawerClasses } from "@mui/material/Drawer";
import { page, userEvent } from "vitest/browser";

import { Drawer } from "./Drawer.js";
import { translate as odysseyTranslate } from "./i18n.generated/i18n.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";
import { ROOMY_HEIGHT, ROOMY_WIDTH } from "./test-utils/viewportTestSizes.js";
import {
  ABSOLUTE_MINIMUM_WIDTH,
  COMPACT_MAX_WIDTH,
} from "./theme/useMediaQuery.js";

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

  // One pixel inside the band, not at the threshold. The temporary panel is
  // 28.571rem, which is 400px at the 14px root, and COMPACT_MAX_WIDTH is also
  // 400. At exactly 400 the panel fills the viewport with or without the
  // compact rule, so no assertion there can detect the rule.
  test("viewport just inside the compact width threshold", async () => {
    await page.viewport(COMPACT_MAX_WIDTH - 1, ROOMY_HEIGHT);
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Drawer hasDividers={false} isOpen onClose={onClose} title="Drawer title">
        Drawer content.
      </Drawer>,
    );

    const heading = page.getByRole("heading", { name: "Drawer title" });
    await expect.element(heading).toBeVisible();

    const paper = heading.element().closest(`.${drawerClasses.paper}`);
    expect(paper).not.toBeNull();
    if (paper === null) {
      return;
    }

    // Rounded because sub-pixel layout can leave the measured width a
    // fraction off from the integer viewport width.
    expect(Math.round(paper.getBoundingClientRect().width)).toBe(
      window.innerWidth,
    );

    await expect(paper).toBeAccessible();
  });

  test("viewport narrowed to the absolute minimum width", async () => {
    await page.viewport(ABSOLUTE_MINIMUM_WIDTH, ROOMY_HEIGHT);
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Drawer hasDividers={false} isOpen onClose={onClose} title="Drawer title">
        Drawer content.
      </Drawer>,
    );

    const heading = page.getByRole("heading", { name: "Drawer title" });
    await expect.element(heading).toBeVisible();

    const paper = heading.element().closest(`.${drawerClasses.paper}`);
    expect(paper).not.toBeNull();
    if (paper === null) {
      return;
    }

    // Rounded because sub-pixel layout can leave the measured width a
    // fraction off from the integer viewport width.
    expect(Math.round(paper.getBoundingClientRect().width)).toBe(
      window.innerWidth,
    );

    // Without the compact rule the panel is 400px wide, so the page scrolls
    // horizontally at 320px.
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(
      window.innerWidth,
    );

    await expect(paper).toBeAccessible();
  });

  test("viewport larger than the compact threshold in both dimensions", async () => {
    await page.viewport(ROOMY_WIDTH, ROOMY_HEIGHT);
    const onClose = vi.fn();

    await renderWithOdysseyProvider(
      <Drawer hasDividers={false} isOpen onClose={onClose} title="Drawer title">
        Drawer content.
      </Drawer>,
    );

    const heading = page.getByRole("heading", { name: "Drawer title" });
    await expect.element(heading).toBeVisible();

    const paper = heading.element().closest(`.${drawerClasses.paper}`);
    expect(paper).not.toBeNull();
    if (paper === null) {
      return;
    }

    expect(paper.getBoundingClientRect().width).toBeLessThan(window.innerWidth);

    await expect(paper).toBeAccessible();
  });
});
