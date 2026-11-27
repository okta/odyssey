---
summary: Autocomplete dropdown panel always fills height, list padding reset
affectedExports:
  - Autocomplete
  - GroupPicker
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8de3306cf
onlyRelevantIf: an Autocomplete is rendered
---

The theme changes here are unconditional, not gated on the new `isVirtualized` prop. `MuiAutocomplete.popper` and `MuiAutocomplete.paper` both gained `height: 100%`, so the dropdown panel no longer sizes to its content, and `listbox` gained a `& > ul` reset that zeroes the list's inline padding and block margins. Check the dropdown's height and the spacing of its options. The `paper` rule is narrowed back to virtualized use only at 1.15.9.
