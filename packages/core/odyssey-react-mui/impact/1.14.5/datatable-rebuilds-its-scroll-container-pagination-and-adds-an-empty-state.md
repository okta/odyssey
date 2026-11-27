---
summary: DataTable rebuilds its scroll container, pagination, and adds an empty state
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/DataTable/DataTable.tsx
  - packages/odyssey-react-mui/src/DataTable/DataTablePagination.tsx
  - packages/odyssey-react-mui/src/DataTable/DataTableEmptyState.tsx
  - packages/odyssey-react-mui/src/DataTable/useScrollIndication.tsx
commit: 9490c6587
onlyRelevantIf: DataTable was adopted at 1.14.4, the release it was introduced in
---

The second phase of the DataTable rework landed one release after the component first shipped. `MaterialReactTable` was replaced with `MRT_TableContainer`, the table is now wrapped in a new scroll-indication `<div>` that carries its own borders and gradient overlays, pagination moved to a new in-tree implementation, and an empty state was added. Check the table's outer DOM structure and any measurement or selector that assumed the 1.14.4 shape.
