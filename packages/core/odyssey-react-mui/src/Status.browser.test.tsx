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

import * as lightModeDesignTokens from "@okta/odyssey-design-tokens";
import * as darkModeDesignTokens from "@okta/odyssey-design-tokens/dark";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { hexToRgb } from "./hexToRgb.js";
import { OdysseyProvider } from "./OdysseyProvider.js";
import { Status } from "./Status.js";

function expectElement(element: Element | null): asserts element is Element {
  expect(element).toBeInstanceOf(Element);
}

// The lamp dot is a `::before` pseudo-element on the Chip root, which has no
// accessible role, so its color can only be read through computed style.
const getLampDotColor = ({ label }: { label: string }) => {
  const chipRoot = page
    .getByText(label, { exact: true })
    .element()
    .closest(".MuiChip-root");

  expectElement(chipRoot);

  return window.getComputedStyle(chipRoot, "::before").backgroundColor;
};

// Each test paints its scheme's card surface behind the Status, the way an app
// does, so the accessibility check measures dark text against a dark surface
// rather than the test page's default white.
describe(Status.displayName!, () => {
  test("warning lamp in light mode", async () => {
    const { container } = await render(
      <OdysseyProvider colorScheme="light">
        <div style={{ backgroundColor: lightModeDesignTokens.HueNeutralWhite }}>
          <Status label="Warning" severity="warning" variant="lamp" />
        </div>
      </OdysseyProvider>,
    );

    await expect(container).toBeAccessible();
    expect(getLampDotColor({ label: "Warning" })).toBe(
      hexToRgb(lightModeDesignTokens.HueYellow200).asFormattedString,
    );
  });

  test("warning lamp in dark mode", async () => {
    const { container } = await render(
      <OdysseyProvider colorScheme="dark">
        <div style={{ backgroundColor: darkModeDesignTokens.HueNeutralWhite }}>
          <Status label="Warning" severity="warning" variant="lamp" />
        </div>
      </OdysseyProvider>,
    );

    await expect(container).toBeAccessible();
    expect(getLampDotColor({ label: "Warning" })).toBe(
      hexToRgb(darkModeDesignTokens.HueYellow300).asFormattedString,
    );
  });
});
