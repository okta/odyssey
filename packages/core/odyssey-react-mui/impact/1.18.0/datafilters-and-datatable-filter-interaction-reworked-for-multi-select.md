---
summary: DataFilters and DataTable filter interaction reworked for multi-select
affectedExports:
  - DataFilters
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: e86daa3bc
onlyRelevantIf: a DataFilters or a DataTable renders filters
---

The filter interaction was reworked across two commits, `e86daa3bc` and `24fde21a6`, with no change to DataFilters' public props. Filters can now hold multiple selections, and the autocomplete filter's value handling was fixed. Check what the filter bar shows for a filter that already had a value, and what the `onChangeFilters` callback now reports.
