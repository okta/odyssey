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

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  DataTableProps,
  EmptyState,
  MenuItem,
  paginationTypeValues,
} from "@okta/odyssey-react-mui";
import { PauseIcon, RefreshIcon } from "@okta/odyssey-react-mui/icons";
import {
  CardLayoutProps,
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  DataTable,
  DataView,
  DataViewProps,
  densityValues,
  TableLayoutProps,
} from "@okta/odyssey-react-mui/labs";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { fn } from "storybook/test";

import { OdysseyStorybookThemeDecorator } from "../../../tools/OdysseyStorybookThemeDecorator.js";
import { filterData, reorderData } from "../DataView/dataFunctions.js";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "../DataView/personData.js";

type DataTableMetaProps = DataViewProps<Person> &
  TableLayoutProps<Person> & {
    hasActionButtons: boolean;
    hasActionMenuItems: boolean;
    hasAdditionalActionButton: boolean;
    hasAdditionalActionMenuItems: boolean;
    hasCustomEmptyPlaceholder: boolean;
    hasCustomNoResultsPlaceholder: boolean;
    listRowActionMenuItems: CardLayoutProps<Person>["rowActionMenuItems"];
    tableRowActionMenuItems: TableLayoutProps<Person>["rowActionMenuItems"];
  };

const storybookMeta: Meta<DataTableMetaProps> = {
  component: DataView,
  decorators: [OdysseyStorybookThemeDecorator],
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
  tags: ["deprecated", "labs-export"],
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
      ariaLabel="Pause"
      endIcon={<PauseIcon />}
      size="small"
      variant="floating"
    />
    <Button
      ariaLabel="Refresh"
      endIcon={<RefreshIcon />}
      size="small"
      variant="floating"
    />
  </Box>
);

const additionalActionButton = <Button label="Add widget" variant="primary" />;

const additionalActionMenuItems = (
  <>
    <MenuItem onClick={() => console.log("Action 1")}>Action 1</MenuItem>
    <MenuItem onClick={() => console.log("Action 2")}>Action 2</MenuItem>
  </>
);

const customEmptyPlaceholder = (
  <EmptyState
    description="All relevant data will be displayed and can be searched and filtered"
    heading="Start by adding data assets"
    PrimaryCallToActionComponent={<Button label="Primary" variant="primary" />}
    SecondaryCallToActionComponent={
      <Button label="Secondary" variant="secondary" />
    }
  />
);

const customNoResultsPlaceholder = (
  <EmptyState
    description="You should try searching or filtering for something else."
    heading="Whoops, there's nothing here!"
  />
);

export const Default: StoryObj<DataTableMetaProps> = {
  render: function C(args) {
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
        bulkActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        columns={personColumns}
        currentPage={args.currentPage}
        emptyPlaceholder={
          args.hasCustomEmptyPlaceholder ? customEmptyPlaceholder : undefined
        }
        errorMessage={args.errorMessage}
        getData={getData}
        hasChangeableDensity={args.hasChangeableDensity}
        hasColumnResizing={args.hasColumnResizing}
        hasColumnVisibility={args.hasColumnVisibility}
        hasFilters={args.hasFilters}
        hasPagination={args.hasPagination}
        hasRowReordering={args.hasRowReordering}
        hasRowSelection={args.hasRowSelection}
        hasSearch={args.hasSearch}
        hasSearchSubmitButton={args.hasSearchSubmitButton}
        hasSorting={args.hasSorting}
        initialDensity={args.initialDensity}
        isEmpty={args.isEmpty}
        isLoading={args.isLoading}
        isNoResults={args.isNoResults}
        isRowReorderingDisabled={args.isRowReorderingDisabled}
        noResultsPlaceholder={
          args.hasCustomNoResultsPlaceholder
            ? customNoResultsPlaceholder
            : undefined
        }
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        paginationType={args.paginationType}
        resultsPerPage={args.resultsPerPage}
        rowActionButtons={args.hasActionButtons ? actionButtons : undefined}
        rowActionMenuItems={
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        searchDelayTime={args.searchDelayTime}
        totalRows={args.totalRows}
      />
    );
  },
};
