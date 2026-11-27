---
summary: Empty paginated table reports a zero total instead of a range
affectedExports:
  - Pagination
  - DataView
  - DataTable
files:
  - packages/odyssey-react-mui/src/Pagination/Pagination.tsx
  - packages/odyssey-react-mui/src/Pagination/usePagination.ts
commit: 26bd99ec7
onlyRelevantIf: a paginated table or list that can be empty
---

With no rows, the row-count label is now a zero-total string instead of a range. `currentRowsCount` falls back to 0 rather than to `pageSize`, so an empty page stops reporting something like "1-20 of 0". The label's text and length both change in the empty state.
