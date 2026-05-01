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

import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { describe, test } from "vitest";

import { Button } from "../Buttons/Button.js";
import { OdysseyProvider } from "../OdysseyProvider.js";
import { DataFilters } from "./DataFilters.js";

describe("DataFilters", () => {
  test("renders filter tags using option labels for option object values", () => {
    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    const activeFiltersList = screen.getByRole("list", {
      name: "Active filters",
    });
    expect(activeFiltersList).toBeVisible();
    expect(
      within(activeFiltersList).getByRole("button", {
        name: "Priority: Low Remove tag",
      }),
    ).toBeVisible();

    expect(screen.queryByText("Priority: low")).not.toBeInTheDocument();
  });

  test("renders searchbox only", () => {
    render(
      <OdysseyProvider>
        <DataFilters onChangeSearch={vi.fn()} />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Search" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Filters")).not.toBeInTheDocument();
  });

  test("renders filters only", () => {
    render(
      <OdysseyProvider>
        <DataFilters
          filters={[
            {
              id: "text-filter",
              label: "Text filter",
              variant: "text",
            },
          ]}
          onChangeFilters={vi.fn()}
        />
      </OdysseyProvider>,
    );
    expect(screen.getByLabelText("Filters")).toBeVisible();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Search" }),
    ).not.toBeInTheDocument();
  });

  test("renders all options", () => {
    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toBeVisible();
    expect(screen.getByRole("button", { name: "Search" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Another button" }),
    ).toBeVisible();
    expect(screen.getByLabelText("Filters")).toBeVisible();
  });

  test("custom searchFieldLabel on search field", () => {
    render(
      <OdysseyProvider>
        <DataFilters
          hasSearchSubmitButton
          onChangeSearch={vi.fn()}
          searchFieldLabel="Search applications"
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toHaveAttribute(
      "placeholder",
      "Search applications",
    );
    expect(screen.getByRole("button", { name: "Search" })).toBeVisible();
  });

  test("renders disabled state", () => {
    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );

    expect(screen.getByRole("searchbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
    expect(screen.getByLabelText("Filters")).toBeDisabled();
  });

  const renderFilterWithDescription = ({ value }: { value?: string } = {}) => {
    render(
      <OdysseyProvider>
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
        />
      </OdysseyProvider>,
    );
  };

  test("filter with description and no value shows description and dynamic text", async () => {
    renderFilterWithDescription();

    await userEvent.click(screen.getByLabelText("Filters"));

    const filterMenu = screen.getByRole("menu");
    expect(
      within(filterMenu).getByText(
        "Filter by the application an AI agent is imported from",
      ),
    ).toBeInTheDocument();
    expect(within(filterMenu).getByText("Any application")).toBeInTheDocument();
  });

  test("filter with description and selected value shows description and selected value", async () => {
    renderFilterWithDescription({ value: "app1" });

    await userEvent.click(screen.getByLabelText("Filters"));

    const filterMenu = screen.getByRole("menu");
    expect(
      within(filterMenu).getByText(
        "Filter by the application an AI agent is imported from",
      ),
    ).toBeInTheDocument();
    expect(within(filterMenu).getByText("app1")).toBeInTheDocument();
  });
});
