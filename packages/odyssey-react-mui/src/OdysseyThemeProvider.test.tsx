/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { OdysseyThemeProvider } from "./OdysseyThemeProvider";
import { ContrastModeContext } from "./useContrastMode";
import * as Tokens from "@okta/odyssey-design-tokens";
import { useContext } from "react";

describe("OdysseyThemeProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.documentElement.style.setProperty("backgroundColor", null);
  });

  it("should update contrast mode based on background color changes", async () => {
    const getComputedStyleSpy = jest
      .spyOn(window, "getComputedStyle")
      .mockImplementation(
        () => ({ backgroundColor: Tokens.HueNeutral50 }) as CSSStyleDeclaration,
      );

    const TestComponent = () => {
      const { contrastMode } = useContext(ContrastModeContext);
      return <div data-testid="container">{contrastMode}</div>;
    };

    const { getByTestId } = render(
      <OdysseyThemeProvider>
        <TestComponent />
      </OdysseyThemeProvider>,
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

    await waitFor(
      () => {
        expect(getByTestId("container").textContent).toBe("highContrast");
      },
      { timeout: 1000 },
    );

    getComputedStyleSpy.mockRestore();
  });
});
