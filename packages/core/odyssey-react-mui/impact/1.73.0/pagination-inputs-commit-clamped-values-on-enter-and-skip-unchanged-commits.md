---
summary: Pagination inputs commit clamped values on Enter and skip unchanged commits
affectedExports:
  - Pagination
  - DataTable
  - DataView
files:
  - packages/core/odyssey-react-mui/src/Pagination/Pagination.tsx
commit: 70397132
onlyRelevantIf: the app passes `onPaginationChange` to Pagination, or reads pagination changes from DataTable or DataView
---

Pressing Enter in the Rows per page or Page input used to call `onPaginationChange` with the raw typed number and the other value unchanged, while blur clamped both to `totalRows`. Now Enter and blur both clamp: the page size to `totalRows` and the page to the last page for that size. `onPaginationChange` is called only when the clamped values differ from the current `pageIndex` and `pageSize` props, so Enter followed by blur no longer calls it twice, and a commit that changes nothing no longer calls it at all. A decimal typed into either input is truncated to a whole number. Check handlers that count calls to `onPaginationChange`, or that expected the unclamped value on Enter.
