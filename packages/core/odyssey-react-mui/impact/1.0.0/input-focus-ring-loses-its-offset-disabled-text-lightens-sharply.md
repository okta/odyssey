---
summary: Input focus ring loses its offset; disabled text lightens sharply
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
onlyRelevantIf: a focused, errored, or disabled text input
---

Input state colours moved and the focus ring lost its offset. Focused border and 1px box shadow #4c64e1 to #546be7; error border #d92300 to #e72500; error hover border #711200 to #951800; error-and-focused the same as error. `outlineOffset` on the focused state went from a hardcoded 1px to `FocusOutlineOffsetTight` 0. Disabled input text lightened sharply, from `palette.text.disabled` #6e6e6e to `TypographyColorDisabled` #aeaeae; check whether disabled field values are still legible. The release shipped as one squashed commit, so the hash points at the whole release rather than at the individual change. v0.24.0 components.tsx:1260-1286; v1.0.0 components.tsx:1401-1427.
