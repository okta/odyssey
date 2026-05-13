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

import type { MockInstance } from "vitest";

import * as Tokens from "@okta/odyssey-design-tokens";
import { render, renderHook } from "vitest-browser-react";

import { hexToRgb } from "../hexToRgb.js";
import {
  ContrastModeContext,
  defaultParentBackgroundColor,
  deriveContrastMode,
  getBackgroundColor,
  getElementComputedBackgroundColor,
  hueNeutral50Rgb,
  isTransparentColor,
  normalizeBackgroundColor,
  normalizeRgbaToRgb,
  useContrastMode,
  useContrastModeContext,
} from "../useContrastMode.js";
import { createShadowDomElements } from "../web-component/createShadowDomElements.js";

describe("useContrastMode and related functions", () => {
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

    test("defaults to highContrast mode because defaultParentBackgroundColor is HueNeutral50", async () => {
      const { result } = await renderHook(() => useContrastMode({}));

      expect(result.current.parentBackgroundColor).toBe(
        defaultParentBackgroundColor,
      );
      expect(result.current.contrastMode).toBe("highContrast");
      expect(result.current.contrastContainerRef.current).toBe(null);
    });

    test("should respect explicitly set contrast mode", async () => {
      const { result } = await renderHook(
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

    test("should update contrast mode based on background color changes", async () => {
      // Mock getComputedStyle to simulate background color checks
      getComputedStyleSpy.mockImplementation(
        () => ({ backgroundColor: Tokens.HueNeutral50 }) as CSSStyleDeclaration,
      );

      const TestComponent = () => {
        const { contrastContainerRef, contrastMode } = useContrastMode({});
        return (
          <div data-testid="container" ref={contrastContainerRef}>
            {contrastMode}
          </div>
        );
      };

      const renderResult = await render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      const testContainer = renderResult.getByTestId("container").element();

      // Create and dispatch a transitionend event to simulate CSS transition completion
      // Storybook and certain elements use transitions which could interfere with tests
      testContainer.style.backgroundColor = Tokens.HueNeutral50;

      const transitionEvent = new Event("transitionend");

      testContainer.dispatchEvent(
        Object.assign(transitionEvent, { propertyName: "background-color" }),
      );

      await vi.waitFor(() => {
        expect(testContainer.textContent).toBe("highContrast");
      });
    });

    test("should clean up observers and event listeners on unmount", async () => {
      const observeSpy = vi
        .spyOn(MutationObserver.prototype, "observe")
        .mockImplementation(() => {});
      const disconnectSpy = vi
        .spyOn(MutationObserver.prototype, "disconnect")
        .mockImplementation(() => {});
      const takeRecordsSpy = vi
        .spyOn(MutationObserver.prototype, "takeRecords")
        .mockImplementation(() => []);

      const addEventListenerSpy = vi.spyOn(document, "addEventListener");
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const TestComponent = () => {
        const { contrastContainerRef } = useContrastMode({});
        return <div ref={contrastContainerRef}>Test</div>;
      };

      const { unmount } = await render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      await unmount();

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

    test("returns defaultParentBackgroundColor if transparent background is found", () => {
      const element = document.createElement("div");
      expect(getBackgroundColor(element)).toBe(defaultParentBackgroundColor);
    });

    test("returns the background color of the element if it is not transparent", () => {
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

    test("returns defaultParentBackgroundColor if no non-transparent background is found", () => {
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

    test("returns the background color of the parent if the element is transparent", () => {
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

    test("returns HueNeutral50 token for its RGB equivalent", () => {
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

    test("handles nested transparent elements correctly", () => {
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

    test("crosses shadow DOM boundaries to find background color on hostElement", () => {
      const hostElement = document.createElement("div");
      document.body.appendChild(hostElement);
      const { shadowRootElement: innerElement } =
        createShadowDomElements(hostElement);

      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          (el: Element) =>
            ({
              backgroundColor:
                el === hostElement ? "rgb(244, 244, 244)" : "rgba(0, 0, 0, 0)",
            }) as CSSStyleDeclaration,
        );

      expect(getBackgroundColor(innerElement)).toBe(Tokens.HueNeutral50);

      getComputedStyleSpy.mockRestore();
      document.body.removeChild(hostElement);
    });

    test("crosses nested shadow DOM boundaries", () => {
      const outerHost = document.createElement("div");
      document.body.appendChild(outerHost);
      const { shadowRootElement: outerShadowRoot } =
        createShadowDomElements(outerHost);
      const innerHost = document.createElement("div");
      outerShadowRoot.parentNode!.appendChild(innerHost);
      const { shadowRootElement: deepElement } =
        createShadowDomElements(innerHost);

      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          (el: Element) =>
            ({
              backgroundColor:
                el === outerHost ? "rgb(0, 128, 0)" : "rgba(0, 0, 0, 0)",
            }) as CSSStyleDeclaration,
        );

      expect(getBackgroundColor(deepElement)).toBe("rgb(0, 128, 0)");

      getComputedStyleSpy.mockRestore();
      document.body.removeChild(outerHost);
    });

    test("returns default when shadow DOM host also has transparent background", () => {
      const hostElement = document.createElement("div");
      document.body.appendChild(hostElement);
      const { shadowRootElement: innerElement } =
        createShadowDomElements(hostElement);

      const getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );

      expect(getBackgroundColor(innerElement)).toBe(
        defaultParentBackgroundColor,
      );

      getComputedStyleSpy.mockRestore();
      document.body.removeChild(hostElement);
    });
  });

  describe("Shadow DOM safety", () => {
    // Without the null-safety guard in useContrastMode, calling
    // `getComputedStyle(document.documentElement)` would throw when
    // `documentElement` is null (possible in some shadow DOM / SSR contexts).
    // This test overrides `document.documentElement` to null to verify we
    // handle that gracefully.
    test("handles null document.documentElement gracefully", async () => {
      const originalDocumentElement =
        Object.getOwnPropertyDescriptor(document, "documentElement") ??
        Object.getOwnPropertyDescriptor(Document.prototype, "documentElement");

      if (originalDocumentElement && !originalDocumentElement.configurable) {
        return;
      }

      Object.defineProperty(document, "documentElement", {
        value: null,
        configurable: true,
      });

      const TestComponent = () => {
        const { contrastContainerRef, contrastMode } = useContrastMode({});
        return (
          <div data-testid="shadow-safe" ref={contrastContainerRef}>
            {contrastMode}
          </div>
        );
      };

      try {
        // Should not throw
        const { getByTestId, unmount } = await render(
          <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
            <TestComponent />
          </ContrastModeContext.Provider>,
        );

        expect(getByTestId("shadow-safe")).toBeTruthy();
        await unmount();
      } finally {
        if (originalDocumentElement) {
          Object.defineProperty(
            document,
            "documentElement",
            originalDocumentElement,
          );
        } else {
          delete (document as unknown as Record<string, unknown>)[
            "documentElement"
          ];
        }
      }
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
        .mockImplementation(() => {});
      removeEventListenerSpy = vi
        .spyOn(document, "removeEventListener")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    test("should clean up observers and event listeners on unmount", async () => {
      const observeSpy = vi
        .spyOn(MutationObserver.prototype, "observe")
        .mockImplementation(() => {});
      const disconnectSpy = vi
        .spyOn(MutationObserver.prototype, "disconnect")
        .mockImplementation(() => {});
      const takeRecordsSpy = vi
        .spyOn(MutationObserver.prototype, "takeRecords")
        .mockImplementation(() => []);

      const TestComponent = () => {
        const { contrastContainerRef } = useContrastMode({});
        return <div ref={contrastContainerRef}>Test</div>;
      };

      const { unmount } = await render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      await unmount();

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
    test("should return the current contrast mode from context", async () => {
      const { result } = await renderHook(() => useContrastModeContext(), {
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

  test("detects parent background color changes", () => {
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
      test("converts black hex to rgb", () => {
        expect(hexToRgb("#000000").asFormattedString).toBe("rgb(0, 0, 0)");
      });

      test("converts white hex to rgb", () => {
        expect(hexToRgb("#ffffff").asFormattedString).toBe(
          "rgb(255, 255, 255)",
        );
      });

      test("converts mixed color hex to rgb", () => {
        expect(hexToRgb("#ff0088").asFormattedString).toBe("rgb(255, 0, 136)");
      });

      test("correctly converts HueNeutral50 token to rgb", () => {
        const result = hexToRgb(Tokens.HueNeutral50).asFormattedString;
        expect(result).toBe(hueNeutral50Rgb);
      });
    });

    describe("isTransparentColor", () => {
      test("identifies rgba(0, 0, 0, 0) as transparent", () => {
        expect(isTransparentColor("rgba(0, 0, 0, 0)")).toBe(true);
      });

      test('identifies "transparent" keyword as transparent', () => {
        expect(isTransparentColor("transparent")).toBe(true);
      });

      test("identifies solid colors as non-transparent", () => {
        expect(isTransparentColor("rgb(255, 255, 255)")).toBe(false);
        expect(isTransparentColor("rgba(255, 255, 255, 1)")).toBe(false);
        expect(isTransparentColor(defaultParentBackgroundColor)).toBe(false);
      });
    });

    describe("normalizeRgbaToRgb", () => {
      test("converts rgba to rgb format", () => {
        expect(normalizeRgbaToRgb("rgba(255, 128, 0, 0.5)")).toBe(
          "rgb(255, 128, 0)",
        );
      });

      test("handles zero alpha value", () => {
        expect(normalizeRgbaToRgb("rgba(255, 128, 0, 0)")).toBe(
          "rgb(255, 128, 0)",
        );
      });

      test("handles full alpha value", () => {
        expect(normalizeRgbaToRgb("rgba(255, 128, 0, 1)")).toBe(
          "rgb(255, 128, 0)",
        );
      });

      test("does not modify rgb format", () => {
        const rgbColor = "rgb(255, 128, 0)";
        expect(normalizeRgbaToRgb(rgbColor)).toBe(rgbColor);
      });
    });

    describe("normalizeBackgroundColor", () => {
      test("converts rgba to rgb and matches against HueNeutral50", () => {
        const rgbaColor = hueNeutral50Rgb
          .replace("rgb", "rgba")
          .replace(")", ", 0.5)");
        expect(normalizeBackgroundColor(rgbaColor)).toBe(Tokens.HueNeutral50);
      });

      test("returns original color if not matching HueNeutral50", () => {
        const rgbaColor = "rgba(255, 0, 0, 0.5)";
        expect(normalizeBackgroundColor(rgbaColor)).toBe("rgb(255, 0, 0)");
      });

      test("returns HueNeutral50 token for matching rgb value", () => {
        expect(normalizeBackgroundColor(hueNeutral50Rgb)).toBe(
          Tokens.HueNeutral50,
        );
      });

      test("returns original color for non-matching rgb value", () => {
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

      test("returns the computed background color of an element", () => {
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

      test("handles transparent background color", () => {
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

  describe("deriveContrastMode", () => {
    test("returns highContrast for HueNeutral50", () => {
      expect(deriveContrastMode(Tokens.HueNeutral50)).toBe("highContrast");
    });

    test("returns lowContrast for white", () => {
      expect(deriveContrastMode("rgb(255, 255, 255)")).toBe("lowContrast");
    });

    test("returns lowContrast for any non-HueNeutral50 color", () => {
      expect(deriveContrastMode("rgb(0, 0, 255)")).toBe("lowContrast");
    });
  });

  describe("observer skip for explicit contrastMode", () => {
    test("skips MutationObserver when explicit contrastMode is provided", async () => {
      const observeSpy = vi
        .spyOn(MutationObserver.prototype, "observe")
        .mockImplementation(() => {});
      const disconnectSpy = vi
        .spyOn(MutationObserver.prototype, "disconnect")
        .mockImplementation(() => {});
      const takeRecordsSpy = vi
        .spyOn(MutationObserver.prototype, "takeRecords")
        .mockImplementation(() => []);
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      const TestComponent = () => {
        const { contrastContainerRef, contrastMode } = useContrastMode({
          contrastMode: "highContrast",
        });
        return (
          <div data-testid="explicit" ref={contrastContainerRef}>
            {contrastMode}
          </div>
        );
      };

      const { getByTestId, unmount } = await render(
        <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
          <TestComponent />
        </ContrastModeContext.Provider>,
      );

      await expect
        .element(getByTestId("explicit"))
        .toHaveTextContent("highContrast");
      expect(observeSpy).not.toHaveBeenCalled();
      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        "transitionend",
        expect.any(Function),
      );

      await unmount();

      addEventListenerSpy.mockRestore();
      disconnectSpy.mockRestore();
      observeSpy.mockRestore();
      takeRecordsSpy.mockRestore();
    });
  });
});
