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

import { page, userEvent } from "vitest/browser";

import { Banner } from "./Banner.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(Banner.displayName!, () => {
  test("linked banner with anchor href", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Banner
        linkText="View report"
        linkUrl="#anchor"
        severity="error"
        text="Banner text."
      />,
    );

    await expect(container).toBeAccessible();

    const link = page.getByText("View report");
    await expect.element(link).toHaveAttribute("href", "#anchor");
  });

  test("dismissible banner with close button", async () => {
    const onClose = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <Banner onClose={onClose} severity="info" text="Banner text." />,
    );

    await userEvent.tab();
    await expect(container).toBeAccessible();

    const closeButton = page.getByTitle("Close");
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
