---
summary: DataTable's `selectedRows` is now read once as initial state only
affectedExports:
  - DataTable
files:
  - packages/core/odyssey-react-mui/src/DataTable/DataTable.tsx
commit: 2bfe4f6ac
---

`selectedRows` went from a value re-read on every render to one read once as the initial state. A table no longer follows later changes to that prop, and conversely internal selection is no longer blocked when the prop is non-empty. Check selection behavior in tables that drive `selectedRows` from application state.
