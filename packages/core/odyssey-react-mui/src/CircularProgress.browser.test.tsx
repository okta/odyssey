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

import { page } from "vitest/browser";

import { CircularProgress } from "./CircularProgress.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(CircularProgress.displayName!, () => {
  test("indeterminate progress with progressbar role", async () => {
    const { container } = await renderWithOdysseyProvider(
      <CircularProgress ariaLabel="Loading" />,
    );

    await expect(container).toBeAccessible();

    const progress = page.getByLabelText("Loading");
    await expect.element(progress).toHaveAttribute("role", "progressbar");
  });

  test("determinate progress with value", async () => {
    const { container } = await renderWithOdysseyProvider(
      <CircularProgress ariaLabel="Upload progress" value={70} />,
    );

    await expect(container).toBeAccessible();

    const progress = page.getByLabelText("Upload progress");
    await expect.element(progress).toHaveAttribute("role", "progressbar");
    await expect.element(progress).toHaveAttribute("aria-valuenow", "70");
  });

  test("stroke width relative to diameter", async () => {
    await renderWithOdysseyProvider(<CircularProgress ariaLabel="Loading" />);

    const progress = page.getByLabelText("Loading").element();
    const circle = progress.querySelector("circle");

    if (!circle) {
      throw new Error("CircularProgress rendered without an SVG circle");
    }

    // MUI draws the ring in a fixed 44-unit viewBox and passes `thickness`
    // through as the circle's stroke-width attribute, so that attribute divided
    // by the viewBox is the stroke-to-diameter ratio at every rendered size.
    // Design specifies 1:12, which is 2px at the default 24px diameter and
    // 1.33px at the 16px Button renders. The ratio is asserted rather than a
    // pixel width because rem-based sizing resolves against whatever root font
    // size the host page sets. The attribute is read instead of the computed
    // style because computed style resolves to a CSS length, which is a
    // different unit space than the viewBox the ratio is expressed in.
    const viewBoxWidth = 44;
    const strokeWidthInViewBoxUnits = circle.getAttribute("stroke-width");

    if (!strokeWidthInViewBoxUnits) {
      throw new Error("CircularProgress rendered without a stroke-width");
    }

    expect(
      Number.parseFloat(strokeWidthInViewBoxUnits) / viewBoxWidth,
    ).toBeCloseTo(1 / 12, 5);
  });
});
