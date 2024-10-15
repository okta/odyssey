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

import { render, waitFor } from "@testing-library/react";
import {
  ContrastModeContext,
  ContrastModeProvider,
} from "../ContrastModeProvider";
import * as Tokens from "@okta/odyssey-design-tokens";

// Helper function to normalize color formats (e.g., converting "rgb(255, 255, 255)" to "#ffffff").
const normalizeColor = (color: string) => {
  if (color.startsWith("rgb")) {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }
  return color.toLowerCase();
};

describe("ContrastModeContext Consumer", () => {
  const originalGetComputedStyle = window.getComputedStyle;

  beforeEach(() => {
    // Mocking `getComputedStyle` to simulate real browser behavior for background color detection.
    window.getComputedStyle = jest
      .fn()
      .mockImplementation((element: HTMLElement) => ({
        backgroundColor: element.style.backgroundColor || "rgba(0, 0, 0, 0)",
      }));
  });

  afterEach(() => {
    window.getComputedStyle = originalGetComputedStyle;
  });

  it("provides lowContrast mode for white background", async () => {
    const mockConsumer = jest.fn();

    // Wrap the `mockConsumer` in a function that matches the expected prop type.
    render(
      <div style={{ backgroundColor: "#ffffff" }}>
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

    // Ensure the mock consumer has been called twice (initial and after context updates).
    await waitFor(() => {
      expect(mockConsumer).toHaveBeenCalledTimes(2);
    });

    console.log(
      "mockConsumer calls (for white background): ",
      mockConsumer.mock.calls,
    );

    // Validate the final call to ensure it's in "lowContrast" mode for white background.
    await waitFor(() => {
      const lastCall =
        mockConsumer.mock.calls[mockConsumer.mock.calls.length - 1][0];
      expect(lastCall.contrastMode).toBe("lowContrast");
      expect(normalizeColor(lastCall.parentBackgroundColor)).toBe("#ffffff");
    });
  });

  it("provides highContrast mode for Tokens.HueNeutral50 background", async () => {
    const mockConsumer = jest.fn();

    console.log("Tokens.HueNeutral50:", Tokens.HueNeutral50);

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

    // Ensure the mock consumer has been called twice (initial and after context updates).
    await waitFor(() => {
      expect(mockConsumer).toHaveBeenCalledTimes(2);
    });

    console.log(
      "mockConsumer calls (for gray background): ",
      mockConsumer.mock.calls,
    );

    // Validate the final call to ensure it's in "highContrast" mode for gray background.
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
