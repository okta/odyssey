---
summary: Table cell padding shrinks to `Spacing3`; headers turn uppercase, borderless
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d0d8925e1
---

Table cell padding collapsed from Spacing4 on both axes to a single Spacing3, and header cells became uppercase at TypographySizeSubordinate in TypographyColorHeading with no bottom border and rounded outer corners. Every table is shorter and its header reads differently. Check row-height assumptions and header labels that were written as sentence case.
