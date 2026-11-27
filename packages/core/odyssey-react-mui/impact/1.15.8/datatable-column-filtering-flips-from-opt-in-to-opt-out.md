---
summary: DataTable column filtering flips from opt-in to opt-out
affectedExports:
  - DataTable
files:
  - packages/odyssey-react-mui/src/DataTable/DataTable.tsx
commit: ba1eff8f2
onlyRelevantIf: a DataTable has columns that do not set enableColumnFilter
---

Column filtering flipped from opt-in to opt-out: the test moved from `column.enableColumnFilter` to `column.enableColumnFilter !== false`, so every column with an `accessorKey` now contributes a filter unless it sets `false`. A separate bug in the same commit meant column-derived filters were being pushed as `accumulator.push()` with no argument and so were silently discarded; they now reach the filter bar. Check the filter bar for filters that were not there before.
