import { OdysseyProvider } from "@okta/odyssey-react-mui";
import { renderReactInWebComponent } from "@okta/odyssey-react-mui/web-component";
import { FC } from "react";

import {
  DEBUG_ROOT_ID,
  ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG,
} from "./constants.js";
import { type DebugMenuProps } from "./DebugMenu.js";
import { readState, subscribeToChanges, writeState } from "./stateStorage.js";

declare global {
  interface Window {
    [ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG]?: boolean;
  }
}

export type DebugListenerConfig = {
  /**
   * A function that dynamically imports a custom debug menu component.
   * Defaults to {@link import('./DebugMenu.js').DebugMenu. DebugMenu}.
   *
   * The imported module must export a `DebugMenu` component that satisfies
   * the {@link import('./DebugMenu.js').DebugMenuProps. DebugMenuProps}.
   */
  debugMenuImport?: () => Promise<{
    DebugMenu: FC<DebugMenuProps>;
  }>;
  /**
   * If `true`, the menu opens immediately upon initialization without waiting for the hotkey.
   */
  isMenuInitiallyOpen?: boolean;
};

/**
 * Sets up a global keyboard listener for opening the Odyssey debug menu.

 * The menu is opened with the `Ctrl + Shift + L` (Windows) or `Cmd + Shift + L` (Mac) keyboard shortcut.
 */
export const setupOdysseyDebugListener = ({
  isMenuInitiallyOpen = false,
  debugMenuImport = () => import("./DebugMenu.js"),
}: DebugListenerConfig = {}) => {
  if (typeof window === "undefined") return;
  if (window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG]) return;
  window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG] = true;

  let debugContainerElement: HTMLElement | null = null;

  console.debug("Debug Listener Active: Ctrl/Cmd + Shift + L");

  // Pure DOM operations — no storage side effects
  const unmountMenu = () => {
    if (debugContainerElement) {
      debugContainerElement.remove();
      debugContainerElement = null;
    }
  };

  const mountMenu = () => {
    if (debugContainerElement) {
      console.debug("Debug menu already open");
      return;
    }

    debugMenuImport()
      .then(({ DebugMenu }) => {
        debugContainerElement = document.createElement("div");
        debugContainerElement.id = DEBUG_ROOT_ID;
        document.body.appendChild(debugContainerElement);

        renderReactInWebComponent({
          getReactComponent: ({ appRootElement, stylesRootElement }) => (
            <OdysseyProvider
              emotionRootElement={stylesRootElement}
              fullScreenOverlayId="odyssey-debug-menu-overlay"
              hasScopedCssBaseline={false}
              shadowRootElement={appRootElement}
            >
              <DebugMenu onClose={closeMenu} />
            </OdysseyProvider>
          ),
          webComponentParentElement: debugContainerElement,
        });
      })
      .catch((error) => {
        console.error("Failed to mount debug menu:", error);
      });
  };

  // User-facing actions that also persist state
  const openMenu = () => {
    writeState({ isMenuOpen: true });
    mountMenu();
  };

  const closeMenu = () => {
    writeState({ isMenuOpen: false });
    unmountMenu();
  };

  // Sync menu open/close across tabs
  const unsubscribe = subscribeToChanges((state) => {
    if (state.isMenuOpen && !debugContainerElement) {
      mountMenu();
    } else if (!state.isMenuOpen && debugContainerElement) {
      unmountMenu();
    }
  });

  const eventListener = (event: KeyboardEvent) => {
    const isMetaOrCtrl = event.ctrlKey || event.metaKey;
    if (
      isMetaOrCtrl &&
      event.shiftKey &&
      (event.key === "L" || event.key === "l")
    ) {
      event.preventDefault();
      openMenu();
    }
  };

  window.addEventListener("keydown", eventListener);

  if (isMenuInitiallyOpen || readState()?.isMenuOpen) {
    openMenu();
  }

  return () => {
    window.removeEventListener("keydown", eventListener);
    unsubscribe();
    window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG] = false;

    // Cleanup removes the DOM but does NOT write to storage,
    // so the menu stays open in other tabs.
    unmountMenu();
  };
};
