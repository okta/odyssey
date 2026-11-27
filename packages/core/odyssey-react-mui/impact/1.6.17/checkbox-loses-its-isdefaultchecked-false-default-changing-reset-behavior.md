---
summary: Checkbox loses its `isDefaultChecked=false` default, changing reset behavior
affectedExports:
  - Checkbox
files:
  - packages/odyssey-react-mui/src/Checkbox.tsx
commit: 588ba2c04
---

Checkbox lost its `isDefaultChecked = false` default and its `checked` and `onChange` moved from the FormControlLabel wrapper onto the inner MUI checkbox. With neither `isChecked` nor `isDefaultChecked` given, the input is no longer held at `checked={false}` by React, so a native `form.reset()` now returns it to unchecked where it previously did not. Check forms that rely on reset, and any test asserting on the label element's change handler.
