---
summary: Table cells lose their `maxWidth` cap; long content stretches the column
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: a6e998e8d
onlyRelevantIf: a table cell holding text longer than the max line length
---

MuiTableCell lost `maxWidth: TypographyLineLengthMax`, so a cell is no longer capped and long content stretches the column instead of wrapping at the reading-width limit. Check wide tables and columns whose width was previously held by that cap.
