/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Mock } from "vitest";

import { renderWithOdysseyProvider } from "@okta/odyssey-test-tooling/browser";
import { page, userEvent } from "vitest/browser";

import { Button } from "../Buttons/Button.js";
import { type DataFilter, DataFilters } from "./DataFilters.js";

type OnChangeFilters = (filters: DataFilter[]) => void;

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "High", value: "high" },
];

const openFilter = async (name: RegExp) => {
  await userEvent.click(page.getByLabelText("Filters", { exact: true }));
  await userEvent.click(page.getByRole("menuitem", { name }));
};

// Each reported filter echoes back its whole config (label, options, variant), which the test passed in itself. Only `id` and `value` change with user input, so those are the fields worth asserting.
const lastFilters = (onChangeFilters: Mock<OnChangeFilters>) =>
  onChangeFilters.mock.lastCall?.[0].map((filter) => ({
    id: filter.id,
    value: filter.value,
  }));

describe(DataFilters.displayName!, () => {
  test("renders filter tags using option labels for option object values", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "priority",
            label: "Priority",
            options: [
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ],
            value: [{ label: "Low", value: "low" }],
            variant: "multi-select",
          },
        ]}
        onChangeFilters={() => {}}
      />,
    );

    // TODO: fix — active filters <ul> has direct role=button children violating list structure (list)
    await expect(container).toBeAccessible({ disabledRules: ["list"] });

    const activeFiltersList = page.getByRole("list", {
      name: "Active filters",
    });
    await expect.element(activeFiltersList).toBeVisible();
    await expect
      .element(
        activeFiltersList.getByRole("button", {
          name: "Priority: Low Remove tag",
        }),
      )
      .toBeVisible();

    await expect
      .element(page.getByText("Priority: low", { exact: true }))
      .not.toBeInTheDocument();
  });

  test("renders searchbox only", async () => {
    await renderWithOdysseyProvider(<DataFilters onChangeSearch={vi.fn()} />);

    await expect.element(page.getByRole("searchbox")).toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Search" }))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Filters"))
      .not.toBeInTheDocument();
  });

  test("renders filters only", async () => {
    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "text-filter",
            label: "Text filter",
            variant: "text",
          },
        ]}
        onChangeFilters={vi.fn()}
      />,
    );
    await expect.element(page.getByLabelText("Filters")).toBeVisible();
    await expect.element(page.getByRole("searchbox")).not.toBeInTheDocument();
    await expect
      .element(page.getByRole("button", { name: "Search" }))
      .not.toBeInTheDocument();
  });

  test("renders filter tags using option labels for string values", async () => {
    const { container } = await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "app-filter",
            label: "Application",
            options: [{ label: "App 1", value: "app1" }],
            value: "app1",
            variant: "select",
          },
        ]}
        onChangeFilters={() => {}}
      />,
    );

    // TODO: fix — active filters <ul> has direct role=button children violating list structure (list)
    await expect(container).toBeAccessible({ disabledRules: ["list"] });

    const activeFiltersList = page.getByRole("list", {
      name: "Active filters",
    });
    await expect.element(activeFiltersList).toBeVisible();
    await expect
      .element(
        activeFiltersList.getByRole("button", {
          name: "Application: App 1 Remove tag",
        }),
      )
      .toBeVisible();

    await expect
      .element(page.getByText("Application: app1", { exact: true }))
      .not.toBeInTheDocument();
  });

  test("renders all options", async () => {
    await renderWithOdysseyProvider(
      <DataFilters
        additionalActions={
          <Button label="Another button" variant="secondary" />
        }
        filters={[
          {
            id: "text-filter",
            label: "Text filter",
            variant: "text",
          },
        ]}
        hasSearchSubmitButton
        onChangeFilters={vi.fn()}
        onChangeSearch={vi.fn()}
      />,
    );

    await expect.element(page.getByRole("searchbox")).toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Search" }))
      .toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "Another button" }))
      .toBeVisible();
    await expect.element(page.getByLabelText("Filters")).toBeVisible();
  });

  test("custom searchFieldLabel on search field", async () => {
    await renderWithOdysseyProvider(
      <DataFilters
        hasSearchSubmitButton
        onChangeSearch={vi.fn()}
        searchFieldLabel="Search applications"
      />,
    );

    await expect
      .element(page.getByRole("searchbox"))
      .toHaveAttribute("placeholder", "Search applications");
    await expect
      .element(page.getByRole("button", { name: "Search" }))
      .toBeVisible();
  });

  test("renders disabled state", async () => {
    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "text-filter",
            label: "Text filter",
            variant: "text",
          },
        ]}
        hasSearchSubmitButton
        isDisabled
        onChangeFilters={vi.fn()}
        onChangeSearch={vi.fn()}
      />,
    );

    await expect.element(page.getByRole("searchbox")).toBeDisabled();
    await expect
      .element(page.getByRole("button", { name: "Search" }))
      .toBeDisabled();
    await expect
      .element(page.getByLabelText("Filters", { exact: true }))
      .toBeDisabled();
  });

  const renderFilterWithDescription = async ({
    value,
  }: {
    value?: string;
  } = {}) => {
    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "app-filter",
            label: "Application",
            description:
              "Filter by the application an AI agent is imported from",
            variant: "select",
            options: [
              { label: "App 1", value: "app1" },
              { label: "App 2", value: "app2" },
            ],
            value,
          },
        ]}
        onChangeFilters={vi.fn()}
      />,
    );
  };

  test("filter with description and no value shows description and dynamic text", async () => {
    await renderFilterWithDescription();

    await userEvent.click(page.getByLabelText("Filters"));

    const filterMenu = page.getByRole("menu");
    await expect
      .element(
        filterMenu.getByText(
          "Filter by the application an AI agent is imported from",
        ),
      )
      .toBeInTheDocument();
    await expect
      .element(filterMenu.getByText("Any application"))
      .toBeInTheDocument();
  });

  test("filter with description and selected value shows description and selected value", async () => {
    await renderFilterWithDescription({ value: "app1" });

    await userEvent.click(page.getByLabelText("Filters", { exact: true }));

    const filterMenu = page.getByRole("menu");
    await expect
      .element(
        filterMenu.getByText(
          "Filter by the application an AI agent is imported from",
        ),
      )
      .toBeInTheDocument();
    await expect.element(filterMenu.getByText("app1")).toBeInTheDocument();
  });

  const renderFilterWithTextVariant = async () =>
    renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "text-filter",
            label: "Text filter",
            variant: "text",
          },
        ]}
        onChangeFilters={vi.fn()}
      />,
    );

  test("escape on second-level filter popover closes only the popover and returns focus to its filter option", async () => {
    const { container } = await renderFilterWithTextVariant();
    await expect(container).toBeAccessible();

    await userEvent.click(page.getByLabelText("Filters", { exact: true }));
    const filterOption = page.getByRole("menuitem", { name: /Text filter/ });
    await userEvent.click(filterOption);

    const textbox = page.getByRole("textbox", { name: "Text filter" });
    await expect.element(textbox).toBeVisible();
    await expect.element(textbox).toBeAccessible();

    await userEvent.keyboard("{Escape}");

    await expect.element(textbox).not.toBeInTheDocument();
    const filterMenu = page.getByRole("menu");
    await expect.element(filterMenu).toBeVisible();
    // TODO: fix — pre-existing color-contrast issue on the filter's
    // "Any <label>" Subordinate subtitle once the menu item regains focus (4.35:1, needs 4.5:1). Unrelated to focus management; needs a token fix.
    await expect
      .element(filterMenu)
      .toBeAccessible({ disabledRules: ["color-contrast"] });
    await expect.element(filterOption).toHaveFocus();
  });

  test("escape on first-level filters menu (no popover open) closes the menu and returns focus to the Filters button", async () => {
    const { container } = await renderFilterWithTextVariant();
    await expect(container).toBeAccessible();

    const filtersButton = page.getByLabelText("Filters", { exact: true });
    await userEvent.click(filtersButton);
    const filterMenu = page.getByRole("menu");
    await expect.element(filterMenu).toBeVisible();
    await expect.element(filterMenu).toBeAccessible();

    await userEvent.keyboard("{Escape}");

    await expect.element(filterMenu).not.toBeInTheDocument();
    await expect.element(filtersButton).toHaveFocus();
    await expect(container).toBeAccessible();
  });

  test("pressing escape twice backs out of the popover then closes the filters menu, returning focus to the Filters button", async () => {
    const { container } = await renderFilterWithTextVariant();
    await expect(container).toBeAccessible();

    const filtersButton = page.getByLabelText("Filters", { exact: true });
    await userEvent.click(filtersButton);
    const filterMenu = page.getByRole("menu");
    await expect.element(filterMenu).toBeAccessible();

    await userEvent.click(page.getByRole("menuitem", { name: /Text filter/ }));
    const textbox = page.getByRole("textbox", { name: "Text filter" });
    await expect.element(textbox).toBeVisible();
    await expect.element(textbox).toBeAccessible();

    await userEvent.keyboard("{Escape}");
    await expect.element(filterMenu).toBeVisible();
    // TODO: fix — pre-existing color-contrast issue on the filter's
    // "Any <label>" Subordinate subtitle once the menu item regains focus (4.35:1, needs 4.5:1). Unrelated to focus management; needs a token fix.
    await expect
      .element(filterMenu)
      .toBeAccessible({ disabledRules: ["color-contrast"] });

    await userEvent.keyboard("{Escape}");
    await expect.element(filterMenu).not.toBeInTheDocument();
    await expect.element(filtersButton).toHaveFocus();
    await expect(container).toBeAccessible();
  });

  test("text filter is applied on submit and cleared from the field", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[{ id: "name", label: "Name", variant: "text" }]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await openFilter(/Name/);
    await userEvent.fill(page.getByRole("textbox", { name: "Name" }), "Ada");
    await userEvent.click(page.getByRole("button", { name: "Submit" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "name", value: "Ada" }]);

    await expect
      .element(page.getByRole("button", { name: "Name: Ada Remove tag" }))
      .toBeVisible();

    await userEvent.click(page.getByRole("button", { name: "Clear filters" }));
    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "name", value: undefined }]);
  });

  test("clear button inside the text field removes the value", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[{ id: "age", label: "Age", value: "30", variant: "range" }]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await openFilter(/Age/);
    await userEvent.click(page.getByRole("button", { name: "Clear filter" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "age", value: undefined }]);
  });

  test("multi-select checkboxes add and remove values", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "priority",
            label: "Priority",
            options: priorityOptions,
            variant: "multi-select",
          },
        ]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await openFilter(/Priority/);
    await userEvent.click(page.getByRole("checkbox", { name: "Low" }));
    await userEvent.click(page.getByRole("checkbox", { name: "High" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "priority", value: priorityOptions }]);

    await userEvent.click(page.getByRole("checkbox", { name: "Low" }));
    await userEvent.click(page.getByRole("checkbox", { name: "High" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "priority", value: undefined }]);
  });

  test("removing one tag of a multi-select keeps the others", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "priority",
            label: "Priority",
            options: priorityOptions,
            value: priorityOptions,
            variant: "multi-select",
          },
        ]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await userEvent.click(
      page.getByRole("button", { name: "Remove tag" }).first(),
    );

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([
        { id: "priority", value: [{ label: "High", value: "high" }] },
      ]);

    await userEvent.click(
      page.getByRole("button", { name: "Remove tag" }).first(),
    );

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "priority", value: undefined }]);
  });

  test("radio select filter applies immediately and any resets it", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "status",
            label: "Status",
            options: priorityOptions,
            variant: "select",
          },
        ]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await openFilter(/Status/);
    await userEvent.click(page.getByRole("radio", { name: "High" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "status", value: "high" }]);

    // The first Escape applies and closes the popover, the second closes the menu that hides the tags.
    await userEvent.keyboard("{Escape}");
    await userEvent.keyboard("{Escape}");
    await userEvent.click(
      page.getByRole("button", { name: "Remove tag" }).first(),
    );

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "status", value: undefined }]);
  });

  test("autocomplete filter commits chosen options on submit", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "owner",
            label: "Owner",
            options: priorityOptions,
            variant: "autocomplete",
          },
        ]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await openFilter(/Owner/);
    await userEvent.click(page.getByRole("combobox", { name: "Owner" }));
    await userEvent.click(page.getByRole("option", { name: "Low" }));
    await userEvent.click(page.getByRole("button", { name: "Submit" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([
        { id: "owner", value: [{ label: "Low", value: "low" }] },
      ]);
  });

  test("custom render filter receives the update callback", async () => {
    const onChangeFilters = vi.fn<OnChangeFilters>();

    await renderWithOdysseyProvider(
      <DataFilters
        filters={[
          {
            id: "custom",
            label: "Custom",
            render: (updateFilters) => (
              <button
                onClick={() =>
                  updateFilters({ filterId: "custom", value: "picked" })
                }
                type="button"
              >
                Pick one
              </button>
            ),
          },
        ]}
        onChangeFilters={onChangeFilters}
      />,
    );

    await openFilter(/Custom/);
    await userEvent.click(page.getByRole("button", { name: "Pick one" }));

    await expect
      .poll(() => lastFilters(onChangeFilters))
      .toStrictEqual([{ id: "custom", value: "picked" }]);
  });

  test("clicking outside the menu closes the popover and the menu", async () => {
    await renderWithOdysseyProvider(
      <DataFilters
        filters={[{ id: "name", label: "Name", variant: "text" }]}
        onChangeFilters={vi.fn()}
      />,
    );

    await openFilter(/Name/);
    const textbox = page.getByRole("textbox", { name: "Name" });
    await expect.element(textbox).toBeVisible();

    // A real outside click lands on the popover's invisible backdrop, which covers the whole page.
    await userEvent.click(page.elementLocator(document.body));

    await expect.element(textbox).not.toBeInTheDocument();
  });

  test("submitting the filter form with Enter closes the popover", async () => {
    await renderWithOdysseyProvider(
      <DataFilters
        filters={[{ id: "name", label: "Name", variant: "text" }]}
        onChangeFilters={vi.fn()}
      />,
    );

    await openFilter(/Name/);
    await userEvent.fill(page.getByRole("textbox", { name: "Name" }), "Ada");
    await userEvent.keyboard("{Enter}");

    await expect
      .element(page.getByRole("textbox", { name: "Name" }))
      .not.toBeInTheDocument();
  });

  test("search submits on button click and clears through the clear button", async () => {
    const onChangeSearch = vi.fn();

    await renderWithOdysseyProvider(
      <DataFilters hasSearchSubmitButton onChangeSearch={onChangeSearch} />,
    );

    await userEvent.fill(page.getByRole("searchbox"), "ada");
    await userEvent.click(page.getByRole("button", { name: "Search" }));
    expect(onChangeSearch).toHaveBeenLastCalledWith("ada");

    await userEvent.keyboard("{Enter}");
    expect(onChangeSearch).toHaveBeenLastCalledWith("ada");
    expect(onChangeSearch).toHaveBeenCalledTimes(2);

    await userEvent.click(page.getByRole("button", { name: "Clear" }));
    expect(onChangeSearch).toHaveBeenLastCalledWith("");
  });

  test("search without a submit button reports the typed value", async () => {
    const onChangeSearch = vi.fn();

    await renderWithOdysseyProvider(
      <DataFilters onChangeSearch={onChangeSearch} searchDelayTime={20} />,
    );

    await userEvent.fill(page.getByRole("searchbox"), "ada");

    await expect
      .poll(() => onChangeSearch.mock.lastCall)
      .toStrictEqual(["ada"]);
  });
});
