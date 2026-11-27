---
summary: Picker options sharing a label now collide on React key, duplicate warning
affectedExports:
  - Picker
  - PickerWithOptionAdornment
  - Option
files:
  - packages/odyssey-react-mui/src/labs/OdysseyPickers/Picker.tsx
  - packages/odyssey-react-mui/src/labs/OdysseyPickers/PickerWithOptionAdornment.tsx
  - packages/odyssey-react-mui/src/labs/OdysseyPickers/ComposablePicker.tsx
commit: 2261ca914
onlyRelevantIf: picker options that share a label
---

Each rendered option moved inside a Fragment keyed by `option.label`, and the per-option `key` that used to come from `option.value` is gone. Two options with the same label now collide on their React key, which produces a duplicate-key warning and can reconcile the wrong row when the list reorders.
