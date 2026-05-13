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

import { Select } from "./Select.js";
import { renderWithOdysseyProvider } from "./test-utils/renderWithOdysseyProvider.js";

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
  const [value, setValue] = useState<SelectValue>(
    props.value ?? (multiple ? [] : ""),
  );

  return (
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
  );
};

describe(Select.displayName!, () => {
  test("selecting a single option from the menu", async () => {
    const { container } = await renderWithOdysseyProvider(<Template />);

    await expect(container).toBeAccessible();

    const trigger = page.getByRole("combobox");

    await userEvent.click(trigger);
    const firstOption = page.getByRole("option", {
      name: "Option A",
    });

    await expect.element(page.getByRole("listbox")).toBeAccessible();

    await userEvent.click(firstOption);

    await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
    await userEvent.tab();

    await expect
      .element(page.getByRole("combobox").getByText("Option A"))
      .toBeVisible();
  });

  test("selecting multiple options", async () => {
    await renderWithOdysseyProvider(<Template hasMultipleChoices />);

    const trigger = page.getByRole("combobox");

    await userEvent.click(trigger);
    const listbox = page.getByRole("listbox");
    const OptionA = listbox.getByRole("option", { name: "Option A" });
    const OptionB = listbox.getByRole("option", { name: "Option B" });
    await userEvent.click(OptionA);
    await userEvent.click(OptionB);
    await userEvent.tab();

    const selectOptions = page.getByRole("list", {
      name: /selected options/i,
    });

    await expect.element(selectOptions.getByText("Option A")).toBeVisible();
    await expect.element(selectOptions.getByText("Option B")).toBeVisible();
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

    await renderWithOdysseyProvider(<Template options={languageOptions} />);

    const trigger = page.getByRole("combobox");

    await userEvent.click(trigger);
    const listbox = page.getByRole("listbox");
    const frenchOption = listbox.getByText("Français");

    await expect.element(frenchOption).toHaveAttribute("lang", "fr");
  });

  test("disabled multi-select mode with pre-selected values", async () => {
    await renderWithOdysseyProvider(
      <Template hasMultipleChoices isDisabled value={["Option A"]} />,
    );

    const selectedOptions = page.getByRole("list", {
      name: /selected options/i,
    });

    await expect.element(selectedOptions.getByText("Option A")).toBeVisible();

    const chip = selectedOptions.getByRole("listitem");

    await expect.element(chip.getByRole("button")).not.toBeInTheDocument();
  });

  test("readOnly multi-select mode with pre-selected values", async () => {
    await renderWithOdysseyProvider(
      <Template hasMultipleChoices isReadOnly value={["Option A"]} />,
    );

    const selectedOptions = page.getByRole("list", {
      name: /selected options/i,
    });

    await expect.element(selectedOptions.getByText("Option A")).toBeVisible();

    const chip = selectedOptions.getByRole("listitem");

    await expect.element(chip.getByRole("button")).not.toBeInTheDocument();
  });

  test("select in disabled state", async () => {
    await renderWithOdysseyProvider(
      <Select
        isDisabled
        label="Label"
        options={["Option A", "Option B", "Option C", "Option D", "Option E"]}
        value={"Option A"}
      />,
    );

    await expect.element(page.getByRole("combobox")).toBeDisabled();
  });
});
