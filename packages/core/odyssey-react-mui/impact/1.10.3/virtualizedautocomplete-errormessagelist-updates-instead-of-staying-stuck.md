---
summary: VirtualizedAutocomplete `errorMessageList` updates instead of staying stuck
affectedExports:
  - VirtualizedAutocomplete
files:
  - packages/odyssey-react-mui/src/labs/VirtualizedAutocomplete.tsx
commit: 435af6d8d
onlyRelevantIf: a VirtualizedAutocomplete is given errorMessageList and that list can change while mounted
---

errorMessageList was missing from the renderInput useCallback dependency list added in 1.9.23, so the first list rendered stuck and later lists were not shown. It now updates. A field that appeared to hold a stale error, or no error, starts reflecting the current one.
