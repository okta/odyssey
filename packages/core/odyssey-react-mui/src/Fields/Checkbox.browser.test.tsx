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

import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { Checkbox } from "./Checkbox.js";

describe(Checkbox.displayName!, () => {
  test("checkbox checked and blurred", async () => {
    const onBlur = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <Checkbox
        isDefaultChecked={false}
        label="Checkbox label"
        onBlur={onBlur}
      />,
    );

    await expect(container).toBeAccessible();

    const checkbox = page.getByRole("checkbox", { name: "Checkbox label" });
    await userEvent.click(checkbox);
    await expect.element(checkbox).toBeChecked();
    await expect(container).toBeAccessible();

    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("indeterminate checkbox", async () => {
    const { container } = await renderWithOdysseyProvider(
      <Checkbox isIndeterminate label="Checkbox label" />,
    );

    await expect(container).toBeAccessible();
  });
});
