---
summary: Escape in a DataFilters popover closes only that popover, not the filters menu
affectedExports:
  - DataFilters
files:
  - packages/core/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 5c3b3b308
onlyRelevantIf: keyboard use of DataFilters
---

Escape inside a filter popover now closes only that popover and returns focus to the filter option that opened it, where it previously also closed the surrounding filters menu and dropped focus. The filter still submits on Escape, as it did before. Check keyboard flows through the filter menu.
