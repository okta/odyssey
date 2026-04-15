import { cleanup, render } from "@testing-library/react";
import { forwardRef, memo, type ReactNode } from "react";
import { afterEach, describe, expect, test } from "vitest";

import {
  getBackwardsCompatibleScanner,
  getDiscoveryScanner,
  getTargetedScanner,
} from "./componentScanner.js";

// "Root" container that the scanner looks for
const AppRoot = ({ children }: { children: ReactNode }) => (
  <div className="MuiScopedCssBaseline-root">{children}</div>
);

// --- Stamped test components (component::pkg=<package>&odysseyV=<version>) ---

// Complex wrapper: Memo + ForwardRef
const Badge = memo(
  forwardRef<HTMLSpanElement, { label: string }>((props, ref) => {
    return (
      <span data-testid="odyssey-badge" ref={ref}>
        {props.label}
      </span>
    );
  }),
);
Badge.displayName = "Badge::pkg=odyssey&odysseyV=1.55.0";

// Component that wraps children
const Banner = ({ children }: { children: ReactNode }) => (
  <div data-testid="odyssey-banner">
    <div className="banner-inner">{children}</div>
  </div>
);
Banner.displayName = "Banner::pkg=odyssey&odysseyV=1.55.0";

// Standard Button component
const Button = ({ children }: { children?: ReactNode }) => (
  <button data-testid="odyssey-btn">{children || "Click"}</button>
);
Button.displayName = "Button::pkg=odyssey&odysseyV=1.55.0";

// A component that renders nothing
const HiddenLogic = () => {
  return null;
};
HiddenLogic.displayName = "HiddenLogic::pkg=odyssey&odysseyV=1.55.0";

// Contribution package component
const DataView = ({ children }: { children?: ReactNode }) => (
  <div data-testid="iga-dataview">{children || "Data"}</div>
);
DataView.displayName = "DataView::pkg=iga-components&odysseyV=2.0.0";

// --- Production memo wrapper scenario ---
// In production React, SimpleMemoComponent sets fiber.type to the inner function
// directly, while fiber.elementType stays as the memo wrapper. If displayName is
// only on the inner function (not the wrapper), the scanner must recurse through
// the wrapper's .type to find the stamped name rather than returning a bare .name.

// Inner function has stamped displayName, memo wrapper does NOT
const InnerLayoutSwitcher = ({ children }: { children?: ReactNode }) => (
  <div data-testid="layout-switcher">{children || "switch"}</div>
);
InnerLayoutSwitcher.displayName = "LayoutSwitcher::pkg=odyssey&odysseyV=1.55.0";
const MemoLayoutSwitcher = memo(InnerLayoutSwitcher);

// Deeper nesting: memo(forwardRef), stamp on inner forwardRef only
const InnerBaseButton = forwardRef<HTMLButtonElement, { children?: ReactNode }>(
  (props, ref) => (
    <button data-testid="base-button" ref={ref}>
      {props.children || "Base"}
    </button>
  ),
);
InnerBaseButton.displayName = "BaseButton::pkg=odyssey&odysseyV=1.55.0";
const MemoBaseButton = memo(InnerBaseButton);

const LegacyButton = ({ children }: { children?: ReactNode }) => (
  <button>{children || "Click"}</button>
);
LegacyButton.displayName = "Button";

const LegacyBanner = ({ children }: { children?: ReactNode }) => (
  <div>{children || "Info"}</div>
);
LegacyBanner.displayName = "Banner";

describe("Component Scanner", () => {
  describe(getDiscoveryScanner.name, () => {
    afterEach(() => {
      cleanup();
    });

    test("discovers all stamped components regardless of package", () => {
      // Create a component with an unknown package
      const UnknownWidget = ({ children }: { children?: ReactNode }) => (
        <div>{children || "widget"}</div>
      );
      UnknownWidget.displayName = "Widget::pkg=unknown-pkg&odysseyV=3.0.0";

      render(
        <AppRoot>
          <Button>Submit</Button>
          <DataView>Table</DataView>
          <UnknownWidget>Custom</UnknownWidget>
        </AppRoot>,
      );

      const scan = getDiscoveryScanner();
      const results = scan();

      const packageNames = results.map((r) => r.packageName);
      expect(packageNames).toContain("odyssey");
      expect(packageNames).toContain("iga-components");
      expect(packageNames).toContain("unknown-pkg");
    });

    test("returns version and package metadata for each result", () => {
      render(
        <AppRoot>
          <Button>Submit</Button>
          <LegacyButton>Submit Legacy</LegacyButton>
        </AppRoot>,
      );

      const scan = getDiscoveryScanner();
      const results = scan();

      const buttonResult = results.find((r) => r.componentName === "Button");
      expect(buttonResult).toBeDefined();
      expect(buttonResult!.packageName).toBe("odyssey");
      expect(buttonResult!.odysseyVersion).toBe("1.55.0");
    });

    test("finds stamped displayName through memo wrapper when only inner component is stamped", () => {
      render(
        <AppRoot>
          <MemoLayoutSwitcher>Layouts</MemoLayoutSwitcher>
        </AppRoot>,
      );

      const scan = getDiscoveryScanner();
      const results = scan();

      const result = results.find((r) => r.componentName === "LayoutSwitcher");
      expect(result).toBeDefined();
      expect(result!.packageName).toBe("odyssey");
      expect(result!.odysseyVersion).toBe("1.55.0");
    });

    test("finds stamped displayName through memo(forwardRef) when only inner forwardRef is stamped", () => {
      render(
        <AppRoot>
          <MemoBaseButton>Click</MemoBaseButton>
        </AppRoot>,
      );

      const scan = getDiscoveryScanner();
      const results = scan();

      const result = results.find((r) => r.componentName === "BaseButton");
      expect(result).toBeDefined();
      expect(result!.packageName).toBe("odyssey");
      expect(result!.odysseyVersion).toBe("1.55.0");
    });

    test("does not find unstamped components", () => {
      const PlainButton = ({ children }: { children?: ReactNode }) => (
        <button>{children}</button>
      );
      PlainButton.displayName = "PlainButton";

      render(
        <AppRoot>
          <PlainButton>No stamp</PlainButton>
        </AppRoot>,
      );

      const scan = getDiscoveryScanner();
      const results = scan();

      expect(
        results.find((r) => r.componentName === "PlainButton"),
      ).toBeUndefined();
    });
  });

  describe(getTargetedScanner.name, () => {
    afterEach(() => {
      cleanup();
    });

    test("returns only components matching target package and version", () => {
      render(
        <AppRoot>
          <Button>Submit</Button>
          <DataView>Table</DataView>
          <LegacyButton>Submit Legacy</LegacyButton>
        </AppRoot>,
      );

      const scan = getTargetedScanner("odyssey", "1.55.0");
      const results = scan();

      expect(results.every((r) => r.packageName === "odyssey")).toBe(true);
      expect(results.every((r) => r.odysseyVersion === "1.55.0")).toBe(true);
      expect(results.find((r) => r.componentName === "Button")).toBeDefined();
    });

    test("excludes components from other packages", () => {
      render(
        <AppRoot>
          <Button>Submit</Button>
          <DataView>Table</DataView>
        </AppRoot>,
      );

      const scan = getTargetedScanner("iga-components", "2.0.0");
      const results = scan();

      expect(results).toHaveLength(1);
      expect(results[0].componentName).toBe("DataView");
      expect(results[0].packageName).toBe("iga-components");
    });

    test("excludes components with different versions of the same package", () => {
      const OldButton = ({ children }: { children?: ReactNode }) => (
        <button>{children}</button>
      );
      OldButton.displayName = "Button::pkg=odyssey&odysseyV=1.54.0";

      render(
        <AppRoot>
          <Button>New</Button>
          <OldButton>Old</OldButton>
        </AppRoot>,
      );

      const scan = getTargetedScanner("odyssey", "1.55.0");
      const results = scan();

      expect(results).toHaveLength(1);
      expect(results[0].element.textContent).toBe("New");
    });

    test("handles null version for unversioned packages", () => {
      const UnversionedWidget = ({ children }: { children?: ReactNode }) => (
        <div>{children}</div>
      );
      UnversionedWidget.displayName = "Widget::pkg=some-pkg";

      render(
        <AppRoot>
          <UnversionedWidget>Test</UnversionedWidget>
          <Button>Versioned</Button>
        </AppRoot>,
      );

      const scan = getTargetedScanner("some-pkg", null);
      const results = scan();

      expect(results).toHaveLength(1);
      expect(results[0].componentName).toBe("Widget");
      expect(results[0].odysseyVersion).toBeNull();
    });
  });

  describe(getBackwardsCompatibleScanner.name, () => {
    afterEach(() => {
      cleanup();
    });

    test("finds unstamped components matching target names", () => {
      render(
        <AppRoot>
          <LegacyButton>Submit</LegacyButton>
          <Button>New Button</Button>
          <LegacyBanner>Info</LegacyBanner>
        </AppRoot>,
      );

      const scan = getBackwardsCompatibleScanner(["Button"]);
      const results = scan();

      const names = results.map((r) => r.componentName);
      expect(names).toContain("Button");
      expect(names).not.toContain("Banner");
    });

    test("excludes stamped components even if component name matches target", () => {
      render(
        <AppRoot>
          <Button>Stamped</Button>
        </AppRoot>,
      );

      const scan = getBackwardsCompatibleScanner(["Button"]);
      const results = scan();

      expect(results).toHaveLength(0);
    });
  });
});
