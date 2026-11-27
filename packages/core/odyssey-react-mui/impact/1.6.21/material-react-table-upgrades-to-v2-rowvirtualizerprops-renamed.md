---
summary: "`material-react-table` upgrades to v2; `rowVirtualizerProps` renamed"
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/package.json
commit: d0d8925e1
---

`material-react-table` moved from ^1.14.0 to ^2.0.2, a major version, and it ships as a regular dependency rather than a peer, so the upgrade is not optional. StaticTable and PaginatedTable were rewritten onto the v2 `useMaterialReactTable` hook, `rowVirtualizerProps` became `rowVirtualizerOptions`, and `muiTablePaginationProps` became `muiPaginationProps`. Check table markup, class names, and anything asserting on the v1 DOM.
