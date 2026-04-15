import { act, waitFor } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { afterEach, describe, expect, test, vi } from "vitest";

import {
  DEBUG_ROOT_ID,
  ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG,
} from "./constants.js";
import {
  type DebugListenerConfig,
  setupOdysseyDebugListener,
} from "./debugListener.js";
import {
  readState,
  UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
  writeState,
} from "./stateStorage.js";

const DebugMenu = ({ onClose }: { onClose: () => void }) => (
  <div data-testid="mock-debug-menu">
    <button data-testid="close-btn" onClick={onClose}>
      Close
    </button>
  </div>
);

const getDebugRoot = () => document.getElementById(DEBUG_ROOT_ID);

const getRenderedShadowRoot = () => {
  const root = getDebugRoot();
  if (!root) return null;
  const webComponent = root.querySelector("[data-odyssey-react-web-component]");
  return webComponent?.shadowRoot ?? null;
};

const dispatchCrossTabStorageEvent = () => {
  window.dispatchEvent(
    new StorageEvent("storage", { key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY }),
  );
};

describe(setupOdysseyDebugListener.name, () => {
  const user = userEvent.setup();

  const executeCleanup = async (cleanup?: () => void) => {
    await act(async () => {
      cleanup?.();
      return Promise.resolve();
    });
  };

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
    localStorage.clear();

    // Reset the global flag so we can re-initialize the listener
    delete window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG];
  });

  const initListener = (config: DebugListenerConfig = {}) => {
    let cleanup: (() => void) | undefined;

    act(() => {
      cleanup = setupOdysseyDebugListener({
        ...config,
        debugMenuImport: () => Promise.resolve({ DebugMenu }),
      });
    });

    return cleanup;
  };

  const triggerShortcut = async () =>
    act(async () => user.keyboard("{Control>}{Shift>}L{/Shift}{/Control}"));

  const triggerWrongShortcut = async () =>
    act(async () => user.keyboard("{Control>}{Shift>}P{/Shift}{/Control}"));

  const waitForMenuMount = async () => {
    await waitFor(() => {
      const shadowRoot = getRenderedShadowRoot();
      expect(shadowRoot).not.toBeNull();
      expect(shadowRoot).toHaveTextContent("Close");
    });
  };

  test("attaches the listener and sets the global flag", async () => {
    const cleanup = initListener();

    expect(window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG]).toBe(true);

    await executeCleanup(cleanup);
  });

  test("mounts the DebugMenu when the code is pressed", async () => {
    const cleanup = initListener();

    expect(window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG]).toBe(true);

    await triggerShortcut();

    await waitForMenuMount();

    await executeCleanup(cleanup);
  });

  test("does not mount the DebugMenu when the wrong code is pressed", async () => {
    const cleanup = initListener();

    await triggerWrongShortcut();

    await waitFor(
      () => {
        expect(getDebugRoot()).toBeNull();
      },
      { timeout: 100 },
    );

    await executeCleanup(cleanup);
  });

  test("mounts DebugMenu immediately when isMenuInitiallyOpen is true", async () => {
    const cleanup = initListener({ isMenuInitiallyOpen: true });

    expect(window[ODYSSEY_UI_COMPONENT_IDENTIFIER_ATTACHED_FLAG]).toBe(true);

    await waitForMenuMount();

    await executeCleanup(cleanup);
  });

  test("prevents multiple instances", async () => {
    const cleanup = initListener();

    await triggerShortcut();

    await waitForMenuMount();

    // Try to open again
    await triggerShortcut();

    // Check we still only have one container
    await waitFor(() => {
      expect(document.querySelectorAll(`#${DEBUG_ROOT_ID}`)).toHaveLength(1);
    });

    await executeCleanup(cleanup);
  });

  describe("storage persistence", () => {
    test("writes isMenuOpen true when menu is opened via hotkey", async () => {
      const cleanup = initListener();

      await triggerShortcut();
      await waitForMenuMount();

      await waitFor(() => expect(readState()?.isMenuOpen).toBe(true));

      await executeCleanup(cleanup);
    });

    test("writes isMenuOpen false when menu is closed", async () => {
      const cleanup = initListener({ isMenuInitiallyOpen: true });

      await waitForMenuMount();

      const shadowRoot = getRenderedShadowRoot()!;
      const closeBtn = shadowRoot.querySelector<HTMLButtonElement>(
        "[data-testid=close-btn]",
      )!;

      await act(async () => user.click(closeBtn));

      await waitFor(() => {
        expect(readState()?.isMenuOpen).toBe(false);
      });

      await executeCleanup(cleanup);
    });

    test("opens menu on init when storage has isMenuOpen true", async () => {
      writeState({ isMenuOpen: true });

      const cleanup = initListener();

      await waitForMenuMount();

      await executeCleanup(cleanup);
    });

    test("mounts menu when another tab sets isMenuOpen true", async () => {
      const cleanup = initListener();

      expect(getDebugRoot()).toBeNull();

      writeState({ isMenuOpen: true });

      act(() => {
        dispatchCrossTabStorageEvent();
      });

      await waitForMenuMount();

      await executeCleanup(cleanup);
    });

    test("unmounts menu when another tab sets isMenuOpen false", async () => {
      const cleanup = initListener({ isMenuInitiallyOpen: true });
      await waitForMenuMount();

      writeState({ isMenuOpen: false });

      act(() => {
        dispatchCrossTabStorageEvent();
      });

      await waitFor(() => {
        expect(getDebugRoot()).toBeNull();
      });

      await executeCleanup(cleanup);
    });

    test("stops reacting to cross-tab changes after cleanup", async () => {
      const cleanup = initListener({ isMenuInitiallyOpen: true });
      await waitForMenuMount();

      // Cleanup tears down the listener
      await executeCleanup(cleanup);

      await waitFor(() => {
        expect(getDebugRoot()).toBeNull();
      });

      // Another tab writes isMenuOpen true — should have no effect
      writeState({ isMenuOpen: true });

      act(() => {
        dispatchCrossTabStorageEvent();
      });

      await waitFor(
        () => {
          expect(getDebugRoot()).toBeNull();
        },
        { timeout: 100 },
      );

      await executeCleanup(cleanup);
    });

    test("cleanup does not write isMenuOpen false to storage", async () => {
      const cleanup = initListener({ isMenuInitiallyOpen: true });
      await waitForMenuMount();

      // Menu is open, so storage has isMenuOpen: true
      expect(readState()?.isMenuOpen).toBe(true);

      await executeCleanup(cleanup);

      // Storage should still have isMenuOpen: true (cleanup doesn't write)
      await waitFor(() => expect(readState()?.isMenuOpen).toBe(true));
    });
  });
});
