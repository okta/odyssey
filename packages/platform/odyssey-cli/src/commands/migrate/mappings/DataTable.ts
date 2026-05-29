import type { DataTableProps } from "@okta/odyssey-react-mui";
import type { DataViewProps } from "@okta/odyssey-react-mui/labs";

import { type ComponentMapping, DROPPED } from "./types.js";

export const DataTable: Record<
  "DataTable",
  ComponentMapping<DataTableProps, DataViewProps<Record<string, unknown>>>
> = {
  DataTable: {
    source: {
      component: "DataTable",
      packages: ["@okta/odyssey-react-mui"],
      propsType: "DataTableProps",
    },
    target: {
      component: "DataView",
      package: "@okta/odyssey-react-mui/labs",
      propsType: "DataViewProps",
    },
    defaultProps: {
      availableLayouts: ["table"],
    },
    propMap: {
      additionalActionButton: "additionalActionButton",
      additionalActionMenuItems: "additionalActionMenuItems",
      bulkActionMenuItems: "bulkActionMenuItems",
      columns: "tableLayoutOptions.columns",
      currentPage: "currentPage",
      emptyPlaceholder: "emptyPlaceholder",
      errorMessage: "errorMessage",
      filters: "filters",
      getData: "getData",
      getRowId: "getRowId",
      hasChangeableDensity: "tableLayoutOptions.hasChangeableDensity",
      hasColumnResizing: "tableLayoutOptions.hasColumnResizing",
      hasColumnVisibility: "tableLayoutOptions.hasColumnVisibility",
      hasFilters: "hasFilters",
      hasPagination: "hasPagination",
      hasRowReordering: "hasRowReordering",
      hasRowSelection: "hasRowSelection",
      hasSearch: "hasSearch",
      hasSearchSubmitButton: "hasSearchSubmitButton",
      hasSorting: "tableLayoutOptions.hasSorting",
      initialDensity: "tableLayoutOptions.initialDensity",
      initialSearchValue: DROPPED,
      isPaginationMoreDisabled: "isPaginationMoreDisabled",
      maxPages: "maxPages",
      maxResultsPerPage: "maxResultsPerPage",
      noResultsPlaceholder: "noResultsPlaceholder",
      onChangeRowSelection: "onRowSelectionChange",
      onReorderRows: "onReorderRows",
      paginationType: "paginationType",
      renderDetailPanel: "tableLayoutOptions.renderDetailPanel",
      resultsPerPage: "resultsPerPage",
      rowActionButtons: "tableLayoutOptions.rowActionButtons",
      rowActionMenuItems: "tableLayoutOptions.rowActionMenuItems",
      searchDelayTime: "searchDelayTime",
      searchFieldLabel: "searchFieldLabel",
      selectedRows: DROPPED,
      totalRows: "totalRows",
    },
  },
};
