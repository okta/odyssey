---
summary: DataTable hides its trailing spacer column when resizing with no row actions
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/DataTable/DataTable.tsx
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 38f56cd02
onlyRelevantIf: a DataTable with hasColumnResizing and no row actions
---

DataTable now puts an ods-hide-spacer-column class on the table element when row actions are off and column resizing is on. The theme rules behind that class hide the trailing spacer column outright, make the second-to-last column flexGrow: 1 with rounded trailing corners, and hide that column's resize handle. Column widths and the total table width both differ, and the last real column can no longer be resized.
