---
summary: MUI tables lose their outer border, radius, and row hover highlight
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: d0d8925e1
---

MuiTable lost its outer `border` and `borderRadius`, and MuiTableRow lost its `:hover` background of HueNeutral50. Tables render edge to edge with square corners and no row highlight on hover. This reaches any MUI Table rendered under OdysseyProvider, not only Odyssey's own table exports.
