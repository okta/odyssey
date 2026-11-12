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
import { createRef } from "react";
import { page, userEvent } from "vitest/browser";

import type { FocusHandle } from "./inputUtils.js";

import { NativeSelect } from "./NativeSelect.js";

describe(NativeSelect.displayName!, () => {
  test("uncontrolled single choice with hint and focus handle", async () => {
    const inputRef = createRef<FocusHandle>();
    const onChange = vi.fn();
    const { container } = await renderWithOdysseyProvider(
      <NativeSelect
        defaultValue="b"
        hint="Pick one"
        inputRef={inputRef}
        label="Letter"
        onChange={onChange}
      >
        <>
          <option value="a">Alpha</option>
          <option value="b">Beta</option>
        </>
      </NativeSelect>,
    );

    await expect(container).toBeAccessible();

    const select = page.getByRole("combobox", { name: "Letter" });
    await expect.element(select).toHaveValue("b");
    await expect.element(select).toHaveAccessibleDescription("Pick one");

    inputRef.current?.focus();
    await expect.element(select).toHaveFocus();

    await userEvent.selectOptions(select, "a");
    await expect.element(select).toHaveValue("a");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("multiple choices via the deprecated isMultiSelect prop", async () => {
    await renderWithOdysseyProvider(
      <NativeSelect defaultValue={["a"]} isMultiSelect label="Letters">
        <>
          <option value="a">Alpha</option>
          <option value="b">Beta</option>
        </>
      </NativeSelect>,
    );

    const select = page.getByRole("listbox", { name: "Letters" });
    await userEvent.selectOptions(select, ["a", "b"]);
    await expect.element(select).toHaveValue(["a", "b"]);
  });

  test("controlled value", async () => {
    await renderWithOdysseyProvider(
      <NativeSelect hasMultipleChoices={false} label="Letter" value="a">
        <>
          <option value="a">Alpha</option>
          <option value="b">Beta</option>
        </>
      </NativeSelect>,
    );

    const select = page.getByRole("combobox", { name: "Letter" });
    await userEvent.selectOptions(select, "b");

    await expect.element(select).toHaveValue("a");
  });
});
