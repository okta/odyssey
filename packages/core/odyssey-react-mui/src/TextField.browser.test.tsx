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

import { render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { useState } from "react";
import { vi } from "vitest";

import { OdysseyProvider } from "./OdysseyProvider.js";
import { TextField } from "./TextField.js";

describe("TextField", () => {
  const Template = (props: Partial<ComponentProps<typeof TextField>>) => {
    const [value, setValue] = useState("");

    return (
      <OdysseyProvider>
        <TextField
          label="Label"
          name="example"
          onChange={(event) => setValue(event.target.value)}
          value={value}
          {...props}
        />
      </OdysseyProvider>
    );
  };

  test("focus and blur callbacks while editing", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    render(<Template onBlur={onBlur} onFocus={onFocus} />);

    const textbox = (await screen.findByRole(
      "textbox",
    )) satisfies HTMLInputElement;

    await userEvent.click(textbox);
    expect(onFocus).toHaveBeenCalledTimes(1);

    await userEvent.type(textbox, "value");
    expect(textbox.value).toBe("value");

    await userEvent.clear(textbox);
    expect(textbox.value).toBe("");

    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
