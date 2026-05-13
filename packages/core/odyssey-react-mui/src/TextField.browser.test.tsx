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

import type { ComponentProps } from "react";

import { useState } from "react";
import { page, userEvent } from "vitest/browser";

import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";
import { TextField } from "./TextField.js";

describe("TextField", () => {
  const Template = (props: Partial<ComponentProps<typeof TextField>>) => {
    const [value, setValue] = useState("");

    return (
      <TextField
        label="Label"
        name="example"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        {...props}
      />
    );
  };

  test("focus and blur callbacks while editing", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const { container } = await renderWithOdysseyProvider(
      <Template onBlur={onBlur} onFocus={onFocus} />,
    );

    await expect(container).toBeAccessible();

    const textbox = page.getByRole("textbox");

    await userEvent.click(textbox);
    expect(onFocus).toHaveBeenCalledTimes(1);

    await userEvent.type(textbox, "value");
    await expect.element(textbox).toHaveValue("value");

    await userEvent.clear(textbox);
    await expect.element(textbox).toHaveValue("");

    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("renders min, max, and step attributes for type='number'", async () => {
    await renderWithOdysseyProvider(
      <Template max={100} min={0} step={5} type="number" />,
    );

    const input = page.getByRole("spinbutton");

    await expect.element(input).toHaveAttribute("min", "0");
    await expect.element(input).toHaveAttribute("max", "100");
    await expect.element(input).toHaveAttribute("step", "5");
  });
});
