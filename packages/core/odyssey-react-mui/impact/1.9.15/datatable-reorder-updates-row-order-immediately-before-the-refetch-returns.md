---
summary: DataTable reorder updates row order immediately, before the refetch returns
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataTable.tsx
commit: 858c4b4e0
onlyRelevantIf: a DataTable has row reordering enabled and supplies reorderDataFn
---

A reorder now rewrites the table's own copy of the rows immediately, in addition to calling reorderDataFn and then refetching. Previously the new order only appeared after the refetch returned it. Where the backing store rejects the move, or the refetch returns the old order, the rows visibly jump to the new position and back. Check reorder handlers that can fail or that reorder asynchronously.
