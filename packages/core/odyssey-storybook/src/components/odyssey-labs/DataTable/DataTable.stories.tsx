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
  DataTable,
  DataView,
  DataViewProps,
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  densityValues,
  TableLayoutProps,
  CardLayoutProps,
} from "@okta/odyssey-react-mui/labs";
import { PauseIcon, RefreshIcon } from "@okta/odyssey-react-mui/icons";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "../DataView/personData.js";
import { filterData, reorderData } from "../DataView/dataFunctions.js";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  EmptyState,
  paginationTypeValues,
  DataTableProps,
} from "@okta/odyssey-react-mui";
import { fn } from "@storybook/test";

type DataTableMetaProps = DataViewProps<Person> &
  TableLayoutProps<Person> & {
    tableRowActionMenuItems: TableLayoutProps<Person>["rowActionMenuItems"];
    listRowActionMenuItems: CardLayoutProps<Person>["rowActionMenuItems"];
    hasCustomEmptyPlaceholder: boolean;
    hasCustomNoResultsPlaceholder: boolean;
    hasActionMenuItems: boolean;
    hasActionButtons: boolean;
    hasAdditionalActionButton: boolean;
    hasAdditionalActionMenuItems: boolean;
  };

const storybookMeta: Meta<DataTableMetaProps> = {
  title: "Labs Components/DataTable",
  component: DataView,
  argTypes: {
    getData: {
      table: {
        type: {
          summary: "",
        },
      },
    },
    getRowId: {
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
      table: {
        type: {
          summary: "",
        },
      },
    },
    hasRowSelection: {
      control: "boolean",
    },
    onChangeRowSelection: {},
    bulkActionMenuItems: {},
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
    filters: {},
    searchDelayTime: {
      control: "number",
    },
    errorMessage: {
      control: "text",
    },
    emptyPlaceholder: {},
    noResultsPlaceholder: {},
    columns: {},
    initialDensity: {
      control: "select",
      options: densityValues,
    },
    hasChangeableDensity: {
      control: "boolean",
    },
    hasColumnResizing: {
      control: "boolean",
    },
    hasColumnVisibility: {
      control: "boolean",
    },
    renderDetailPanel: {},
    rowActionButtons: {},
    tableRowActionMenuItems: {},
    hasSorting: {
      control: "boolean",
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
    isPaginationMoreDisabled: {
      control: "boolean",
      description:
        "If true, the pagination next or show more button will be disabled.",
      table: {
        type: {
          summary: "boolean",
        },
      },
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
    hasAdditionalActionButton: {
      control: "boolean",
      name: "[STORY ONLY] Has additional action button?",
    },
    hasAdditionalActionMenuItems: {
      control: "boolean",
      name: "[STORY ONLY] Has additional action menu items?",
    },
  },
  args: {
    onChangeRowSelection: fn(),
  },
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
const actionMenuItems: DataTableProps["rowActionMenuItems"] = (
  selectedRows,
) => (
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

const additionalActionButton = <Button variant="primary" label="Add widget" />;

const additionalActionMenuItems = (
  <>
    <MenuItem onClick={() => console.log("Action 1")}>Action 1</MenuItem>
    <MenuItem onClick={() => console.log("Action 2")}>Action 2</MenuItem>
  </>
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

export const Default: StoryObj<DataTableMetaProps> = {
  render: function Base(args) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    return (
      <DataTable
        additionalActionButton={
          args.hasAdditionalActionButton ? additionalActionButton : undefined
        }
        additionalActionMenuItems={
          args.hasAdditionalActionMenuItems
            ? additionalActionMenuItems
            : undefined
        }
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
