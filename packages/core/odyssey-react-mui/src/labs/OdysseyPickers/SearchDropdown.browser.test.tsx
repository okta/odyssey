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

import { page, userEvent } from "vitest/browser";

import { renderWithOdysseyProvider } from "../../test-utils/renderWithOdysseyProvider.js";
import { CustomOptionType, SearchDropdown } from "./SearchDropdown.js";

const options: CustomOptionType[] = [
  { value: "alpha", label: "Alpha Option", adornment: "A" },
  { value: "beta", label: "Beta Option", adornment: "B" },
  {
    value: "gamma",
    label: "Gamma Option",
    adornment: "G",
    isInteractive: false,
  },
];

describe("SearchDropdown", () => {
  test("renders with label and passes axe", async () => {
    const { container } = await renderWithOdysseyProvider(
      <SearchDropdown label="Search dropdown label" options={options} />,
    );

    await expect(container).toBeAccessible();
    await expect
      .element(page.getByLabelText("Search dropdown label"))
      .toBeVisible();
  });

  test("dropdown opened via click shows options", async () => {
    const { container } = await renderWithOdysseyProvider(
      <SearchDropdown label="Search dropdown label" options={options} />,
    );

    const combobox = page.getByRole("combobox");
    await userEvent.click(combobox);

    await expect
      .element(page.getByRole("option", { name: "Alpha Option" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("option", { name: "Beta Option" }))
      .toBeVisible();

    await expect(container).toBeAccessible();
  });

  test("option onClick called when option is clicked", async () => {
    const onClick = vi.fn();

    await renderWithOdysseyProvider(
      <SearchDropdown
        label="Search dropdown label"
        options={[{ ...options[0], onClick }, ...options.slice(1)]}
      />,
    );

    const combobox = page.getByRole("combobox");
    await userEvent.click(combobox);

    await userEvent.click(page.getByRole("option", { name: "Alpha Option" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("option onClick triggers independently from extra onClick", async () => {
    const optionOnClick = vi.fn();
    const extraOnClick = vi.fn();

    const optionsWithExtra: CustomOptionType[] = [
      {
        value: "alpha",
        label: "Alpha Option",
        adornment: "A",
        extra: { content: "X", onClick: extraOnClick },
        onClick: optionOnClick,
      },
      {
        value: "beta",
        label: "Beta Option",
        adornment: "B",
        extra: { content: "Y", onClick: vi.fn() },
        onClick: vi.fn(),
      },
    ];

    await renderWithOdysseyProvider(
      <SearchDropdown
        label="Search dropdown label"
        options={optionsWithExtra}
      />,
    );

    const combobox = page.getByRole("combobox");
    await userEvent.click(combobox);

    await userEvent.click(page.getByText("Alpha Option"));
    expect(optionOnClick).toHaveBeenCalledTimes(1);
    expect(extraOnClick).not.toHaveBeenCalled();
  });

  test("dropdown closed via Escape", async () => {
    await renderWithOdysseyProvider(
      <SearchDropdown label="Search dropdown label" options={options} />,
    );

    const combobox = page.getByRole("combobox");
    await userEvent.click(combobox);

    await expect
      .element(page.getByRole("option", { name: "Alpha Option" }))
      .toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await expect
      .element(page.getByRole("option", { name: "Alpha Option" }))
      .not.toBeInTheDocument();
  });
});
