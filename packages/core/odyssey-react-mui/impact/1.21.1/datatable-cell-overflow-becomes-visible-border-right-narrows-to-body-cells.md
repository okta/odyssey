---
summary: DataTable cell overflow becomes visible, border-right narrows to body cells
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 3c36a2468
---

MuiTableCell gained overflow: visible !important and position: relative, and the borderRight: none !important rule was narrowed from every cell to body cells only. Cell content that used to be clipped now spills over. Check tables with long unbreakable cell content.
