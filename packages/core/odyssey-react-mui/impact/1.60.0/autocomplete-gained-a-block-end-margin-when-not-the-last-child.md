---
summary: Autocomplete gained a block-end margin when not the last child
affectedExports:
  - Autocomplete
  - Picker
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: 70ef35ae0
---

Autocomplete gained a block-end margin of one `Spacing4`, reset to zero on a last child. It previously contributed no bottom margin at all, because MUI wraps the field in an outer div that made the inner form control always its own last child. Every Autocomplete that is not last among its siblings now adds space below itself. Check vertical spacing in forms that place an Autocomplete among other fields, and in layouts that supplied their own spacing.
