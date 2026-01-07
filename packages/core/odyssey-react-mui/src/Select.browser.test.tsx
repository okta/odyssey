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

import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { useState } from "react";

import { OdysseyProvider } from "./OdysseyProvider.js";
import { Select } from "./Select.js";

type SelectProps = ComponentProps<typeof Select>;
type SelectValue = SelectProps["value"];

const defaultOptions = [
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Option E",
];

const Template = ({
  options = defaultOptions,
  label = "Label",
  name = "example",
  ...props
}: Partial<SelectProps>) => {
  const multiple = Boolean(props.hasMultipleChoices);
  const [value, setValue] = useState<SelectValue>(multiple ? [] : "");

  return (
    <OdysseyProvider>
      <Select
        {...props}
        label={label}
        name={name}
        onChange={(event) => {
          const value = event.target.value;
          setValue(multiple ? (Array.isArray(value) ? value : [value]) : value);
        }}
        options={options}
        value={value}
      />
    </OdysseyProvider>
  );
};

describe("Select", () => {
  test("selecting a single option from the menu", async () => {
    render(<Template />);

    const trigger = await screen.findByRole("combobox");

    await userEvent.click(trigger);
    const firstOption = screen.getByRole("option", {
      name: "Option A",
    });

    await userEvent.click(firstOption);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await userEvent.tab();

    const selectOption = await screen.findByRole("combobox");

    expect(within(selectOption).getByText("Option A")).toBeVisible();
  });

  test("selecting multiple options", async () => {
    render(<Template hasMultipleChoices />);

    const trigger = await screen.findByRole("combobox");

    await userEvent.click(trigger);
    const listbox = await screen.findByRole("listbox");
    const OptionA = within(listbox).getByRole("option", { name: "Option A" });
    const OptionB = within(listbox).getByRole("option", { name: "Option B" });
    await userEvent.click(OptionA);
    await userEvent.click(OptionB);
    await userEvent.tab();

    const selectOptions = await screen.findByRole("list", {
      name: /selected options/i,
    });

    expect(await within(selectOptions).findByText("Option A")).toBeVisible();
    expect(await within(selectOptions).findByText("Option B")).toBeVisible();
  });

  test("rendering language metadata attributes", async () => {
    const languageOptions = [
      { text: "English", value: "en", language: "en" },
      { text: "Español", value: "es", language: "es" },
      { text: "Français", value: "fr", language: "fr" },
      { text: "Deutsch", value: "de", language: "de" },
      { text: "中文", value: "zh", language: "zh" },
      { text: "日本語", value: "ja", language: "ja" },
      { text: "한국어", value: "ko", language: "ko" },
    ] satisfies NonNullable<SelectProps["options"]>;

    render(<Template options={languageOptions} />);

    const trigger = await screen.findByRole("combobox");

    await userEvent.click(trigger);
    const listbox = await screen.findByRole("listbox");
    const frenchOption = within(listbox).getByText("Français");

    expect(frenchOption).toHaveAttribute("lang", "fr");
  });
});
