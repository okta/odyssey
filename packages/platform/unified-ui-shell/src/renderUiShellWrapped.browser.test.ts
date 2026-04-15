// Mock dependencies
const { setComponentPropsMock, setupOdysseyDebugListenerMock } = vi.hoisted(
  () => ({
    setComponentPropsMock: vi.fn(),
    setupOdysseyDebugListenerMock: vi.fn(),
  }),
);

vi.mock("@okta/odyssey-react-mui/icons", () => ({
  HomeOutlinedIcon: () => "HomeOutlinedIcon",
  SettingsOutlinedIcon: () => "SettingsOutlinedIcon",
}));

vi.mock("@okta/odyssey-react-mui/ui-shell", () => {
  return {
    adminAppUiShellBreakpoints: {},
    renderUiShell: vi.fn().mockReturnValue({
      setComponentProps: setComponentPropsMock,
    }),
    TURN_OFF_APP_SWITCHER: Symbol(),
    useUiShellBreakpoints: () => {},
  };
});

vi.mock("@okta/odyssey-contributions-ui-component-identifier", () => ({
  setupOdysseyDebugListener: setupOdysseyDebugListenerMock,
}));

import * as odysseyIconsExport from "@okta/odyssey-react-mui/icons";
import { renderUiShell as odysseyRenderUiShell } from "@okta/odyssey-react-mui/ui-shell";
import { createElement } from "react";
import { afterEach, describe, expect, it, Mock, vi } from "vitest";

import {
  type ModifiedComponentPropsStateAction,
  type ModifiedSideNavItem,
  renderUiShell,
} from "./renderUiShellWrapped.js";

describe("unified-ui-shell", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("renderUiShell", () => {
    it("should initialize Odyssey UI Shell with provided args", () => {
      const args = {
        onRender: vi.fn(),
        componentProps: {
          sideNavProps: {
            sideNavItems: [],
          },
        },
      };

      renderUiShell(args as unknown as Parameters<typeof renderUiShell>[0]);

      expect(odysseyRenderUiShell).toHaveBeenCalledWith(
        expect.objectContaining({
          componentProps: args.componentProps,
        }),
      );
      expect(setupOdysseyDebugListenerMock).not.toHaveBeenCalled();
    });

    it("should return modified setComponentProps function", () => {
      const mockSetComponentProps = vi.fn();
      (
        odysseyRenderUiShell as Mock<typeof odysseyRenderUiShell>
      ).mockReturnValue({
        setComponentProps: mockSetComponentProps,
      } as unknown as ReturnType<typeof odysseyRenderUiShell>);

      const result = renderUiShell(
        {} as unknown as Parameters<typeof renderUiShell>[0],
      );

      expect(result).toHaveProperty("setComponentProps");
      expect(result.setComponentProps).toBeTypeOf("function");
      expect(result.setComponentProps).not.toBe(mockSetComponentProps);
    });

    it("should transform icon names to icon components when setComponentProps is called", () => {
      const mockSetComponentProps = vi.fn();

      (
        odysseyRenderUiShell as Mock<typeof odysseyRenderUiShell>
      ).mockReturnValue({
        setComponentProps: mockSetComponentProps,
      } as unknown as ReturnType<typeof odysseyRenderUiShell>);

      const { setComponentProps } = renderUiShell(
        {} as unknown as Parameters<typeof renderUiShell>[0],
      );

      const componentProps = {
        sideNavProps: {
          sideNavItems: [
            {
              id: "1",
              text: "Home",
              startIconName:
                "HomeOutlinedIcon" as keyof typeof odysseyIconsExport,
            },
            {
              id: "2",
              text: "Settings",
              startIconName:
                "SettingsOutlinedIcon" as keyof typeof odysseyIconsExport,
              nestedNavItems: [
                {
                  id: "2-1",
                  text: "Profile",
                  endIconName:
                    "HomeOutlinedIcon" as keyof typeof odysseyIconsExport,
                },
              ],
            },
          ],
        },
      };

      setComponentProps(
        componentProps as unknown as ModifiedComponentPropsStateAction,
      );

      expect(mockSetComponentProps).toHaveBeenCalledTimes(1);

      // Verify icon transformation happened by checking arguments
      const transformedProps = mockSetComponentProps.mock
        .calls[0][0] as typeof componentProps;

      expect(transformedProps.sideNavProps.sideNavItems[0]).toHaveProperty(
        "startIcon",
      );

      expect(
        transformedProps.sideNavProps.sideNavItems[1].nestedNavItems?.[0],
      ).toHaveProperty("endIcon");
    });

    it("should handle callback form of setComponentProps", () => {
      const mockSetComponentProps = vi.fn();
      (
        odysseyRenderUiShell as Mock<typeof odysseyRenderUiShell>
      ).mockReturnValue({
        setComponentProps: mockSetComponentProps,
      } as unknown as ReturnType<typeof odysseyRenderUiShell>);

      const { setComponentProps } = renderUiShell(
        {} as unknown as Parameters<typeof renderUiShell>[0],
      );

      const callback = () => ({
        sideNavProps: {
          sideNavItems: [],
        },
      });

      setComponentProps(callback);

      expect(mockSetComponentProps).toHaveBeenCalledTimes(1);
      expect(mockSetComponentProps.mock.calls[0][0]).toBeTypeOf("function");

      (mockSetComponentProps.mock.calls[0][0] as typeof callback)();

      expect(mockSetComponentProps).toHaveBeenCalledExactlyOnceWith(
        mockSetComponentProps.mock.calls[0][0],
      );
    });

    it("should call onRender when provided", () => {
      const mockOnRender = vi.fn();

      renderUiShell({ onRender: mockOnRender } as unknown as Parameters<
        typeof renderUiShell
      >[0]);

      // Get the onRender callback passed to odysseyRenderUiShell
      const passedArgs = (
        odysseyRenderUiShell as Mock<typeof odysseyRenderUiShell>
      ).mock.calls[0][0];
      const onRenderCallback = passedArgs.onRender!;

      // Call the callback with mock return values
      onRenderCallback({
        setComponentProps: setComponentPropsMock,
      } as unknown as Parameters<typeof onRenderCallback>[0]);

      expect(mockOnRender).toHaveBeenCalledTimes(1);
      expect(mockOnRender.mock.calls[0][0]).toHaveProperty("appElement");
      expect(mockOnRender.mock.calls[0][0]).toHaveProperty("setComponentProps");
      // The setComponentProps should *NOT* be the one returned by odysseyRenderUiShell
      // Instead, unified-ui-shell should be wrapping it to do it's internal logic
      // We need to make sure this wrapped version is what is returned to `onRender`
      expect(
        (
          mockOnRender.mock.calls[0][0] as Parameters<
            typeof onRenderCallback
          >[0]
        ).setComponentProps,
      ).not.toBe(setComponentPropsMock);
    });
  });

  describe("UI Component Checker integration", () => {
    const baseProps = {
      appElementScrollingMode: "both" as const,
      parentElement: document.createElement("div"),
      onRender: vi.fn(),
    };

    test("loads the UI Component Checker when isUiComponentCheckerEnabled is true", async () => {
      renderUiShell({
        ...baseProps,
        isUiComponentCheckerEnabled: true,
      });

      await vi.waitFor(() => {
        expect(setupOdysseyDebugListenerMock).toHaveBeenCalled();
      });
    });

    test("logs an error if one was caught when attempting to set up the listener", async () => {
      const spyOnConsoleError = vi.spyOn(console, "error");

      const mockError = new Error("Something went wrong");
      setupOdysseyDebugListenerMock.mockImplementationOnce(() => {
        throw mockError;
      });

      renderUiShell({
        ...baseProps,
        isUiComponentCheckerEnabled: true,
      });

      await vi.waitFor(() => {
        expect(setupOdysseyDebugListenerMock).toHaveBeenCalled();
      });

      expect(spyOnConsoleError).toHaveBeenCalledWith(
        "[Unified UI Shell] Failed to load the UI Component Checker.",
        mockError,
      );

      spyOnConsoleError.mockRestore();
    });
  });

  describe("type safety tests", () => {
    it("should handle different ModifiedSideNavItem variants", () => {
      // This is a type test - just ensure it compiles
      const items: ModifiedSideNavItem[] = [
        // Section header
        {
          id: "section1",
          label: "Section 1",
          isSectionHeader: true,
        },
        // Regular nav item with string icon names
        {
          id: "nav1",
          label: "Navigation 1",
          startIconName: "HomeOutlinedIcon" as keyof typeof odysseyIconsExport,
          href: "/path",
        },
        // With React Element icons
        {
          id: "nav2",
          label: "Navigation 2",
          startIcon: createElement("div"),
          href: "/other-path",
        },
        // With nested items
        {
          id: "nested1",
          label: "Nested Navigation",
          isDefaultExpanded: true,
          nestedNavItems: [
            {
              id: "nested-child",
              label: "Nested Child",
              endIconName:
                "SettingsOutlinedIcon" as keyof typeof odysseyIconsExport,
            },
          ],
        },
      ];

      expect(items.length).toBe(4);
    });
  });
});
