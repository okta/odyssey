---
summary: Table header font size and height become fixed and `!important`, unoverridable
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: efe2839f0
---

Table header cells changed in ways a consumer cannot override. The font size is now the hardcoded `0.71428571rem` instead of TypographySizeSubordinate, and `height: Spacing7` plus `padding-block: Spacing3` are both marked `!important`, so a consumer's own header height rule now loses. The density classes `MuiTableCell-compact` and `MuiTableCell-spacious` now apply only to body cells, and compact padding moved from Spacing2 to a hardcoded `0.4285714286rem` with a fixed `2.5714285714rem` height. Check header row heights and any table whose density was tuned against the old padding.
