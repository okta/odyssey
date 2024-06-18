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
  DataRow,
  DataView,
  DataViewProps,
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  densityValues,
  availableLayouts,
  TableProps,
  StackProps,
  DataTable,
  DataStack,
} from "@okta/odyssey-react-mui/labs";
import { PauseIcon, RefreshIcon } from "@okta/odyssey-react-mui/icons";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "./personData";
import { filterData, reorderData } from "./dataFunctions";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Box,
  MenuItem,
  Status,
  Button,
  EmptyState,
  paginationTypeValues,
} from "@okta/odyssey-react-mui";

type DataViewMetaProps = DataViewProps &
  TableProps &
  StackProps & {
    tableRowActionMenuItems: TableProps["rowActionMenuItems"];
    stackRowActionMenuItems: StackProps["rowActionMenuItems"];
    hasCustomEmptyPlaceholder: boolean;
    hasCustomNoResultsPlaceholder: boolean;
    hasActionMenuItems: boolean;
    hasActionButtons: boolean;
  };

const storybookMeta: Meta<DataViewMetaProps> = {
  title: "Labs Components/Data components",
  component: DataView,
  argTypes: {
    getData: {
      control: null,
      table: {
        type: {
          summary: "",
        },
      },
    },
    getRowId: {
      control: null,
      table: {
        type: {
          summary: "",
        },
      },
    },
    hasRowReordering: {
      control: "boolean",
      table: {
        type: {
          summary: "",
        },
      },
    },
    isRowReorderingDisabled: {
      control: "boolean",
    },
    onReorderRows: {
      control: null,
      table: {
        type: {
          summary: "",
        },
      },
    },
    hasRowSelection: {
      control: "boolean",
    },
    onChangeRowSelection: {
      control: null,
    },
    bulkActionMenuItems: {
      control: null,
    },
    hasPagination: {
      control: "boolean",
    },
    currentPage: {
      control: "number",
    },
    paginationType: {
      control: "select",
      options: paginationTypeValues,
    },
    resultsPerPage: {
      control: "number",
    },
    totalRows: {
      control: "number",
    },
    hasFilters: {
      control: "boolean",
    },
    hasSearch: {
      control: "boolean",
    },
    hasSearchSubmitButton: {
      control: "boolean",
    },
    filters: {
      control: null,
    },
    searchDelayTime: {
      control: "number",
    },
    errorMessage: {
      control: "text",
    },
    emptyPlaceholder: {
      control: null,
    },
    noResultsPlaceholder: {
      control: null,
    },
    initialLayout: {
      control: "select",
      options: availableLayouts,
    },
    availableLayouts: {
      control: "check",
      options: availableLayouts,
    },
    columns: {
      control: null,
      name: "tableOptions.columns",
    },
    initialDensity: {
      control: "select",
      options: densityValues,
      name: "tableOptions.columns",
    },
    hasChangeableDensity: {
      control: "boolean",
      name: "tableOptions.hasChangeableDensity",
    },
    hasColumnResizing: {
      control: "boolean",
      name: "tableOptions.hasColumnResizing",
    },
    hasColumnVisibility: {
      control: "boolean",
      name: "tableOptions.hasColumnVisibility",
    },
    renderDetailPanel: {
      control: null,
      name: "tableOptions.renderDetailPanel",
    },
    rowActionButtons: {
      control: null,
      name: "tableOptions.rowActionButtons",
    },
    tableRowActionMenuItems: {
      control: null,
      name: "tableOptions.rowActionMenuItems",
    },
    hasSorting: {
      control: "boolean",
      name: "tableOptions.hasSorting",
    },
    cardProps: {
      control: null,
      name: "stackOptions.cardProps",
    },
    maxGridColumns: {
      control: "number",
      name: "stackOptions.maxGridColumns",
    },
    stackRowActionMenuItems: {
      control: null,
      name: "stackOptions.rowActionMenuItems",
    },
    isLoading: {
      control: "boolean",
    },
    isEmpty: {
      control: "boolean",
    },
    isNoResults: {
      control: "boolean",
    },
    hasCustomEmptyPlaceholder: {
      control: "boolean",
      name: "[STORY ONLY] Has custom empty placeholder?",
    },
    hasCustomNoResultsPlaceholder: {
      control: "boolean",
      name: "[STORY ONLY] Has custom 'no results' placeholder?",
    },
    hasActionMenuItems: {
      control: "boolean",
      name: "[STORY ONLY] Has action menu items?",
    },
    hasActionButtons: {
      control: "boolean",
      name: "[STORY ONLY] Has action buttons in table view?",
    },
  },
  args: {
    currentPage: 1,
    resultsPerPage: 20,
    paginationType: "paged",
    maxGridColumns: 3,
    hasActionButtons: false,
    hasActionMenuItems: false,
    hasCustomEmptyPlaceholder: false,
    hasCustomNoResultsPlaceholder: false,
    availableLayouts: ["table", "stack", "grid"],
    initialLayout: "table",
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const useDataCallbacks = (
  data: Person[],
  setData: Dispatch<SetStateAction<Person[]>>,
) => {
  const getData = useCallback(
    ({ ...props }: DataGetDataType) => {
      return filterData({ data, ...props });
    },
    [data],
  );

  const onReorderRows = useCallback(
    ({ ...props }: DataOnReorderRowsType) => {
      const reorderedData = reorderData({ data, ...props });
      setData(reorderedData);
    },
    [data, setData],
  );

  const onChangeRowSelection = useCallback(
    (rowSelection: DataRowSelectionState) => {
      if (Object.keys(rowSelection).length > 0) {
        console.log(`${Object.keys(rowSelection).length} selected`);
      }
    },
    [],
  );

  return { getData, onReorderRows, onChangeRowSelection };
};

// Common action menu items
const actionMenuItems = (selectedRows: DataRowSelectionState) => (
  <>
    <MenuItem onClick={() => console.log(selectedRows)}>Action 1</MenuItem>
    <MenuItem onClick={() => console.log(selectedRows)}>Action 2</MenuItem>
  </>
);

const actionButtons = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      marginInlineEnd: 2,
    }}
  >
    <Button
      endIcon={<PauseIcon />}
      ariaLabel="Pause"
      size="small"
      variant="floating"
    />
    <Button
      endIcon={<RefreshIcon />}
      ariaLabel="Refresh"
      size="small"
      variant="floating"
    />
  </Box>
);

const customEmptyPlaceholder = (
  <EmptyState
    heading="Start by adding data assets"
    description="All relevant data will be displayed and can be searched and filtered"
    PrimaryCallToActionComponent={<Button variant="primary" label="Primary" />}
    SecondaryCallToActionComponent={
      <Button variant="secondary" label="Secondary" />
    }
  />
);

const customNoResultsPlaceholder = (
  <EmptyState
    heading="Whoops, there's nothing here!"
    description="You should try searching or filtering for something else."
  />
);

const cardProps = (row: DataRow) => ({
  overline: `${row.city}, ${row.state}`,
  title: row.name,
  description: `${row.name} is ${row.age} years old.`,
  children: (
    <Status
      label={row.risk.charAt(0).toUpperCase() + row.risk.slice(1)}
      severity={
        row.risk === "low"
          ? "success"
          : row.risk === "medium"
            ? "warning"
            : "error"
      }
    />
  ),
});

// Base story configuration
const BaseStory: StoryObj<DataViewMetaProps> = {
  render: function Base(args) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    return (
      <DataView
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        bulkActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        hasRowReordering={args.hasRowReordering}
        isRowReorderingDisabled={args.isRowReorderingDisabled}
        hasRowSelection={args.hasRowSelection}
        hasPagination={args.hasPagination}
        currentPage={args.currentPage}
        paginationType={args.paginationType}
        resultsPerPage={args.resultsPerPage}
        totalRows={args.totalRows}
        hasFilters={args.hasFilters}
        hasSearch={args.hasSearch}
        hasSearchSubmitButton={args.hasSearchSubmitButton}
        searchDelayTime={args.searchDelayTime}
        errorMessage={args.errorMessage}
        initialLayout={args.initialLayout}
        availableLayouts={args.availableLayouts}
        isLoading={args.isLoading}
        isEmpty={args.isEmpty}
        isNoResults={args.isNoResults}
        emptyPlaceholder={
          args.hasCustomEmptyPlaceholder ? customEmptyPlaceholder : undefined
        }
        noResultsPlaceholder={
          args.hasCustomNoResultsPlaceholder
            ? customNoResultsPlaceholder
            : undefined
        }
        tableOptions={{
          columns: personColumns,
          hasSorting: args.hasSorting,
          rowActionMenuItems: args.hasActionMenuItems
            ? actionMenuItems
            : undefined,
          rowActionButtons: args.hasActionButtons ? actionButtons : undefined,
          renderDetailPanel: undefined,
          hasColumnVisibility: args.hasColumnVisibility,
          hasColumnResizing: args.hasColumnResizing,
          hasChangeableDensity: args.hasChangeableDensity,
          initialDensity: args.initialDensity,
        }}
        stackOptions={{
          cardProps: cardProps,
          rowActionMenuItems: args.hasActionMenuItems
            ? actionMenuItems
            : undefined,
          maxGridColumns: args.maxGridColumns,
        }}
      />
    );
  },
};

export const Default: StoryObj<DataViewMetaProps> = {
  ...BaseStory,
  args: {},
};

export const TableOnly: StoryObj<DataViewMetaProps> = {
  ...BaseStory,
  args: {
    availableLayouts: ["table"],
  },
};

export const StackWithMultipleLayouts: StoryObj<DataViewMetaProps> = {
  ...BaseStory,
  args: {
    availableLayouts: ["list", "grid"],
  },
};

export const StackListOnly: StoryObj<DataViewMetaProps> = {
  ...BaseStory,
  args: {
    availableLayouts: ["list"],
  },
};

export const StackGridOnly: StoryObj<DataViewMetaProps> = {
  ...BaseStory,
  args: {
    availableLayouts: ["grid"],
  },
};

export const Everything: StoryObj<DataViewMetaProps> = {
  ...BaseStory,
  args: {
    hasRowReordering: true,
    hasPagination: true,
    hasFilters: true,
    hasSearch: true,
    hasChangeableDensity: true,
    hasColumnResizing: true,
    hasColumnVisibility: true,
    hasSorting: true,
    hasActionButtons: true,
    hasActionMenuItems: true,
    hasRowSelection: true,
  },
};

export const DataTableComponent: StoryObj<DataViewMetaProps> = {
  render: function Base(args) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    return (
      <DataTable
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        bulkActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        hasRowReordering={args.hasRowReordering}
        isRowReorderingDisabled={args.isRowReorderingDisabled}
        hasRowSelection={args.hasRowSelection}
        hasPagination={args.hasPagination}
        currentPage={args.currentPage}
        paginationType={args.paginationType}
        resultsPerPage={args.resultsPerPage}
        totalRows={args.totalRows}
        hasFilters={args.hasFilters}
        hasSearch={args.hasSearch}
        hasSearchSubmitButton={args.hasSearchSubmitButton}
        searchDelayTime={args.searchDelayTime}
        errorMessage={args.errorMessage}
        isLoading={args.isLoading}
        isEmpty={args.isEmpty}
        isNoResults={args.isNoResults}
        emptyPlaceholder={
          args.hasCustomEmptyPlaceholder ? customEmptyPlaceholder : undefined
        }
        noResultsPlaceholder={
          args.hasCustomNoResultsPlaceholder
            ? customNoResultsPlaceholder
            : undefined
        }
        columns={personColumns}
        hasSorting={args.hasSorting}
        rowActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        rowActionButtons={args.hasActionButtons ? actionButtons : undefined}
        hasColumnVisibility={args.hasColumnVisibility}
        hasColumnResizing={args.hasColumnResizing}
        hasChangeableDensity={args.hasChangeableDensity}
        initialDensity={args.initialDensity}
      />
    );
  },
};

export const DataStackComponent: StoryObj<DataViewMetaProps> = {
  render: function Base(args) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    return (
      <DataStack
        availableLayouts={["list", "grid"]}
        getData={getData}
        onReorderRows={onReorderRows}
        onChangeRowSelection={onChangeRowSelection}
        bulkActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        hasRowReordering={args.hasRowReordering}
        isRowReorderingDisabled={args.isRowReorderingDisabled}
        hasRowSelection={args.hasRowSelection}
        hasPagination={args.hasPagination}
        currentPage={args.currentPage}
        paginationType={args.paginationType}
        resultsPerPage={args.resultsPerPage}
        totalRows={args.totalRows}
        hasFilters={args.hasFilters}
        hasSearch={args.hasSearch}
        hasSearchSubmitButton={args.hasSearchSubmitButton}
        searchDelayTime={args.searchDelayTime}
        errorMessage={args.errorMessage}
        isLoading={args.isLoading}
        isEmpty={args.isEmpty}
        isNoResults={args.isNoResults}
        emptyPlaceholder={
          args.hasCustomEmptyPlaceholder ? customEmptyPlaceholder : undefined
        }
        noResultsPlaceholder={
          args.hasCustomNoResultsPlaceholder
            ? customNoResultsPlaceholder
            : undefined
        }
        cardProps={cardProps}
        rowActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        maxGridColumns={args.maxGridColumns}
      />
    );
  },
};
