import { createTheme, ThemeProvider } from "@okta/odyssey-react-mui";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { type ScanResult } from "./componentVisualizer.js";
import { ScannerButton } from "./ScannerButton.js";

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

const makeScanResult = (name: string): ScanResult => ({
  componentName: name,
  element: document.createElement("div"),
  odysseyVersion: "1.0.0",
  packageName: "test-pkg",
  scannerId: "test-pkg@1.0.0",
});

describe("ScannerButton", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("uncontrolled mode", () => {
    test("renders with label and inactive state", () => {
      render(
        <ScannerButton
          color="#f00"
          label="Test Scanner"
          scanner={() => []}
          scannerId="test"
        />,
        { wrapper },
      );

      const button = screen.getByRole("button", { name: "Test Scanner" });
      expect(button).toBeDefined();
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });

    test("activates on click and shows count", () => {
      const results = [makeScanResult("Button"), makeScanResult("Banner")];

      render(
        <ScannerButton
          color="#f00"
          label="Test Scanner"
          scanner={() => results}
          scannerId="test"
        />,
        { wrapper },
      );

      const button = screen.getByRole("button", { name: /Test Scanner/ });
      fireEvent.click(button);

      expect(button.getAttribute("aria-expanded")).toBe("true");
      expect(button.textContent).toContain("2");
    });

    test("deactivates on second click", () => {
      render(
        <ScannerButton
          color="#f00"
          label="Test Scanner"
          scanner={() => [makeScanResult("Button")]}
          scannerId="test"
        />,
        { wrapper },
      );

      const button = screen.getByRole("button", { name: /Test Scanner/ });
      fireEvent.click(button);
      expect(button.getAttribute("aria-expanded")).toBe("true");

      fireEvent.click(button);
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });
  });

  describe("controlled mode", () => {
    test("renders inactive when controlledResults is null", () => {
      render(
        <ScannerButton
          color="#f00"
          controlledResults={null}
          label="Controlled"
          scanner={() => []}
          scannerId="ctrl"
        />,
        { wrapper },
      );

      const button = screen.getByRole("button", { name: "Controlled" });
      expect(button.getAttribute("aria-expanded")).toBe("false");
    });

    test("renders active with count when controlledResults is provided", () => {
      const results = [makeScanResult("A"), makeScanResult("B")];

      render(
        <ScannerButton
          color="#f00"
          controlledResults={results}
          label="Controlled"
          scanner={() => []}
          scannerId="ctrl"
        />,
        { wrapper },
      );

      const button = screen.getByRole("button", { name: /Controlled/ });
      expect(button.getAttribute("aria-expanded")).toBe("true");
      expect(button.textContent).toContain("2");
    });

    test("calls onToggle instead of internal toggle when clicked", () => {
      const onToggle = vi.fn();

      render(
        <ScannerButton
          color="#f00"
          controlledResults={null}
          label="Controlled"
          onToggle={onToggle}
          scanner={() => []}
          scannerId="ctrl"
        />,
        { wrapper },
      );

      fireEvent.click(screen.getByRole("button", { name: "Controlled" }));
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    test("does not run internal scanner when controlled", () => {
      const scanner = vi.fn(() => [makeScanResult("X")]);

      render(
        <ScannerButton
          color="#f00"
          controlledResults={null}
          label="Controlled"
          onToggle={() => {}}
          scanner={scanner}
          scannerId="ctrl"
        />,
        { wrapper },
      );

      fireEvent.click(screen.getByRole("button", { name: "Controlled" }));
      expect(scanner).not.toHaveBeenCalled();
    });
  });
});
