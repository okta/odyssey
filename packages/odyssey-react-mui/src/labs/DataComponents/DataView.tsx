/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, useCallback, useMemo, useState } from "react";
import {
  availableLayouts as allAvailableLayouts,
  densityValues,
} from "./constants";
import { UniversalProps, ViewProps } from "./types";
import { Box } from "../../Box";
import { MenuButton } from "../..";
import { MoreIcon } from "../../icons.generated";
import { Pagination, usePagination } from "../../Pagination";
import { t } from "i18next";
import { Callout } from "../../Callout";
import { DataFilter, DataFilters } from "../DataFilters";
import { DataTableColumn, DataTableRowData } from "../../DataTable";
import { TableSettings } from "./TableSettings";
import { StackSettings } from "./StackSettings";
import {
  MRT_DensityState,
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_VisibilityState,
} from "material-react-table";

export type DataViewProps = UniversalProps & ViewProps;

const DataView = ({
  getData,
  getRowId,
  hasRowReordering,
  onReorderRows,
  hasRowSelection,
  onChangeRowSelection,
  bulkActionMenuItems,
  hasPagination,
  currentPage = 1,
  resultsPerPage = 20,
  totalRows,
  hasFilters,
  hasSearch,
  hasSearchSubmitButton,
  filters: filtersProp,
  paginationType = "paged",
  searchDelayTime,
  errorMessage: errorMessageProp,
  emptyPlaceholder,
  noResultsPlaceholder,
  availableLayouts = allAvailableLayouts,
  initialLayout: initialLayoutProp = allAvailableLayouts[0],
  tableProps,
  stackProps,
}: DataViewProps) => {
  // If initialLayout isn't explicit, set it to the first item in availableLayouts
  const initialLayout =
    typeof availableLayouts === "string"
      ? availableLayouts === initialLayoutProp
        ? initialLayoutProp
        : availableLayouts
      : availableLayouts.includes(initialLayoutProp)
        ? initialLayoutProp
        : availableLayouts[0];

  const [layout, setLayout] =
    useState<DataViewProps["availableLayouts"]>(initialLayout);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<DataFilter[]>();
  const [isEmpty, setIsEmpty] = useState<boolean | undefined>();
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: resultsPerPage,
  });

  const [columnSorting, setColumnSorting] = useState<MRT_SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<MRT_VisibilityState>();
  const [rowDensity, setRowDensity] = useState<MRT_DensityState>(
    tableProps?.initialDensity ?? densityValues[0],
  );
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [initialFilters, setInitialFilters] = useState<DataFilter[]>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    errorMessageProp,
  );

  const bulkActionMenuButton = useMemo(
    () => (
      <>
        <MenuButton
          buttonVariant="secondary"
          endIcon={<MoreIcon />}
          isDisabled={Object.keys(rowSelection).length === 0}
          ariaLabel="More actions"
        >
          {bulkActionMenuItems?.(rowSelection)}
        </MenuButton>
      </>
    ),
    [bulkActionMenuItems, rowSelection],
  );

  console.log({
    columnSorting,
    setColumnSorting,
    setRowDensity,
    rowSelection,
    setRowSelection,
    initialFilters,
    setInitialFilters,
    isLoading,
    setIsLoading,
    setErrorMessage,
  });

  const { lastRow } = usePagination({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    totalRows,
  });

  console.log({
    setLayout,
    getData,
    getRowId,
    hasRowReordering,
    onReorderRows,
    hasRowSelection,
    onChangeRowSelection,
    bulkActionMenuItems,
    hasPagination,
    currentPage,
    resultsPerPage,
    totalRows,
    hasFilters,
    hasSearch,
    hasSearchSubmitButton,
    filters,
    paginationType,
    searchDelayTime,
    errorMessage,
    emptyPlaceholder,
    noResultsPlaceholder,
    availableLayouts,
    initialLayoutProp,
    tableProps,
    stackProps,
    setIsEmpty,
    search,
  });

  /**
   * This hack is to provide compatibility with Material-React-Table's
   * filterOptions format, which allows for strings and { label: string, value: string }
   */
  const convertFilterSelectOptions = useCallback(
    (options: DataTableColumn<DataTableRowData>["filterSelectOptions"]) =>
      options?.map((option) =>
        typeof option === "string"
          ? {
              label: option,
              value: option,
            }
          : {
              // If the option isn't a string, it must have value and/or option defined
              // If either is undefined, use the other
              label: option.label ?? option.value,
              value: option.value ?? option.label,
            },
      ),
    [],
  );

  const convertColumnToFilter = useCallback(
    (column: DataTableColumn<DataTableRowData>) =>
      column.enableColumnFilter !== false && column.accessorKey
        ? ({
            id: column.accessorKey,
            label: column.header,
            variant: column.filterVariant,
            options: convertFilterSelectOptions(column.filterSelectOptions),
          } satisfies DataFilter as DataFilter)
        : null,
    [convertFilterSelectOptions],
  );

  const dataTableFilters = useMemo(() => {
    const providedFilters = filtersProp || tableProps?.columns;
    if (!providedFilters) {
      return;
    }
    return providedFilters.reduce<DataFilter[]>((accumulator, item) => {
      if (typeof item === "string") {
        const foundColumn = tableProps?.columns.find(
          (column) => column.accessorKey === item,
        );
        if (foundColumn) {
          const filter = convertColumnToFilter(foundColumn);
          if (filter) {
            return accumulator.concat(filter);
          }
        }
      } else if ("accessorKey" in item) {
        // Checks if it's a column
        const filter = convertColumnToFilter(item);
        if (filter) {
          return accumulator.concat(filter);
        }
      } else if ("label" in item) {
        // Checks if it's a DataFilter
        return accumulator.concat(item);
      }
      // If none of the conditions match, item is ignored (not mapping to undefined)
      return accumulator;
    }, []);
  }, [tableProps?.columns, filtersProp, convertColumnToFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {1 == 1 && (
        <Box>
          <DataFilters
            onChangeSearch={hasSearch ? setSearch : undefined}
            onChangeFilters={hasFilters ? setFilters : undefined}
            hasSearchSubmitButton={hasSearchSubmitButton}
            searchDelayTime={searchDelayTime}
            filters={hasFilters ? dataTableFilters : undefined}
            isDisabled={isEmpty}
            additionalActions={
              <>
                {layout === "table" && tableProps && (
                  <TableSettings
                    hasChangeableDensity={tableProps.hasChangeableDensity}
                    rowDensity={rowDensity}
                    setRowDensity={setRowDensity}
                    hasColumnVisibility={tableProps.hasColumnVisibility}
                    columns={tableProps.columns}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={setColumnVisibility}
                  />
                )}
                {layout !== "table" && <StackSettings />}
                {bulkActionMenuItems && bulkActionMenuButton}
              </>
            }
          />
        </Box>
      )}

      {errorMessage && (
        <Box>
          <Callout severity="error" text={errorMessage} />
        </Box>
      )}

      <Box>{layout}</Box>

      {hasPagination && (
        <Pagination
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPaginationChange={setPagination}
          lastRow={lastRow}
          totalRows={totalRows}
          isDisabled={isEmpty}
          variant={paginationType}
          rowsPerPageLabel={t("pagination.rowsperpage")}
          currentPageLabel={t("pagination.page")}
          previousLabel={t("pagination.previous")}
          nextLabel={t("pagination.next")}
          loadMoreLabel={t("pagination.loadmore")}
        />
      )}
    </Box>
  );
};

const MemoizedDataView = memo(DataView);
MemoizedDataView.displayName = "DataView";

export { MemoizedDataView as DataView };
