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

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page } from "vitest/browser";

import { Tag } from "./Tag.js";
import { TagList } from "./TagList.js";

describe(TagList.displayName!, () => {
  test("plain, clickable, removable, and disabled tags", async () => {
    const { container } = await renderWithOdysseyProvider(
      <TagList ariaLabel="Tag states">
        <Tag label="Plain" testId="plain-tag" />
        <Tag label="Clickable" onClick={() => {}} testId="clickable-tag" />
        <Tag label="Removable" onRemove={() => {}} testId="removable-tag" />
        <Tag
          isDisabled
          label="Disabled"
          onClick={() => {}}
          onRemove={() => {}}
          testId="disabled-tag"
        />
      </TagList>,
    );

    await expect(container).toBeAccessible();

    const tagList = page.getByRole("list", { name: "Tag states" });
    const listItems = tagList.getByRole("listitem");
    expect(listItems.elements()).toHaveLength(4);
    expect(tagList.element().querySelectorAll(":scope > li")).toHaveLength(4);
    expect(
      container.querySelector('ul > li > div[data-se="plain-tag"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('ul > li > button[data-se="clickable-tag"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('ul > li > button[data-se="removable-tag"]'),
    ).not.toBeNull();
    expect(
      container.querySelector('ul > li > button[data-se="disabled-tag"]'),
    ).not.toBeNull();

    await expect
      .element(tagList.getByRole("button", { name: "Clickable", exact: true }))
      .toBeVisible();
    await expect
      .element(
        tagList.getByRole("button", {
          name: "Removable Remove tag",
          exact: true,
        }),
      )
      .toBeVisible();
    await expect
      .element(
        tagList.getByRole("button", {
          name: "Disabled Remove tag",
          exact: true,
        }),
      )
      .toBeDisabled();
  });
});
