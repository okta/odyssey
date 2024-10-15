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

import React, { ReactNode, useState } from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
  ContrastModeProvider,
  useContrastModeContext,
} from "../ContrastModeProvider";
import * as Tokens from "@okta/odyssey-design-tokens";
import "@testing-library/jest-dom";

// Minimal mock for getComputedStyle
// This mock is necessary because jsdom doesn't fully implement getComputedStyle
// and we need it to return background colors for our tests to work properly.
const originalGetComputedStyle = window.getComputedStyle;
beforeAll(() => {
  window.getComputedStyle = jest
    .fn()
    .mockImplementation((element: HTMLElement) => ({
      ...originalGetComputedStyle(element),
      backgroundColor: element.style.backgroundColor || "rgba(0, 0, 0, 0)",
    }));
});

afterAll(() => {
  (window.getComputedStyle as jest.Mock).mockRestore();
});

const TestComponent = () => {
  const { contrastMode, parentBackgroundColor } = useContrastModeContext();
  return (
    <div role="status" aria-label="Contrast Mode">
      {contrastMode}:{parentBackgroundColor}
    </div>
  );
};

const DynamicBackgroundWrapper = ({ initialColor, children }) => {
  const [backgroundColor, setBackgroundColor] = useState(initialColor);

  return (
    <div data-testid="parent" style={{ backgroundColor }}>
      <ContrastModeProvider key={backgroundColor}>
        {children}
      </ContrastModeProvider>
      <button onClick={() => setBackgroundColor(Tokens.HueNeutral50)}>
        Change Background
      </button>
    </div>
  );
};

const renderWithDynamicBackground = (initialColor: string) => {
  return render(
    <DynamicBackgroundWrapper initialColor={initialColor}>
      <TestComponent />
    </DynamicBackgroundWrapper>,
  );
};

describe("ContrastModeProvider", () => {
  it("provides lowContrast mode when background is white", async () => {
    renderWithDynamicBackground("#ffffff");

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "lowContrast:rgb(255, 255, 255)",
      );
    });
  });

  it("provides highContrast mode when background is HueNeutral50", async () => {
    renderWithDynamicBackground(Tokens.HueNeutral50);

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        `highContrast:${Tokens.HueNeutral50}`,
      );
    });
  });

  it("updates contrast mode when background color changes", async () => {
    const { getByText } = renderWithDynamicBackground("#ffffff");

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "lowContrast:rgb(255, 255, 255)",
      );
    });

    act(() => {
      getByText("Change Background").click();
    });

    await waitFor(
      () => {
        expect(screen.getByRole("status")).toHaveTextContent(
          `highContrast:${Tokens.HueNeutral50}`,
        );
      },
      { timeout: 3000 },
    );
  });

  it("uses custom hook to manage contrast mode", async () => {
    const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
      <div style={{ backgroundColor: "#ffffff" }}>
        <ContrastModeProvider>{children}</ContrastModeProvider>
      </div>
    );

    const { result } = renderHook(() => useContrastModeContext(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.contrastMode).toBe("lowContrast");
      expect(result.current.parentBackgroundColor).toBe("rgb(255, 255, 255)");
    });
  });
});
