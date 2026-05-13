/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
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

import { Tag } from "./Tag.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

describe(Tag.displayName!, () => {
  test("calls onRemove when delete icon is clicked", async () => {
    const user = userEvent.setup();

    const onRemove = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <Tag label="Label" onRemove={onRemove} />,
    );
    await expect(container).toBeAccessible();

    const tag = page.getByRole("button", { name: /^Label/ });
    await expect.element(tag).toHaveAttribute("aria-keyshortcuts", "Backspace");
    await expect.element(tag).toHaveAttribute("tabindex", "0");

    const deleteButton = page.getByRole("button", {
      name: "Remove tag",
      exact: true,
    });

    await user.click(deleteButton);
    await expect(container).toBeAccessible();

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test("calls onClick when Tag is clicked", async () => {
    const user = userEvent.setup();

    const onClick = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <Tag label="Label" onClick={onClick} />,
    );

    const tag = page.getByRole("button", { name: "Label" });
    expect(tag).not.toHaveAttribute("aria-keyshortcuts");
    await expect.element(tag).toHaveAttribute("tabindex", "0");

    await user.click(tag);
    await expect(container).toBeAccessible();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("tag is not reachable via Tab when onClick/onRemove are not provided", async () => {
    await renderWithOdysseyProvider(<Tag label="Label" />);

    expect(
      page.getByText("Label", { exact: true }).query()?.closest("div"),
    ).not.toHaveAttribute("tabindex", "0");
  });
});
