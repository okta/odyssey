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

import { noTransitionsTheme } from "@okta/odyssey-test-tooling/browser";
import { memo, useState } from "react";
import { page, userEvent } from "vitest/browser";

import { Button } from "./Buttons/Button.js";
import { Dialog } from "./Dialog.js";
import { Drawer } from "./Drawer.js";
import { FullscreenButton } from "./fullscreen/FullscreenButton.js";
import { FullscreenRegion } from "./fullscreen/FullscreenRegion.js";
import {
  FullScreenOverlayProvider,
  OVERLAY_DATA_ATTRIBUTES,
} from "./FullScreenOverlayContext.js";
import { translate as odysseyTranslate } from "./i18n.generated/i18n.js";
import {
  createFullscreenModeHost,
  type FullscreenModeHost,
} from "./message-bus/index.js";
import { OdysseyProvider } from "./OdysseyProvider.js";
import { appendToSandbox } from "./test-utils/appendToSandbox.js";
import { Toast } from "./Toast.js";
import { ToastStack } from "./ToastStack.js";
import { renderReactInWebComponent } from "./web-component/renderReactInWebComponent.js";

const overlayContainerSelector = Object.values(OVERLAY_DATA_ATTRIBUTES)
  .map((attributeName) => `[${attributeName}]`)
  .join(",");

const getOverlayContainers = () =>
  Array.from(document.body.querySelectorAll(overlayContainerSelector));

const fullscreenButtonLabel = odysseyTranslate("fullscreen.button.label");

// Gives each test its own fullscreen stack, the way UI Shell runs the host in an app, so no test leaks fullscreen into the next.
const hostState: { host?: FullscreenModeHost } = {};

beforeEach(() => {
  hostState.host = createFullscreenModeHost();
});

afterEach(() => {
  hostState.host?.destroy();
});

const AppWithDialog = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationCount, setConfirmationCount] = useState(0);

  return (
    <>
      <Button
        label="Open dialog"
        onClick={() => setIsOpen(true)}
        variant="primary"
      />
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        primaryCallToActionComponent={
          <Button
            label={`Confirm ${confirmationCount}`}
            onClick={() =>
              setConfirmationCount(
                (previousConfirmationCount) => previousConfirmationCount + 1,
              )
            }
            variant="primary"
          />
        }
        title="Confirm change"
      >
        This change applies right away.
      </Dialog>
    </>
  );
});
AppWithDialog.displayName = "AppWithDialog";

describe(FullScreenOverlayProvider.displayName!, () => {
  test("overlay containers made inert by another script while in fullscreen", async () => {
    renderReactInWebComponent({
      getReactComponent: ({ appRootElement, stylesRootElement }) => (
        <OdysseyProvider
          emotionRootElement={stylesRootElement}
          shadowRootElement={appRootElement}
          themeOverride={noTransitionsTheme}
        >
          <FullscreenRegion fullscreenId="isolated">
            <AppWithDialog />
            <FullscreenButton fullscreenId="isolated" />
          </FullscreenRegion>
        </OdysseyProvider>
      ),
      webComponentParentElement: appendToSandbox(document.createElement("div")),
    });

    await userEvent.click(
      page.getByRole("button", { name: fullscreenButtonLabel }),
    );

    await expect
      .element(page.getByRole("button", { name: fullscreenButtonLabel }))
      .toHaveAttribute("aria-pressed", "true");

    // Stands in for code Odyssey doesn't control, such as another bundle's fullscreen region on an older Odyssey, isolating the page.
    getOverlayContainers().forEach((overlayContainer) => {
      overlayContainer.setAttribute("inert", "");
    });

    await vi.waitFor(() => {
      expect(
        getOverlayContainers().filter((overlayContainer) =>
          overlayContainer.hasAttribute("inert"),
        ),
      ).toStrictEqual([]);
    });

    await userEvent.click(page.getByRole("button", { name: "Open dialog" }));
    await userEvent.click(page.getByRole("button", { name: "Confirm 0" }));

    await expect
      .element(page.getByRole("button", { name: "Confirm 1" }))
      .toBeVisible();
    await expect.element(page.getByRole("dialog")).toBeAccessible();
  });

  test("open drawer isolated by a host page's modal while nothing is in fullscreen", async () => {
    renderReactInWebComponent({
      getReactComponent: ({ appRootElement, stylesRootElement }) => (
        <OdysseyProvider
          emotionRootElement={stylesRootElement}
          shadowRootElement={appRootElement}
          themeOverride={noTransitionsTheme}
        >
          <Drawer hasDividers={false} isOpen onClose={() => {}} title="Details">
            Drawer content
          </Drawer>
        </OdysseyProvider>
      ),
      webComponentParentElement: appendToSandbox(document.createElement("div")),
    });

    await expect.element(page.getByText("Drawer content")).toBeVisible();

    // Stands in for a host page's own modal, which isolates itself by making the rest of `<body>` inert.
    getOverlayContainers().forEach((overlayContainer) => {
      overlayContainer.setAttribute("inert", "");
    });

    // A `MutationObserver` callback runs before the next task, so waiting one task is enough for it to have removed `inert` if it were going to.
    await new Promise((resolve) => setTimeout(resolve));

    expect(
      getOverlayContainers().filter(
        (overlayContainer) => !overlayContainer.hasAttribute("inert"),
      ),
    ).toStrictEqual([]);
  });

  test("app with a closed dialog, an open drawer, and a toast stack", async () => {
    renderReactInWebComponent({
      getReactComponent: ({ appRootElement, stylesRootElement }) => (
        <OdysseyProvider
          emotionRootElement={stylesRootElement}
          fullScreenOverlayId="app-overlays"
          shadowRootElement={appRootElement}
          themeOverride={noTransitionsTheme}
        >
          <AppWithDialog />
          <Drawer hasDividers={false} isOpen onClose={() => {}} title="Details">
            Drawer content
          </Drawer>
          <ToastStack>
            <Toast isVisible role="status" severity="success" text="Saved." />
          </ToastStack>
        </OdysseyProvider>
      ),
      webComponentParentElement: appendToSandbox(document.createElement("div")),
    });

    await expect.element(page.getByText("Drawer content")).toBeVisible();
    await expect.element(page.getByRole("status")).toBeVisible();
    // Scans the shared container, not the app wrapper, because both overlays render into its shadow root.
    await expect(document.getElementById("app-overlays")).toBeAccessible();

    expect(
      getOverlayContainers().map((overlayContainer) => ({
        attributeNames: overlayContainer.getAttributeNames(),
        id: overlayContainer.getAttribute("id"),
      })),
    ).toStrictEqual([
      {
        attributeNames: ["id", OVERLAY_DATA_ATTRIBUTES.default],
        id: "app-overlays",
      },
    ]);

    expect(
      [
        page.getByText("Drawer content").element(),
        page.getByRole("status").element(),
      ].map((overlayElement) => {
        const overlayRootNode = overlayElement.getRootNode();

        return overlayRootNode instanceof ShadowRoot
          ? overlayRootNode.host.id
          : undefined;
      }),
    ).toStrictEqual(["app-overlays", "app-overlays"]);
  });

  test("dialog opened from inside a drawer", async () => {
    renderReactInWebComponent({
      getReactComponent: ({ appRootElement, stylesRootElement }) => (
        <OdysseyProvider
          emotionRootElement={stylesRootElement}
          fullScreenOverlayId="app-overlays"
          shadowRootElement={appRootElement}
          themeOverride={noTransitionsTheme}
        >
          <Drawer hasDividers={false} isOpen onClose={() => {}} title="Details">
            <AppWithDialog />
          </Drawer>
        </OdysseyProvider>
      ),
      webComponentParentElement: appendToSandbox(document.createElement("div")),
    });

    await userEvent.click(page.getByRole("button", { name: "Open dialog" }));

    const dialogElement = page.getByRole("dialog").element();
    const dialogRootNode = dialogElement.getRootNode();

    expect(
      dialogRootNode instanceof ShadowRoot ? dialogRootNode.host.id : undefined,
    ).toBe("app-overlays");
    await expect.element(page.getByRole("dialog")).toBeAccessible();

    await userEvent.click(page.getByRole("button", { name: "Confirm 0" }));

    await expect
      .element(page.getByRole("button", { name: "Confirm 1" }))
      .toBeVisible();
  });
});
