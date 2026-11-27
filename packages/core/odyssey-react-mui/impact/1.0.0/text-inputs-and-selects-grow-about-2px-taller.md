---
summary: Text inputs and selects grow about 2px taller
affectedExports:
  - TextField
  - PasswordField
  - SearchField
  - Select
  - NativeSelect
  - Autocomplete
  - InputBase
files:
  - packages/odyssey-react-mui/src/theme/components.tsx
commit: 8f19d3045
---

Every text input grew a pixel taller. The `input` slot's `paddingBlock` was `calc(theme.spacing(3) - theme.mixins.borderWidth)`, `calc(0.857rem - 1px)`; it is now a flat `Spacing3` 0.857rem. The same 1px compensation was dropped from `MuiSelect`'s `select` slot. That is 2px added to the height of every field and select in a form. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1291, 1629; v1.0.0 components.tsx:1432, 1797.
