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

import { render, waitFor, act } from "@testing-library/react";
import {
  ContrastModeContext,
  useContrastMode,
  useContrastModeContext,
  getBackgroundColor,
  hueNeutral50Rgb,
} from "../useContrastMode";
import * as Tokens from "@okta/odyssey-design-tokens";
import { renderHook } from "@testing-library/react";

describe("useContrastMode and related functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.documentElement.style.setProperty("backgroundColor", null);
  });

  describe("useContrastMode hook", () => {
    it("should return lowContrast mode by default", () => {
      const getComputedStyleSpy = jest
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );

      const { result } = renderHook(() => useContrastMode({}), {
        wrapper: ({ children }) => (
          <ContrastModeContext.Provider value={{ contrastMode: "lowContrast" }}>
            {children}
          </ContrastModeContext.Provider>
        ),
      });
      expect(result.current.parentBackgroundColor).toBe("#ffffff");
      expect(result.current.contrastMode).toBe("lowContrast");
      expect(result.current.contrastContainerRef.current).toBe(null);

      getComputedStyleSpy.mockRestore();
    });

    it("should respect explicitly set contrast mode", () => {
      const getComputedStyleSpy = jest
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );

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

      getComputedStyleSpy.mockRestore();
    });

    it("should update contrast mode based on background color changes", async () => {
      const getComputedStyleSpy = jest
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: Tokens.HueNeutral50 }) as CSSStyleDeclaration,
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

      act(() => {
        testContainer.style.backgroundColor = Tokens.HueNeutral50;
        const event = new Event("transitionend");
        Object.defineProperty(event, "propertyName", {
          value: "background-color",
        });
        testContainer.dispatchEvent(event);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      await waitFor(
        () => {
          expect(getByTestId("container").textContent).toBe("highContrast");
        },
        { timeout: 1000 },
      );

      getComputedStyleSpy.mockRestore();
    });
  });

  describe("getBackgroundColor", () => {
    it("returns the background color of the element if it is not transparent", () => {
      const getComputedStyleSpy = jest
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
      element.style.backgroundColor = "rgb(255, 0, 0)";
      const result = getBackgroundColor(element);
      expect(result).toBe("rgb(255, 0, 0)");

      getComputedStyleSpy.mockRestore();
    });

    it('returns "#ffffff" if no non-transparent background is found', () => {
      const getComputedStyleSpy = jest
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: "rgba(0, 0, 0, 0)" }) as CSSStyleDeclaration,
        );

      const element = document.createElement("div");
      expect(getBackgroundColor(element)).toBe("#ffffff");

      getComputedStyleSpy.mockRestore();
    });

    it("returns the background color of the parent if the element is transparent", () => {
      const parent = document.createElement("div");
      const child = document.createElement("div");
      parent.appendChild(child);
      parent.style.backgroundColor = "rgb(0, 255, 0)";

      const getComputedStyleSpy = jest
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
      const getComputedStyleSpy = jest
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () => ({ backgroundColor: hueNeutral50Rgb }) as CSSStyleDeclaration,
        );

      const element = document.createElement("div");
      element.style.backgroundColor = hueNeutral50Rgb;
      expect(getBackgroundColor(element)).toBe(Tokens.HueNeutral50);

      getComputedStyleSpy.mockRestore();
    });

    it("handles nested transparent elements correctly", () => {
      const grandparent = document.createElement("div");
      const parent = document.createElement("div");
      const child = document.createElement("div");
      grandparent.appendChild(parent);
      parent.appendChild(child);
      grandparent.style.backgroundColor = "rgb(0, 0, 255)";

      const getComputedStyleSpy = jest
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

  // Rest of the tests remain unchanged...
  describe("MutationObserver functionality", () => {
    let originalAddEventListener: typeof document.addEventListener;
    let originalRemoveEventListener: typeof document.removeEventListener;

    beforeEach(() => {
      originalAddEventListener = document.addEventListener;
      originalRemoveEventListener = document.removeEventListener;
      document.addEventListener = jest.fn();
      document.removeEventListener = jest.fn();
    });

    afterEach(() => {
      document.addEventListener = originalAddEventListener;
      document.removeEventListener = originalRemoveEventListener;
    });

    it("should clean up observers and event listeners on unmount", () => {
      const disconnect = jest.fn();
      const observe = jest.fn();

      const mockMutationObserver = jest.fn<
        MutationObserver,
        [MutationCallback]
      >(() => ({
        disconnect,
        observe,
        takeRecords: jest.fn(),
      }));

      const originalMutationObserver = global.MutationObserver;
      global.MutationObserver = mockMutationObserver;

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

      expect(disconnect).toHaveBeenCalled();
      expect(document.removeEventListener).toHaveBeenCalledWith(
        "transitionend",
        expect.any(Function),
      );

      global.MutationObserver = originalMutationObserver;
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

    const getComputedStyleSpy = jest
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
});
