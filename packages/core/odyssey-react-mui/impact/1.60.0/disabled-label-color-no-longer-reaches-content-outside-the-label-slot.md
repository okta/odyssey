---
summary: Disabled label color no longer reaches content outside the label slot
affectedExports:
  - Checkbox
  - CheckboxGroup
  - Radio
  - RadioGroup
files:
  - packages/core/odyssey-react-mui/src/theme/components.tsx
commit: 9d49e26f8
---

The disabled color used to sit on the label root and was repeated on the label slot with `!important`. It now sits only on the label slot, with a nested rule forcing typography inside it to inherit. Two consequences: content inside a disabled label that is not in the label slot no longer picks up the disabled gray, and with `!important` gone your own color rule on the label can now win. Check disabled checkbox and radio labels holding a Link, a Tag, or custom markup.
