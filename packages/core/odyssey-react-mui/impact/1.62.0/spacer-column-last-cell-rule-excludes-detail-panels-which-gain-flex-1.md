---
summary: "Spacer-column last-cell rule excludes detail panels, which gain `flex: 1`"
affectedExports:
  - DataTable
  - DataView
files:
  - packages/core/odyssey-react-mui/src/theme/components/Table.tsx
commit: 2472b5d94
---

The rule that hides the last cell in a spacer-column table now excludes detail panel cells, and detail panel collapse containers gained `flex: 1`. Check that detail panels render and size correctly with column resizing.
