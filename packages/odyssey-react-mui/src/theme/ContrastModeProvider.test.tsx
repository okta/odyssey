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
import { render, screen, act } from "@testing-library/react";
import {
  OdysseyThemeProvider,
  useContrastModeContext,
} from "../OdysseyThemeProvider";
import * as Tokens from "@okta/odyssey-design-tokens";
import "@testing-library/jest-dom";

// Mock component to test the useContrastModeContext hook
const TestComponent = () => {
  const { contrastMode } = useContrastModeContext();
  return <div data-testid="test-component">{contrastMode}</div>;
};

describe("OdysseyThemeProvider", () => {
  it("provides lowContrast mode by default", () => {
    render(
      <OdysseyThemeProvider>
        <TestComponent />
      </OdysseyThemeProvider>,
    );
    expect(screen.getByTestId("test-component")).toHaveTextContent(
      "lowContrast",
    );
  });

  it("respects explicitly set contrast mode", () => {
    render(
      <OdysseyThemeProvider contrastMode="highContrast">
        <TestComponent />
      </OdysseyThemeProvider>,
    );
    expect(screen.getByTestId("test-component")).toHaveTextContent(
      "highContrast",
    );
  });

  it("detects high contrast mode based on background color", () => {
    // Mock the getBackgroundColor function to return the high contrast color
    jest.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          backgroundColor: Tokens.HueNeutral50,
        }) as CSSStyleDeclaration,
    );

    render(
      <OdysseyThemeProvider>
        <TestComponent />
      </OdysseyThemeProvider>,
    );

    // Use act to ensure all updates have been processed
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId("test-component")).toHaveTextContent(
      "highContrast",
    );
  });

  it("updates contrast mode when background color changes", () => {
    const { rerender } = render(
      <OdysseyThemeProvider>
        <TestComponent />
      </OdysseyThemeProvider>,
    );

    expect(screen.getByTestId("test-component")).toHaveTextContent(
      "lowContrast",
    );

    // Simulate a change in background color
    jest.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          backgroundColor: Tokens.HueNeutral50,
        }) as CSSStyleDeclaration,
    );

    // Trigger a re-render
    rerender(
      <OdysseyThemeProvider>
        <TestComponent />
      </OdysseyThemeProvider>,
    );

    // Use act to ensure all updates have been processed
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId("test-component")).toHaveTextContent(
      "highContrast",
    );
  });
});
