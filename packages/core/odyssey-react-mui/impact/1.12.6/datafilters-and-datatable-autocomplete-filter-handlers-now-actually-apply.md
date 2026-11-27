---
summary: DataFilters and DataTable autocomplete filter handlers now actually apply
affectedExports:
  - DataFilters
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 50a1ef7a1
onlyRelevantIf: a DataFilters or DataTable filter uses the `autocomplete` variant
---

The autocomplete filter's handlers were empty no-op functions, so picking a value did nothing and the filter never applied. They now update the filter state. A table that appeared to ignore this filter starts filtering, so row counts and any code reading the filter values will differ.
