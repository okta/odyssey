/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import * as Tokens from "@okta/odyssey-design-tokens";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import { MockInstance } from "vitest";

import { hexToRgb } from "../hexToRgb.js";
import {
  ContrastModeContext,
  defaultParentBackgroundColor,
  getBackgroundColor,
  getElementComputedBackgroundColor,
  hueNeutral50Rgb,
  isTransparentColor,
  normalizeBackgroundColor,
  normalizeRgbaToRgb,
  useContrastMode,
  useContrastModeContext,
} from "../useContrastMode.js";

describe("useContrastMode and related functions", () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.style.setProperty("backgroundColor", null);
  });

  describe("useContrastMode hook", () => {
    let getComputedStyleSpy: MockInstance<typeof window.getComputedStyle>;

    beforeEach(() => {
      getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );
    });

    afterEach(() => {
      getComputedStyleSpy.mockRestore();
    });

    it("should return lowContrast mode by default", () => {
      const { result } = renderHook(() => useContrastMode({}), {
        wrapper: ({ children }) => (
          <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
            {children}
          </ContrastModeContext.Provider>
        ),
      });

      expect(result.current.parentBackgroundColor).toBe(
        defaultParentBackgroundColor,
      );
      expect(result.current.contrastMode).toBe("lowContrast");
      expect(result.current.contrastContainerRef.current).toBe(null);
    });

    it("should respect explicitly set contrast mode", () => {
      const { result } = renderHook(
        () => useContrastMode({ contrastMode: "highContrast" }),
        {
          wrapper: ({ children }) => (
            <ContrastModeContext.Provider
              value={{ contrastMode: "lowContrast" }}
            >
              {children}
            </ContrastModeContext.Provider>
          ),
        },
      );

      expect(result.current.contrastMode).toBe("highContrast");
    });

    it("should update contrast mode based on background color changes", async () => {
      // Mock getComputedStyle to simulate background color checks
      getComputedStyleSpy.mockImplementation(
        () => ({ backgroundColor: Tokens.HueNeutral50 }) as CSSStyleDeclaration,
      );

      const TestComponent = () => {
        const { contrastContainerRef, contrastMode } = useContrastMode({});
        return (
          <div ref={contrastContainerRef} data-testid="container">
            {contrastMode}
          </div>
        );
      };

      const { getByTestId } = render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      const testContainer = getByTestId("container");

      // Create and dispatch a transitionend event to simulate CSS transition completion
      // Storybook and certain elements use transitions which could interfere with tests
      await act(async () => {
        testContainer.style.backgroundColor = Tokens.HueNeutral50;

        const transitionEvent = new Event("transitionend");

        testContainer.dispatchEvent(
          Object.assign(transitionEvent, { propertyName: "background-color" }),
        );

        await Promise.resolve();
      });

      await waitFor(() => {
        expect(getByTestId("container").textContent).toBe("highContrast");
      });
    });

    it("should clean up observers and event listeners on unmount", () => {
      const observeSpy = vi
        .spyOn(MutationObserver.prototype, "observe")
        .mockImplementation(vi.fn());
      const disconnectSpy = vi
        .spyOn(MutationObserver.prototype, "disconnect")
        .mockImplementation(vi.fn());
      const takeRecordsSpy = vi
        .spyOn(MutationObserver.prototype, "takeRecords")
        .mockImplementation(vi.fn());

      const addEventListenerSpy = vi.spyOn(document, "addEventListener");
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const TestComponent = () => {
        const { contrastContainerRef } = useContrastMode({});
        return <div ref={contrastContainerRef}>Test</div>;
      };

      const { unmount } = render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      unmount();

      expect(disconnectSpy).toHaveBeenCalled();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "transitionend",
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();

      disconnectSpy.mockRestore();
      observeSpy.mockRestore();
      takeRecordsSpy.mockRestore();
    });
  });

  describe("getBackgroundColor", () => {
    let getComputedStyleSpy: MockInstance<typeof window.getComputedStyle>;

    beforeEach(() => {
      getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );
    });

    afterEach(() => {
      getComputedStyleSpy.mockRestore();
    });

    it("returns defaultParentBackgroundColor if transparent background is found", () => {
      const element = document.createElement("div");
      expect(getBackgroundColor(element)).toBe(defaultParentBackgroundColor);
    });

    it("returns the background color of the element if it is not transparent", () => {
      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          (element: Element) =>
            ({
              backgroundColor:
                (element as HTMLElement).style.backgroundColor ||
                "rgba(0, 0, 0, 0)",
            }) as CSSStyleDeclaration,
        );

      const element = document.createElement("div");
      element.style.setProperty("background-color", "rgb(255, 0, 0)");
      const result = getBackgroundColor(element);
      expect(result).toBe("rgb(255, 0, 0)");

      getComputedStyleSpy.mockRestore();
    });

    it("returns defaultParentBackgroundColor if no non-transparent background is found", () => {
      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );

      const element = document.createElement("div");
      expect(getBackgroundColor(element)).toBe(defaultParentBackgroundColor);

      getComputedStyleSpy.mockRestore();
    });

    it("returns the background color of the parent if the element is transparent", () => {
      const parent = document.createElement("div");
      const child = document.createElement("div");
      parent.appendChild(child);
      parent.style.setProperty("background-color", "rgb(0, 255, 0)");

      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          (el: Element) =>
            ({
              backgroundColor:
                el === parent ? "rgb(0, 255, 0)" : "rgba(0, 0, 0, 0)",
            }) as CSSStyleDeclaration,
        );

      expect(getBackgroundColor(child)).toBe("rgb(0, 255, 0)");

      getComputedStyleSpy.mockRestore();
    });

    it("returns HueNeutral50 token for its RGB equivalent", () => {
      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () => ({ backgroundColor: hueNeutral50Rgb }) as CSSStyleDeclaration,
        );

      const element = document.createElement("div");
      element.style.setProperty("background-color", hueNeutral50Rgb);
      expect(getBackgroundColor(element)).toBe(Tokens.HueNeutral50);

      getComputedStyleSpy.mockRestore();
    });

    it("handles nested transparent elements correctly", () => {
      const grandparent = document.createElement("div");
      const parent = document.createElement("div");
      const child = document.createElement("div");
      grandparent.appendChild(parent);
      parent.appendChild(child);
      grandparent.style.setProperty("backgroundColor", "rgb(0, 0, 255)");

      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          (el: Element) =>
            ({
              backgroundColor:
                el === grandparent ? "rgb(0, 0, 255)" : "rgba(0, 0, 0, 0)",
            }) as CSSStyleDeclaration,
        );

      expect(getBackgroundColor(child)).toBe("rgb(0, 0, 255)");

      getComputedStyleSpy.mockRestore();
    });
  });

  describe("MutationObserver functionality", () => {
    let addEventListenerSpy: MockInstance<typeof document.addEventListener>;
    let removeEventListenerSpy: MockInstance<
      typeof document.removeEventListener
    >;

    beforeEach(() => {
      addEventListenerSpy = vi
        .spyOn(document, "addEventListener")
        .mockImplementation(vi.fn());
      removeEventListenerSpy = vi
        .spyOn(document, "removeEventListener")
        .mockImplementation(vi.fn());
    });

    afterEach(() => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    it("should clean up observers and event listeners on unmount", () => {
      const observeSpy = vi
        .spyOn(MutationObserver.prototype, "observe")
        .mockImplementation(vi.fn());
      const disconnectSpy = vi
        .spyOn(MutationObserver.prototype, "disconnect")
        .mockImplementation(vi.fn());
      const takeRecordsSpy = vi
        .spyOn(MutationObserver.prototype, "takeRecords")
        .mockImplementation(vi.fn());

      const TestComponent = () => {
        const { contrastContainerRef } = useContrastMode({});
        return <div ref={contrastContainerRef}>Test</div>;
      };

      const { unmount } = render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      unmount();

      expect(disconnectSpy).toHaveBeenCalled();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "transitionend",
        expect.any(Function),
      );

      disconnectSpy.mockRestore();
      observeSpy.mockRestore();
      takeRecordsSpy.mockRestore();
    });
  });

  describe("useContrastModeContext", () => {
    it("should return the current contrast mode from context", () => {
      const { result } = renderHook(() => useContrastModeContext(), {
        wrapper: ({ children }) => (
          <ContrastModeContext.Provider
            value={{ contrastMode: "highContrast" }}
          >
            {children}
          </ContrastModeContext.Provider>
        ),
      });

      expect(result.current.contrastMode).toBe("highContrast");
    });
  });

  it("detects parent background color changes", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    parent.appendChild(child);

    const getComputedStyleSpy = vi
      .spyOn(window, "getComputedStyle")
      .mockImplementation(
        (el: Element) =>
          ({
            backgroundColor:
              el === parent ? Tokens.HueNeutral50 : "rgba(0, 0, 0, 0)",
          }) as CSSStyleDeclaration,
      );

    const result = getBackgroundColor(child);
    expect(result).toBe(Tokens.HueNeutral50);

    getComputedStyleSpy.mockRestore();
  });

  describe("Color utility functions", () => {
    describe("hexToRgb", () => {
      it("converts black hex to rgb", () => {
        expect(hexToRgb("#000000").asFormattedString).toBe("rgb(0, 0, 0)");
      });

      it("converts white hex to rgb", () => {
        expect(hexToRgb("#ffffff").asFormattedString).toBe(
          "rgb(255, 255, 255)",
        );
      });

      it("converts mixed color hex to rgb", () => {
        expect(hexToRgb("#ff0088").asFormattedString).toBe("rgb(255, 0, 136)");
      });

      it("correctly converts HueNeutral50 token to rgb", () => {
        const result = hexToRgb(Tokens.HueNeutral50).asFormattedString;
        expect(result).toBe(hueNeutral50Rgb);
      });
    });

    describe("isTransparentColor", () => {
      it("identifies rgba(0, 0, 0, 0) as transparent", () => {
        expect(isTransparentColor("rgba(0, 0, 0, 0)")).toBe(true);
      });

      it('identifies "transparent" keyword as transparent', () => {
        expect(isTransparentColor("transparent")).toBe(true);
      });

      it("identifies solid colors as non-transparent", () => {
        expect(isTransparentColor("rgb(255, 255, 255)")).toBe(false);
        expect(isTransparentColor("rgba(255, 255, 255, 1)")).toBe(false);
        expect(isTransparentColor(defaultParentBackgroundColor)).toBe(false);
      });
    });

    describe("normalizeRgbaToRgb", () => {
      it("converts rgba to rgb format", () => {
        expect(normalizeRgbaToRgb("rgba(255, 128, 0, 0.5)")).toBe(
          "rgb(255, 128, 0)",
        );
      });

      it("handles zero alpha value", () => {
        expect(normalizeRgbaToRgb("rgba(255, 128, 0, 0)")).toBe(
          "rgb(255, 128, 0)",
        );
      });

      it("handles full alpha value", () => {
        expect(normalizeRgbaToRgb("rgba(255, 128, 0, 1)")).toBe(
          "rgb(255, 128, 0)",
        );
      });

      it("does not modify rgb format", () => {
        const rgbColor = "rgb(255, 128, 0)";
        expect(normalizeRgbaToRgb(rgbColor)).toBe(rgbColor);
      });
    });

    describe("normalizeBackgroundColor", () => {
      it("converts rgba to rgb and matches against HueNeutral50", () => {
        const rgbaColor = hueNeutral50Rgb
          .replace("rgb", "rgba")
          .replace(")", ", 0.5)");
        expect(normalizeBackgroundColor(rgbaColor)).toBe(Tokens.HueNeutral50);
      });

      it("returns original color if not matching HueNeutral50", () => {
        const rgbaColor = "rgba(255, 0, 0, 0.5)";
        expect(normalizeBackgroundColor(rgbaColor)).toBe("rgb(255, 0, 0)");
      });

      it("returns HueNeutral50 token for matching rgb value", () => {
        expect(normalizeBackgroundColor(hueNeutral50Rgb)).toBe(
          Tokens.HueNeutral50,
        );
      });

      it("returns original color for non-matching rgb value", () => {
        const rgbColor = "rgb(255, 0, 0)";
        expect(normalizeBackgroundColor(rgbColor)).toBe(rgbColor);
      });
    });

    describe("getElementComputedBackgroundColor", () => {
      let getComputedStyleSpy: MockInstance<typeof window.getComputedStyle>;

      beforeEach(() => {
        getComputedStyleSpy = vi.spyOn(window, "getComputedStyle");
      });

      afterEach(() => {
        getComputedStyleSpy.mockRestore();
      });

      it("returns the computed background color of an element", () => {
        const element = document.createElement("div");
        const expectedColor = "rgb(255, 0, 0)";

        getComputedStyleSpy.mockImplementation(
          () =>
            ({
              backgroundColor: expectedColor,
            }) as CSSStyleDeclaration,
        );

        expect(getElementComputedBackgroundColor(element)).toBe(expectedColor);
      });

      it("handles transparent background color", () => {
        const element = document.createElement("div");

        getComputedStyleSpy.mockImplementation(
          () =>
            ({
              backgroundColor: "transparent",
            }) as CSSStyleDeclaration,
        );

        expect(getElementComputedBackgroundColor(element)).toBe("transparent");
      });
    });
  });
});
