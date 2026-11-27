---
summary: Autocomplete filter row gains a submit `Button` beside its input
affectedExports:
  - DataFilters
  - DataTable
files:
  - packages/odyssey-react-mui/src/labs/DataFilters.tsx
commit: 50a1ef7a1
onlyRelevantIf: a DataFilters or DataTable filter uses the `autocomplete` variant
---

The autocomplete filter row gained a submit Button beside the input, inside two new flex wrappers created in the component body. Check the popover width and the input's own width, and check focus behaviour while typing, because a styled component defined inside a render is a new component type on every render.
