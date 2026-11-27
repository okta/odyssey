---
summary: Non-virtualized Autocomplete dropdown no longer capped at 40vh height
affectedExports:
  - Autocomplete
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 69eb9ff78
onlyRelevantIf: an Autocomplete is rendered without isVirtualized
---

The MuiAutocomplete popper's height: 100% and maxHeight: 40vh are now gated on ownerState.ListboxComponent being defined, which only happens for the virtualized listbox. A non-virtualized Autocomplete's dropdown is no longer capped at 40vh and no longer stretches to full height. Check long option lists that previously scrolled inside the popper and now grow past the viewport.
