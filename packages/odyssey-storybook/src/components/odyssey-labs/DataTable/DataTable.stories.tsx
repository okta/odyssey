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
import { columns, data as incomingData, Person } from "./tableAPI";
import { Box, Button, Callout, MenuItem } from "@okta/odyssey-react-mui";
import { DataFilter, paginationTypeValues } from "@okta/odyssey-react-mui/labs";
import {
  DataTable,
  DataTableProps,
  MRT_SortingState,
  densityValues,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { useState } from "react";
import { DeleteIcon } from "@okta/odyssey-react-mui/icons";

const storybookMeta: Meta<DataTableProps> = {
  title: "Labs Components/DataTable",
  component: DataTable,
  argTypes: {
    hasChangeableDensity: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasColumnResizing: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasColumnVisibility: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasFilters: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasPagination: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasRowSelection: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasRowReordering: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSearch: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    hasSorting: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },

    columns: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "MRT_ColumnDef<MRT_RowData, null>",
        },
      },
    },
    data: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "MRT_RowData[]",
        },
      },
    },
    totalRows: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    getRowId: {
      control: null,
      description: "",
      table: {
        type: {
          summary:
            "((originalRow: MRT_RowData, index: number, parentRow: MRT_Row<MRT_RowData>) => string) | undefined",
        },
      },
    },
    initialDensity: {
      options: densityValues,
      control: { type: "radio" },
      description: "",
      table: {
        type: {
          summary: densityValues.join(" | "),
        },
        defaultValue: {
          summary: "medium",
        },
      },
    },
    hasSearchSubmitButton: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onChangeRowSelection: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "(rowSelection: MRT_RowSelectionState) => void",
        },
      },
    },
    fetchDataFn: {
      control: null,
      description: "",
      table: {
        type: {
          summary:
            "({ page, resultsPerPage, search, filters, sort }) => MRT_RowData[]",
        },
      },
    },
    reorderDataFn: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "(rowId, newIndex) => void",
        },
      },
    },
    page: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    resultsPerPage: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    paginationType: {
      options: paginationTypeValues,
      control: { type: "radio" },
      description: "",
      table: {
        type: {
          summary: paginationTypeValues.join(" | "),
        },
        defaultValue: {
          summary: "medium",
        },
      },
    },
    rowActionButtons: {
      control: null,
      description: "",
      table: {
        type: {
          summary:
            "(row: MRT_RowData) => ReactElement<typeof Button | typeof Fragment>",
        },
      },
    },
    rowActionMenuItems: {
      control: null,
      description: "",
      table: {
        type: {
          summary:
            "(row: MRT_RowData) => ReactElement<typeof MenuItem | typeof Fragment>",
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const processData = ({
  initialData,
  page = 1,
  resultsPerPage = 20,
  search,
  filters,
  sort,
}: {
  initialData: Person[];
  page?: number;
  resultsPerPage?: number;
  search?: string;
  filters?: DataFilter[];
  sort?: MRT_SortingState;
}) => {
  let filteredData = [...initialData];

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

        // Specific filtering for 'age' column
        // if (id === "age") {
        //   const { min, max }: { min: number, max: number } = value;
        //   return row[id] >= min && row[id] <= max;
        // }

        // Specific filtering for 'type' column
        // if (id === "type") {
        //   return row[id] === value;
        // }

        // General filtering for other columns
        return row[id as keyof Person]?.toString().includes(value.toString());
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
  const startIdx = (page - 1) * resultsPerPage;
  const endIdx = startIdx + resultsPerPage;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  return paginatedData;
};

export const Default: StoryObj<DataTableProps> = {
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
  render: function C(props) {
    const [data, setData] = useState<Person[]>(incomingData);

    const fetchData = ({
      page,
      resultsPerPage,
      search,
      filters,
      sort,
    }: {
      page?: number;
      resultsPerPage?: number;
      search?: string;
      filters?: DataFilter[];
      sort?: MRT_SortingState;
    }) => {
      return processData({
        initialData: data,
        page: page,
        resultsPerPage: resultsPerPage,
        search: search,
        filters: filters,
        sort: sort,
      });
    };

    const reorderData = ({
      rowId,
      newRowIndex,
    }: {
      rowId: string;
      newRowIndex: number;
    }) => {
      const updatedData = incomingData;

      const rowIndex = updatedData.findIndex((row) => row.id === rowId);

      if (rowIndex !== -1) {
        // Remove the row from its current position
        const [removedRow] = updatedData.splice(rowIndex, 1);

        // Insert the row at the new index
        updatedData.splice(newRowIndex, 0, removedRow);
      }

      setData(updatedData);
    };

    return (
      <Box>
        <Callout severity="info">
          Data in this table is procedurally-generated. Any resemblance to real
          information is coincidental.
        </Callout>
        <DataTable
          columns={columns}
          totalRows={data.length}
          getRowId={({ id }) => id}
          getData={fetchData}
          onReorderRows={reorderData}
          hasSearchSubmitButton={true}
          hasChangeableDensity={props.hasChangeableDensity}
          hasColumnResizing={props.hasColumnResizing}
          hasColumnVisibility={props.hasColumnVisibility}
          hasFilters={props.hasFilters}
          hasPagination={props.hasPagination}
          hasRowSelection={props.hasRowSelection}
          hasRowReordering={props.hasRowReordering}
          hasSearch={props.hasSearch}
          hasSorting={props.hasSorting}
          paginationType={props.paginationType}
          onChangeRowSelection={(rowSelection) => console.log(rowSelection)}
          rowActionButtons={(row) => (
            <Button
              endIcon={<DeleteIcon />}
              ariaLabel="Delete"
              variant="floating"
              size="small"
              onClick={() =>
                console.log(
                  `Clicking this would delete the item with the id ${row.id}`,
                )
              }
            />
          )}
          rowActionMenuItems={(row) => (
            <>
              <MenuItem
                onClick={() =>
                  console.log(`Action applied to the row with the id ${row.id}`)
                }
              >
                Item 1
              </MenuItem>
              <MenuItem
                onClick={() =>
                  console.log(`Action applied to the row with the id ${row.id}`)
                }
              >
                Item 2
              </MenuItem>
              <MenuItem
                onClick={() =>
                  console.log(`Action applied to the row with the id ${row.id}`)
                }
              >
                Item 3
              </MenuItem>
            </>
          )}
        />
      </Box>
    );
  },
};

export const NoActions: StoryObj<DataTableProps> = {
  args: {
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: true,
    hasFilters: true,
    hasPagination: true,
    hasRowSelection: true,
    hasSearch: true,
    hasSorting: true,
    hasRowReordering: false,
    paginationType: "paged",
  },
  render: function C(props) {
    const data = incomingData;

    const fetchData = ({
      page,
      resultsPerPage,
      search,
      filters,
      sort,
    }: {
      page?: number;
      resultsPerPage?: number;
      search?: string;
      filters?: DataFilter[];
      sort?: MRT_SortingState;
    }) => {
      return processData({
        initialData: data,
        page: page,
        resultsPerPage: resultsPerPage,
        search: search,
        filters: filters,
        sort: sort,
      });
    };

    return (
      <Box>
        <Callout severity="info">
          Data in this table is procedurally-generated and will change on each
          page refresh. Any resemblance to real information is coincidental.
        </Callout>
        <DataTable
          columns={columns}
          totalRows={data.length}
          getRowId={({ id }) => id}
          getData={fetchData}
          hasSearchSubmitButton={true}
          hasChangeableDensity={props.hasChangeableDensity}
          hasColumnResizing={props.hasColumnResizing}
          hasColumnVisibility={props.hasColumnVisibility}
          hasFilters={props.hasFilters}
          hasPagination={props.hasPagination}
          hasRowSelection={props.hasRowSelection}
          hasRowReordering={props.hasRowReordering}
          hasSearch={props.hasSearch}
          hasSorting={props.hasSorting}
          paginationType={props.paginationType}
          onChangeRowSelection={(rowSelection) => console.log(rowSelection)}
        />
      </Box>
    );
  },
};
