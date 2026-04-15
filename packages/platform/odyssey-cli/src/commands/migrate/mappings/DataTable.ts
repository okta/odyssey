import { ComponentMapping } from "./index.js";

export const DataTable = {
  DataTable: {
    source: {
      component: "DataTable",
      package: "@okta/odyssey-react-mui",
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
      columns: "tableLayoutOptions.columns",
      currentPage: "currentPage",
      emptyPlaceholder: "emptyPlaceholder",
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
      noResultsPlaceholder: "noResultsPlaceholder",
      onChangeRowSelection: "onRowSelectionChange",
      onReorderRows: "onReorderRows",
      paginationType: "paginationType",
      renderDetailPanel: "tableLayoutOptions.renderDetailPanel",
      resultsPerPage: "resultsPerPage",
      rowActionButtons: "tableLayoutOptions.rowActionButtons",
      rowActionMenuItems: "tableLayoutOptions.rowActionMenuItems",
      searchDelayTime: "searchDelayTime",
      totalRows: "totalRows",
    },
  },
} satisfies Record<"DataTable", ComponentMapping>;
