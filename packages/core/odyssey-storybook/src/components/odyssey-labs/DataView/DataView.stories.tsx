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
  Box,
  Button,
  DataTableRowData,
  EmptyState,
  MenuItem,
  paginationTypeValues,
  Status,
} from "@okta/odyssey-react-mui";
import { PauseIcon, RefreshIcon } from "@okta/odyssey-react-mui/icons";
import {
  availableLayouts,
  CardLayoutProps,
  DataCardProps,
  DataColumns,
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  DataView,
  DataViewProps,
  densityValues,
  TableLayoutProps,
  UpdateFiltersOrValues,
} from "@okta/odyssey-react-mui/labs";
import { fn } from "@storybook/test";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { filterData, reorderData } from "./dataFunctions.js";
import {
  Person,
  columns as personColumns,
  data as personData,
} from "./personData.js";

type DataViewMetaProps = DataViewProps<Person> &
  TableLayoutProps<Person> &
  CardLayoutProps<Person> & {
    cardRowActionMenuItems: CardLayoutProps<Person>["rowActionMenuItems"];
    hasActionButtons: boolean;
    hasActionMenuItems: boolean;
    hasAdditionalActionButton: boolean;
    hasAdditionalActionMenuItems: boolean;
    hasCustomEmptyPlaceholder: boolean;
    hasCustomNoResultsPlaceholder: boolean;
    tableRowActionMenuItems: TableLayoutProps<Person>["rowActionMenuItems"];
  };

const meta = {
  title: "Labs Components/DataView",
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
    metaText: {
      control: "text",
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
    enableVirtualization: {
      control: "boolean",
    },
    errorMessage: {
      control: "text",
    },
    emptyPlaceholder: {},
    noResultsPlaceholder: {},
    initialLayout: {
      control: "select",
      options: availableLayouts,
    },
    availableLayouts: {
      control: "check",
      options: availableLayouts,
    },
    columns: {
      name: "tableLayoutOptions.columns",
    },
    initialDensity: {
      control: "select",
      options: densityValues,
      name: "tableLayoutOptions.columns",
    },
    hasChangeableDensity: {
      control: "boolean",
      name: "tableLayoutOptions.hasChangeableDensity",
    },
    hasColumnResizing: {
      control: "boolean",
      name: "tableLayoutOptions.hasColumnResizing",
    },
    hasColumnVisibility: {
      control: "boolean",
      name: "tableLayoutOptions.hasColumnVisibility",
    },
    renderDetailPanel: {
      name: "tableLayoutOptions.renderDetailPanel",
    },
    rowActionButtons: {
      name: "tableLayoutOptions.rowActionButtons",
    },
    tableRowActionMenuItems: {
      name: "tableLayoutOptions.rowActionMenuItems",
    },
    hasSorting: {
      control: "boolean",
      name: "tableLayoutOptions.hasSorting",
    },
    itemProps: {
      name: "cardLayoutOptions.itemProps",
    },
    maxGridColumns: {
      control: "number",
      name: "cardLayoutOptions.maxGridColumns",
    },
    cardRowActionMenuItems: {
      name: "cardLayoutOptions.rowActionMenuItems",
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
    availableLayouts: ["table", "list", "grid"],
    currentPage: 1,
    hasActionButtons: false,
    hasActionMenuItems: false,
    hasCustomEmptyPlaceholder: false,
    hasCustomNoResultsPlaceholder: false,
    maxGridColumns: 3,
    onChangeRowSelection: fn(),
    paginationType: "paged",
    resultsPerPage: 20,
  },
} satisfies Meta<DataViewMetaProps>;

export default meta;

type Story = StoryObj<DataViewMetaProps>;

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

const additionalActionButton = <Button label="Add widget" variant="primary" />;

const additionalActionMenuItems = (
  <>
    <MenuItem onClick={() => console.log("Additional action 1")}>
      Additional action 1
    </MenuItem>
    <MenuItem onClick={() => console.log("Additional action 2")}>
      Additional action 2
    </MenuItem>
  </>
);

const bulkActionMenuItems = (selectedRows: DataRowSelectionState) => (
  <>
    <MenuItem onClick={() => console.log(selectedRows)}>Action 1</MenuItem>
    <MenuItem onClick={() => console.log(selectedRows)}>Action 2</MenuItem>
  </>
);

const rowActionButtons = () => (
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

const rowActionMenuItems = (row: Person) => (
  <>
    <MenuItem onClick={() => console.log(`Action 1 for ${row.name}`)}>
      Action 1
    </MenuItem>
    <MenuItem onClick={() => console.log(`Action 2 for ${row.name}`)}>
      Action 2
    </MenuItem>
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

const itemProps: CardLayoutProps<Person>["itemProps"] = (row) => ({
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
const BaseStory: Story = {
  args: {} as Story["args"], // This is a hack.
  render: function C(args) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    return (
      <DataView
        additionalActionButton={
          args.hasAdditionalActionButton ? additionalActionButton : undefined
        }
        additionalActionMenuItems={
          args.hasAdditionalActionMenuItems
            ? additionalActionMenuItems
            : undefined
        }
        availableLayouts={args.availableLayouts}
        bulkActionMenuItems={
          args.hasActionMenuItems ? bulkActionMenuItems : undefined
        }
        cardLayoutOptions={{
          itemProps,
          rowActionMenuItems: args.hasActionMenuItems
            ? rowActionMenuItems
            : undefined,
          maxGridColumns: args.maxGridColumns,
        }}
        currentPage={args.currentPage}
        emptyPlaceholder={
          args.hasCustomEmptyPlaceholder ? customEmptyPlaceholder : undefined
        }
        enableVirtualization={args.enableVirtualization}
        errorMessage={args.errorMessage}
        getData={getData}
        hasFilters={args.hasFilters}
        hasPagination={args.hasPagination}
        hasRowReordering={args.hasRowReordering}
        hasRowSelection={args.hasRowSelection}
        hasSearch={args.hasSearch}
        hasSearchSubmitButton={args.hasSearchSubmitButton}
        initialLayout={args.initialLayout}
        isEmpty={args.isEmpty}
        isLoading={args.isLoading}
        isNoResults={args.isNoResults}
        isPaginationMoreDisabled={args.isPaginationMoreDisabled}
        isRowReorderingDisabled={args.isRowReorderingDisabled}
        metaText={args.metaText}
        noResultsPlaceholder={
          args.hasCustomNoResultsPlaceholder
            ? customNoResultsPlaceholder
            : undefined
        }
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        paginationType={args.paginationType}
        resultsPerPage={args.resultsPerPage}
        searchDelayTime={args.searchDelayTime}
        tableLayoutOptions={{
          columns: personColumns,
          hasSorting: args.hasSorting,
          rowActionMenuItems: args.hasActionMenuItems
            ? rowActionMenuItems
            : undefined,
          rowActionButtons: args.hasActionButtons
            ? rowActionButtons
            : undefined,
          renderDetailPanel: undefined,
          hasColumnVisibility: args.hasColumnVisibility,
          hasColumnResizing: args.hasColumnResizing,
          hasChangeableDensity: args.hasChangeableDensity,
          initialDensity: args.initialDensity,
        }}
        totalRows={args.totalRows}
      />
    );
  },
};

export const Default: Story = {
  ...BaseStory,
  args: {},
};

export const TableOnly: Story = {
  ...BaseStory,
  args: {
    availableLayouts: ["table"],
  },
};

export const ListAndGrid: Story = {
  ...BaseStory,
  args: {
    availableLayouts: ["list", "grid"],
  },
};

export const ListOnly: Story = {
  ...BaseStory,
  args: {
    availableLayouts: ["list"],
  },
};

export const GridOnly: Story = {
  ...BaseStory,
  args: {
    availableLayouts: ["grid"],
  },
};

export const Everything: Story = {
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
    hasAdditionalActionButton: true,
    hasAdditionalActionMenuItems: true,
    metaText: "Last updated 12 hours ago",
  },
};

export const ExpandableRowsAndCards: Story = {
  render: function Base(args) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    const renderAdditionalContent = useCallback(
      ({ row }: { row: DataTableRowData }) => {
        return <Box>This is additional content for row {row.id}</Box>;
      },
      [],
    );

    return (
      <DataView
        availableLayouts={["table", "grid"]}
        cardLayoutOptions={{
          itemProps: itemProps,
          renderDetailPanel: renderAdditionalContent,
        }}
        getData={getData}
        hasRowSelection={args.hasRowSelection}
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        tableLayoutOptions={{
          columns: personColumns,
          renderDetailPanel: renderAdditionalContent,
        }}
      />
    );
  },
};

export const Truncation: Story = {
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
      Array(10)
        .fill(null)
        .forEach(() => {
          data.push({
            truncated:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla a quam et vulputate. Phasellus elementum turpis a lacus feugiat bibendum.",
            wrapped:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla a quam et vulputate. Phasellus elementum turpis a lacus feugiat bibendum.",
          });
        }); // Corrected the missing parenthesis here
      return data;
    }, []);

    return (
      <DataView
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          hasColumnResizing: true,
        }}
      />
    );
  },
};

export const Empty: Story = {
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
  render: function C({
    hasChangeableDensity,
    hasColumnResizing,
    hasColumnVisibility,
    hasSorting,
    ...props
  }) {
    const [data, setData] = useState<Person[]>(personData);
    const { onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    const emptyPlaceholder = useMemo(
      () => (
        <EmptyState
          description="All relevant data will be displayed and can be searched and filtered"
          heading="Start by adding data assets"
          PrimaryCallToActionComponent={
            <Button label="Primary" variant="primary" />
          }
          SecondaryCallToActionComponent={
            <Button label="Secondary" variant="secondary" />
          }
        />
      ),
      [],
    );

    return (
      <DataView
        {...props}
        emptyPlaceholder={emptyPlaceholder}
        getData={() => []}
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        tableLayoutOptions={{
          columns: personColumns,
          hasChangeableDensity: hasChangeableDensity,
          hasColumnResizing: hasColumnResizing,
          hasColumnVisibility: hasColumnVisibility,
          hasSorting: hasSorting,
        }}
      />
    );
  },
};

export const CustomFilters: Story = {
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
  render: function C({
    hasChangeableDensity,
    hasColumnResizing,
    hasColumnVisibility,
    hasSorting,
    ...props
  }) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows } = useDataCallbacks(data, setData);

    const filters = useMemo(
      () => [
        ...personColumns,
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
                  isFullWidth
                  label="Vowel"
                  onClick={() =>
                    updateFilters({ filterId: "startLetter", value: "vowel" })
                  }
                  variant="secondary"
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
                  isFullWidth
                  label="Consonant"
                  onClick={() =>
                    updateFilters({
                      filterId: "startLetter",
                      value: "consonant",
                    })
                  }
                  variant="secondary"
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
                  isFullWidth
                  label="Any"
                  onClick={() =>
                    updateFilters({ filterId: "startLetter", value: "any" })
                  }
                  variant="secondary"
                />
              </Box>
            </Box>
          ),
        },
      ],
      [],
    );

    return (
      <DataView
        {...props}
        filters={filters}
        getData={getData}
        onReorderRows={onReorderRows}
        tableLayoutOptions={{
          columns: personColumns,
          hasChangeableDensity: hasChangeableDensity,
          hasColumnResizing: hasColumnResizing,
          hasColumnVisibility: hasColumnVisibility,
          hasSorting: hasSorting,
        }}
      />
    );
  },
};

export const FilterWithCustomRender: Story = {
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
  render: function C({
    hasChangeableDensity,
    hasColumnResizing,
    hasColumnVisibility,
    hasSorting,
    ...props
  }) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData, onReorderRows, onChangeRowSelection } = useDataCallbacks(
      data,
      setData,
    );

    const filters = useMemo(() => {
      // Filter out the column with the id of "type"
      const filteredPersonColumns = personColumns.filter(
        (column) => column.id !== "visit",
      );

      return [
        ...filteredPersonColumns,
        {
          id: "startLetter",
          label: "Starting letter ",
          render: (updateFilters: UpdateFiltersOrValues) => (
            <Box>
              <Button
                label="🛰️ Vowel"
                onClick={() =>
                  updateFilters({ filterId: "startLetter", value: "vowel" })
                }
                variant="secondary"
              />
              <Button
                label="🛸 Consonant"
                onClick={() =>
                  updateFilters({ filterId: "startLetter", value: "consonant" })
                }
                variant="secondary"
              />
              <Button
                label="🤷‍♂️ Any"
                onClick={() =>
                  updateFilters({ filterId: "startLetter", value: "" })
                }
                variant="secondary"
              />
            </Box>
          ),
        },
      ];
    }, []);

    return (
      <DataView
        {...props}
        filters={filters}
        getData={getData}
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        tableLayoutOptions={{
          columns: personColumns,
          hasChangeableDensity: hasChangeableDensity,
          hasColumnResizing: hasColumnResizing,
          hasColumnVisibility: hasColumnVisibility,
          hasSorting: hasSorting,
        }}
      />
    );
  },
};

export const CustomFilterWithDefaultVariant: Story = {
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
  render: function C({
    hasChangeableDensity,
    hasColumnResizing,
    hasColumnVisibility,
    hasSorting,
    ...props
  }) {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const filters = useMemo<DataViewMetaProps["filters"]>(() => {
      return [
        ...personColumns,
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
      <DataView
        {...props}
        filters={filters}
        getData={getData}
        tableLayoutOptions={{
          columns: personColumns,
          hasChangeableDensity: hasChangeableDensity,
          hasColumnResizing: hasColumnResizing,
          hasColumnVisibility: hasColumnVisibility,
          hasSorting: hasSorting,
        }}
      />
    );
  },
};

export const AdditionalActions: Story = {
  ...BaseStory,
  args: {
    hasAdditionalActionButton: true,
    hasAdditionalActionMenuItems: true,
  },
};

type Privilege = {
  apps: number;
  name: string;
  users: number;
};

export const ColumnGrowDemo: Story = {
  render: function C() {
    const columns = useMemo<DataColumns<Privilege>>(
      () => [
        {
          accessorKey: "name",
          header: "Name",
          grow: true,
        },
        {
          accessorKey: "apps",
          header: "Apps",
        },
        {
          accessorKey: "users",
          header: "Users assigned",
        },
      ],
      [],
    );

    const getData = useCallback<() => Privilege[]>(
      () => [
        {
          name: "Core engineering access",
          apps: 5,
          users: 10,
        },
        {
          name: "Core sales access",
          apps: 8,
          users: 28,
        },
        {
          name: "Super user access",
          apps: 3,
          users: 1,
        },
      ],
      [],
    );

    const actionMenuItems: TableLayoutProps<Privilege>["rowActionMenuItems"] = (
      selectedRows,
    ) => (
      <>
        <MenuItem onClick={() => console.log(selectedRows)}>Action 1</MenuItem>
        <MenuItem onClick={() => console.log(selectedRows)}>Action 2</MenuItem>
      </>
    );

    return (
      <DataView
        getData={getData}
        hasSearch
        tableLayoutOptions={{
          hasColumnResizing: true,
          hasSorting: true,
          columns,
          rowActionMenuItems: actionMenuItems,
        }}
      />
    );
  },
};

export const LoadMore: Story = {
  ...BaseStory,
  args: {
    availableLayouts: ["table"],
    hasPagination: true,
    paginationType: "loadMore",
    hasFilters: true,
  },
};

export const PaginationHook: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const onPaginationChange = (pagination: {
      pageIndex: number;
      pageSize: number;
    }) => {
      console.log(pagination);
    };

    return (
      <DataView
        getData={getData}
        hasPagination
        onPaginationChange={onPaginationChange}
        tableLayoutOptions={{
          columns: personColumns,
        }}
      />
    );
  },
};

const stackItemProps = (row: Person) => ({
  overline: "Overline",
  title: row.name,
  description: `${row.name} is ${row.age} years old.`,
  variant: "stack" as DataCardProps<Person>["variant"],
  image: <img alt="Logo" src="https://placehold.co/400" />,
});

export const StackCards: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    return (
      <DataView
        availableLayouts={["list"]}
        cardLayoutOptions={{
          itemProps: stackItemProps,
          renderDetailPanel: () => <Box>Details</Box>,
          rowActionMenuItems: () => <MenuItem>Test</MenuItem>,
        }}
        getData={getData}
      />
    );
  },
};

const compactItemProps = (row: Person) => ({
  title: row.name,
  variant: "compact" as DataCardProps<Person>["variant"],
  image: <img alt="Logo" src="https://placehold.co/400" />,
});

export const CompactCards: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    return (
      <DataView
        availableLayouts={["list"]}
        cardLayoutOptions={{
          itemProps: compactItemProps,
          renderDetailPanel: ({ row }) =>
            row.age % 2 ? <Box>Detail content</Box> : false,
          rowActionMenuItems: () => <MenuItem>Test</MenuItem>,
        }}
        getData={getData}
      />
    );
  },
};

export const GrowColumnWithoutActions: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const columns: DataColumns<Person> = [
      {
        accessorKey: "order",
        header: "ID",
        enableColumnFilter: false,
        grow: true,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "city",
        header: "City",
      },
    ];

    return (
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          columns: columns,
          hasColumnResizing: true,
        }}
      />
    );
  },
};

export const GrowColumnWithActions: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const columns: DataColumns<Person> = [
      {
        accessorKey: "order",
        header: "ID",
        enableColumnFilter: false,
        grow: true,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "city",
        header: "City",
      },
    ];

    const rowActions = useCallback(
      () => <Button label="Action" size="small" variant="secondary" />,
      [],
    );

    return (
      <DataView
        availableLayouts={["table"]}
        getData={getData}
        tableLayoutOptions={{
          hasColumnResizing: true,
          columns: columns,
          rowActionButtons: rowActions,
        }}
      />
    );
  },
};
