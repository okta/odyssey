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
  DataGetDataType,
  DataOnReorderRowsType,
  DataRowSelectionState,
  DataView,
  DataViewLayout,
  DataViewProps,
  densityValues,
  TableLayoutProps,
  UpdateFiltersOrValues,
} from "@okta/odyssey-react-mui/labs";
import { action } from "@storybook/addon-actions";
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
          args.hasActionMenuItems ? actionMenuItems : undefined
        }
        cardLayoutOptions={{
          itemProps,
          rowActionMenuItems: args.hasActionMenuItems
            ? actionMenuItems
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
            ? actionMenuItems
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
} satisfies Meta<DataViewMetaProps>;

export default meta;

// TODO: This should be `typeof meta`, not `DataViewMetaProps`.
type Story = StoryObj<DataViewMetaProps>;

const onClick = action("onClick");
const tableLayoutOnly: DataViewLayout[] = ["table"];
const listLayoutOnly: DataViewLayout[] = ["list"];
const gridLayoutOnly: DataViewLayout[] = ["grid"];
const tableAndGridLayouts: DataViewLayout[] = ["table", "grid"];

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
    <MenuItem onClick={onClick}>Additional action 1</MenuItem>
    <MenuItem onClick={onClick}>Additional action 2</MenuItem>
  </>
);

const actionMenuItems = () => (
  <>
    <MenuItem onClick={onClick}>Action 1</MenuItem>
    <MenuItem onClick={onClick}>Action 2</MenuItem>
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
      onClick={onClick}
      size="small"
      variant="floating"
    />
    <Button
      ariaLabel="Refresh"
      endIcon={<RefreshIcon />}
      onClick={onClick}
      size="small"
      variant="floating"
    />
  </Box>
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

export const Default: Story = {
  args: {},
};

export const TableOnly: Story = {
  args: {
    availableLayouts: tableLayoutOnly,
  },
};

export const ListAndGrid: Story = {
  args: {
    availableLayouts: ["list", "grid"],
  },
};

export const ListOnly: Story = {
  args: {
    availableLayouts: listLayoutOnly,
  },
};

export const GridOnly: Story = {
  args: {
    availableLayouts: gridLayoutOnly,
  },
};

export const Everything: Story = {
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
  render: function C(args) {
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

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: personColumns,
        renderDetailPanel: renderAdditionalContent,
      }),
      [renderAdditionalContent],
    );

    return (
      <DataView
        availableLayouts={tableAndGridLayouts}
        cardLayoutOptions={{
          itemProps: itemProps,
          renderDetailPanel: renderAdditionalContent,
        }}
        getData={getData}
        hasRowSelection={args.hasRowSelection}
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};

export const Truncation: Story = {
  render: function C() {
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

    const tableLayoutOptions = useMemo(
      () => ({
        columns: [
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
        hasColumnResizing: true,
      }),
      [],
    );

    return (
      <DataView getData={getData} tableLayoutOptions={tableLayoutOptions} />
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

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: personColumns,
        hasChangeableDensity: hasChangeableDensity,
        hasColumnResizing: hasColumnResizing,
        hasColumnVisibility: hasColumnVisibility,
        hasSorting: hasSorting,
      }),
      [
        hasChangeableDensity,
        hasColumnResizing,
        hasColumnVisibility,
        hasSorting,
      ],
    );

    return (
      <DataView
        {...props}
        emptyPlaceholder={emptyPlaceholder}
        getData={() => []}
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        tableLayoutOptions={tableLayoutOptions}
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

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: personColumns,
        hasChangeableDensity: hasChangeableDensity,
        hasColumnResizing: hasColumnResizing,
        hasColumnVisibility: hasColumnVisibility,
        hasSorting: hasSorting,
      }),
      [
        hasChangeableDensity,
        hasColumnResizing,
        hasColumnVisibility,
        hasSorting,
      ],
    );

    return (
      <DataView
        {...props}
        filters={filters}
        getData={getData}
        onReorderRows={onReorderRows}
        tableLayoutOptions={tableLayoutOptions}
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

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: personColumns,
        hasChangeableDensity: hasChangeableDensity,
        hasColumnResizing: hasColumnResizing,
        hasColumnVisibility: hasColumnVisibility,
        hasSorting: hasSorting,
      }),
      [
        hasChangeableDensity,
        hasColumnResizing,
        hasColumnVisibility,
        hasSorting,
      ],
    );

    return (
      <DataView
        {...props}
        filters={filters}
        getData={getData}
        onChangeRowSelection={onChangeRowSelection}
        onReorderRows={onReorderRows}
        tableLayoutOptions={tableLayoutOptions}
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

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: personColumns,
        hasChangeableDensity: hasChangeableDensity,
        hasColumnResizing: hasColumnResizing,
        hasColumnVisibility: hasColumnVisibility,
        hasSorting: hasSorting,
      }),
      [
        hasChangeableDensity,
        hasColumnResizing,
        hasColumnVisibility,
        hasSorting,
      ],
    );

    return (
      <DataView
        {...props}
        filters={filters}
        getData={getData}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};

export const AdditionalActions: Story = {
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

    const tableLayoutOptions = useMemo<TableLayoutProps<Privilege>>(
      () => ({
        hasColumnResizing: true,
        hasSorting: true,
        columns: [
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
        rowActionMenuItems: actionMenuItems,
      }),
      [],
    );

    return (
      <DataView
        getData={getData}
        hasSearch
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};

export const LoadMore: Story = {
  args: {
    availableLayouts: tableLayoutOnly,
    hasPagination: true,
    paginationType: "loadMore",
    hasFilters: true,
  },
};

export const PaginationHook: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const onPaginationChange = useCallback<
      Required<DataViewProps<Person>>["onPaginationChange"]
    >((pagination: { pageIndex: number; pageSize: number }) => {
      console.log(pagination);
    }, []);

    const tableLayoutOptions = useMemo(
      () => ({
        columns: personColumns,
      }),
      [],
    );

    return (
      <DataView
        getData={getData}
        hasPagination
        onPaginationChange={onPaginationChange}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};

const stackItemProps = (row: Person) => ({
  overline: "Overline",
  title: row.name,
  description: `${row.name} is ${row.age} years old.`,
  variant: "stack" as DataCardProps["variant"],
  image: <img alt="Logo" src="https://placehold.co/400" />,
});

export const StackCards: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const cardLayoutOptions = useMemo(
      () => ({
        itemProps: stackItemProps,
        renderDetailPanel: () => <Box>Details</Box>,
        rowActionMenuItems: () => <MenuItem>Test</MenuItem>,
      }),
      [],
    );

    return (
      <DataView
        availableLayouts={listLayoutOnly}
        cardLayoutOptions={cardLayoutOptions}
        getData={getData}
      />
    );
  },
};

const compactItemProps = (row: Person) => ({
  title: row.name,
  variant: "compact" as DataCardProps["variant"],
  image: <img alt="Logo" src="https://placehold.co/400" />,
});

export const CompactCards: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);
    const renderDetailPanel = useCallback<
      Required<CardLayoutProps<Person>>["renderDetailPanel"]
    >(({ row }) => (row.age % 2 ? <Box>Detail content</Box> : false), []);
    const rowActionMenuItems = useCallback(() => <MenuItem>Test</MenuItem>, []);

    const cardLayoutOptions = useMemo(
      () => ({
        itemProps: compactItemProps,
        renderDetailPanel,
        rowActionMenuItems,
      }),
      [renderDetailPanel, rowActionMenuItems],
    );

    return (
      <DataView
        availableLayouts={listLayoutOnly}
        cardLayoutOptions={cardLayoutOptions}
        getData={getData}
      />
    );
  },
};

export const GrowColumnWithoutActions: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: [
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
        ],
        hasColumnResizing: true,
      }),
      [],
    );

    return (
      <DataView
        availableLayouts={tableLayoutOnly}
        getData={getData}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};

export const GrowColumnWithActions: Story = {
  render: function C() {
    const [data, setData] = useState<Person[]>(personData);
    const { getData } = useDataCallbacks(data, setData);

    const rowActions = useCallback(
      () => (
        <Button
          label="Action"
          onClick={onClick}
          size="small"
          variant="secondary"
        />
      ),
      [],
    );

    const tableLayoutOptions = useMemo<TableLayoutProps<Person>>(
      () => ({
        columns: [
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
        ],
        hasColumnResizing: true,
        rowActionButtons: rowActions,
      }),
      [rowActions],
    );

    return (
      <DataView
        availableLayouts={tableLayoutOnly}
        getData={getData}
        tableLayoutOptions={tableLayoutOptions}
      />
    );
  },
};
