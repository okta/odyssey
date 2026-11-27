---
summary: DataTable scroll container loses its bottom border line
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/DataTable/DataTable.tsx
commit: a39b798a2
onlyRelevantIf: a DataTable is rendered
---

The scroll container lost its HueNeutral100 bottom border, so the line under the table disappears. The rest of this commit is the density move, from MuiTableCell-* selectors to MuiTableBody-*, and muiTableBodyCellProps to muiTableBodyProps.
