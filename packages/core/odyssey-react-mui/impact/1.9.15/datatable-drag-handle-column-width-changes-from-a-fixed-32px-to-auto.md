---
summary: DataTable drag-handle column width changes from a fixed 32px to `auto`
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataTable.tsx
commit: 858c4b4e0
onlyRelevantIf: a DataTable has row reordering enabled
---

The drag-handle column's fixed width of 32 became "auto" on both the body and head cell, and the handle itself gained Spacing1 of padding. Column widths across the table shift. Check tables with tight horizontal budgets.
