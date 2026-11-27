---
summary: Table rows now highlight on hover even without the hover prop
affectedExports:
  - odysseyTheme
  - TableRow
  - TableCell
files:
  - packages/odyssey-react-mui/src/themes/odyssey/components.tsx
commit: 286c715d5
---

The table row hover selector changed from .MuiTableRow-hover:hover to .MuiTableRow-root:hover, so every row highlights on hover rather than only rows given the hover prop. A rowspan cell is excluded with a white background. Check read-only tables where a hover highlight now implies the row is clickable.
