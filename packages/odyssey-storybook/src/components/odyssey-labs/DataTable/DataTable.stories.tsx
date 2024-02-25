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
import { DataFilter, paginationTypeValues } from "@okta/odyssey-react-mui/labs";
import {
  DataTable,
  DataTableProps,
  DataTableRowSelectionState,
  DataTableSortingState,
  MenuItem,
  densityValues,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { Person, columns, data } from "./tableAPI";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

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
        "The initial density of the table. This is available even if the table density isn't changeable.",
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
  },
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
    paginationType: "paged",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const handleGetData = ({
  page = 1,
  resultsPerPage = 20,
  search,
  filters,
  sort,
  data,
}: {
  page?: number;
  resultsPerPage?: number;
  search?: string;
  filters?: DataFilter[];
  sort?: DataTableSortingState;
  data: Person[];
}) => {
  let filteredData = data;

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
            return row[id as keyof Person]
              ?.toString()
              .toLowerCase()
              .includes(arrayValue.toString().toLowerCase());
          });
        }

        // General filtering for other columns
        return row[id as keyof Person]
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
        const aValue = a[id as keyof Person];
        const bValue = b[id as keyof Person];

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

const handleOnReorderRows = ({
  rowId,
  newRowIndex,
  data,
  setData,
}: {
  rowId: string;
  newRowIndex: number;
  data: Person[];
  setData: Dispatch<SetStateAction<Person[]>>;
}) => {
  const updatedData = data;

  const rowIndex = updatedData.findIndex((row) => row.id === rowId);

  if (rowIndex !== -1) {
    // Remove the row from its current position
    const [removedRow] = updatedData.splice(rowIndex, 1);

    // Insert the row at the new index
    updatedData.splice(newRowIndex, 0, removedRow);
  }

  setData(updatedData);
};

export const Default: StoryObj<DataTableProps> = {
  render: function C(props) {
    const [tableData, setTableData] = useState(data);

    const getData = useCallback(
      (props: {
        page?: number;
        resultsPerPage?: number;
        search?: string;
        filters?: DataFilter[];
        sort?: DataTableSortingState;
      }) => {
        return handleGetData({ ...props, data: tableData });
      },
      [tableData],
    );

    const onReorderRows = useCallback(
      (props: { rowId: string; newRowIndex: number }) => {
        return handleOnReorderRows({
          ...props,
          data: tableData,
          setData: setTableData,
        });
      },
      [tableData, setTableData],
    );

    const onChangeRowSelection = useCallback(
      (rowSelection: DataTableRowSelectionState) => {
        console.log(`${Object.keys(rowSelection).length} selected`);
      },
      [],
    );

    const bulkActionMenuItems = (selectedRows: DataTableRowSelectionState) => (
      <>
        <MenuItem onClick={() => console.log(selectedRows)}>
          Bulk action 1
        </MenuItem>
        <MenuItem onClick={() => console.log(selectedRows)}>
          Bulk action 2
        </MenuItem>
      </>
    );

    return (
      <DataTable
        getData={getData}
        columns={columns}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        bulkActionMenuItems={bulkActionMenuItems}
        initialDensity={props.initialDensity}
        hasChangeableDensity={props.hasChangeableDensity}
        hasColumnResizing={props.hasColumnResizing}
        hasColumnVisibility={props.hasColumnVisibility}
        hasFilters={props.hasFilters}
        hasPagination={props.hasPagination}
        hasRowSelection={props.hasRowSelection}
        hasSearch={props.hasSearch}
        hasSorting={props.hasSorting}
        hasRowReordering={props.hasRowReordering}
        hasSearchSubmitButton={props.hasSearchSubmitButton}
        searchDelayTime={props.searchDelayTime}
        currentPage={props.currentPage}
        resultsPerPage={props.resultsPerPage}
        totalRows={props.totalRows}
      />
    );
  },
};
