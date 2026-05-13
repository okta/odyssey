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

import { Link } from "./Link.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(Link.displayName!, () => {
  test("renders with accessible role", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Link href="#anchor">Link text</Link>,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByRole("link", { name: "Link text" }))
      .toBeVisible();
  });

  test("external link with target and rel attributes", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Link
        ariaLabel="External Link"
        href="https://www.okta.com"
        rel="noopener"
        target="_blank"
      >
        Link text
      </Link>,
    );

    await expect(container).toBeAccessible();

    const link = page.getByRole("link", { name: "External Link" });
    await expect.element(link).toHaveAttribute("href", "https://www.okta.com");
    await expect.element(link).toHaveAttribute("rel", "noopener");
    await expect.element(link).toHaveAttribute("target", "_blank");
  });
});
