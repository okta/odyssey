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

import type { MockInstance } from "vitest";

import { useTheme } from "@mui/material/styles";
import * as Tokens from "@okta/odyssey-design-tokens";
import { useContext } from "react";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext.js";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider.js";
import { ContrastModeContext } from "./useContrastMode.js";

describe("OdysseyThemeProvider", () => {
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

    test("should update contrast mode based on background color changes", async () => {
      const TestComponent = () => {
        const { contrastMode } = useContext(ContrastModeContext);
        return <div data-testid="container">{contrastMode}</div>;
      };

      await render(
        <OdysseyThemeProvider>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      const testContainer = page.getByTestId("container").element();

      testContainer.style.setProperty("background-color", Tokens.HueNeutral50);
      const event = new Event("transitionend");
      Object.defineProperty(event, "propertyName", {
        value: "background-color",
      });
      testContainer.dispatchEvent(event);

      expect(page.getByTestId("container")).toHaveTextContent("highContrast");
    });
  });

  describe("theme customization", () => {
    test("should merge theme overrides with base theme", async () => {
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

      await render(
        <OdysseyThemeProvider themeOverride={themeOverride}>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      await expect
        .element(page.getByTestId("theme-test"))
        .toHaveTextContent("#000000");
    });

    test("should merge design tokens override with base tokens", async () => {
      const designTokensOverride = {
        HueNeutral50: "#654321",
      };

      const TestComponent = () => {
        const tokens = useOdysseyDesignTokens();
        return <div data-testid="token-test">{tokens.HueNeutral50}</div>;
      };

      await render(
        <OdysseyThemeProvider designTokensOverride={designTokensOverride}>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      await expect
        .element(page.getByTestId("token-test"))
        .toHaveTextContent("#654321");
    });

    test("should properly handle nested providers with different configurations", async () => {
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

      await render(
        <OdysseyThemeProvider themeOverride={outerThemeOverride}>
          <OdysseyThemeProvider themeOverride={innerThemeOverride}>
            <TestComponent />
          </OdysseyThemeProvider>
        </OdysseyThemeProvider>,
      );

      await expect
        .element(page.getByTestId("nested-test"))
        .toHaveTextContent("#222222");
    });
  });

  describe("shadow DOM configuration", () => {
    let shadowRoot: HTMLDivElement;
    let shadowDom: HTMLDivElement;

    beforeEach(() => {
      shadowRoot = document.createElement("div");
      shadowDom = document.createElement("div");
    });

    test("should properly configure shadow root element for MUI components", async () => {
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

      await render(
        <OdysseyThemeProvider shadowRootElement={shadowRoot}>
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      await expect
        .element(page.getByTestId("shadow-root-test"))
        .toHaveTextContent("shadow-root-configured");
    });

    test("should handle both shadowRootElement and deprecated shadowDomElement", async () => {
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

      await render(
        <OdysseyThemeProvider
          shadowDomElement={shadowDom}
          shadowRootElement={shadowRoot}
        >
          <TestComponent />
        </OdysseyThemeProvider>,
      );

      await expect
        .element(page.getByTestId("shadow-test"))
        .toHaveTextContent("using-shadow-root");
    });
  });
});
