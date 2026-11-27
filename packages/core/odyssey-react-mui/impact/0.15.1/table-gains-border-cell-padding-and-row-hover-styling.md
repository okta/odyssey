---
summary: Table gains border, cell padding, and row-hover styling
affectedExports:
  - odysseyTheme
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
  - packages/odyssey-react-mui/src/themes/odyssey/components.types.ts
commit: 9d00f0edc
onlyRelevantIf: you pass odysseyTheme to MUI's own ThemeProvider, since Odyssey re-exports no MUI component at this version
---

MuiTable, MuiTableCell, MuiTableContainer, MuiTableRow and MuiTableSortLabel gained theme overrides, and TableCell gained six Odyssey variants (action, body, date, footer, head, number). A MUI table under this theme now has a border, separate border-collapse, its own cell padding and head background, and a row-hover background. Check tables you styled yourself and any border-collapse behaviour you depended on.
