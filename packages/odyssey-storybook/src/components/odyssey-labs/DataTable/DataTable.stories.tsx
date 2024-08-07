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
  TableProps,
  StackProps,
} from "@okta/odyssey-react-mui/labs";
import { PauseIcon, RefreshIcon } from "@okta/odyssey-react-mui/icons";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "../DataView/personData";
import { filterData, reorderData } from "../DataView/dataFunctions";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  EmptyState,
  paginationTypeValues,
} from "@okta/odyssey-react-mui";

type DataTableMetaProps = DataViewProps &
  TableProps & {
    tableRowActionMenuItems: TableProps["rowActionMenuItems"];
    stackRowActionMenuItems: StackProps["rowActionMenuItems"];
    hasCustomEmptyPlaceholder: boolean;
    hasCustomNoResultsPlaceholder: boolean;
    hasActionMenuItems: boolean;
    hasActionButtons: boolean;
  };

const storybookMeta: Meta<DataTableMetaProps> = {
  title: "Labs Components/DataTable",
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
    columns: {
      control: null,
    },
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
    renderDetailPanel: {
      control: null,
    },
    rowActionButtons: {
      control: null,
    },
    tableRowActionMenuItems: {
      control: null,
    },
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
  },
  args: {},
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

export const Default: StoryObj<DataTableMetaProps> = {
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
