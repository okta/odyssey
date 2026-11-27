---
summary: DataTable now fills its container width instead of its content
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 1e9e1a073
---

MuiTable's width went from auto to 100%. Every table now fills its container instead of shrinking to its content. Check narrow tables that previously sat at their intrinsic width, and any surrounding layout that relied on that.
