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

import { HintLink } from "./HintLink.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(HintLink.displayName!, () => {
  test("renders with accessible role", async () => {
    const { container } = await renderWithOdysseyProvider(
      <HintLink href="#learn-more">Learn more</HintLink>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByRole("link", { name: "Learn more" }))
      .toBeVisible();
  });

  test("external hint link with target and rel attributes", async () => {
    const { container } = await renderWithOdysseyProvider(
      <HintLink href="https://www.okta.com" rel="noopener" target="_blank">
        Read documentation
      </HintLink>,
    );

    await expect(container).toBeAccessible();

    const link = page.getByRole("link", { name: "Read documentation" });
    await expect.element(link).toHaveAttribute("href", "https://www.okta.com");
    await expect.element(link).toHaveAttribute("target", "_blank");
    await expect.element(link).toHaveAttribute("rel", "noopener");
  });
});
