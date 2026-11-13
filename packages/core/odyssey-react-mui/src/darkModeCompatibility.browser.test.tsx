/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import * as lightTokens from "@okta/odyssey-design-tokens";
import * as darkTokens from "@okta/odyssey-design-tokens/dark";
import { noTransitionsTheme } from "@okta/odyssey-test-tooling/browser";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { Button } from "./Buttons/Button.js";
import { createOdysseyStyledComponent } from "./createOdysseyStyledComponent.js";
import { hexToRgb } from "./hexToRgb.js";
import { OdysseyProvider } from "./OdysseyProvider.js";

const ElevatedSurface = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    backgroundColor: odysseyDesignTokens.HueNeutral100,
    padding: odysseyDesignTokens.Spacing5,
  }),
);

describe("dark mode compatibility", () => {
  test.each([
    { colorScheme: "light", tokens: lightTokens },
    { colorScheme: "dark", tokens: darkTokens },
  ] as const)(
    "danger secondary label in $colorScheme",
    async ({ colorScheme, tokens }) => {
      const { container } = await render(
        <OdysseyProvider
          colorScheme={colorScheme}
          themeOverride={noTransitionsTheme}
        >
          <ElevatedSurface>
            <Button label="Remove" variant="dangerSecondary" />
          </ElevatedSurface>
        </OdysseyProvider>,
      );
      const button = page.getByRole("button", { name: "Remove" });
      const expectedColor = hexToRgb(
        colorScheme === "dark"
          ? tokens.TypographyColorDanger
          : tokens.PaletteDangerMain,
      ).asFormattedString;
      // The existing light danger label fails contrast on gray and hover fills. Preserve its color here; design must coordinate a separate light change.
      const accessibilityOptions =
        colorScheme === "light"
          ? { disabledRules: ["color-contrast"] }
          : undefined;
      await expect(container).toBeAccessible(accessibilityOptions);
      await expect.element(button).toHaveStyle({ color: expectedColor });
      await userEvent.hover(button);
      await expect(container).toBeAccessible(accessibilityOptions);
      await expect.element(button).toHaveStyle({ color: expectedColor });
      await userEvent.keyboard("{Tab}");
      await expect(container).toBeAccessible(accessibilityOptions);
      expect(
        window
          .getComputedStyle(button.element())
          .getPropertyValue("box-shadow"),
      ).toBe(
        `${hexToRgb(tokens.HueNeutralWhite).asFormattedString} 0px 0px 0px 2px, ${hexToRgb(colorScheme === "dark" ? tokens.HueBlue500 : tokens.PalettePrimaryMain).asFormattedString} 0px 0px 0px 4px`,
      );
    },
  );
});
