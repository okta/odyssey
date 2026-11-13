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

import type { FocusHandle } from "../inputUtils.js";

import { Radio } from "./Radio.js";
import { RadioGroup } from "./RadioGroup.js";

describe(Radio.displayName!, () => {
  test("radio selected within group", async () => {
    const onChange = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <RadioGroup label="Radio group label">
        <Radio label="Option A" onChange={onChange} value="a" />
        <Radio label="Option B" value="b" />
      </RadioGroup>,
    );
    await expect(container).toBeAccessible();

    const radio = page.getByRole("radio", { name: "Option A" });
    await userEvent.click(radio);
    await userEvent.tab();
    await expect.element(radio).toBeChecked();
    await expect(container).toBeAccessible();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("read-only radio with hint does not change selection", async () => {
    const onChange = vi.fn();
    await renderWithOdysseyProvider(
      <RadioGroup label="Radio group label">
        <Radio
          hint="Locked in"
          isReadOnly
          label="Option A"
          onChange={onChange}
          value="a"
        />
        <Radio label="Option B" value="b" />
      </RadioGroup>,
    );

    await expect
      .element(page.getByRole("radio", { name: "Option A" }))
      .toHaveAccessibleDescription("Locked in");

    // The read-only radio is natively enabled but must not change.
    await userEvent.click(page.getByRole("radio", { name: "Option A" }));

    await expect
      .element(page.getByRole("radio", { name: "Option A" }))
      .not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });

  test("focus handle", async () => {
    const inputRef = createRef<FocusHandle>();
    await renderWithOdysseyProvider(
      <RadioGroup label="Radio group label">
        <Radio inputRef={inputRef} label="Option A" value="a" />
      </RadioGroup>,
    );

    inputRef.current?.focus();

    await expect
      .element(page.getByRole("radio", { name: "Option A" }))
      .toHaveFocus();
  });
});
