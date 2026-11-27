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
import { page, userEvent } from "vitest/browser";

import { TranslationProvider } from "../i18n.generated/i18n.js";
import { PaginatedTable } from "./PaginatedTable.js";
import { StaticTable } from "./StaticTable.js";

type Person = { id: string; name: string; role: string };

const people: Person[] = [
  { id: "1", name: "Ada", role: "Engineer" },
  { id: "2", name: "Grace", role: "Admiral" },
  { id: "3", name: "Linus", role: "Maintainer" },
];

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
];

// Marker strings no English default contains, so an English label means the component skipped the translation provider. Each test turns off the provider's own `TranslationProvider`, because its effect runs after this one and resets the language to the browser default.
const translationOverrides = {
  ar: {
    "table.mrt.gotonextpage": "ar next page",
    "table.mrt.norecordstodisplay": "ar no records",
    "table.mrt.rowsperpage": "ar rows per page",
    "table.mrt.toggleselectrow": "ar select row",
  },
};

describe("StaticTable", () => {
  test("rows and global search", async () => {
    const onGlobalFilterChange = vi.fn();

    await renderWithOdysseyProvider(
      <StaticTable
        columns={columns}
        data={people}
        getRowId={(row) => String(row.id)}
        onGlobalFilterChange={onGlobalFilterChange}
      />,
    );

    await expect.element(page.getByText("Grace")).toBeVisible();

    await userEvent.click(
      page.getByRole("button", { name: "Show/Hide search" }),
    );
    await userEvent.fill(page.getByRole("textbox"), "Ada");
    await expect
      .poll(() => onGlobalFilterChange.mock.lastCall)
      .toStrictEqual(["Ada"]);
  });

  test("empty state in a non-English language", async () => {
    await renderWithOdysseyProvider(
      <TranslationProvider<"ar">
        languageCode="ar"
        translationOverrides={translationOverrides}
      >
        <StaticTable columns={columns} data={[]} />
      </TranslationProvider>,
      { providerProps: { hasTranslationProvider: false } },
    );

    await expect.element(page.getByText("ar no records")).toBeVisible();
  });
});

describe("PaginatedTable", () => {
  test("selection, pagination, and filter callbacks", async () => {
    const onRowSelectionChange = vi.fn();
    const onPaginationChange = vi.fn();
    const onGlobalFilterChange = vi.fn();

    await renderWithOdysseyProvider(
      <PaginatedTable
        columns={columns}
        data={people}
        getRowId={(row) => String(row.id)}
        hasRowSelection
        onGlobalFilterChange={onGlobalFilterChange}
        onPaginationChange={onPaginationChange}
        onRowSelectionChange={onRowSelectionChange}
        rowsPerPage={2}
      />,
    );

    expect(onPaginationChange).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 2,
    });

    await userEvent.click(
      page.getByRole("checkbox", { name: "Toggle select row" }).first(),
    );
    await expect
      .poll(() => onRowSelectionChange.mock.lastCall)
      .toStrictEqual([{ "1": true }]);

    await userEvent.click(
      page.getByRole("button", { name: "Go to next page" }),
    );
    await expect
      .poll(() => onPaginationChange.mock.lastCall)
      .toStrictEqual([{ pageIndex: 1, pageSize: 2 }]);

    await userEvent.click(
      page.getByRole("button", { name: "Show/Hide search" }),
    );
    await userEvent.fill(page.getByRole("textbox"), "Ada");
    await expect
      .poll(() => onGlobalFilterChange.mock.lastCall)
      .toStrictEqual(["Ada"]);
  });

  test("selection and pagination labels in a non-English language", async () => {
    await renderWithOdysseyProvider(
      <TranslationProvider<"ar">
        languageCode="ar"
        translationOverrides={translationOverrides}
      >
        <PaginatedTable
          columns={columns}
          data={people}
          getRowId={(row) => String(row.id)}
          hasRowSelection
          rowsPerPage={2}
        />
      </TranslationProvider>,
      { providerProps: { hasTranslationProvider: false } },
    );

    await expect
      .element(page.getByRole("checkbox", { name: "ar select row" }).first())
      .toBeVisible();
    await expect.element(page.getByText("ar rows per page")).toBeVisible();
    await expect
      .element(page.getByRole("button", { name: "ar next page" }))
      .toBeVisible();
  });
});
