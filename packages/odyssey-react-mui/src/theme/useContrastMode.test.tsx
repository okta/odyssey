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

import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import {
  ContrastModeContext,
  useContrastMode,
  useContrastModeContext,
  getBackgroundColor,
  hueNeutral50Rgb,
  type ContrastModeContextType,
} from "../useContrastMode";
import * as Tokens from "@okta/odyssey-design-tokens";
import { renderHook } from "@testing-library/react";
// Common wrapper component for tests
const createWrapper = (
  contextValue: ContrastModeContextType,
): React.FC<{ children: React.ReactNode }> => {
  return ({ children }) => (
    <ContrastModeContext.Provider value={contextValue}>
      {children}
    </ContrastModeContext.Provider>
  );
};

describe("useContrastMode and related functions", () => {
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({
      backgroundColor: "rgba(0, 0, 0, 0)",
    }));
  });

  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle;
    jest.clearAllMocks();
    document.documentElement.style.backgroundColor = "";
  });

  describe("useContrastMode hook", () => {
    it("should return lowContrast mode by default", () => {
      const { result } = renderHook(() => useContrastMode({}), {
        wrapper: createWrapper({ contrastMode: "lowContrast" }),
      });

      expect(result.current.contrastMode).toBe("lowContrast");
      expect(result.current.contrastContainerRef.current).toBe(null);
      expect(result.current.parentBackgroundColor).toBe("#ffffff");
    });

    it("should respect explicitly set contrast mode", () => {
      const { result } = renderHook(
        () => useContrastMode({ contrastMode: "highContrast" }),
        {
          wrapper: createWrapper({ contrastMode: "lowContrast" }),
        },
      );

      expect(result.current.contrastMode).toBe("highContrast");
    });

    it("should update contrast mode based on background color changes", async () => {
      const TestComponent = () => {
        const { contrastContainerRef, contrastMode } = useContrastMode({});
        return (
          <div ref={contrastContainerRef} data-testid="container">
            {contrastMode}
          </div>
        );
      };

      // Mock getComputedStyle before rendering
      window.getComputedStyle = jest.fn().mockImplementation(() => ({
        backgroundColor: Tokens.HueNeutral50,
      }));

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

      // Add a small delay to allow for state updates
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      await waitFor(
        () => {
          expect(getByTestId("container").textContent).toBe("highContrast");
        },
        { timeout: 1000 },
      );
    });
  });

  describe("getBackgroundColor", () => {
    beforeEach(() => {
      window.getComputedStyle = jest
        .fn()
        .mockImplementation((element: HTMLElement) => ({
          backgroundColor: element.style.backgroundColor || "rgba(0, 0, 0, 0)",
        }));
    });

    afterEach(() => {
      window.getComputedStyle = originalGetComputedStyle;
    });

    it("returns the background color of the element if it is not transparent", () => {
      const element = document.createElement("div");
      element.style.backgroundColor = "rgb(255, 0, 0)";
      const result = getBackgroundColor(element);
      expect(result).toBe("rgb(255, 0, 0)");
    });

    it("returns the background color of the parent if the element is transparent", () => {
      const parent = document.createElement("div");
      const child = document.createElement("div");
      parent.appendChild(child);
      parent.style.backgroundColor = "rgb(0, 255, 0)";

      // Update mock for this specific test
      window.getComputedStyle = jest
        .fn()
        .mockImplementation((el: HTMLElement) => ({
          backgroundColor:
            el === parent ? "rgb(0, 255, 0)" : "rgba(0, 0, 0, 0)",
        }));

      expect(getBackgroundColor(child)).toBe("rgb(0, 255, 0)");
    });

    it('returns "#ffffff" if no non-transparent background is found', () => {
      const element = document.createElement("div");
      expect(getBackgroundColor(element)).toBe("#ffffff");
    });

    it("returns HueNeutral50 token for its RGB equivalent", () => {
      const element = document.createElement("div");
      element.style.backgroundColor = hueNeutral50Rgb;

      window.getComputedStyle = jest.fn().mockImplementation(() => ({
        backgroundColor: hueNeutral50Rgb,
      }));

      expect(getBackgroundColor(element)).toBe(Tokens.HueNeutral50);
    });

    it("handles nested transparent elements correctly", () => {
      const grandparent = document.createElement("div");
      const parent = document.createElement("div");
      const child = document.createElement("div");
      grandparent.appendChild(parent);
      parent.appendChild(child);
      grandparent.style.backgroundColor = "rgb(0, 0, 255)";

      window.getComputedStyle = jest
        .fn()
        .mockImplementation((el: HTMLElement) => ({
          backgroundColor:
            el === grandparent ? "rgb(0, 0, 255)" : "rgba(0, 0, 0, 0)",
        }));

      expect(getBackgroundColor(child)).toBe("rgb(0, 0, 255)");
    });
  });

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
        wrapper: createWrapper({ contrastMode: "highContrast" }),
      });

      expect(result.current.contrastMode).toBe("highContrast");
    });
  });
});
