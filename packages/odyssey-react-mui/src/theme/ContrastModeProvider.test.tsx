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
import { render, waitFor } from "@testing-library/react";
import {
  ContrastModeContext,
  ContrastModeProvider,
  useContrastModeContext,
  getBackgroundColor,
} from "../ContrastModeProvider";
import * as Tokens from "@okta/odyssey-design-tokens";
import { renderHook } from "@testing-library/react-hooks";

// Helper function to normalize color formats
const normalizeColor = (color: string) => {
  if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }
  return color.toLowerCase();
};

describe("ContrastModeContext and related functions", () => {
  const originalGetComputedStyle = window.getComputedStyle;

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

  describe("ContrastModeContext Consumer", () => {
    it("provides lowContrast mode for white background", async () => {
      const mockConsumer = jest.fn();

      render(
        <div style={{ backgroundColor: Tokens.HueNeutralWhite }}>
          <ContrastModeProvider>
            <ContrastModeContext.Consumer>
              {(value) => {
                mockConsumer(value);
                return null;
              }}
            </ContrastModeContext.Consumer>
          </ContrastModeProvider>
        </div>,
      );

      await waitFor(() => {
        expect(mockConsumer).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        const lastCall =
          mockConsumer.mock.calls[mockConsumer.mock.calls.length - 1][0];
        expect(lastCall.contrastMode).toBe("lowContrast");
        expect(normalizeColor(lastCall.parentBackgroundColor)).toBe("#ffffff");
      });
    });

    it("provides highContrast mode for Tokens.HueNeutral50 background", async () => {
      const mockConsumer = jest.fn();

      render(
        <div style={{ backgroundColor: Tokens.HueNeutral50 }}>
          <ContrastModeProvider>
            <ContrastModeContext.Consumer>
              {(value) => {
                mockConsumer(value);
                return null;
              }}
            </ContrastModeContext.Consumer>
          </ContrastModeProvider>
        </div>,
      );

      await waitFor(() => {
        expect(mockConsumer).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        const lastCall =
          mockConsumer.mock.calls[mockConsumer.mock.calls.length - 1][0];
        expect(lastCall.contrastMode).toBe("highContrast");
        expect(normalizeColor(lastCall.parentBackgroundColor)).toBe(
          normalizeColor(Tokens.HueNeutral50),
        );
      });
    });
  });
  describe("useContrastModeContext hook", () => {
    it("should return lowContrast mode by default", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ContrastModeProvider>{children}</ContrastModeProvider>
      );

      const { result } = renderHook(() => useContrastModeContext(), {
        wrapper,
      });

      expect(result.current.contrastMode).toBe("lowContrast");
      expect(typeof result.current.parentBackgroundColor).toBe("string");
    });

    it("should respect explicitly set contrast mode", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ContrastModeProvider contrastMode="highContrast">
          {children}
        </ContrastModeProvider>
      );

      const { result } = renderHook(() => useContrastModeContext(), {
        wrapper,
      });

      expect(result.current.contrastMode).toBe("highContrast");
    });

    it("should not change contrast mode when explicitly set, even if background changes", () => {
      const mockConsumer = jest.fn();
      const { rerender } = render(
        <div style={{ backgroundColor: Tokens.HueNeutralWhite }}>
          <ContrastModeProvider contrastMode="highContrast">
            <ContrastModeContext.Consumer>
              {(value) => {
                mockConsumer(value);
                return null;
              }}
            </ContrastModeContext.Consumer>
          </ContrastModeProvider>
        </div>,
      );

      waitFor(() => {
        expect(mockConsumer).toHaveBeenCalledTimes(2);
      });

      waitFor(() => {
        const lastCall =
          mockConsumer.mock.calls[mockConsumer.mock.calls.length - 1][0];
        expect(lastCall.contrastMode).toBe("highContrast");
      });

      rerender(
        <div style={{ backgroundColor: Tokens.HueNeutral50 }}>
          <ContrastModeProvider contrastMode="highContrast">
            <ContrastModeContext.Consumer>
              {(value) => {
                mockConsumer(value);
                return null;
              }}
            </ContrastModeContext.Consumer>
          </ContrastModeProvider>
        </div>,
      );

      waitFor(() => {
        expect(mockConsumer).toHaveBeenCalledTimes(4);
      });

      waitFor(() => {
        const lastCall =
          mockConsumer.mock.calls[mockConsumer.mock.calls.length - 1][0];
        expect(lastCall.contrastMode).toBe("highContrast");
      });
    });
  });

  describe("getBackgroundColor", () => {
    it("returns the background color of the element if it is not transparent", () => {
      const element = document.createElement("div");
      element.style.backgroundColor = "rgb(255, 0, 0)";
      expect(getBackgroundColor(element)).toBe("rgb(255, 0, 0)");
    });

    it("returns the background color of the parent if the element is transparent", () => {
      const parent = document.createElement("div");
      const child = document.createElement("div");
      parent.appendChild(child);
      parent.style.backgroundColor = "rgb(0, 255, 0)";
      expect(getBackgroundColor(child)).toBe("rgb(0, 255, 0)");
    });

    it('returns "#ffffff" if no non-transparent background is found', () => {
      const element = document.createElement("div");
      expect(getBackgroundColor(element)).toBe("#ffffff");
    });

    it("keeps rgba as is (does not normalize to rgb)", () => {
      const element = document.createElement("div");
      element.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      expect(getBackgroundColor(element)).toBe("rgba(255, 0, 0, 0.5)");
    });

    it("returns HueNeutral50 token for its RGB equivalent", () => {
      const element = document.createElement("div");
      element.style.backgroundColor = Tokens.HueNeutral50;
      expect(getBackgroundColor(element)).toBe(Tokens.HueNeutral50);
    });

    it("handles nested transparent elements correctly", () => {
      const grandparent = document.createElement("div");
      const parent = document.createElement("div");
      const child = document.createElement("div");
      grandparent.appendChild(parent);
      parent.appendChild(child);
      grandparent.style.backgroundColor = "rgb(0, 0, 255)";
      expect(getBackgroundColor(child)).toBe("rgb(0, 0, 255)");
    });
  });
});
