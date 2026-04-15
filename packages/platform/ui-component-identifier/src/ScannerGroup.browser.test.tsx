import { createTheme, ThemeProvider } from "@okta/odyssey-react-mui";
import { act, cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { type ReactNode } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { type ScanResult } from "./componentVisualizer.js";
import { UI_STRINGS } from "./constants.js";
import { type ScannerConfig, ScannerGroup } from "./ScannerGroup.js";
import {
  readState,
  UI_COMPONENT_IDENTIFIER_STORAGE_KEY,
  writeState,
} from "./stateStorage.js";

// Mock the visualizer — it manipulates DOM elements from scan results that
// don't exist in our test renders.
vi.mock("./componentVisualizer.js", () => ({
  visualizeComponents: vi.fn(),
  clearComponentVisualization: vi.fn(),
}));

const theme = createTheme();
const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const makeScanResult = (
  name: string,
  pkg = "test-pkg",
  version = "1.0.0",
): ScanResult => ({
  componentName: name,
  element: document.createElement("div"),
  odysseyVersion: version,
  packageName: pkg,
  scannerId: `${pkg}@${version}`,
});

const makeChild = (
  id: string,
  label: string,
  results: ScanResult[] = [],
  group: string = "Group A",
): ScannerConfig => ({
  color: "#f00",
  label,
  group,
  scanner: () => results,
  scannerId: id,
});

const emptyDiscoveryObject = {};

const dispatchCrossTabStorageEvent = () => {
  window.dispatchEvent(
    new StorageEvent("storage", { key: UI_COMPONENT_IDENTIFIER_STORAGE_KEY }),
  );
};

describe("ScannerGroup", () => {
  const user = userEvent.setup();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renders group label and ON badge by default", () => {
    render(
      <ScannerGroup
        discoveryResultsByScanner={emptyDiscoveryObject}
        label="Test Group"
        scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
      />,
      { wrapper },
    );

    expect(screen.getByText("Test Group")).toBeDefined();
    expect(screen.getByText(UI_STRINGS.statusOn)).toBeDefined();
  });

  test("child buttons are visible and expanded by default", () => {
    render(
      <ScannerGroup
        discoveryResultsByScanner={emptyDiscoveryObject}
        label="Group"
        scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
      />,
      { wrapper },
    );

    const childButton = screen.getByRole("button", { name: /Scanner A/ });
    expect(childButton.getAttribute("aria-expanded")).toBe("true");
  });

  test("collapse chevron hides child buttons", async () => {
    render(
      <ScannerGroup
        discoveryResultsByScanner={emptyDiscoveryObject}
        label="Group"
        scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
      />,
      { wrapper },
    );

    await act(async () =>
      user.click(screen.getByLabelText(UI_STRINGS.collapseAriaLabel)),
    );

    // The Collapse component uses height: 0 immediately; visibility becomes hidden after the transition
    const childButton = screen.getByRole("button", { name: /Scanner A/ });
    const collapseRoot = childButton.closest(".MuiCollapse-root")!;
    expect(collapseRoot.classList.contains("MuiCollapse-entered")).toBe(false);
  });

  describe("toggle all", () => {
    test("clicking parent row deactivates all children and shows OFF", async () => {
      const resultsA = [makeScanResult("CompA")];
      const resultsB = [makeScanResult("CompB")];

      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[
            makeChild("a", "Scanner A", resultsA),
            makeChild("b", "Scanner B", resultsB),
          ]}
        />,
        { wrapper },
      );

      // All start ON, click to deactivate
      expect(screen.getByText(UI_STRINGS.statusOn)).toBeDefined();
      await act(async () =>
        user.click(screen.getByRole("button", { name: /Group/ })),
      );

      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();

      const childA = screen.getByRole("button", { name: /Scanner A/ });
      const childB = screen.getByRole("button", { name: /Scanner B/ });
      expect(childA.getAttribute("aria-expanded")).toBe("false");
      expect(childB.getAttribute("aria-expanded")).toBe("false");
    });

    test("clicking parent row again reactivates all children", async () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[
            makeChild("a", "Scanner A", [makeScanResult("X")]),
            makeChild("b", "Scanner B", [makeScanResult("Y")]),
          ]}
        />,
        { wrapper },
      );

      const parentRow = screen.getByRole("button", { name: /Group/ });

      // Deactivate all
      await act(async () => user.click(parentRow));
      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();

      // Reactivate all
      await act(async () => user.click(parentRow));
      expect(screen.getByText(UI_STRINGS.statusOn)).toBeDefined();
    });
  });

  describe("individual child toggle", () => {
    test("toggling one child off keeps ON badge (some still active)", async () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[
            makeChild("a", "Scanner A", [makeScanResult("X")]),
            makeChild("b", "Scanner B", [makeScanResult("Y")]),
          ]}
        />,
        { wrapper },
      );

      // Toggle child A off
      await act(async () =>
        user.click(screen.getByRole("button", { name: /Scanner A/ })),
      );

      // Badge should still show ON (child B is active)
      expect(screen.getByText(UI_STRINGS.statusOn)).toBeDefined();
    });

    test("toggling all children off individually shows OFF badge", async () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[
            makeChild("a", "Scanner A", [makeScanResult("X")]),
            makeChild("b", "Scanner B", [makeScanResult("Y")]),
          ]}
        />,
        { wrapper },
      );

      // Toggle both children off
      await act(async () =>
        user.click(screen.getByRole("button", { name: /Scanner A/ })),
      );
      await act(async () =>
        user.click(screen.getByRole("button", { name: /Scanner B/ })),
      );

      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();
    });
  });

  describe("reconciliation on refresh", () => {
    test("preserves active state for existing scanners when children update", () => {
      const resultsA = [makeScanResult("CompA")];
      const child = makeChild("a", "Scanner A", resultsA);

      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Group"
            scannerConfigs={[child]}
          />
        </ThemeProvider>,
      );

      // Scanner A starts ON
      expect(screen.getByText(UI_STRINGS.statusOn)).toBeDefined();
      const newDiscovery = { a: [makeScanResult("CompA-fresh")] };

      rerender(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={newDiscovery}
            label="Group"
            scannerConfigs={[
              makeChild("a", "Scanner A", resultsA),
              makeChild("b", "Scanner B New", [makeScanResult("CompB")]),
            ]}
          />
        </ThemeProvider>,
      );

      // Scanner A should still be active (preserved)
      const childA = screen.getByRole("button", { name: /Scanner A/ });
      expect(childA.getAttribute("aria-expanded")).toBe("true");

      // Scanner B (new) should also be active (new scanners default to on)
      const childB = screen.getByRole("button", { name: /Scanner B New/ });
      expect(childB.getAttribute("aria-expanded")).toBe("true");
    });

    test("preserves inactive state for manually turned-off scanners on refresh", async () => {
      const resultsA = [makeScanResult("CompA")];

      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Group"
            scannerConfigs={[makeChild("a", "Scanner A", resultsA)]}
          />
        </ThemeProvider>,
      );

      // Turn off Scanner A
      await act(async () =>
        user.click(screen.getByRole("button", { name: /Scanner A/ })),
      );
      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();

      // Refresh
      rerender(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Group"
            scannerConfigs={[makeChild("a", "Scanner A", resultsA)]}
          />
        </ThemeProvider>,
      );

      // Scanner A should still be off
      const childA = screen.getByRole("button", { name: /Scanner A/ });
      expect(childA.getAttribute("aria-expanded")).toBe("false");
    });

    test("removes stale scanners after refresh", () => {
      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Group"
            scannerConfigs={[
              makeChild("a", "Scanner A", [makeScanResult("X")]),
              makeChild("b", "Scanner B", [makeScanResult("Y")]),
            ]}
          />
        </ThemeProvider>,
      );

      expect(screen.getByRole("button", { name: /Scanner B/ })).toBeDefined();

      // Refresh — Scanner B no longer discovered
      rerender(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Group"
            scannerConfigs={[
              makeChild("a", "Scanner A", [makeScanResult("X")]),
            ]}
          />
        </ThemeProvider>,
      );

      expect(screen.queryByRole("button", { name: /Scanner B/ })).toBeNull();
    });

    test("active scanner gets fresh discovery results on refresh", () => {
      const originalResults = [makeScanResult("CompA")];
      const freshResults = [makeScanResult("CompA"), makeScanResult("CompA2")];

      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Group"
            scannerConfigs={[makeChild("a", "Scanner A", originalResults)]}
          />
        </ThemeProvider>,
      );

      // Scanner A starts on with count 1
      const childA = screen.getByRole("button", { name: /Scanner A/ });
      expect(childA.textContent).toContain("1");

      // Refresh with new discovery results
      const newDiscovery = { a: freshResults };

      rerender(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={newDiscovery}
            label="Group"
            scannerConfigs={[makeChild("a", "Scanner A", originalResults)]}
          />
        </ThemeProvider>,
      );

      // Count should update to reflect fresh discovery
      expect(childA.textContent).toContain("2");
    });

    test("active scanner falls back to re-scan when not in discovery map", () => {
      const scannerFn = vi.fn(() => [
        makeScanResult("Compat1"),
        makeScanResult("Compat2"),
        makeScanResult("Compat3"),
      ]);

      const backwardsCompatibleChild: ScannerConfig = {
        color: "#888",
        label: "Backwards Compatible",
        group: "Odyssey",
        scanner: scannerFn,
        scannerId: "odyssey-backwards-compatible",
      };

      const { rerender } = render(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={emptyDiscoveryObject}
            label="Odyssey"
            scannerConfigs={[backwardsCompatibleChild]}
          />
        </ThemeProvider>,
      );

      // Scanner starts on — called in useState init + useEffect sync
      expect(scannerFn).toHaveBeenCalled();

      // Refresh — "odyssey-backwards-compatible" is NOT in the discovery map
      scannerFn.mockClear();
      const newDiscovery = {};

      rerender(
        <ThemeProvider theme={theme}>
          <ScannerGroup
            discoveryResultsByScanner={newDiscovery}
            label="Odyssey"
            scannerConfigs={[backwardsCompatibleChild]}
          />
        </ThemeProvider>,
      );

      // Should have re-run the scanner as fallback
      expect(scannerFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("keyboard accessibility", () => {
    test("parent row is a focusable button element", () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      const parentRow = screen.getByRole("button", { name: /Group/ });
      expect(parentRow.tagName).toBe("BUTTON");
      expect(parentRow.tabIndex).not.toBe(-1);
    });

    test("clicking the parent button toggles all scanners", async () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      const parentRow = screen.getByRole("button", { name: /Group/ });

      // Starts ON, click to turn OFF
      await act(async () => user.click(parentRow));
      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();
    });
  });

  describe("storage persistence", () => {
    test("initializes scanner as off when storage has it as false", () => {
      writeState({ scannerStates: { a: false } });

      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();
    });

    test("initializes group as collapsed when storage has it as false", () => {
      writeState({ groupExpanded: { Group: false } });

      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      expect(screen.getByLabelText(UI_STRINGS.expandAriaLabel)).toBeDefined();
    });

    test("writes scanner states on toggle", async () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      // Scanner starts on
      expect(readState()?.scannerStates.a).toBe(true);

      await act(async () =>
        user.click(screen.getByRole("button", { name: /Scanner A/ })),
      );

      expect(readState()?.scannerStates.a).toBe(false);
    });

    test("writes group expanded state on collapse", async () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      // Group starts expanded
      expect(readState()?.groupExpanded.Group).toBe(true);

      await act(async () =>
        user.click(screen.getByLabelText(UI_STRINGS.collapseAriaLabel)),
      );

      expect(readState()?.groupExpanded.Group).toBe(false);
    });

    test("syncs scanner state from cross-tab storage event", () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      expect(screen.getByText(UI_STRINGS.statusOn)).toBeDefined();

      writeState({ scannerStates: { a: false } });

      act(() => {
        dispatchCrossTabStorageEvent();
      });

      expect(screen.getByText(UI_STRINGS.statusOff)).toBeDefined();
    });

    test("syncs group expanded state from cross-tab storage event", () => {
      render(
        <ScannerGroup
          discoveryResultsByScanner={emptyDiscoveryObject}
          label="Group"
          scannerConfigs={[makeChild("a", "Scanner A", [makeScanResult("X")])]}
        />,
        { wrapper },
      );

      expect(screen.getByLabelText(UI_STRINGS.collapseAriaLabel)).toBeDefined();

      writeState({ groupExpanded: { Group: false } });

      act(() => {
        dispatchCrossTabStorageEvent();
      });

      expect(screen.getByLabelText(UI_STRINGS.expandAriaLabel)).toBeDefined();
    });
  });
});
