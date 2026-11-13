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
import { page, userEvent } from "vitest/browser";

import { GroupPicker, type GroupPickerOptionType } from "./GroupPicker.js";

const engineering: GroupPickerOptionType = {
  appsCount: 3,
  description: "Everyone in engineering",
  groupPushMappingsCount: 2,
  id: "engineering",
  name: "Engineering",
  usersCount: 40,
};

const design: GroupPickerOptionType = {
  description: "No counts here",
  id: "design",
  name: "Design",
};

describe(GroupPicker.displayName!, () => {
  test("single selection reports the chosen group", async () => {
    const onChange = vi.fn();

    await renderWithOdysseyProvider(
      <GroupPicker
        label="Group"
        onChange={onChange}
        options={[engineering, design]}
      />,
    );

    await userEvent.click(page.getByRole("combobox"));
    await userEvent.click(page.getByRole("option", { name: /Design/ }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("removing the only tag reports an empty selection", async () => {
    const onChange = vi.fn();

    await renderWithOdysseyProvider(
      <GroupPicker
        hasMultipleChoices
        label="Groups"
        onChange={onChange}
        options={[engineering, design]}
        value={[engineering]}
      />,
    );

    await userEvent.click(
      page.getByRole("button", { name: "Remove tag", exact: true }),
    );

    expect(onChange.mock.lastCall?.[1]).toStrictEqual([]);
  });
});
