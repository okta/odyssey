---
summary: Table borders rebuilt, moving from cell borders to row borders
affectedExports:
  - StaticTable
  - PaginatedTable
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: a39b798a2
---

Every table's borders and row heights were rebuilt, and the change is not a move. MuiTableCell lost its `border-bottom`, the white top border on the first body row, the white background on a hovered `rowspan` cell, the suppressed border on the last row, and both selected-row border colors, and it now forces `border: none !important` on all four sides plus `padding: 0 Spacing3 !important`. The borders and the density padding moved to MuiTableRow, which now carries a HueNeutral100 top border, a HueNeutral50 hover background marked `!important`, and `padding-block` per density class. The drag and drop affordance changed from a solid bar to a dashed outline. Check row heights, gridlines, hover feedback, selected-row appearance, and any consumer CSS that targeted `.MuiTableCell-root` borders. Note the new cell `padding: 0 ... !important` and the header cell's `padding-block: Spacing3 !important` from 1.14.4 now both carry `!important`, so source order decides.
