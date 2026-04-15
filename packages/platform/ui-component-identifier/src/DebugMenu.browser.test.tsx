import { createTheme, ThemeProvider } from "@okta/odyssey-react-mui";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { type ReactNode } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { type ScanResult } from "./componentVisualizer.js";
import { UI_STRINGS } from "./constants.js";
import { DebugMenu } from "./DebugMenu.js";

const theme = createTheme();
const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Mock the visualizer — it manipulates DOM elements from scan results that
// don't exist in our test renders.
vi.mock("./componentVisualizer.js", () => ({
  visualizeComponents: vi.fn(),
  clearComponentVisualization: vi.fn(),
}));

const makeResult = (
  name: string,
  packageName: string,
  version: string | null = null,
): ScanResult => ({
  componentName: name,
  element: document.createElement("div"),
  odysseyVersion: version,
  packageName,
  scannerId: `${packageName}@${version ?? ""}`,
});

// Mock the component scanner to return controlled discovery results.
// getBackwardsCompatibleScanner must also be mocked since it walks the fiber tree.
const discoveryResults: ScanResult[] = [];
vi.mock("./componentScanner.js", () => ({
  getDiscoveryScanner: () => () => [...discoveryResults],
  getTargetedScanner: (pkg: string, ver: string | null) => () =>
    discoveryResults.filter(
      (r) => r.packageName === pkg && (r.odysseyVersion ?? null) === ver,
    ),
  getBackwardsCompatibleScanner: () => () => [],
}));

const setDiscoveryResults = (results: ScanResult[]) => {
  discoveryResults.length = 0;
  discoveryResults.push(...results);
};

// Waits longer than the mutation observer debounce (300ms) to assert that
// a mutation was correctly ignored. Uses real timers because fake timers
// conflict with the browser-native MutationObserver in vitest browser mode.
const waitForDebounce = () =>
  act(() => new Promise((resolve) => setTimeout(resolve, 400)));

describe(DebugMenu.name, () => {
  const user = userEvent.setup();

  // Surface triggers MUI spacing warnings.
  // Suppress only that specific message to keep test output clean.
  const originalConsoleError = console.error;
  vi.spyOn(console, "error").mockImplementation((...args: unknown[]) => {
    const message = String(args[0]);
    if (message.includes("theme.spacing")) return;
    originalConsoleError(...args);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    localStorage.clear();
    discoveryResults.length = 0;
  });

  test("renders header with title, refresh, and close buttons", () => {
    render(<DebugMenu onClose={() => {}} />, { wrapper });

    expect(screen.getByText(UI_STRINGS.menuTitle)).toBeDefined();
    expect(screen.getByLabelText(UI_STRINGS.refreshAriaLabel)).toBeDefined();
    expect(screen.getByLabelText(UI_STRINGS.closeAriaLabel)).toBeDefined();
  });

  test("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(<DebugMenu onClose={onClose} />, { wrapper });

    await act(async () =>
      user.click(screen.getByLabelText(UI_STRINGS.closeAriaLabel)),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("shows Odyssey group with only backwards compatible child when no components discovered", () => {
    render(<DebugMenu onClose={() => {}} />, { wrapper });

    // Odyssey group always shows because of the backwards compatible scanner child
    expect(screen.getByText(UI_STRINGS.odysseyGroup)).toBeDefined();
    // No Contributions group
    expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();
  });

  describe("dynamic group building", () => {
    test("creates Odyssey group for odyssey packages", () => {
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.getByText(UI_STRINGS.odysseyGroup)).toBeDefined();
    });

    test("creates Contributions group for non-odyssey packages", () => {
      setDiscoveryResults([makeResult("DataView", "iga-components")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.getByText(UI_STRINGS.contributionsGroup)).toBeDefined();
    });

    test("creates both groups when mixed packages discovered", () => {
      setDiscoveryResults([
        makeResult("Button", "odyssey", "1.55.0"),
        makeResult("DataView", "iga-components"),
      ]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.getByText(UI_STRINGS.odysseyGroup)).toBeDefined();
      expect(screen.getByText(UI_STRINGS.contributionsGroup)).toBeDefined();
    });

    test("creates separate children for different versions of same package", () => {
      setDiscoveryResults([
        makeResult("Button", "odyssey", "1.55.0"),
        makeResult("Banner", "odyssey", "1.56.0"),
      ]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(
        screen.getByRole("button", { name: /Odyssey v1\.55\.0/ }),
      ).toBeDefined();
      expect(
        screen.getByRole("button", { name: /Odyssey v1\.56\.0/ }),
      ).toBeDefined();
    });

    test("always includes Odyssey Backwards Compatible child in Odyssey group", () => {
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(
        screen.getByRole("button", { name: /Odyssey Backwards Compatible/ }),
      ).toBeDefined();
    });

    test("shows Odyssey group with only backwards compatible child when no odyssey packages discovered", () => {
      setDiscoveryResults([makeResult("DataView", "iga-components")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      // Odyssey group exists because of the always-present backwards compatible scanner
      expect(screen.getByText(UI_STRINGS.odysseyGroup)).toBeDefined();
    });

    test("formats contribution package names correctly", () => {
      setDiscoveryResults([
        makeResult("DataView", "iga-components"),
        makeResult("Widget", "resource-access-policy-components", "2.0.0"),
      ]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.getByRole("button", { name: /IGA/ })).toBeDefined();
      expect(
        screen.getByRole("button", {
          name: /Resource Access Policy \(Odyssey v2\.0\.0\)/,
        }),
      ).toBeDefined();
    });
  });

  describe("drag", () => {
    // userEvent does not currently have a dedicated pointerCancel method, using fireEvent instead
    test("pointercancel resets transform and does not leave menu stuck", () => {
      // Stub setPointerCapture — not supported in the test browser environment
      Element.prototype.setPointerCapture = vi.fn();
      Element.prototype.releasePointerCapture = vi.fn();

      const { container: root } = render(<DebugMenu onClose={() => {}} />, {
        wrapper,
      });

      const dragHandle = screen.getByLabelText(UI_STRINGS.dragAriaLabel);
      // The MenuContainer is the outermost Paper rendered by DebugMenu
      const menuContainer = root.firstElementChild as HTMLElement;

      // Start a drag
      fireEvent.pointerDown(dragHandle, { clientX: 100, clientY: 100 });

      // Move the pointer to simulate dragging
      fireEvent.pointerMove(dragHandle, { clientX: 200, clientY: 200 });

      // The container should have a transform applied
      expect(menuContainer.style.transform).not.toBe("");

      // Simulate an abnormal drag end (e.g. pointer left the window)
      fireEvent.pointerCancel(dragHandle);

      // Transform should be cleared — menu snaps back
      expect(menuContainer.style.transform).toBe("");
    });
  });

  describe("minimize", () => {
    test("renders minimize button in header", () => {
      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(
        screen.getByLabelText(UI_STRINGS.minimizeMenuAriaLabel),
      ).toBeDefined();
    });

    test("collapses scanner groups when minimize is clicked", async () => {
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      const collapseWrapper = screen
        .getByText("Odyssey")
        .closest(".MuiCollapse-root") as HTMLElement;
      expect(collapseWrapper.style.height).not.toBe("0px");

      await act(async () =>
        user.click(screen.getByLabelText(UI_STRINGS.minimizeMenuAriaLabel)),
      );

      expect(collapseWrapper.style.height).toBe("0px");
    });

    test("shows expand button when minimized", async () => {
      render(<DebugMenu onClose={() => {}} />, { wrapper });

      await act(async () =>
        user.click(screen.getByLabelText(UI_STRINGS.minimizeMenuAriaLabel)),
      );

      expect(
        screen.getByLabelText(UI_STRINGS.expandMenuAriaLabel),
      ).toBeDefined();
      expect(
        screen.queryByLabelText(UI_STRINGS.minimizeMenuAriaLabel),
      ).toBeNull();
    });

    test("expands scanner groups when expand is clicked", async () => {
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      await act(
        async () =>
          await user.click(
            screen.getByLabelText(UI_STRINGS.minimizeMenuAriaLabel),
          ),
      );

      const collapseWrapper = screen
        .getByText("Odyssey")
        .closest(".MuiCollapse-root") as HTMLElement;
      expect(collapseWrapper.style.height).toBe("0px");

      await act(async () =>
        user.click(screen.getByLabelText(UI_STRINGS.expandMenuAriaLabel)),
      );
      expect(collapseWrapper.style.height).not.toBe("0px");
    });

    test("header actions remain visible when minimized", async () => {
      render(<DebugMenu onClose={() => {}} />, { wrapper });

      await act(async () =>
        user.click(screen.getByLabelText(UI_STRINGS.minimizeMenuAriaLabel)),
      );

      expect(screen.getByText(UI_STRINGS.menuTitle)).toBeDefined();
      expect(screen.getByLabelText(UI_STRINGS.dragAriaLabel)).toBeDefined();
      expect(screen.getByLabelText(UI_STRINGS.refreshAriaLabel)).toBeDefined();
      expect(screen.getByLabelText(UI_STRINGS.closeAriaLabel)).toBeDefined();
    });
  });

  describe("refresh", () => {
    test("refresh button updates groups with new discovery results", async () => {
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();

      // Simulate page change — new components appear
      setDiscoveryResults([
        makeResult("Button", "odyssey", "1.55.0"),
        makeResult("Banner", "odyssey", "1.55.0"),
        makeResult("DataView", "iga-components"),
      ]);

      await act(async () =>
        user.click(screen.getByLabelText(UI_STRINGS.refreshAriaLabel)),
      );

      expect(screen.getByText(UI_STRINGS.contributionsGroup)).toBeDefined();
    });
  });

  describe("DOM mutation observer", () => {
    test("re-runs discovery when a non-debug element is added to the DOM", async () => {
      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();

      // Simulate new components appearing (e.g. dialog opens)
      setDiscoveryResults([makeResult("DataView", "iga-components")]);

      // Add a non-debug element to trigger the mutation observer
      const appElement = document.createElement("div");
      document.body.appendChild(appElement);

      await waitFor(() => {
        expect(screen.getByText(UI_STRINGS.contributionsGroup)).toBeDefined();
      });

      appElement.remove();
    });

    test("re-runs discovery when a visualized element is removed from the DOM", async () => {
      setDiscoveryResults([
        makeResult("Button", "odyssey", "1.55.0"),
        makeResult("DataView", "iga-components"),
      ]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.getByText(UI_STRINGS.contributionsGroup)).toBeDefined();

      // Simulate a visualized element being removed (e.g. dialog closes).
      // The element has data-odyssey-debug, mimicking active visualization.
      const visualizedElement = document.createElement("div");
      visualizedElement.dataset.odysseyDebug = "true";
      document.body.appendChild(visualizedElement);

      // Update discovery to reflect the removal
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      // Remove the visualized element — this should trigger re-discovery
      visualizedElement.remove();

      await waitFor(() => {
        expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();
      });
    });

    test("ignores mutations from the debug menu container", async () => {
      render(<DebugMenu onClose={() => {}} />, { wrapper });

      // Add an element inside the debug root — should not trigger re-discovery
      const debugRoot = document.createElement("div");
      debugRoot.id = "odyssey-debug-root";
      document.body.appendChild(debugRoot);

      const debugChild = document.createElement("div");
      debugRoot.appendChild(debugChild);

      // Wait longer than the debounce (300ms) to confirm no re-discovery
      await waitForDebounce();

      // The menu should still show initial state (no contributions group)
      expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();

      debugRoot.remove();
    });

    test("ignores mutations from scanner label additions", async () => {
      setDiscoveryResults([makeResult("Button", "odyssey", "1.55.0")]);

      render(<DebugMenu onClose={() => {}} />, { wrapper });

      expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();

      // Add a scanner label (data-scanner-id) to an element with data-odyssey-debug.
      // This simulates the visualizer adding labels — should not trigger re-discovery.
      const target = document.createElement("div");
      target.dataset.odysseyDebug = "true";
      document.body.appendChild(target);

      // Drain the observer for the target addition first
      await waitForDebounce();

      // Now add a scanner label inside — this should be ignored
      setDiscoveryResults([
        makeResult("Button", "odyssey", "1.55.0"),
        makeResult("DataView", "iga-components"),
      ]);

      const label = document.createElement("div");
      label.dataset.scannerId = "odyssey@1.55.0";
      target.appendChild(label);

      await waitForDebounce();

      // Contributions group should NOT appear because the label mutation was ignored
      expect(screen.queryByText(UI_STRINGS.contributionsGroup)).toBeNull();

      target.remove();
    });
  });
});
