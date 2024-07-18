/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  paginationTypeValues,
  UpdateFiltersOrValues,
} from "@okta/odyssey-react-mui/labs";
import {
  Box,
  Button,
  // DataTable,
  EmptyState,
  DataTableGetDataType,
  DataTableOnReorderRowsType,
  DataTableProps,
  DataTableRenderDetailPanelType,
  DataTableRowSelectionState,
  MenuItem,
  // densityValues,
} from "@okta/odyssey-react-mui";
import { DataTable, densityValues } from "@okta/odyssey-react-mui/labs";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Planet,
  columns as planetColumns,
  data as planetData,
} from "./planetData";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "./personData";
import { useCallback, useMemo, useState } from "react";

const storybookMeta: Meta<DataTableProps> = {
  title: "MUI Components/DataTable",
  component: DataTable,
  argTypes: {
    columns: {
      control: null,
      description: "The columns that make up the table.",
      table: {
        type: {
          summary: "DataTableColumn<DataTableRowData>",
        },
      },
    },
    totalRows: {
      control: "number",
      description: `The total number of rows in the table. Optional, because it's sometimes impossible to calculate.Used in table pagination to know when to disable the "next"/"more" button.`,
      table: {
        type: {
          summary: "number",
        },
      },
    },
    getRowId: {
      control: null,
      description: "The function to get the ID of a row",
      table: {
        type: {
          summary:
            "((originalRow: MRT_RowData, index: number, parentRow: MRT_Row<MRT_RowData>) => string)",
        },
      },
    },
    initialDensity: {
      options: densityValues,
      control: { type: "radio" },
      description:
        "The initial density (height & padding) of the table rows. This is available even if the table density isn't changeable by the end user via hasChangeableDensity.",
      table: {
        type: {
          summary: densityValues.join(" | "),
        },
      },
    },
    hasChangeableDensity: {
      control: "boolean",
      description:
        "If true, the end user will be able to change the table density.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasColumnResizing: {
      control: "boolean",
      description: "If true, the end user can resize individual columns.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasColumnVisibility: {
      control: "boolean",
      description: "If true, the end user will be able to show/hide columns.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasFilters: {
      control: "boolean",
      description: "If true, the end user will be able to filter columns.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasPagination: {
      control: "boolean",
      description: "If true, the table will include pagination controls.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasRowSelection: {
      control: "boolean",
      description:
        "If true, the table will include checkboxes on each row, enabling the user to select some or all rows.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSearch: {
      control: "boolean",
      description: "If true, the global table search controls will be shown.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSorting: {
      control: "boolean",
      description:
        "If true, the end user can sort columns (ascending, descending, or neither)",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasRowReordering: {
      control: "boolean",
      description:
        "If true, the end user can reorder rows via a drag-and-drop interface.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSearchSubmitButton: {
      control: "boolean",
      description:
        "If true, the search field will include a Search button, rather than firing on input change.",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    errorMessage: {
      control: "text",
      description: "If defined, the DataTable will indicate an error.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    searchDelayTime: {
      control: "number",
      description:
        "The debounce time, in milliseconds, for the search input firing `onChangeSearch` when changed. If `hasSearchSubmitButton` is true, this doesn't do anything.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    onChangeRowSelection: {
      control: null,
      description:
        "Callback that fires when a row (or rows) is selected or unselected.",
      table: {
        type: {
          summary: "(rowSelection: MRT_RowSelectionState) => void",
        },
      },
    },
    getData: {
      control: null,
      description:
        "Callback that fires whenever the table needs to fetch new data, due to changes in page, results per page, search input, filters, or sorting",
      table: {
        type: {
          summary: `({ page, resultsPerPage, search, filters, sort }: { page?: number; resultsPerPage?: number; search?: string; filters?: DataFilter[]; sort?: MRT_SortingState; }) => DataTableRowData`,
        },
      },
    },
    onReorderRows: {
      control: null,
      description:
        "Callback that fires when the user reorders rows within the table. Can be used to propogate order change to the backend.",
      table: {
        type: {
          summary: `({ rowId, newRowIndex }: { rowId: string; newRowIndex: number; }) => void`,
        },
      },
    },
    currentPage: {
      control: "number",
      description: "The current page number.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    resultsPerPage: {
      control: "number",
      description: "The number of results per page.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    maxPages: {
      control: "number",
      description:
        "The highest page number allowed to be manually input in pagination.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    maxResultsPerPage: {
      control: "number",
      description:
        "The largest number of rows allowed to be shown per page. This only affects the row input in pagination.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    paginationType: {
      options: paginationTypeValues,
      control: { type: "radio" },
      description: `The type of pagination controls shown. Defaults to next/prev buttons, but can be set to a simple "Load more" button by setting to "loadMore".`,
      table: {
        type: {
          summary: paginationTypeValues.join(" | "),
        },
      },
    },
    rowActionButtons: {
      control: null,
      description: "Action buttons to display in each row.",
      table: {
        type: {
          summary: `(row: DataTableRowData) => ReactElement<typeof Button | typeof Fragment>`,
        },
      },
    },
    rowActionMenuItems: {
      control: null,
      description:
        "Menu items to include in the optional actions menu on each row.",
      table: {
        type: {
          summary: `(row: DataTableRowData) => MenuButtonProps["children"]`,
        },
      },
    },
    bulkActionMenuItems: {
      control: null,
      description:
        "Menu items to include in the bulk actions menu, which appears above the table if a row or rows are selected",
      table: {
        type: {
          summary: `(selectedRows: MRT_RowSelectionState) => MenuButtonProps["children"]`,
        },
      },
    },
    emptyPlaceholder: {
      control: null,
      description:
        "The component to display when the table is displaying the initial empty state.",
      table: {
        type: {
          summary: `ReactElement<typeof EmptyState>`,
        },
      },
    },
    noResultsPlaceholder: {
      control: null,
      description:
        "The component to display when the query returns no results.",
      table: {
        type: {
          summary: `ReactElement<typeof EmptyState>`,
        },
      },
    },
    renderDetailPanel: {
      control: null,
      description: "The optional component to display when expanding a row.",
      table: {
        type: {
          summary: `(props: { row: MRT_Row<MRT_RowData>; table: MRT_TableInstance<MRT_RowData>; }) => ReactNode`,
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const filterData = ({
  data,
  ...args
}: {
  data: (Planet | Person)[];
} & DataTableGetDataType) => {
  let filteredData = data;
  const { search, filters, sort, page = 1, resultsPerPage = 20 } = args;

  // Implement text-based query filtering
  if (search) {
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }

  // Implement column-specific filtering
  if (filters) {
    filteredData = filteredData.filter((row) => {
      return filters.every(({ id, value }) => {
        // If filter value is null or undefined, skip this filter
        if (value === null || value === undefined) {
          return true;
        }

        // If filter value is array, search for each array value
        if (Array.isArray(value)) {
          return value.some((arrayValue) => {
            return row[id as keyof (Planet | Person)]
              ?.toString()
              .toLowerCase()
              .includes(arrayValue.toString().toLowerCase());
          });
        }

        // In the custom filter examples, we provide a "starting letter"
        // control that allows the user to filter by whether the
        // first letter is a vowel or consonant
        if (id === "startLetter" && typeof row.name === "string") {
          const firstLetter = row.name[0]?.toLowerCase();
          if (value === "vowel") return "aeiou".includes(firstLetter);
          if (value === "consonant") return !"aeiou".includes(firstLetter);
          return true;
        }

        // General filtering for other columns
        return row[id as keyof (Planet | Person)]
          ?.toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      });
    });
  }

  // Implement sorting
  if (sort && sort.length > 0) {
    filteredData.sort((a, b) => {
      for (const { id, desc } of sort) {
        const aValue = a[id as keyof (Planet | Person)];
        const bValue = b[id as keyof (Planet | Person)];

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }

      return 0;
    });
  }

  // Implement pagination
  const startRow = (page - 1) * resultsPerPage;
  const endRow = startRow + resultsPerPage;
  filteredData = filteredData.slice(startRow, endRow);

  return filteredData;
};

const reorderData = <T extends { id: string | number }>({
  data,
  ...args
}: {
  data: T[];
} & DataTableOnReorderRowsType) => {
  const updatedData = data;
  const { rowId, newRowIndex } = args;
  const rowIndex = updatedData.findIndex((row) => row.id === rowId);

  if (rowIndex !== -1) {
    // Remove the row from its current position
    const [removedRow] = updatedData.splice(rowIndex, 1);

    // Insert the row at the new index
    updatedData.splice(newRowIndex, 0, removedRow);
  }

  return updatedData;
};

export const Default: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: false,
    hasFilters: true,
    hasPagination: false,
    hasRowSelection: true,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: false,
  },
  render: function C(props) {
    const [data, setData] = useState<Planet[]>(planetData);

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const onReorderRows = useCallback(
      ({ ...props }: DataTableOnReorderRowsType) => {
        const reorderedData = reorderData({ data, ...props });
        setData(reorderedData);
      },
      [data],
    );

    const onChangeRowSelection = useCallback(
      (rowSelection: DataTableRowSelectionState) => {
        if (Object.keys(rowSelection).length > 0) {
          console.log(`${Object.keys(rowSelection).length} selected`);
        }
      },
      [],
    );

    return (
      <DataTable
        {...props}
        columns={planetColumns}
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
      />
    );
  },
};

export const API: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: true,
    hasFilters: true,
    hasPagination: true,
    hasRowSelection: true,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: true,
    totalRows: 200,
  },
  render: function C(props) {
    const [data, setData] = useState<Person[]>(personData);

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const onReorderRows = useCallback(
      ({ ...props }: DataTableOnReorderRowsType) => {
        const reorderedData = reorderData({ data, ...props });
        setData(reorderedData);
      },
      [data],
    );

    const onChangeRowSelection = useCallback(
      (rowSelection: DataTableRowSelectionState) => {
        if (Object.keys(rowSelection).length > 0) {
          console.log(`${Object.keys(rowSelection).length} selected`);
        }
      },
      [],
    );

    const emptyPlaceholder = useMemo(
      () => (
        <EmptyState
          heading="Start by adding data assets"
          description="All relevant data will be displayed and can be searched and filtered"
          PrimaryCallToActionComponent={
            <Button variant="primary" label="Primary" />
          }
          SecondaryCallToActionComponent={
            <Button variant="secondary" label="Secondary" />
          }
        />
      ),
      [],
    );

    const noResultsPlaceholder = useMemo(
      () => (
        <EmptyState
          heading="Whoops, there's nothing here!"
          description="You should try searching or filtering for something else."
        />
      ),
      [],
    );

    const actionMenuItems = (selectedRows: DataTableRowSelectionState) => (
      <>
        <MenuItem onClick={() => console.log(selectedRows)}>Action 1</MenuItem>
        <MenuItem onClick={() => console.log(selectedRows)}>Action 2</MenuItem>
      </>
    );

    return (
      <DataTable
        {...props}
        columns={personColumns}
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        emptyPlaceholder={emptyPlaceholder}
        noResultsPlaceholder={noResultsPlaceholder}
        rowActionMenuItems={actionMenuItems}
        bulkActionMenuItems={actionMenuItems}
      />
    );
  },
};

export const Empty: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: false,
    hasFilters: true,
    hasPagination: false,
    hasRowSelection: true,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: false,
  },
  render: function C(props) {
    const [data, setData] = useState<Planet[]>(planetData);

    const onReorderRows = useCallback(
      ({ ...props }: DataTableOnReorderRowsType) => {
        const reorderedData = reorderData({ data, ...props });
        setData(reorderedData);
      },
      [data],
    );

    const onChangeRowSelection = useCallback(
      (rowSelection: DataTableRowSelectionState) => {
        if (Object.keys(rowSelection).length > 0) {
          console.log(`${Object.keys(rowSelection).length} selected`);
        }
      },
      [],
    );

    const emptyPlaceholder = useMemo(
      () => (
        <EmptyState
          heading="Start by adding data assets"
          description="All relevant data will be displayed and can be searched and filtered"
          PrimaryCallToActionComponent={
            <Button variant="primary" label="Primary" />
          }
          SecondaryCallToActionComponent={
            <Button variant="secondary" label="Secondary" />
          }
        />
      ),
      [],
    );

    return (
      <DataTable
        {...props}
        columns={planetColumns}
        getData={() => []}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        emptyPlaceholder={emptyPlaceholder}
      />
    );
  },
};

export const CustomFilters: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: false,
    hasFilters: true,
    hasPagination: false,
    hasRowSelection: false,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: false,
  },
  render: function C(props) {
    const [data, setData] = useState<Planet[]>(planetData);

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const onReorderRows = useCallback(
      ({ ...props }: DataTableOnReorderRowsType) => {
        const reorderedData = reorderData({ data, ...props });
        setData(reorderedData);
      },
      [data],
    );

    const filters = useMemo(
      () => [
        ...planetColumns,
        {
          id: "startLetter",
          label: "Name starting with...",
          render: (updateFilters: UpdateFiltersOrValues) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "stretch",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="secondary"
                  label="Vowel"
                  isFullWidth
                  onClick={() =>
                    updateFilters({ filterId: "startLetter", value: "vowel" })
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="secondary"
                  label="Consonant"
                  isFullWidth
                  onClick={() =>
                    updateFilters({
                      filterId: "startLetter",
                      value: "consonant",
                    })
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  flexDirection: "column",
                }}
              >
                <Button
                  variant="secondary"
                  label="Any"
                  isFullWidth
                  onClick={() =>
                    updateFilters({ filterId: "startLetter", value: "any" })
                  }
                />
              </Box>
            </Box>
          ),
        },
      ],
      [],
    );

    return (
      <DataTable
        {...props}
        columns={planetColumns}
        filters={filters}
        getData={getData}
        onReorderRows={onReorderRows}
      />
    );
  },
};

export const FilterWithCustomRender: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: false,
    hasFilters: true,
    hasPagination: false,
    hasRowSelection: true,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: false,
  },
  render: function C(props) {
    const [data, setData] = useState<Planet[]>(planetData);

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const onReorderRows = useCallback(
      ({ ...props }: DataTableOnReorderRowsType) => {
        const reorderedData = reorderData({ data, ...props });
        setData(reorderedData);
      },
      [data],
    );

    const onChangeRowSelection = useCallback(
      (rowSelection: DataTableRowSelectionState) => {
        if (Object.keys(rowSelection).length > 0) {
          console.log(`${Object.keys(rowSelection).length} selected`);
        }
      },
      [],
    );

    const filters = useMemo(() => {
      // Filter out the column with the id of "type"
      const filteredPlanetColumns = planetColumns.filter(
        (column) => column.id !== "visit",
      );

      return [
        ...filteredPlanetColumns,
        {
          id: "visit",
          label: "Type of visit 🚀",
          render: (updateFilters: UpdateFiltersOrValues) => (
            <Box>
              <Button
                variant="secondary"
                label="🛬 Landing"
                onClick={() =>
                  updateFilters({ filterId: "visit", value: "landing" })
                }
              />
              <Button
                variant="secondary"
                label="🛰️ Orbit"
                onClick={() =>
                  updateFilters({ filterId: "visit", value: "orbit" })
                }
              />
              <Button
                variant="secondary"
                label="🛸 Flyby"
                onClick={() =>
                  updateFilters({ filterId: "visit", value: "flyby" })
                }
              />
              <Button
                variant="secondary"
                label="🤷‍♂️ Any"
                onClick={() => updateFilters({ filterId: "visit", value: "" })}
              />
            </Box>
          ),
        },
      ];
    }, []);

    return (
      <DataTable
        {...props}
        columns={planetColumns}
        filters={filters}
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
      />
    );
  },
};

export const CustomFilterWithDefaultVariant: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: false,
    hasFilters: true,
    hasPagination: false,
    hasRowSelection: false,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: false,
  },
  render: function C(props) {
    const [data] = useState<Planet[]>(planetData);

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const filters = useMemo<DataTableProps["filters"]>(() => {
      return [
        ...planetColumns,
        {
          id: "startLetter",
          label: "Starting letter",
          variant: "select",
          options: [
            {
              label: "Vowel",
              value: "vowel",
            },
            {
              label: "Consonant",
              value: "consonant",
            },
          ],
        },
      ];
    }, []);

    return (
      <DataTable
        {...props}
        columns={planetColumns}
        filters={filters}
        getData={getData}
      />
    );
  },
};

export const Details: StoryObj<DataTableProps> = {
  render: function C() {
    const data = planetData;

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const renderDetailPanel = useCallback(
      ({ row }: DataTableRenderDetailPanelType) => {
        return <Box>{`This planet is ${row.original.name}.`}</Box>;
      },
      [],
    );

    return (
      <DataTable
        columns={planetColumns}
        getData={getData}
        renderDetailPanel={renderDetailPanel}
      />
    );
  },
};

export const ConditionalDetails: StoryObj<DataTableProps> = {
  render: function C() {
    const data = planetData;

    const getData = useCallback(
      ({ ...props }: DataTableGetDataType) => {
        return filterData({ data, ...props });
      },
      [data],
    );

    const renderDetailPanel = useCallback(
      ({ row }: DataTableRenderDetailPanelType) => {
        if (row.original.visit === "landing") return;

        return (
          <Box>{`Humanity has not landed on ${row.original.name} (yet).`}</Box>
        );
      },
      [],
    );

    return (
      <DataTable
        columns={planetColumns}
        getData={getData}
        renderDetailPanel={renderDetailPanel}
      />
    );
  },
};

export const Truncation: StoryObj<DataTableProps> = {
  render: function C() {
    const columns = useMemo(
      () => [
        {
          accessorKey: "truncated",
          header: "Truncated",
        },
        {
          accessorKey: "wrapped",
          header: "Wrapped",
          hasTextWrapping: true,
        },
      ],
      [],
    );

    const getData = useCallback(() => {
      const data: Array<{ truncated: string; wrapped: string }> = [];
      [...Array(10)].forEach(() => {
        data.push({
          truncated:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla a quam et vulputate. Phasellus elementum turpis a lacus feugiat bibendum.",
          wrapped:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla a quam et vulputate. Phasellus elementum turpis a lacus feugiat bibendum.",
        });
      }); // Corrected the missing parenthesis here
      return data;
    }, []);

    return <DataTable columns={columns} getData={getData} hasColumnResizing />;
  },
};
