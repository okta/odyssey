---
summary: Virtualization now disabled for an empty paged DataTable
affectedExports:
  - DataTable
files:
  - packages/core/odyssey-react-mui/src/DataTable/DataTable.tsx
commit: 051a4328c
onlyRelevantIf: a paged DataTable with a page size above 50 and no rows
---

Virtualization is now disabled when the table has no rows, so the virtualized row container is not created. Check empty-table height and any locator that depended on that container existing.
