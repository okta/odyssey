---
summary: Virtualized empty tables stop producing a spurious vertical scrollbar
affectedExports:
  - DataView
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataView/TableLayoutContent.tsx
commit: d43c65846
onlyRelevantIf: a table with row virtualization enabled and no rows
---

The table body gets `height: unset` in the empty and no-results states, so a virtualized empty table stops producing a spurious vertical scrollbar. The container's measured height changes when there are no rows.
