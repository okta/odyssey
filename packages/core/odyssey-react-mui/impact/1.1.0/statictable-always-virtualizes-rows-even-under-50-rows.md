---
summary: "`StaticTable` always virtualizes rows, even under 50 rows"
affectedExports:
  - StaticTable
files:
  - packages/odyssey-react-mui/src/labs/StaticTable.tsx
commit: e82c5cfbd
---

StaticTable (./labs) now enables row virtualization unconditionally instead of only above 50 rows, so only the rows in view are in the DOM. Ctrl-F, print, full-table screenshots and tests that query every row all behave differently on small tables that were previously fully rendered.
