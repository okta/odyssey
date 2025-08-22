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
import { useTheme } from "@mui/material/styles";
import * as Tokens from "@okta/odyssey-design-tokens";
import { useContext } from "react";
import { MockInstance } from "vitest";

import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext.js";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider.js";
import { ContrastModeContext } from "./useContrastMode.js";

describe("OdysseyThemeProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.style.setProperty("backgroundColor", null);
  });

  describe("contrast mode handling", () => {
    let getComputedStyleSpy: MockInstance<typeof window.getComputedStyle>;

    beforeEach(() => {
      getComputedStyleSpy = vi
        .spyOn(window, "getComputedStyle")
        .mockImplementation(
          () =>
            ({ backgroundColor: Tokens.HueNeutral50 }) as CSSStyleDeclaration,
        );
    });

    afterEach(() => {
      getComputedStyleSpy.mockRestore();
    });

    it("should update contrast mode based on background color changes", async () => {
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

      await waitFor(() => {
        expect(getByTestId("container").textContent).toBe("highContrast");
      });
    });
  });

  describe("theme customization", () => {
    it("should merge theme overrides with base theme", () => {
      const themeOverride = {
        palette: {
          primary: {
            main: "#000000",
          },
        },
      };

      const TestComponent = () => {
        const theme = useTheme();
        return <div data-testid="theme-test">{theme.palette.primary.main}</div>;
      };

      const { getByTestId } = render(
        <OdysseyThemeProvider themeOverride={themeOverride}>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      expect(getByTestId("theme-test").textContent).toBe("#000000");
    });

    it("should merge design tokens override with base tokens", () => {
      const designTokensOverride = {
        HueNeutral50: "#654321",
      };

      const TestComponent = () => {
        const tokens = useOdysseyDesignTokens();
        return <div data-testid="token-test">{tokens.HueNeutral50}</div>;
      };

      const { getByTestId } = render(
        <OdysseyThemeProvider designTokensOverride={designTokensOverride}>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      expect(getByTestId("token-test").textContent).toBe("#654321");
    });

    it("should properly handle nested providers with different configurations", () => {
      const outerThemeOverride = {
        palette: {
          primary: {
            main: "#111111",
          },
        },
      };

      const innerThemeOverride = {
        palette: {
          primary: {
            main: "#222222",
          },
        },
      };

      const TestComponent = () => {
        const theme = useTheme();
        return (
          <div data-testid="nested-test">{theme.palette.primary.main}</div>
        );
      };

      const { getByTestId } = render(
        <OdysseyThemeProvider themeOverride={outerThemeOverride}>
          <OdysseyThemeProvider themeOverride={innerThemeOverride}>
            <TestComponent />
          </OdysseyThemeProvider>
        </OdysseyThemeProvider>,
      );

      expect(getByTestId("nested-test").textContent).toBe("#222222");
    });
  });

  describe("shadow DOM configuration", () => {
    let shadowRoot: HTMLDivElement;
    let shadowDom: HTMLDivElement;

    beforeEach(() => {
      shadowRoot = document.createElement("div");
      shadowDom = document.createElement("div");
    });

    it("should properly configure shadow root element for MUI components", () => {
      const TestComponent = () => {
        const theme = useTheme();
        return (
          <div data-testid="shadow-root-test">
            {theme.components?.MuiPopover?.defaultProps?.container ===
            shadowRoot
              ? "shadow-root-configured"
              : "no-shadow-root"}
          </div>
        );
      };

      const { getByTestId } = render(
        <OdysseyThemeProvider shadowRootElement={shadowRoot}>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      expect(getByTestId("shadow-root-test").textContent).toBe(
        "shadow-root-configured",
      );
    });

    it("should handle both shadowRootElement and deprecated shadowDomElement", () => {
      const TestComponent = () => {
        const theme = useTheme();
        return (
          <div data-testid="shadow-test">
            {theme.components?.MuiPopover?.defaultProps?.container ===
            shadowRoot
              ? "using-shadow-root"
              : "using-shadow-dom"}
          </div>
        );
      };

      const { getByTestId } = render(
        <OdysseyThemeProvider
          shadowRootElement={shadowRoot}
          shadowDomElement={shadowDom}
        >
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      expect(getByTestId("shadow-test").textContent).toBe("using-shadow-root");
    });
  });
});
