---
summary: DataView now derives `isNoResults` from data instead of only the prop
affectedExports:
  - DataView
files:
  - packages/core/odyssey-react-mui/src/labs/DataView/DataView.tsx
  - packages/core/odyssey-react-mui/package.json
commit: a82f58f08
onlyRelevantIf: a DataView whose rows can be filtered or searched down to zero and that does not pass the `isNoResults` prop
---

`isNoResults` is now derived from the data instead of only following the `isNoResults` prop. A new effect sets it to `!isEmpty && data.length === 0` once loading finishes, so a view whose rows are filtered or searched down to nothing renders `noResultsPlaceholder`, or the built-in `table.noresults` heading and text, where it previously rendered no placeholder at all. The empty-state check also moved from a reference comparison of `filters === initialFilters` to a `lodash.isequal` deep comparison of `filters` against the converted initial filters, so `isEmpty` can stay true for a filter set whose converted form still matches the initial one. `lodash.isequal` is added as a runtime dependency in the same commit. Check which placeholder renders when a filtered or searched view returns nothing, and check the placeholder on a genuinely empty data set with filters enabled.
