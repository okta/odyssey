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

import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import {
  ThemeContrastProvider,
  useThemeContrastContext,
  getBackgroundColor,
} from "../ThemeContrastProvider";
import * as Tokens from "@okta/odyssey-design-tokens";
import "@testing-library/jest-dom";

jest.mock("../ThemeContrastProvider", () => ({
  ...jest.requireActual("../ThemeContrastProvider"),
  getBackgroundColor: jest.fn(),
}));

const TestComponent = () => {
  const { contrastMode, parentBackgroundColor } = useThemeContrastContext();
  return (
    <div role="status" aria-label="Contrast Mode">
      {contrastMode}:{parentBackgroundColor}
    </div>
  );
};

describe("ThemeContrastProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("provides lowContrast mode by default when background is white", async () => {
    (getBackgroundColor as jest.Mock).mockReturnValue("#ffffff");

    render(
      <ThemeContrastProvider>
        <TestComponent />
      </ThemeContrastProvider>,
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(
      screen.getByRole("status", { name: "Contrast Mode" }),
    ).toHaveTextContent("lowContrast:");
  });

  it("respects explicitly set contrast mode", async () => {
    render(
      <ThemeContrastProvider contrastMode="highContrast">
        <TestComponent />
      </ThemeContrastProvider>,
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(
      screen.getByRole("status", { name: "Contrast Mode" }),
    ).toHaveTextContent("highContrast:");
  });

  it("maintains lowContrast mode when background color is HueNeutral50", async () => {
    (getBackgroundColor as jest.Mock).mockReturnValue(Tokens.HueNeutral50);

    render(
      <ThemeContrastProvider>
        <TestComponent />
      </ThemeContrastProvider>,
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(
      screen.getByRole("status", { name: "Contrast Mode" }),
    ).toHaveTextContent("lowContrast:");
  });

  it("maintains contrast mode when background color changes", async () => {
    (getBackgroundColor as jest.Mock).mockReturnValue("#ffffff");

    const { rerender } = render(
      <ThemeContrastProvider>
        <TestComponent />
      </ThemeContrastProvider>,
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(
      screen.getByRole("status", { name: "Contrast Mode" }),
    ).toHaveTextContent("lowContrast:");

    (getBackgroundColor as jest.Mock).mockReturnValue(Tokens.HueNeutral50);

    rerender(
      <ThemeContrastProvider>
        <TestComponent />
      </ThemeContrastProvider>,
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(
      screen.getByRole("status", { name: "Contrast Mode" }),
    ).toHaveTextContent("lowContrast:");
  });

  it("uses custom hook to manage contrast mode", async () => {
    (getBackgroundColor as jest.Mock).mockReturnValue("#ffffff");

    const { result, rerender } = renderHook(() => useThemeContrastContext(), {
      wrapper: ThemeContrastProvider,
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.contrastMode).toBe("lowContrast");
    expect(result.current.parentBackgroundColor).toBe("");

    (getBackgroundColor as jest.Mock).mockReturnValue(Tokens.HueNeutral50);

    rerender();

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.contrastMode).toBe("lowContrast");
    expect(result.current.parentBackgroundColor).toBe("");
  });
});
