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

import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { Radio } from "./Radio.js";
import { RadioGroup } from "./RadioGroup.js";

describe(RadioGroup.displayName!, () => {
  test("uncontrolled group with option switched", async () => {
    const { container } = await renderWithOdysseyProvider(
      <RadioGroup defaultValue="" label="Radio group label">
        <Radio label="Option A" value="a" />
        <Radio label="Option B" value="b" />
        <Radio label="Option C" value="c" />
      </RadioGroup>,
    );
    await expect(container).toBeAccessible();

    const optionA = page.getByRole("radio", { name: "Option A" });
    await userEvent.click(optionA);
    await userEvent.tab();
    await expect.element(optionA).toBeChecked();
    await expect(container).toBeAccessible();

    const optionB = page.getByRole("radio", { name: "Option B" });
    await userEvent.click(optionB);
    await expect.element(optionB).toBeChecked();
    await expect.element(optionA).not.toBeChecked();
  });

  test("controlled group with changed selection", async () => {
    const ControlledRadioGroup = () => {
      const [value, setValue] = useState("c");

      return (
        <RadioGroup
          label="Radio group label"
          onChange={(_event, newValue) => setValue(newValue)}
          value={value}
        >
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      );
    };

    const { container } = await renderWithOdysseyProvider(
      <ControlledRadioGroup />,
    );

    await expect
      .element(page.getByRole("radio", { name: "Option C" }))
      .toBeChecked();

    const optionB = page.getByRole("radio", { name: "Option B" });
    await userEvent.click(optionB);
    await userEvent.tab();
    await expect.element(optionB).toBeChecked();
    await expect(container).toBeAccessible();
  });
});
