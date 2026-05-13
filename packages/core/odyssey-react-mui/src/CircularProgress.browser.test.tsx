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
});
