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

import { page, userEvent } from "vitest/browser";

import { Button } from "../Buttons/Button.js";
import { renderWithOdysseyProvider } from "../test-utils/renderWithOdysseyProvider.js";
import { DataFilters } from "./DataFilters.js";

describe("DataFilters", () => {
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
  }: { value?: string } = {}) => {
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
});
